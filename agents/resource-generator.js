/**
 * Resource Generator Agent
 * Generates images and videos using Gemini API with key rotation
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Load API keys from environment
const envPath = path.join(__dirname, '..', '.env');
require('dotenv').config({ path: envPath });

const API_KEYS = process.env.GEMINI_API_KEYS
  ? process.env.GEMINI_API_KEYS.split(',').map(k => k.trim())
  : [];

console.log(`Loaded ${API_KEYS.length} API keys from .env`);

let currentKeyIndex = 0;

// Utility functions
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithTimeout(url, options, timeout = 30000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

// API call with key rotation
async function callGeminiAPI(endpoint, payload, retries = API_KEYS.length) {
  if (API_KEYS.length === 0) {
    throw new Error('No API keys configured');
  }

  for (let i = 0; i < retries; i++) {
    const keyIndex = (currentKeyIndex + i) % API_KEYS.length;
    const apiKey = API_KEYS[keyIndex];

    try {
      console.log(`  Trying API key ${keyIndex + 1}/${API_KEYS.length}...`);

      const response = await fetchWithTimeout(
        `${endpoint}?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        },
        60000 // 60 second timeout
      );

      if (response.ok) {
        currentKeyIndex = keyIndex;
        return await response.json();
      }

      const errorText = await response.text();
      console.log(`  Key ${keyIndex + 1} failed: ${response.status} - ${errorText.substring(0, 100)}`);

      // Rate limit or quota exceeded - try next key
      if (response.status === 429 || response.status === 403 || response.status === 400) {
        continue;
      }

      throw new Error(`API error: ${response.status}`);
    } catch (error) {
      console.log(`  Key ${keyIndex + 1} error: ${error.message}`);
      if (i === retries - 1) {
        throw new Error(`All API keys failed: ${error.message}`);
      }
    }
  }
}

// Image generation using Imagen
async function generateImage(prompt, outputPath, aspectRatio = '16:9') {
  console.log(`Generating image: ${path.basename(outputPath)}`);

  const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/imagen-3:generateImages';

  const payload = {
    instances: [{ prompt: prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: aspectRatio
    }
  };

  try {
    const result = await callGeminiAPI(endpoint, payload);

    if (result.predictions && result.predictions[0]) {
      const imageData = result.predictions[0].bytesBase64Encoded;
      const buffer = Buffer.from(imageData, 'base64');
      fs.writeFileSync(outputPath, buffer);
      console.log(`  ✓ Generated: ${outputPath}`);
      return true;
    }

    console.log(`  ✗ No image data in response`);
    return false;
  } catch (error) {
    console.error(`  ✗ Image generation failed: ${error.message}`);
    return false;
  }
}

// Generate image using Nanobanana (Gemini image models)
async function generateImageWithGemini(prompt, outputPath) {
  console.log(`Generating image with Nanobanana: ${path.basename(outputPath)}`);

  // Nanobanana (gemini-2.5-flash-image) and Nanobanana Pro (gemini-3-pro-image-preview)
  const models = [
    'gemini-2.5-flash-image',
    'gemini-2.0-flash-exp'
  ];

  const payload = {
    contents: [{
      parts: [{
        text: `Generate a high-quality architectural photograph: ${prompt}.
               Style: Professional real estate photography, magazine quality.
               Resolution: High resolution, suitable for web hero sections.
               The image should be photorealistic and suitable for a premium architecture website.`
      }]
    }],
    generationConfig: {
      responseModalities: ['TEXT', 'IMAGE']
    }
  };

  // Try each model
  for (const model of models) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
    try {
      const result = await callGeminiAPI(endpoint, payload);

      if (result.candidates && result.candidates[0] && result.candidates[0].content) {
        const parts = result.candidates[0].content.parts;
        for (const part of parts) {
          if (part.inlineData) {
            const buffer = Buffer.from(part.inlineData.data, 'base64');
            fs.writeFileSync(outputPath, buffer);
            console.log(`  ✓ Generated with ${model}: ${outputPath}`);
            return true;
          }
        }
      }
    } catch (error) {
      console.log(`  Model ${model} failed: ${error.message}`);
      continue;
    }
  }

  console.log(`  ✗ No image generated from any model`);
  return false;
}

// Video generation using Veo
async function generateVideo(prompt, outputPath, durationSeconds = 8) {
  console.log(`Generating video with Veo: ${path.basename(outputPath)}`);

  // Veo models - try fastest first for efficiency
  const models = [
    'veo-2.0-generate-001',
    'veo-3.0-fast-generate-001'
  ];

  for (const model of models) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:predictLongRunning`;

    const payload = {
      instances: [{
        prompt: prompt
      }],
      parameters: {
        aspectRatio: '16:9',
        durationSeconds: durationSeconds
      }
    };

    try {
      const result = await callGeminiAPI(endpoint, payload);

      // Video generation is async - need to poll for results
      if (result.name) {
        console.log(`  Video generation started with ${model}: ${result.name}`);

        // Poll for completion
        const operationEndpoint = `https://generativelanguage.googleapis.com/v1beta/${result.name}`;
        let attempts = 0;
        const maxAttempts = 60; // 5 minutes max

        while (attempts < maxAttempts) {
          await sleep(5000);

          const statusResponse = await fetchWithTimeout(
            `${operationEndpoint}?key=${API_KEYS[currentKeyIndex]}`,
            { method: 'GET' }
          );

          if (statusResponse.ok) {
            const status = await statusResponse.json();

            if (status.done) {
              if (status.response && status.response.generateVideoResponse &&
                  status.response.generateVideoResponse.generatedSamples) {
                const videoUrl = status.response.generateVideoResponse.generatedSamples[0].video.uri;
                await downloadFile(videoUrl, outputPath);
                console.log(`  ✓ Generated video with ${model}: ${outputPath}`);
                return true;
              }
              break;
            }
          }

          attempts++;
          if (attempts % 6 === 0) {
            console.log(`  Waiting for video... (${Math.floor(attempts * 5 / 60)}min)`);
          }
        }
      }
    } catch (error) {
      console.log(`  Model ${model} failed: ${error.message}`);
      continue;
    }
  }

  console.log(`  ✗ Video generation failed with all models`);
  return false;
}

// Download file from URL
async function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

// Create placeholder image
function createPlaceholder(outputPath, text = 'Architecture') {
  // Create a simple SVG placeholder
  const svg = `
    <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1a1a1a"/>
      <text x="50%" y="50%" font-family="Arial" font-size="48" fill="#666" text-anchor="middle">${text}</text>
    </svg>
  `;
  fs.writeFileSync(outputPath.replace('.jpg', '.svg'), svg);
  console.log(`  → Created placeholder: ${outputPath}`);
}

// Generate all resources for an architect
async function generateResourcesForArchitect(firmData, outputDir) {
  const { firm_name, professional_details, portfolio } = firmData;
  const specs = professional_details?.specialization || ['Architecture'];
  const style = portfolio?.signature_style || 'Contemporary';

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Generating resources for: ${firm_name}`);
  console.log(`Style: ${style} | Specs: ${specs.join(', ')}`);
  console.log(`${'='.repeat(60)}\n`);

  // Create directories
  const assetsDir = path.join(outputDir, 'assets');
  const imagesDir = path.join(assetsDir, 'images');
  const videosDir = path.join(assetsDir, 'videos');

  fs.mkdirSync(imagesDir, { recursive: true });
  fs.mkdirSync(videosDir, { recursive: true });

  const results = {
    images: [],
    videos: [],
    failed: []
  };

  // Image prompts based on firm specialization
  const imagePrompts = [
    {
      name: 'hero-bg.jpg',
      prompt: `Professional architectural photograph, ${style} design building, ${specs[0]}, dramatic golden hour lighting, high-end commercial real estate photography, 8K resolution, cinematic wide angle composition, premium quality, no text`
    },
    {
      name: 'about-hero.jpg',
      prompt: `Architecture studio interior, modern design office, architects working, natural light through large windows, professional environment, ${style} aesthetic, clean and organized, magazine quality`
    },
    {
      name: 'project-1.jpg',
      prompt: `${specs[0]} project exterior photograph, ${style} architecture, professional real estate photography, well-lit, clean composition, luxury quality, award-winning design`
    },
    {
      name: 'project-2.jpg',
      prompt: `Modern interior design photograph, ${style} style, spacious living area, natural light, premium materials, architectural digest quality, minimalist furniture`
    },
    {
      name: 'project-3.jpg',
      prompt: `Commercial building interior photograph, ${style} design, lobby or reception area, professional lighting, marble and glass materials, corporate elegance`
    },
    {
      name: 'project-4.jpg',
      prompt: `Residential architecture exterior, ${style} home design, landscaped garden, twilight photography, warm interior lights, premium real estate quality`
    },
    {
      name: 'cta-bg.jpg',
      prompt: `Abstract architectural detail photograph, ${style} building elements, play of light and shadow, geometric patterns, premium materials texture, artistic composition`
    }
  ];

  // Generate images
  for (const img of imagePrompts) {
    const outputPath = path.join(imagesDir, img.name);

    // Try Gemini image generation first
    let success = await generateImageWithGemini(img.prompt, outputPath);

    if (!success) {
      // Fallback to Imagen
      success = await generateImage(img.prompt, outputPath);
    }

    if (success) {
      results.images.push(img.name);
    } else {
      results.failed.push(img.name);
      createPlaceholder(outputPath, img.name.replace('.jpg', ''));
    }

    // Rate limiting delay
    await sleep(2000);
  }

  // Generate hero video
  const videoPrompt = `Cinematic architectural video, ${style} ${specs[0]} building exterior and interior, smooth slow camera pan movement, professional dramatic lighting, high quality, seamless loop potential, ambient atmosphere, golden hour, no people, elegant and premium feel`;

  const videoPath = path.join(videosDir, 'hero-video.mp4');
  const videoSuccess = await generateVideo(videoPrompt, videoPath, 8);

  if (videoSuccess) {
    results.videos.push('hero-video.mp4');
  } else {
    results.failed.push('hero-video.mp4');
  }

  // Save generation log
  const logPath = path.join(outputDir, 'resource-generation-log.json');
  fs.writeFileSync(logPath, JSON.stringify({
    firm_name,
    generated_at: new Date().toISOString(),
    results,
    prompts: imagePrompts.map(p => ({ name: p.name, prompt: p.prompt }))
  }, null, 2));

  console.log(`\nResults for ${firm_name}:`);
  console.log(`  Images: ${results.images.length}/${imagePrompts.length}`);
  console.log(`  Videos: ${results.videos.length}/1`);
  console.log(`  Failed: ${results.failed.length}`);

  return results;
}

// Main execution
async function main() {
  const dataPath = path.join(__dirname, '..', 'leads', 'architects', 'architects_200_list.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  console.log(`\nResource Generator Agent`);
  console.log(`========================`);
  console.log(`Loaded ${API_KEYS.length} API keys`);
  console.log(`Processing ${data.length} architects\n`);

  const startIndex = parseInt(process.argv[2]) || 0;
  const endIndex = parseInt(process.argv[3]) || data.length;

  for (let i = startIndex; i < endIndex; i++) {
    const arch = data[i];
    const outputDir = path.join(__dirname, '..', 'leads', 'architects', 'no-site', arch.firm_name);

    if (!fs.existsSync(outputDir)) {
      console.log(`Skipping ${arch.firm_name} - directory not found`);
      continue;
    }

    await generateResourcesForArchitect(arch, outputDir);

    // Delay between architects
    if (i < endIndex - 1) {
      console.log(`\nWaiting before next architect...`);
      await sleep(5000);
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Resource generation complete!`);
  console.log(`${'='.repeat(60)}\n`);
}

// Export for use as module
module.exports = {
  generateImage,
  generateImageWithGemini,
  generateVideo,
  generateResourcesForArchitect
};

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}
