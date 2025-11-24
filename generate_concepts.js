const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync('leads/architects/architects_200_list.json', 'utf8'));

// Design elements for unique combinations
const archetypes = ['Minimalist Luxury', 'Bold Statement', 'Editorial Elegance', 'Tech Forward', 'Organic Premium', 'Dark Sophistication'];

const palettes = [
  { name: 'Midnight Elegance', primary: '#0A0E27', secondary: '#D4AF37', accent: '#F7F3E9', bg: '#000000', text: '#E8E6E1' },
  { name: 'Refined Minimal', primary: '#1C1C1C', secondary: '#F5F5F0', accent: '#C9A961', bg: '#FAFAF8', text: '#4A4A4A' },
  { name: 'Royal Sophistication', primary: '#1E3A5F', secondary: '#B8860B', accent: '#8B0000', bg: '#FFFEF7', text: '#2C2C2C' },
  { name: 'Cyber Neon', primary: '#0D0221', secondary: '#0099FF', accent: '#FF006E', bg: '#050505', text: '#FFFFFF' },
  { name: 'Future Clean', primary: '#FFFFFF', secondary: '#000000', accent: '#0066FF', bg: '#FAFAFA', text: '#1A1A1A' },
  { name: 'Earth Luxury', primary: '#3E2723', secondary: '#8D6E63', accent: '#E6B47D', bg: '#FFF8E1', text: '#2C2C2C' },
  { name: 'Nordic Calm', primary: '#2E3440', secondary: '#D8DEE9', accent: '#88C0D0', bg: '#ECEFF4', text: '#2E3440' },
  { name: 'Desert Oasis', primary: '#C19A6B', secondary: '#F4E4C1', accent: '#708238', bg: '#FAF0E6', text: '#3E2723' },
  { name: 'Obsidian Gold', primary: '#0F0F0F', secondary: '#CFB53B', accent: '#FFFFFF', bg: '#1A1A1A', text: '#F5F5F5' },
  { name: 'Azure Dreams', primary: '#003366', secondary: '#E8F4F8', accent: '#00A8E8', bg: '#F0F8FF', text: '#003366' },
  { name: 'Emerald Elite', primary: '#0D3B2E', secondary: '#D4AF37', accent: '#50C878', bg: '#F5FFF5', text: '#1A1A1A' },
  { name: 'Burgundy Classic', primary: '#722F37', secondary: '#F5F5DC', accent: '#FFD700', bg: '#FFFAF0', text: '#2C2C2C' },
  { name: 'Charcoal Copper', primary: '#2F2F2F', secondary: '#B87333', accent: '#F5DEB3', bg: '#FAF0E6', text: '#1A1A1A' },
  { name: 'Sapphire Night', primary: '#0F1729', secondary: '#4169E1', accent: '#E6E6FA', bg: '#0A1128', text: '#E6E6FA' },
  { name: 'Ivory Tower', primary: '#2C3E50', secondary: '#FFFFF0', accent: '#BDB76B', bg: '#FEFEFE', text: '#2C3E50' },
  { name: 'Slate Terracotta', primary: '#4A5568', secondary: '#E07B54', accent: '#F7FAFC', bg: '#F7F7F7', text: '#2D3748' },
  { name: 'Pewter Rose', primary: '#4A4453', secondary: '#E8B4B8', accent: '#FFF5F5', bg: '#FAFAFA', text: '#2D2D2D' },
  { name: 'Ocean Depth', primary: '#0C4A6E', secondary: '#38BDF8', accent: '#F0F9FF', bg: '#F8FAFC', text: '#0C4A6E' },
  { name: 'Forest Mist', primary: '#14532D', secondary: '#86EFAC', accent: '#F0FDF4', bg: '#FAFDF7', text: '#14532D' },
  { name: 'Mauve Elegance', primary: '#581C87', secondary: '#D8B4FE', accent: '#FAF5FF', bg: '#FEFEFE', text: '#3B0764' }
];

