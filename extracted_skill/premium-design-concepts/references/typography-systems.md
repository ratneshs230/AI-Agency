# Typography Systems

## Premium Font Pairings

### Classic Elegance
**Heading**: Playfair Display (Serif)
**Body**: Inter (Sans-serif)
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap');

h1, h2, h3 {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  letter-spacing: -0.02em;
}
body {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  letter-spacing: -0.011em;
}
```

### Modern Minimal
**Heading**: Helvetica Neue (Sans-serif)
**Body**: Helvetica Neue (Sans-serif)
```css
h1 {
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: 100;
  font-size: clamp(3rem, 8vw, 6rem);
  letter-spacing: -0.04em;
}
body {
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: 300;
  line-height: 1.7;
}
```

### Editorial Luxury
**Heading**: Didot (Serif)
**Body**: Futura (Sans-serif)
```css
h1, h2 {
  font-family: 'Didot', 'Bodoni MT', serif;
  font-weight: 300;
  font-style: italic;
  letter-spacing: 0.02em;
}
body {
  font-family: 'Futura', sans-serif;
  font-weight: 300;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}
```

### Tech Forward
**Heading**: Space Grotesk (Sans-serif)
**Body**: IBM Plex Sans (Sans-serif)
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=IBM+Plex+Sans:wght@300;400;500&display=swap');

h1, h2, h3 {
  font-family: 'Space Grotesk', monospace;
  font-weight: 700;
  letter-spacing: -0.03em;
}
body {
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
}
```

## Type Scale Systems

### Perfect Fourth Scale (1.333)
```css
:root {
  --fs-xs: 0.75rem;     /* 12px */
  --fs-sm: 0.875rem;    /* 14px */
  --fs-base: 1rem;      /* 16px */
  --fs-md: 1.333rem;    /* 21px */
  --fs-lg: 1.777rem;    /* 28px */
  --fs-xl: 2.369rem;    /* 38px */
  --fs-2xl: 3.157rem;   /* 51px */
  --fs-3xl: 4.209rem;   /* 67px */
  --fs-4xl: 5.61rem;    /* 90px */
}
```

### Golden Ratio Scale (1.618)
```css
:root {
  --fs-xs: 0.618rem;    /* 10px */
  --fs-sm: 0.786rem;    /* 13px */
  --fs-base: 1rem;      /* 16px */
  --fs-md: 1.618rem;    /* 26px */
  --fs-lg: 2.618rem;    /* 42px */
  --fs-xl: 4.236rem;    /* 68px */
  --fs-2xl: 6.854rem;   /* 110px */
  --fs-3xl: 11.089rem;  /* 177px */
}
```

## Typography Hierarchy

### Display (Hero Headlines)
```css
.display {
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  margin-bottom: 2rem;
}
```

### Heading Level 1
```css
h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
}
```

### Heading Level 2
```css
h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
  margin-bottom: 1.25rem;
}
```

### Heading Level 3
```css
h3 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 500;
  line-height: 1.3;
  margin-bottom: 1rem;
}
```

### Body Text
```css
body {
  font-size: clamp(1rem, 2vw, 1.125rem);
  font-weight: 400;
  line-height: 1.7;
  letter-spacing: -0.011em;
}

.lead {
  font-size: 1.25rem;
  font-weight: 300;
  line-height: 1.6;
  letter-spacing: -0.005em;
}
```

### Small Text
```css
.small {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.01em;
}

.caption {
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

## Advanced Typography

### Variable Fonts
```css
@font-face {
  font-family: 'Inter var';
  src: url('Inter.var.woff2') format('woff2-variations');
  font-weight: 100 900;
}

.dynamic-text {
  font-family: 'Inter var';
  font-weight: 300;
  transition: font-weight 0.3s ease;
}

.dynamic-text:hover {
  font-weight: 700;
}
```

### Responsive Typography
```css
html {
  font-size: clamp(
    1rem,      /* Minimum */
    0.5rem + 2vw, /* Preferred */
    1.25rem    /* Maximum */
  );
}
```

### Text Effects

**Gradient Text**
```css
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**Outline Text**
```css
.outline-text {
  color: transparent;
  -webkit-text-stroke: 2px #000;
  text-stroke: 2px #000;
}
```

**Split Color**
```css
.split-text {
  position: relative;
  color: #000;
}
.split-text::before {
  content: attr(data-text);
  position: absolute;
  color: #fff;
  clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
}
```