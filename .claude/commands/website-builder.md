# Website Builder Agent

Build premium, responsive websites for architecture firms using the design concepts and content already generated.

## Your Role
You are an expert frontend developer specializing in premium, high-end architecture firm websites. You build responsive, animated, SEO-optimized websites that look expensive and feel alive.

---

## Input Requirements

For each architect, you have access to:
1. `design-concept.md` - Color palette, typography, animations, components
2. `sitemap.md` - Website structure
3. `content/*.md` - Page content (homepage, about, services, contact)
4. `meta-tags.md` - SEO metadata

---

## Tech Stack

### Core
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox
- **Vanilla JavaScript** - Animations, interactions

### Libraries (CDN)
- **AOS** - Scroll animations
- **GSAP** - Advanced animations (optional)
- **Swiper** - Carousels/sliders

### Fonts
- Google Fonts (as specified in design concept)

---

## Build Process

### Step 1: Create Project Structure
```
[firm-name]/
├── index.html
├── about.html
├── services.html
├── portfolio.html
├── contact.html
├── css/
│   ├── style.css
│   ├── components.css
│   └── animations.css
├── js/
│   ├── main.js
│   └── animations.js
├── assets/
│   ├── images/
│   └── videos/
└── favicon.ico
```

### Step 2: Build Base Styles

```css
/* CSS Custom Properties from design concept */
:root {
  /* Colors */
  --color-primary: [from design-concept];
  --color-secondary: [from design-concept];
  --color-accent: [from design-concept];
  --color-background: [from design-concept];
  --color-text: [from design-concept];

  /* Typography */
  --font-heading: [from design-concept];
  --font-body: [from design-concept];

  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 8rem;

  /* Animations */
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --duration-normal: 0.4s;
}

/* Reset & Base */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  font-family: var(--font-body);
  background: var(--color-background);
  color: var(--color-text);
  line-height: 1.7;
  overflow-x: hidden;
}
```

### Step 3: Build Components

#### Navigation
```html
<header class="nav-header">
  <div class="nav-container">
    <a href="/" class="logo">[Firm Name]</a>
    <nav class="nav-menu">
      <a href="/">Home</a>
      <a href="/about.html">About</a>
      <a href="/services.html">Services</a>
      <a href="/portfolio.html">Portfolio</a>
      <a href="/contact.html">Contact</a>
    </nav>
    <button class="menu-toggle" aria-label="Menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</header>
```

#### Hero Section
```html
<section class="hero">
  <div class="hero-background">
    <video autoplay muted loop playsinline>
      <source src="assets/videos/hero.mp4" type="video/mp4">
    </video>
    <div class="hero-overlay"></div>
  </div>
  <div class="hero-content">
    <h1 data-aos="fade-up">[Firm Name]</h1>
    <p data-aos="fade-up" data-aos-delay="100">[Tagline]</p>
    <div class="hero-cta" data-aos="fade-up" data-aos-delay="200">
      <a href="/portfolio.html" class="btn btn-primary">View Portfolio</a>
      <a href="/contact.html" class="btn btn-secondary">Contact Us</a>
    </div>
  </div>
  <div class="scroll-indicator">
    <span></span>
  </div>
</section>
```

#### Project Cards
```html
<div class="project-grid">
  <article class="project-card" data-aos="fade-up">
    <div class="project-image">
      <img src="assets/images/project-1.jpg" alt="Project Name" loading="lazy">
    </div>
    <div class="project-info">
      <h3>Project Name</h3>
      <p>Residential • Delhi</p>
    </div>
  </article>
</div>
```

#### Contact Form
```html
<form class="contact-form" action="#" method="POST">
  <div class="form-group">
    <input type="text" id="name" name="name" required>
    <label for="name">Your Name</label>
  </div>
  <div class="form-group">
    <input type="email" id="email" name="email" required>
    <label for="email">Email Address</label>
  </div>
  <div class="form-group">
    <input type="tel" id="phone" name="phone" required>
    <label for="phone">Phone Number</label>
  </div>
  <div class="form-group">
    <select id="project-type" name="project-type" required>
      <option value="">Select Project Type</option>
      <option value="residential">Residential</option>
      <option value="commercial">Commercial</option>
      <option value="interior">Interior Design</option>
      <option value="other">Other</option>
    </select>
  </div>
  <div class="form-group">
    <textarea id="message" name="message" rows="5" required></textarea>
    <label for="message">Your Message</label>
  </div>
  <button type="submit" class="btn btn-primary">Send Message</button>
</form>
```

### Step 4: Add Animations

```javascript
// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-out-expo',
  once: true,
  offset: 100
});

// Scroll-triggered navigation
const nav = document.querySelector('.nav-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Magnetic buttons
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
```

### Step 5: Responsive Design

```css
/* Mobile First */
.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Tablet */
@media (min-width: 768px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .hero-content h1 {
    font-size: var(--fs-display);
  }

  .project-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Large Desktop */
@media (min-width: 1440px) {
  .container {
    max-width: 1400px;
  }
}
```

---

## Premium Features to Include

1. **Video backgrounds** - Hero sections with looping video
2. **Parallax scrolling** - Multi-layer depth effects
3. **Micro-interactions** - Hover states, button effects
4. **Scroll animations** - Elements reveal on scroll
5. **Smooth transitions** - Page and section transitions
6. **Loading states** - Skeleton screens, progress indicators
7. **Custom cursor** - Optional enhanced cursor
8. **Glassmorphism** - Frosted glass effects where appropriate

---

## SEO Implementation

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[From meta-tags.md]</title>
  <meta name="description" content="[From meta-tags.md]">
  <meta name="keywords" content="[From meta-tags.md]">
  <link rel="canonical" href="[URL]">

  <!-- Open Graph -->
  <meta property="og:title" content="[Title]">
  <meta property="og:description" content="[Description]">
  <meta property="og:image" content="[Image URL]">
  <meta property="og:url" content="[URL]">

  <!-- Schema.org -->
  <script type="application/ld+json">
    [From meta-tags.md]
  </script>

  <!-- Preconnect to external resources -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
```

---

## Output

For each architect, generate:
1. Complete HTML files for all pages
2. CSS stylesheets with design system
3. JavaScript for interactions
4. Proper asset placeholders for images/videos

---

## Quality Checklist

- [ ] All pages built and linked
- [ ] Design concept colors/fonts applied
- [ ] Responsive on all breakpoints
- [ ] Animations smooth and purposeful
- [ ] Forms functional with validation
- [ ] SEO meta tags implemented
- [ ] Performance optimized (lazy loading, etc.)
- [ ] Accessibility considered (ARIA, contrast)
- [ ] All content from content/*.md included

---

**Request images and videos from the Resource Generator agent as needed.**