const typography = [
  { heading: 'Playfair Display', body: 'Inter', style: 'Classic Elegance' },
  { heading: 'Helvetica Neue', body: 'Helvetica Neue', style: 'Modern Minimal' },
  { heading: 'Cormorant Garamond', body: 'Montserrat', style: 'Refined Heritage' },
  { heading: 'Space Grotesk', body: 'IBM Plex Sans', style: 'Tech Forward' },
  { heading: 'Bebas Neue', body: 'Open Sans', style: 'Bold Contemporary' },
  { heading: 'Libre Baskerville', body: 'Source Sans Pro', style: 'Professional Trust' },
  { heading: 'Oswald', body: 'Lato', style: 'Strong Statement' },
  { heading: 'Merriweather', body: 'Roboto', style: 'Readable Elegance' },
  { heading: 'Abril Fatface', body: 'Poppins', style: 'Dramatic Impact' },
  { heading: 'DM Serif Display', body: 'DM Sans', style: 'Modern Serif' },
  { heading: 'Bodoni Moda', body: 'Work Sans', style: 'Editorial Chic' },
  { heading: 'Fraunces', body: 'Outfit', style: 'Soft Sophistication' },
  { heading: 'Syne', body: 'Manrope', style: 'Creative Edge' },
  { heading: 'Darker Grotesque', body: 'Karla', style: 'Clean Modern' },
  { heading: 'Clash Display', body: 'Satoshi', style: 'Bold Geometric' }
];

const heroStyles = [
  'Full-viewport video background with cinematic overlay',
  'Split-screen asymmetric layout with parallax',
  'Interactive 3D architectural model showcase',
  'Cinemagraph hero with animated blueprint lines',
  'Typography-focused with staggered text reveal',
  'Geometric grid with hover-reveal projects',
  'Dark ambient with neon accent animations',
  'Minimalist with single dramatic project image',
  'Scroll-triggered project carousel',
  'Immersive 360 project panorama'
];

const animations = [
  'Scroll-triggered fade-up with stagger',
  'Magnetic cursor on all interactive elements',
  'Smooth parallax depth layers',
  'Split text animation on headings',
  'Perspective tilt cards on hover',
  'Liquid morphing page transitions',
  'Staggered masonry grid reveals',
  'Kinetic typography hero sequence',
  'Gradient mesh background animations',
  'Micro-interactions on every touch point'
];

const navStyles = [
  'Transparent to solid on scroll',
  'Hidden hamburger to fullscreen overlay',
  'Sticky sidebar with progress indicator',
  'Mega menu with project previews',
  'Minimal floating pill navigation'
];

const cardStyles = [
  'Glassmorphism with blur backdrop',
  'Lift and shadow on hover',
  'Perspective 3D tilt effect',
  'Border reveal animation',
  'Image zoom with overlay info'
];

