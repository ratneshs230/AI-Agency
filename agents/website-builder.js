/**
 * Website Builder Agent
 * Builds premium responsive websites using generated design concepts and content
 */

const fs = require('fs');
const path = require('path');

// Build website for an architect
function buildWebsite(firmData, inputDir, outputDir) {
  const { firm_name, location, professional_details, portfolio, team, contact, awards, registration } = firmData;

  // Extract data
  const specs = professional_details?.specialization || ['Architecture'];
  const philosophy = professional_details?.design_philosophy || 'Excellence in design';
  const experience = professional_details?.years_experience || 10;
  const founder = professional_details?.founder || 'Principal Architect';
  const style = portfolio?.signature_style || 'Contemporary';
  const totalProjects = portfolio?.total_projects || 50;
  const teamSize = team?.total_size || 5;

  const phone = contact?.phone?.[0] || '+91-11-XXXXXXXX';
  const mobile = contact?.mobile?.[0] || '+91-98XXXXXXXX';
  const email = contact?.email || `info@${firm_name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;

  // Read design concept for colors and typography
  let designConcept = '';
  try {
    designConcept = fs.readFileSync(path.join(inputDir, 'design-concept.md'), 'utf8');
  } catch (e) {
    console.log(`  Warning: No design concept found`);
  }

  // Extract colors from design concept
  const colorMatch = designConcept.match(/--color-primary:\s*(#[A-Fa-f0-9]+)/);
  const primary = colorMatch ? colorMatch[1] : '#1C1C1C';

  const secondaryMatch = designConcept.match(/--color-secondary:\s*(#[A-Fa-f0-9]+)/);
  const secondary = secondaryMatch ? secondaryMatch[1] : '#F5F5F0';

  const accentMatch = designConcept.match(/--color-accent:\s*(#[A-Fa-f0-9]+)/);
  const accent = accentMatch ? accentMatch[1] : '#C9A961';

  const bgMatch = designConcept.match(/--color-background:\s*(#[A-Fa-f0-9]+)/);
  const background = bgMatch ? bgMatch[1] : '#FAFAF8';

  const textMatch = designConcept.match(/--color-text:\s*(#[A-Fa-f0-9]+)/);
  const textColor = textMatch ? textMatch[1] : '#4A4A4A';

  // Extract fonts
  const headingMatch = designConcept.match(/--font-heading:\s*'([^']+)'/);
  const fontHeading = headingMatch ? headingMatch[1] : 'Playfair Display';

  const bodyMatch = designConcept.match(/--font-body:\s*'([^']+)'/);
  const fontBody = bodyMatch ? bodyMatch[1] : 'Inter';

  // Create output directories
  const cssDir = path.join(outputDir, 'css');
  const jsDir = path.join(outputDir, 'js');
  const assetsDir = path.join(outputDir, 'assets');

  fs.mkdirSync(cssDir, { recursive: true });
  fs.mkdirSync(jsDir, { recursive: true });
  fs.mkdirSync(path.join(assetsDir, 'images'), { recursive: true });
  fs.mkdirSync(path.join(assetsDir, 'videos'), { recursive: true });

  // Generate CSS
  const css = `/* ${firm_name} - Premium Website Styles */

/* CSS Custom Properties */
:root {
  /* Colors */
  --color-primary: ${primary};
  --color-secondary: ${secondary};
  --color-accent: ${accent};
  --color-background: ${background};
  --color-text: ${textColor};
  --color-white: #FFFFFF;
  --color-black: #000000;

  /* Typography */
  --font-heading: '${fontHeading}', serif;
  --font-body: '${fontBody}', sans-serif;

  /* Type Scale */
  --fs-display: clamp(3rem, 10vw, 6rem);
  --fs-h1: clamp(2.5rem, 5vw, 4rem);
  --fs-h2: clamp(2rem, 4vw, 3rem);
  --fs-h3: clamp(1.5rem, 3vw, 2rem);
  --fs-body: clamp(1rem, 2vw, 1.125rem);
  --fs-small: 0.875rem;

  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 8rem;

  /* Animation */
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-quick: 200ms;
  --duration-normal: 400ms;
  --duration-slow: 600ms;
}

/* Reset */
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

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--color-primary);
}

h1 { font-size: var(--fs-h1); }
h2 { font-size: var(--fs-h2); }
h3 { font-size: var(--fs-h3); }

