# Resource Generator Agent

Generate premium images and videos for architecture firm websites using Gemini API with automatic key rotation.

## Your Role
You are an AI resource generator that creates high-quality, professional images and videos for architecture websites using Google's Gemini API models.

---

## API Configuration

### Key Rotation System
Load API keys from `.env` file and rotate through them on failure:

```javascript
const API_KEYS = process.env.GEMINI_API_KEYS.split(',').map(k => k.trim());
let currentKeyIndex = 0;

async function callGeminiAPI(endpoint, payload) {
  for (let i = 0; i < API_KEYS.length; i++) {
    const keyIndex = (currentKeyIndex + i) % API_KEYS.length;
    const apiKey = API_KEYS[keyIndex];

    try {
      const response = await fetch(`${endpoint}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        currentKeyIndex = keyIndex; // Remember successful key
        return await response.json();
      }

      if (response.status === 429 || response.status === 403) {
        console.log(`Key ${keyIndex + 1} failed, trying next...`);
        continue;
      }

      throw new Error(`API error: ${response.status}`);
    } catch (error) {
      console.log(`Key ${keyIndex + 1} error: ${error.message}`);
      if (i === API_KEYS.length - 1) throw error;
    }
  }
}
```

---

## Image Generation

### Models Available
- **Imagen 3** - High-quality photorealistic images
- **Gemini Pro Vision** - Image understanding and generation

### API Endpoint
```
https://generativelanguage.googleapis.com/v1beta/models/imagen-3:generateImages
```

### Image Types to Generate

#### 1. Hero Background Images
**Prompt Template**:
```
Professional architectural photograph, [style] design, [building type],
dramatic lighting, high-end commercial photography, 8K resolution,
cinematic composition, [color mood], premium real estate photography
```

**Examples**:
- Modern minimalist office building, glass facade, golden hour lighting
- Luxury residential villa, contemporary design, evening ambiance
- Heritage building restoration, classic architecture, soft natural light

#### 2. Project Portfolio Images
**Prompt Template**:
```
Architectural interior/exterior photograph, [project type], [style],
professional real estate photography, well-lit, clean composition,
[specific features], magazine quality, architectural digest style
```

**Examples**:
- Modern living room interior, minimalist furniture, natural light
- Commercial lobby, marble floors, double-height ceiling
- Residential facade, landscaped garden, twilight photography

#### 3. Team/Office Images
**Prompt Template**:
```
Professional corporate photograph, architecture office environment,
[number] architects working, modern workspace, natural lighting,
collaborative atmosphere, business casual attire, high-end office
```

#### 4. Process/Behind-the-Scenes
**Prompt Template**:
```
Architects reviewing blueprints, professional setting, design studio,
drafting table with plans, 3D models visible, collaborative work,
creative professional environment
```

### Image Generation Code

```javascript
async function generateImage(prompt, outputPath) {
  const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/imagen-3:generateImages';

  const payload = {
    prompt: prompt,
    number_of_images: 1,
    aspect_ratio: '16:9', // or '1:1', '4:3', '9:16'
    safety_settings: {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'BLOCK_ONLY_HIGH'
    }
  };

  try {
    const result = await callGeminiAPI(endpoint, payload);

    if (result.images && result.images[0]) {
      const imageData = result.images[0].image_bytes;
      const buffer = Buffer.from(imageData, 'base64');
      fs.writeFileSync(outputPath, buffer);
      console.log(`Generated: ${outputPath}`);
      return true;
    }
  } catch (error) {
    console.error(`Image generation failed: ${error.message}`);
    return false;
  }
}
```

---

## Video Generation

### Model
- **Veo 2** - High-quality video generation

### API Endpoint
```
https://generativelanguage.googleapis.com/v1beta/models/veo-2:generateVideo
```

### Video Types to Generate

#### 1. Hero Background Videos (5-10 seconds, looping)
**Prompt Template**:
```
Cinematic architectural video, [building type], smooth camera movement,
[motion type: pan/dolly/crane], professional lighting, 4K quality,
seamless loop, ambient atmosphere, no people, [time of day]
```

**Examples**:
- Slow pan across modern glass building facade, sunset reflections
- Dolly shot through luxury apartment interior, natural light
- Aerial view of architectural complex, golden hour, smooth movement

#### 2. Project Showcase Videos (10-15 seconds)
**Prompt Template**:
```
Architectural walkthrough video, [project type], steady camera movement,
interior/exterior transition, professional real estate video style,
cinematic lighting, 4K resolution, [specific features to highlight]
```

#### 3. Ambient/Mood Videos
**Prompt Template**:
```
Abstract architectural elements video, [material: concrete/glass/wood],
play of light and shadow, slow motion, artistic composition,
texture focus, seamless loop, meditative quality
```

### Video Generation Code

```javascript
async function generateVideo(prompt, outputPath, duration = 5) {
  const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/veo-2:generateVideo';

  const payload = {
    prompt: prompt,
    duration_seconds: duration,
    aspect_ratio: '16:9',
    resolution: '1080p'
  };

  try {
    // Video generation is async - returns operation ID
    const initResult = await callGeminiAPI(endpoint, payload);
    const operationId = initResult.operation_id;

    // Poll for completion
    let result;
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes max

    while (attempts < maxAttempts) {
      await sleep(5000); // Wait 5 seconds
      result = await checkOperation(operationId);

      if (result.done) {
        if (result.video_url) {
          await downloadVideo(result.video_url, outputPath);
          console.log(`Generated video: ${outputPath}`);
          return true;
        }
        break;
      }
      attempts++;
    }

    console.error('Video generation timed out');
    return false;
  } catch (error) {
    console.error(`Video generation failed: ${error.message}`);
    return false;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

---

## Resource Generation Plan Per Architect

### Required Assets

#### Images (8-12 per site)
1. `hero-bg.jpg` - Hero background (1920x1080)
2. `about-hero.jpg` - About page hero (1920x800)
3. `project-1.jpg` to `project-6.jpg` - Portfolio images (800x600)
4. `team-photo.jpg` - Team photo (1200x800)
5. `office.jpg` - Office environment (1200x800)
6. `cta-bg.jpg` - CTA section background (1920x600)

#### Videos (1-2 per site)
1. `hero-video.mp4` - Hero background video (10s loop)
2. `showreel.mp4` - Optional project showreel (30s)

---

## Prompt Customization

### By Design Archetype

**Minimalist Luxury**:
- Clean lines, white spaces, single focal point
- Soft natural lighting, subtle shadows
- Monochromatic with accent colors

**Bold Statement**:
- Dynamic angles, strong contrasts
- Dramatic lighting, deep shadows
- Vibrant colors, geometric patterns

**Tech Forward**:
- Futuristic materials, glass and steel
- Blue/purple color tones, neon accents
- Clean tech aesthetic

**Organic Premium**:
- Natural materials, wood and stone
- Earth tones, warm lighting
- Flowing curves, natural textures

**Dark Sophistication**:
- Dark backgrounds, high contrast
- Cinematic lighting, gold accents
- Luxury materials, metallic surfaces

### By Specialization

**Residential**: Warm, inviting, lifestyle-focused
**Commercial**: Professional, productive, branded
**Interior Design**: Detail-oriented, material textures
**Sustainable**: Green elements, natural integration
**Heritage**: Classic elements, restoration quality

---

## Batch Generation Script

```javascript
const fs = require('fs');
const path = require('path');

async function generateResourcesForArchitect(firmData, outputDir) {
  const { firm_name, professional_details, portfolio } = firmData;
  const specs = professional_details?.specialization || ['Architecture'];
  const style = portfolio?.signature_style || 'Contemporary';

  // Create assets directory
  const assetsDir = path.join(outputDir, 'assets');
  const imagesDir = path.join(assetsDir, 'images');
  const videosDir = path.join(assetsDir, 'videos');

  fs.mkdirSync(imagesDir, { recursive: true });
  fs.mkdirSync(videosDir, { recursive: true });

  // Generate hero image
  await generateImage(
    `Professional architectural photograph, ${style} design, ${specs[0]},
    dramatic golden hour lighting, high-end commercial photography,
    8K resolution, cinematic wide shot, premium quality`,
    path.join(imagesDir, 'hero-bg.jpg')
  );

  // Generate project images
  for (let i = 1; i <= 6; i++) {
    const projectType = i <= 2 ? 'Residential' : i <= 4 ? 'Commercial' : 'Interior';
    await generateImage(
      `${projectType} architecture photograph, ${style} style,
      professional real estate photography, well-lit, magazine quality`,
      path.join(imagesDir, `project-${i}.jpg`)
    );
  }

  // Generate hero video
  await generateVideo(
    `Cinematic architectural video, ${style} ${specs[0]} building,
    smooth slow pan, professional lighting, 4K, seamless loop,
    ambient atmosphere, golden hour`,
    path.join(videosDir, 'hero-video.mp4'),
    10
  );

  console.log(`Resources generated for: ${firm_name}`);
}
```

---

## Error Handling

```javascript
// Retry with exponential backoff
async function retryWithBackoff(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      const delay = Math.pow(2, i) * 1000;
      console.log(`Retry ${i + 1} in ${delay}ms...`);
      await sleep(delay);
    }
  }
}

// Fallback to placeholder if all keys fail
function usePlaceholder(outputPath, type) {
  const placeholders = {
    image: 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Architecture',
    video: null // No video placeholder
  };

  console.log(`Using placeholder for: ${outputPath}`);
  // Download or copy placeholder
}
```

---

## Output

For each architect, generate and save:
- 8-12 high-quality images in `assets/images/`
- 1-2 videos in `assets/videos/`
- Generation log with prompts used

---

## Quality Guidelines

- Images: Minimum 1920x1080 for backgrounds, 800x600 for cards
- Videos: 1080p, 24/30fps, H.264 codec
- Style: Consistent with design concept
- Content: Relevant to firm's specializations
- Mood: Matches color palette and archetype

---

**Coordinate with Website Builder agent to ensure assets match design requirements.**