// Generate unique concept for each architect
data.forEach((arch, index) => {
  const specs = arch.professional_details?.specialization || ['Architecture'];
  const philosophy = arch.professional_details?.design_philosophy || 'Excellence in design';
  const style = arch.portfolio?.signature_style || 'Contemporary';
  const experience = arch.professional_details?.years_experience || 10;

  // Create unique combinations using index-based selection with offsets
  const archetype = archetypes[index % archetypes.length];
  const palette = palettes[index % palettes.length];
  const typo = typography[(index + 3) % typography.length];
  const hero = heroStyles[(index + 5) % heroStyles.length];
  const anim = animations[(index + 7) % animations.length];
  const nav = navStyles[(index + 2) % navStyles.length];
  const card = cardStyles[(index + 4) % cardStyles.length];

  // Generate concept markdown
  const concept = `# Premium Design Concept: ${arch.firm_name}

## Brand Overview
**Firm**: ${arch.firm_name}
**Location**: ${arch.location}
**Experience**: ${experience} years
**Signature Style**: ${style}
**Specializations**: ${specs.join(', ')}
**Design Philosophy**: ${philosophy}

---

## Design Direction

### Archetype: ${archetype}
This design concept embodies ${archetype.toLowerCase()} principles, creating a sophisticated digital presence that reflects the firm's expertise and premium positioning.

---

## Color Palette: ${palette.name}

\`\`\`css
:root {
  --color-primary: ${palette.primary};
  --color-secondary: ${palette.secondary};
  --color-accent: ${palette.accent};
  --color-background: ${palette.bg};
  --color-text: ${palette.text};
}
\`\`\`

### Usage Guidelines
- **Primary (60%)**: Headers, key UI elements, brand marks
- **Secondary (30%)**: Supporting elements, cards, dividers
- **Accent (10%)**: CTAs, highlights, interactive states

---

## Typography System: ${typo.style}

\`\`\`css
@import url('https://fonts.googleapis.com/css2?family=${typo.heading.replace(/ /g, '+')}:wght@400;700;900&family=${typo.body.replace(/ /g, '+')}:wght@300;400;500;600&display=swap');

:root {
  --font-heading: '${typo.heading}', serif;
  --font-body: '${typo.body}', sans-serif;

  /* Type Scale - Perfect Fourth (1.333) */
  --fs-display: clamp(3rem, 10vw, 6rem);
  --fs-h1: clamp(2.5rem, 5vw, 4rem);
  --fs-h2: clamp(2rem, 4vw, 3rem);
  --fs-h3: clamp(1.5rem, 3vw, 2rem);
  --fs-body: clamp(1rem, 2vw, 1.125rem);
  --fs-small: 0.875rem;
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

body {
  font-family: var(--font-body);
  font-weight: 400;
  line-height: 1.7;
}
\`\`\`

---

## Hero Section: ${hero}

\`\`\`html
<section class="hero" data-theme="${archetype.toLowerCase().replace(/ /g, '-')}">
  <div class="hero-background">
    <!-- ${hero} -->
  </div>
  <div class="hero-content">
    <h1 class="hero-title" data-aos="fade-up">
      ${arch.firm_name}
    </h1>
    <p class="hero-tagline" data-aos="fade-up" data-aos-delay="100">
      ${philosophy}
    </p>
    <div class="hero-cta" data-aos="fade-up" data-aos-delay="200">
      <button class="btn-primary magnetic">View Portfolio</button>
      <button class="btn-secondary">Contact Us</button>
    </div>
  </div>
  <div class="scroll-indicator">
    <span></span>
  </div>
</section>
\`\`\`

\`\`\`css
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: var(--color-background);
  overflow: hidden;
}

.hero-title {
  font-size: var(--fs-display);
  color: var(--color-primary);
  margin-bottom: 1.5rem;
}

.hero-tagline {
  font-size: var(--fs-h3);
  color: var(--color-text);
  opacity: 0.8;
  max-width: 600px;
  margin-bottom: 2rem;
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-background);
  padding: 1rem 2.5rem;
  border: none;
  font-family: var(--font-body);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
\`\`\`

---

## Navigation: ${nav}

\`\`\`css
.nav-header {
  position: fixed;
  width: 100%;
  padding: 1.5rem 4rem;
  z-index: 1000;
  transition: all 0.4s var(--ease-out-expo);
}

.nav-header.scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 1rem 4rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}
\`\`\`

---

## Animation System: ${anim}

\`\`\`css
:root {
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-quick: 200ms;
  --duration-normal: 400ms;
  --duration-slow: 600ms;
}

/* Fade Up Animation */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-up {
  animation: fadeUp 0.8s var(--ease-out-expo) forwards;
}

/* Stagger Children */
.stagger > * {
  opacity: 0;
  animation: fadeUp 0.6s var(--ease-out-expo) forwards;
}

.stagger > *:nth-child(1) { animation-delay: 0ms; }
.stagger > *:nth-child(2) { animation-delay: 100ms; }
.stagger > *:nth-child(3) { animation-delay: 200ms; }
.stagger > *:nth-child(4) { animation-delay: 300ms; }
\`\`\`

\`\`\`javascript
// Scroll Reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -100px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
\`\`\`

---

## Card Component: ${card}

\`\`\`css
.project-card {
  background: var(--color-secondary);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s var(--ease-out-expo);
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.project-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.6s var(--ease-out-expo);
}

.project-card:hover img {
  transform: scale(1.1);
}
\`\`\`

---

## Responsive Breakpoints

\`\`\`css
/* Mobile First */
@media (min-width: 768px) {
  /* Tablet styles */
}

@media (min-width: 1024px) {
  /* Desktop styles */
}

@media (min-width: 1440px) {
  /* Large desktop styles */
}
\`\`\`

---

## Recommended Assets

### Imagery
- Professional architectural photography
- Project renders and visualizations
- Team portraits with consistent styling
- Process/behind-the-scenes shots

### Icons
- Noun Project or Feather Icons
- Custom architectural symbols
- Animated Lottie icons for loading states

### Resources
- Unsplash/Pexels for stock imagery
- Google Fonts for typography
- GSAP for advanced animations
- Three.js for 3D elements

---

## Quality Checklist

- [ ] Looks expensive at first glance
- [ ] Minimum 3 micro-interactions
- [ ] Clear typography hierarchy
- [ ] Mobile-optimized
- [ ] Loading states designed
- [ ] Purposeful animations
- [ ] Cohesive across all elements
- [ ] Stands out from competitors

---

*Generated for ${arch.firm_name} - Premium Web Design Concept*
`;

  // Write to file
  const folderPath = path.join('leads/architects/no-site', arch.firm_name);
  const filePath = path.join(folderPath, 'design-concept.md');

  try {
    fs.writeFileSync(filePath, concept);
    console.log(`[${index + 1}/200] Created: ${arch.firm_name}`);
  } catch (err) {
    console.error(`Error writing ${arch.firm_name}: ${err.message}`);
  }
});

console.log('\nCompleted generating 200 unique design concepts!');