p {
  margin-bottom: 1rem;
}

/* Layout */
.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-sm);
}

.section {
  padding: var(--space-xl) 0;
}

/* Navigation */
.nav-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem 0;
  z-index: 1000;
  transition: all 0.4s var(--ease-out-expo);
}

.nav-header.scrolled {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  padding: 1rem 0;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

.nav-menu {
  display: none;
  gap: 2rem;
}

.nav-menu a {
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-menu a:hover {
  color: var(--color-accent);
}

.menu-toggle {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.menu-toggle span {
  width: 25px;
  height: 2px;
  background: var(--color-primary);
  transition: all 0.3s ease;
}

@media (min-width: 768px) {
  .nav-menu {
    display: flex;
  }
  .menu-toggle {
    display: none;
  }
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.hero-background img,
.hero-background video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  color: var(--color-white);
  padding: 0 var(--space-md);
}

.hero-title {
  font-size: var(--fs-display);
  color: var(--color-white);
  margin-bottom: 1rem;
}

.hero-tagline {
  font-size: var(--fs-h3);
  opacity: 0.9;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 50px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 25px;
}

.scroll-indicator span {
  display: block;
  width: 3px;
  height: 10px;
  background: var(--color-white);
  margin: 10px auto;
  border-radius: 3px;
  animation: scroll 2s infinite;
}

@keyframes scroll {
  0% { opacity: 0; transform: translateY(0); }
  40% { opacity: 1; }
  80% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 0; }
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 1rem 2rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s var(--ease-out-expo);
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background: transparent;
  color: var(--color-white);
  border: 2px solid var(--color-white);
}

.btn-secondary:hover {
  background: var(--color-white);
  color: var(--color-primary);
}

/* Project Grid */
.project-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .project-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.project-card {
  background: var(--color-white);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.4s var(--ease-out-expo);
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.project-image {
  overflow: hidden;
  height: 250px;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease-out-expo);
}

.project-card:hover .project-image img {
  transform: scale(1.1);
}

.project-info {
  padding: 1.5rem;
}

.project-info h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.project-info p {
  font-size: 0.875rem;
  color: var(--color-text);
  opacity: 0.7;
  margin: 0;
}

/* About Section */
.about-section {
  display: grid;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 768px) {
  .about-section {
    grid-template-columns: 1fr 1fr;
  }
}

.about-image img {
  border-radius: 12px;
}

/* Services */
.services-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.service-card {
  padding: 2rem;
  background: var(--color-white);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.service-card:hover {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.service-card h3 {
  margin-bottom: 1rem;
}

/* CTA Section */
.cta-section {
  background: var(--color-primary);
  color: var(--color-white);
  text-align: center;
  padding: var(--space-xl) 0;
}

.cta-section h2 {
  color: var(--color-white);
  margin-bottom: 1rem;
}

.cta-section p {
  opacity: 0.9;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Contact Form */
.contact-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  position: relative;
  margin-bottom: 2rem;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 1rem;
  font-family: var(--font-body);
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: var(--color-white);
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.form-group label {
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 1rem;
  color: #999;
  pointer-events: none;
  transition: all 0.3s ease;
}

.form-group input:focus ~ label,
.form-group input:valid ~ label,
.form-group textarea:focus ~ label,
.form-group textarea:valid ~ label {
  top: -0.5rem;
  left: 0.5rem;
  font-size: 0.75rem;
  background: var(--color-background);
  padding: 0 0.5rem;
  color: var(--color-primary);
}

/* Footer */
.footer {
  background: var(--color-primary);
  color: var(--color-white);
  padding: var(--space-lg) 0 var(--space-md);
}

.footer-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.footer h4 {
  color: var(--color-white);
  margin-bottom: 1rem;
  font-size: 1rem;
}

.footer ul {
  list-style: none;
}

.footer li {
  margin-bottom: 0.5rem;
}

.footer a {
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.footer a:hover {
  opacity: 1;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.875rem;
  opacity: 0.7;
}

/* Animations */
[data-aos] {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s var(--ease-out-expo);
}

[data-aos].aos-animate {
  opacity: 1;
  transform: translateY(0);
}

/* Utility Classes */
.text-center { text-align: center; }
.mb-1 { margin-bottom: var(--space-sm); }
.mb-2 { margin-bottom: var(--space-md); }
.mb-3 { margin-bottom: var(--space-lg); }
`;

  // Generate JavaScript
  const js = `// ${firm_name} - Premium Website Scripts

document.addEventListener('DOMContentLoaded', function() {

  // Initialize AOS-like scroll animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
  });

  // Navigation scroll effect
  const nav = document.querySelector('.nav-header');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  // Magnetic button effect
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
      btn.style.transform = \`translate(\${x}px, \${y}px)\`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Form validation
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Basic validation
      const name = this.querySelector('#name').value;
      const email = this.querySelector('#email').value;
      const phone = this.querySelector('#phone').value;
      const message = this.querySelector('#message').value;

      if (name && email && phone && message) {
        // Show success message
        alert('Thank you for your message! We will contact you soon.');
        this.reset();
      } else {
        alert('Please fill in all required fields.');
      }
    });
  }

  // Lazy load images
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));

  // Video playback on scroll
  const heroVideo = document.querySelector('.hero-background video');
  if (heroVideo) {
    heroVideo.play().catch(() => {
      // Autoplay blocked, show poster image instead
      console.log('Video autoplay blocked');
    });
  }

  console.log('${firm_name} website loaded successfully');
});
`;

  // Generate HTML pages
  const htmlTemplate = (title, content, pageClass = '') => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | ${firm_name}</title>
  <meta name="description" content="${firm_name} - ${specs.join(', ')} in ${location}. ${experience} years of architectural excellence.">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${fontHeading.replace(/ /g, '+')}:wght@400;700;900&family=${fontBody.replace(/ /g, '+')}:wght@300;400;500;600&display=swap" rel="stylesheet">

  <!-- Styles -->
  <link rel="stylesheet" href="css/style.css">
</head>
<body class="${pageClass}">
  <!-- Navigation -->
  <header class="nav-header">
    <div class="nav-container">
      <a href="index.html" class="logo">${firm_name}</a>
      <nav class="nav-menu">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="services.html">Services</a>
        <a href="portfolio.html">Portfolio</a>
        <a href="contact.html">Contact</a>
      </nav>
      <button class="menu-toggle" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>

  ${content}

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <h4>${firm_name}</h4>
          <p>${philosophy}</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="about.html">About Us</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="portfolio.html">Portfolio</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>${location}, Delhi NCR</li>
            <li>${phone}</li>
            <li>${email}</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} ${firm_name}. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>`;

  // Homepage
  const homepageContent = `
  <!-- Hero -->
  <section class="hero">
    <div class="hero-background">
      <video autoplay muted loop playsinline poster="assets/images/hero-bg.jpg">
        <source src="assets/videos/hero-video.mp4" type="video/mp4">
      </video>
      <div class="hero-overlay"></div>
    </div>
    <div class="hero-content">
      <h1 class="hero-title" data-aos>${firm_name}</h1>
      <p class="hero-tagline" data-aos>Designing Spaces That Inspire</p>
      <div class="hero-cta" data-aos>
        <a href="portfolio.html" class="btn btn-primary">View Portfolio</a>
        <a href="contact.html" class="btn btn-secondary">Contact Us</a>
      </div>
    </div>
    <div class="scroll-indicator">
      <span></span>
    </div>
  </section>

  <!-- About Preview -->
  <section class="section">
    <div class="container">
      <div class="about-section">
        <div class="about-content" data-aos>
          <h2>About ${firm_name}</h2>
          <p>With ${experience} years of architectural excellence in ${location}, we transform visions into iconic structures. Specializing in ${specs.slice(0, 3).join(', ')}, we create spaces that inspire, function flawlessly, and stand the test of time.</p>
          <a href="about.html" class="btn btn-primary">Learn More</a>
        </div>
        <div class="about-image" data-aos>
          <img src="assets/images/about-hero.jpg" alt="About ${firm_name}">
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Projects -->
  <section class="section" style="background: var(--color-secondary);">
    <div class="container">
      <h2 class="text-center mb-3" data-aos>Featured Projects</h2>
      <div class="project-grid">
        <article class="project-card" data-aos>
          <div class="project-image">
            <img src="assets/images/project-1.jpg" alt="Project 1">
          </div>
          <div class="project-info">
            <h3>Modern Residence</h3>
            <p>Residential • ${location}</p>
          </div>
        </article>
        <article class="project-card" data-aos>
          <div class="project-image">
            <img src="assets/images/project-2.jpg" alt="Project 2">
          </div>
          <div class="project-info">
            <h3>Corporate Office</h3>
            <p>Commercial • Delhi</p>
          </div>
        </article>
        <article class="project-card" data-aos>
          <div class="project-image">
            <img src="assets/images/project-3.jpg" alt="Project 3">
          </div>
          <div class="project-info">
            <h3>Luxury Villa</h3>
            <p>Residential • Gurgaon</p>
          </div>
        </article>
      </div>
      <div class="text-center mb-2" style="margin-top: 2rem;">
        <a href="portfolio.html" class="btn btn-primary" data-aos>View All Projects</a>
      </div>
    </div>
  </section>

  <!-- Services Preview -->
  <section class="section">
    <div class="container">
      <h2 class="text-center mb-3" data-aos>Our Services</h2>
      <div class="services-grid">
        ${specs.slice(0, 4).map(service => `
        <div class="service-card" data-aos>
          <h3>${service}</h3>
          <p>Professional ${service.toLowerCase()} services delivered with expertise, innovation, and attention to detail.</p>
        </div>
        `).join('')}
      </div>
      <div class="text-center" style="margin-top: 2rem;">
        <a href="services.html" class="btn btn-primary" data-aos>All Services</a>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-section">
    <div class="container">
      <h2 data-aos>Ready to Start Your Project?</h2>
      <p data-aos>Let's discuss your vision and bring it to life with exceptional architecture.</p>
      <a href="contact.html" class="btn btn-secondary" data-aos>Get in Touch</a>
    </div>
  </section>`;

  // About page
  const aboutContent = `
  <section class="section" style="padding-top: 120px;">
    <div class="container">
      <h1 class="text-center mb-3" data-aos>About ${firm_name}</h1>
      <div class="about-section">
        <div data-aos>
          <h2>Our Story</h2>
          <p>${firm_name} was founded with a singular vision: to create architecture that transcends the ordinary and enriches lives. Based in ${location}, we have spent ${experience} years transforming this vision into reality through thoughtful design and meticulous execution.</p>
          <p>${philosophy}</p>
          <h3 style="margin-top: 2rem;">Our Credentials</h3>
          <ul>
            <li>${totalProjects}+ Completed Projects</li>
            <li>${teamSize} Professional Team Members</li>
            <li>${experience} Years of Experience</li>
          </ul>
        </div>
        <div data-aos>
          <img src="assets/images/about-hero.jpg" alt="About ${firm_name}" style="border-radius: 12px;">
        </div>
      </div>
    </div>
  </section>`;

  // Services page
  const servicesContent = `
  <section class="section" style="padding-top: 120px;">
    <div class="container">
      <h1 class="text-center mb-3" data-aos>Our Services</h1>
      <p class="text-center mb-3" data-aos style="max-width: 600px; margin-left: auto; margin-right: auto;">
        Comprehensive architectural services tailored to meet your unique requirements.
      </p>
      <div class="services-grid">
        ${specs.map(service => `
        <div class="service-card" data-aos>
          <h3>${service}</h3>
          <p>Professional ${service.toLowerCase()} services delivered with expertise, innovation, and attention to detail that defines ${firm_name}.</p>
          <h4 style="margin-top: 1rem; font-size: 1rem;">What We Deliver</h4>
          <ul style="margin-left: 1rem; margin-top: 0.5rem;">
            <li>Comprehensive design documentation</li>
            <li>3D visualizations and renderings</li>
            <li>Project coordination and supervision</li>
          </ul>
        </div>
        `).join('')}
      </div>
    </div>
  </section>
  <section class="cta-section">
    <div class="container">
      <h2 data-aos>Start Your Project Today</h2>
      <p data-aos>Contact us to discuss your requirements and get a free consultation.</p>
      <a href="contact.html" class="btn btn-secondary" data-aos>Contact Us</a>
    </div>
  </section>`;

  // Portfolio page
  const portfolioContent = `
  <section class="section" style="padding-top: 120px;">
    <div class="container">
      <h1 class="text-center mb-3" data-aos>Our Portfolio</h1>
      <p class="text-center mb-3" data-aos style="max-width: 600px; margin-left: auto; margin-right: auto;">
        Explore our collection of ${totalProjects}+ projects spanning residential, commercial, and institutional architecture.
      </p>
      <div class="project-grid">
        <article class="project-card" data-aos>
          <div class="project-image">
            <img src="assets/images/project-1.jpg" alt="Project 1">
          </div>
          <div class="project-info">
            <h3>Modern Family Residence</h3>
            <p>Residential • ${location}</p>
          </div>
        </article>
        <article class="project-card" data-aos>
          <div class="project-image">
            <img src="assets/images/project-2.jpg" alt="Project 2">
          </div>
          <div class="project-info">
            <h3>Corporate Headquarters</h3>
            <p>Commercial • Delhi</p>
          </div>
        </article>
        <article class="project-card" data-aos>
          <div class="project-image">
            <img src="assets/images/project-3.jpg" alt="Project 3">
          </div>
          <div class="project-info">
            <h3>Boutique Office</h3>
            <p>Commercial • Gurgaon</p>
          </div>
        </article>
        <article class="project-card" data-aos>
          <div class="project-image">
            <img src="assets/images/project-4.jpg" alt="Project 4">
          </div>
          <div class="project-info">
            <h3>Luxury Apartment</h3>
            <p>Residential • Noida</p>
          </div>
        </article>
      </div>
    </div>
  </section>`;

  // Contact page
  const contactContent = `
  <section class="section" style="padding-top: 120px;">
    <div class="container">
      <h1 class="text-center mb-3" data-aos>Contact Us</h1>
      <p class="text-center mb-3" data-aos style="max-width: 600px; margin-left: auto; margin-right: auto;">
        We'd love to hear about your project. Get in touch with us today.
      </p>
      <div class="about-section">
        <div data-aos>
          <h3>Get in Touch</h3>
          <p><strong>Address:</strong><br>${location}, Delhi NCR, India</p>
          <p><strong>Phone:</strong><br>${phone}<br>${mobile}</p>
          <p><strong>Email:</strong><br>${email}</p>
          <p><strong>Hours:</strong><br>Mon-Fri: 10AM - 6PM<br>Sat: 10AM - 2PM</p>
        </div>
        <div data-aos>
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
        </div>
      </div>
    </div>
  </section>`;

  // Write all files
  fs.writeFileSync(path.join(cssDir, 'style.css'), css);
  fs.writeFileSync(path.join(jsDir, 'main.js'), js);
  fs.writeFileSync(path.join(outputDir, 'index.html'), htmlTemplate('Home', homepageContent, 'page-home'));
  fs.writeFileSync(path.join(outputDir, 'about.html'), htmlTemplate('About', aboutContent, 'page-about'));
  fs.writeFileSync(path.join(outputDir, 'services.html'), htmlTemplate('Services', servicesContent, 'page-services'));
  fs.writeFileSync(path.join(outputDir, 'portfolio.html'), htmlTemplate('Portfolio', portfolioContent, 'page-portfolio'));
  fs.writeFileSync(path.join(outputDir, 'contact.html'), htmlTemplate('Contact', contactContent, 'page-contact'));

  console.log(`  ✓ Built website for: ${firm_name}`);
  return true;
}

// Main execution
function main() {
  const dataPath = path.join(__dirname, '..', 'leads', 'architects', 'architects_200_list.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  console.log(`\nWebsite Builder Agent`);
  console.log(`====================`);
  console.log(`Processing ${data.length} architects\n`);

  const startIndex = parseInt(process.argv[2]) || 0;
  const endIndex = parseInt(process.argv[3]) || data.length;

  let built = 0;
  let failed = 0;

  for (let i = startIndex; i < endIndex; i++) {
    const arch = data[i];
    const inputDir = path.join(__dirname, '..', 'leads', 'architects', 'no-site', arch.firm_name);
    const outputDir = path.join(__dirname, '..', 'leads', 'architects', 'no-site', arch.firm_name, 'website');

    if (!fs.existsSync(inputDir)) {
      console.log(`  ✗ Skipping ${arch.firm_name} - directory not found`);
      failed++;
      continue;
    }

    try {
      buildWebsite(arch, inputDir, outputDir);
      built++;
    } catch (error) {
      console.error(`  ✗ Error building ${arch.firm_name}: ${error.message}`);
      failed++;
    }
  }

  console.log(`\n${'='.repeat(40)}`);
  console.log(`Website building complete!`);
  console.log(`Built: ${built} | Failed: ${failed}`);
  console.log(`${'='.repeat(40)}\n`);
}

// Export for use as module
module.exports = { buildWebsite };

// Run if called directly
if (require.main === module) {
  main();
}
