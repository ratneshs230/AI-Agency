/**
 * Video Generator Agent
 * Generates videos using Veo API for existing websites
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Load API keys
const envPath = path.join(__dirname, '..', '.env');
require('dotenv').config({ path: envPath });

const API_KEYS = process.env.GEMINI_API_KEYS
  ? process.env.GEMINI_API_KEYS.split(',').map(k => k.trim())
  : [];

console.log(`Loaded ${API_KEYS.length} API keys`);

let currentKeyIndex = 0;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithTimeout(url, options, timeout = 30000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

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
        60000
      );

      if (response.ok) {
        currentKeyIndex = keyIndex;
        return await response.json();
      }

      const errorText = await response.text();
      console.log(`  Key ${keyIndex + 1} failed: ${response.status} - ${errorText.substring(0, 100)}`);

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

async function generateVideo(prompt, outputPath, durationSeconds = 8) {
  console.log(`Generating video: ${path.basename(outputPath)}`);

  const models = ['veo-2.0-generate-001', 'veo-3.0-fast-generate-001'];

  for (const model of models) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:predictLongRunning`;

    const payload = {
      instances: [{ prompt: prompt }],
      parameters: {
        aspectRatio: '16:9',
        durationSeconds: durationSeconds
      }
    };

    try {
      const result = await callGeminiAPI(endpoint, payload);

      if (result.name) {
        console.log(`  Video generation started with ${model}: ${result.name}`);

        const operationEndpoint = `https://generativelanguage.googleapis.com/v1beta/${result.name}`;
        let attempts = 0;
        const maxAttempts = 60;

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
                console.log(`  ✓ Generated video: ${outputPath}`);
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

  console.log(`  ✗ Video generation failed`);
  return false;
}

async function main() {
  const dataPath = path.join(__dirname, '..', 'leads', 'architects', 'architects_200_list.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  console.log(`\n${'='.repeat(60)}`);
  console.log(`VIDEO GENERATOR AGENT`);
  console.log(`${'='.repeat(60)}`);
  console.log(`\nGenerating videos for ${data.length} architects\n`);

  const startIndex = parseInt(process.argv[2]) || 0;
  const endIndex = parseInt(process.argv[3]) || data.length;

  const results = { success: [], failed: [], skipped: [] };

  for (let i = startIndex; i < endIndex; i++) {
    const arch = data[i];
    const videosDir = path.join(__dirname, '..', 'leads', 'architects', 'no-site', arch.firm_name, 'website', 'assets', 'videos');
    const videoPath = path.join(videosDir, 'hero-video.mp4');

    console.log(`[${i + 1}/${endIndex}] ${arch.firm_name}`);

    if (!fs.existsSync(videosDir)) {
      console.log(`  ✗ Directory not found, skipping`);
      results.skipped.push(arch.firm_name);
      continue;
    }

    if (fs.existsSync(videoPath)) {
      console.log(`  → Video already exists, skipping`);
      results.skipped.push(arch.firm_name);
      continue;
    }

    const specs = arch.professional_details?.specialization || ['Architecture'];
    const style = arch.portfolio?.signature_style || 'Contemporary';

    const prompt = `Cinematic architectural video, ${style} ${specs[0]} building exterior and interior, smooth slow camera pan movement, professional dramatic lighting, high quality, seamless loop potential, ambient atmosphere, golden hour, no people, elegant and premium feel`;

    const success = await generateVideo(prompt, videoPath, 8);

    if (success) {
      results.success.push(arch.firm_name);
    } else {
      results.failed.push(arch.firm_name);
    }

    // Delay between videos
    if (i < endIndex - 1) {
      await sleep(3000);
    }
  }

  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log(`VIDEO GENERATION COMPLETE`);
  console.log(`${'='.repeat(60)}`);
  console.log(`\n  Success: ${results.success.length}`);
  console.log(`  Failed:  ${results.failed.length}`);
  console.log(`  Skipped: ${results.skipped.length}\n`);

  // Save results
  const logPath = path.join(__dirname, '..', 'video-generation-results.json');
  fs.writeFileSync(logPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    range: { start: startIndex, end: endIndex },
    results
  }, null, 2));
}

if (require.main === module) {
  main().catch(console.error);
}
