# Design Archetypes

## Minimalist Luxury
**When to use**: High-end products, professional services, tech companies
**Key characteristics**:
- 90% whitespace on hero sections
- Single focal point per viewport
- Monochromatic with one accent color
- Sans-serif typography only
- Subtle shadows (0-4px blur)
- Micro-animations < 300ms

**Implementation**:
```css
.hero {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 8rem 2rem;
}
.cta-button {
  padding: 1.5rem 4rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}
```

## Bold Statement
**When to use**: Creative agencies, fashion brands, entertainment
**Key characteristics**:
- Typography as hero element (120px+)
- High contrast ratios (21:1)
- Asymmetric layouts
- Full-bleed imagery
- Overlapping elements
- Kinetic typography

**Implementation**:
```css
.statement-text {
  font-size: clamp(4rem, 15vw, 12rem);
  font-weight: 900;
  line-height: 0.9;
  mix-blend-mode: difference;
}
```

## Editorial Elegance
**When to use**: Publishing, lifestyle brands, portfolios
**Key characteristics**:
- Multi-column layouts
- Serif typography for headlines
- Large initial caps
- Pull quotes
- Asymmetric image placement
- Subtle grid overlays

## Tech Forward
**When to use**: SaaS, startups, crypto, AI companies
**Key characteristics**:
- Glassmorphism effects
- Gradient meshes
- 3D elements (Three.js)
- Dark backgrounds
- Neon accents
- Animated data visualizations

**Implementation**:
```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
}
```

## Organic Premium
**When to use**: Wellness, sustainable brands, artisan products
**Key characteristics**:
- Curved shapes and flowing lines
- Earth tone palettes
- Natural textures
- Hand-drawn elements
- Organic animations
- Paper textures

## Dark Sophistication
**When to use**: Luxury automotive, high-end audio, gaming
**Key characteristics**:
- True black backgrounds (#000)
- High contrast text
- Cinematic aspect ratios
- Ambient animations
- Metallic accents
- Video backgrounds with overlay