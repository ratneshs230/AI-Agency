/**
 * UI Enhancer Agent
 * Enhances built websites with DaisyUI components and premium styling
 */

const fs = require('fs');
const path = require('path');

// Enhancement configurations by archetype
const archetypeThemes = {
  'Minimalist Luxury': {
    daisyTheme: 'luxury',
    primaryColor: 'primary',
    accentColor: 'accent',
    navStyle: 'glass',
    heroStyle: 'minimal'
  },
  'Bold Statement': {
    daisyTheme: 'dark',
    primaryColor: 'error',
    accentColor: 'warning',
    navStyle: 'solid',
    heroStyle: 'dramatic'
  },
  'Editorial Elegance': {
    daisyTheme: 'emerald',
    primaryColor: 'primary',
    accentColor: 'secondary',
    navStyle: 'bordered',
    heroStyle: 'editorial'
  },
  'Tech Forward': {
    daisyTheme: 'synthwave',
    primaryColor: 'info',
    accentColor: 'success',
    navStyle: 'glass',
    heroStyle: 'tech'
  },
  'Organic Premium': {
    daisyTheme: 'garden',
    primaryColor: 'primary',
    accentColor: 'secondary',
    navStyle: 'soft',
    heroStyle: 'organic'
  },
  'Dark Sophistication': {
    daisyTheme: 'night',
    primaryColor: 'primary',
    accentColor: 'accent',
    navStyle: 'glass',
    heroStyle: 'dark'
  }
};

// DaisyUI CDN links
const daisyUICDN = `
  <link href="https://cdn.jsdelivr.net/npm/daisyui@4.4.19/dist/full.min.css" rel="stylesheet" type="text/css" />
  <script src="https://cdn.tailwindcss.com"></script>
`;

// Enhanced navigation component
function generateEnhancedNav(firmName, theme) {
  return `
  <!-- Enhanced Navigation with DaisyUI -->
  <div class="navbar bg-base-100 fixed top-0 z-50 shadow-lg backdrop-blur-md bg-opacity-90">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="portfolio.html">Portfolio</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <a href="index.html" class="btn btn-ghost text-xl font-bold">${firmName}</a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a href="index.html" class="hover:text-${theme.primaryColor}">Home</a></li>
        <li><a href="about.html" class="hover:text-${theme.primaryColor}">About</a></li>
        <li><a href="services.html" class="hover:text-${theme.primaryColor}">Services</a></li>
        <li><a href="portfolio.html" class="hover:text-${theme.primaryColor}">Portfolio</a></li>
        <li><a href="contact.html" class="hover:text-${theme.primaryColor}">Contact</a></li>
      </ul>
    </div>
    <div class="navbar-end">
      <a href="contact.html" class="btn btn-${theme.primaryColor}">Get Started</a>
    </div>
  </div>
  <div class="h-16"></div> <!-- Spacer for fixed nav -->
`;
}

// Enhanced hero section
function generateEnhancedHero(firmName, tagline, theme) {
  return `
  <!-- Enhanced Hero Section -->
  <div class="hero min-h-[90vh] relative" style="background-image: url('assets/images/hero-bg.jpg');">
    <div class="hero-overlay bg-opacity-60 bg-gradient-to-b from-base-100/80 to-transparent"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-3xl">
        <h1 class="mb-5 text-5xl md:text-7xl font-bold animate-fade-in">${firmName}</h1>
        <p class="mb-8 text-xl md:text-2xl opacity-90 animate-fade-in-delay">${tagline}</p>
        <div class="flex gap-4 justify-center animate-fade-in-delay-2">
          <a href="portfolio.html" class="btn btn-${theme.primaryColor} btn-lg">View Projects</a>
          <a href="contact.html" class="btn btn-outline btn-lg">Contact Us</a>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </div>
`;
}

// Enhanced project cards
function generateProjectCards(theme) {
  return `
  <!-- Enhanced Portfolio Section -->
  <section class="py-20 bg-base-200">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-4">Featured Projects</h2>
      <p class="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
        Explore our portfolio of award-winning architectural designs
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Project Card 1 -->
        <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
          <figure class="relative overflow-hidden">
            <img src="assets/images/project-1.jpg" alt="Project 1" class="h-64 w-full object-cover hover:scale-110 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-base-100 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </figure>
          <div class="card-body">
            <h3 class="card-title">Commercial Excellence</h3>
            <p class="text-base-content/70">Modern commercial space with sustainable design principles</p>
            <div class="card-actions justify-end mt-4">
              <div class="badge badge-outline">Commercial</div>
              <div class="badge badge-${theme.primaryColor}">2024</div>
            </div>
          </div>
        </div>

        <!-- Project Card 2 -->
        <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
          <figure class="relative overflow-hidden">
            <img src="assets/images/project-2.jpg" alt="Project 2" class="h-64 w-full object-cover hover:scale-110 transition-transform duration-500" />
          </figure>
          <div class="card-body">
            <h3 class="card-title">Residential Harmony</h3>
            <p class="text-base-content/70">Luxurious family home blending comfort with elegance</p>
            <div class="card-actions justify-end mt-4">
              <div class="badge badge-outline">Residential</div>
              <div class="badge badge-${theme.primaryColor}">2024</div>
            </div>
          </div>
        </div>

        <!-- Project Card 3 -->
        <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
          <figure class="relative overflow-hidden">
            <img src="assets/images/project-3.jpg" alt="Project 3" class="h-64 w-full object-cover hover:scale-110 transition-transform duration-500" />
          </figure>
          <div class="card-body">
            <h3 class="card-title">Urban Innovation</h3>
            <p class="text-base-content/70">Contemporary urban development with smart integration</p>
            <div class="card-actions justify-end mt-4">
              <div class="badge badge-outline">Mixed Use</div>
              <div class="badge badge-${theme.primaryColor}">2023</div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <a href="portfolio.html" class="btn btn-${theme.primaryColor} btn-lg">View All Projects</a>
      </div>
    </div>
  </section>
`;
}

// Stats section with counter animation
function generateStatsSection(theme) {
  return `
  <!-- Stats Section -->
  <section class="py-16 bg-${theme.primaryColor} text-${theme.primaryColor}-content">
    <div class="container mx-auto px-4">
      <div class="stats stats-vertical lg:stats-horizontal shadow w-full bg-transparent">
        <div class="stat place-items-center">
          <div class="stat-value text-5xl font-bold counter" data-target="150">0</div>
          <div class="stat-title text-${theme.primaryColor}-content/80">Projects Completed</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-value text-5xl font-bold counter" data-target="25">0</div>
          <div class="stat-title text-${theme.primaryColor}-content/80">Years Experience</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-value text-5xl font-bold counter" data-target="40">0</div>
          <div class="stat-title text-${theme.primaryColor}-content/80">Awards Won</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-value text-5xl font-bold counter" data-target="95">0</div>
          <div class="stat-title text-${theme.primaryColor}-content/80">Client Satisfaction %</div>
        </div>
      </div>
    </div>
  </section>
`;
}

// Services section
function generateServicesSection(specs, theme) {
  const serviceIcons = {
    'Interior Architecture': 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    'Commercial Spaces': 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    'Residential Design': 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    'Sustainable Architecture': 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    'default': 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
  };

  const services = specs.slice(0, 4).map(spec => ({
    name: spec,
    icon: serviceIcons[spec] || serviceIcons['default']
  }));

  return `
  <!-- Services Section -->
  <section class="py-20 bg-base-100">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-4">Our Services</h2>
      <p class="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
        Comprehensive architectural solutions tailored to your vision
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        ${services.map(service => `
        <div class="card bg-base-200 hover:bg-${theme.primaryColor} hover:text-${theme.primaryColor}-content transition-all duration-300 group">
          <div class="card-body items-center text-center">
            <div class="w-16 h-16 rounded-full bg-${theme.primaryColor} text-${theme.primaryColor}-content flex items-center justify-center mb-4 group-hover:bg-base-100 group-hover:text-${theme.primaryColor} transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${service.icon}" />
              </svg>
            </div>
            <h3 class="card-title text-lg">${service.name}</h3>
            <p class="text-sm opacity-70 group-hover:opacity-90">Expert ${service.name.toLowerCase()} solutions for your project</p>
          </div>
        </div>
        `).join('')}
      </div>

      <div class="text-center mt-12">
        <a href="services.html" class="btn btn-outline btn-${theme.primaryColor}">All Services</a>
      </div>
    </div>
  </section>
`;
}

// Testimonials carousel
function generateTestimonials(theme) {
  return `
  <!-- Testimonials Section -->
  <section class="py-20 bg-base-200">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>

      <div class="carousel w-full">
        <div id="slide1" class="carousel-item relative w-full justify-center">
          <div class="card bg-base-100 shadow-xl max-w-2xl">
            <div class="card-body text-center">
              <div class="rating rating-lg justify-center mb-4">
                <input type="radio" class="mask mask-star-2 bg-${theme.primaryColor}" checked disabled />
                <input type="radio" class="mask mask-star-2 bg-${theme.primaryColor}" checked disabled />
                <input type="radio" class="mask mask-star-2 bg-${theme.primaryColor}" checked disabled />
                <input type="radio" class="mask mask-star-2 bg-${theme.primaryColor}" checked disabled />
                <input type="radio" class="mask mask-star-2 bg-${theme.primaryColor}" checked disabled />
              </div>
              <p class="text-lg italic mb-4">"Exceptional attention to detail and innovative design solutions. They transformed our vision into reality beyond our expectations."</p>
              <p class="font-bold">- Satisfied Client</p>
            </div>
          </div>
          <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" class="btn btn-circle">❮</a>
            <a href="#slide2" class="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide2" class="carousel-item relative w-full justify-center">
          <div class="card bg-base-100 shadow-xl max-w-2xl">
            <div class="card-body text-center">
              <div class="rating rating-lg justify-center mb-4">
                <input type="radio" class="mask mask-star-2 bg-${theme.primaryColor}" checked disabled />
                <input type="radio" class="mask mask-star-2 bg-${theme.primaryColor}" checked disabled />
                <input type="radio" class="mask mask-star-2 bg-${theme.primaryColor}" checked disabled />
                <input type="radio" class="mask mask-star-2 bg-${theme.primaryColor}" checked disabled />
                <input type="radio" class="mask mask-star-2 bg-${theme.primaryColor}" checked disabled />
              </div>
              <p class="text-lg italic mb-4">"Professional team that delivered on time and within budget. The final result exceeded all our expectations."</p>
              <p class="font-bold">- Happy Homeowner</p>
            </div>
          </div>
          <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" class="btn btn-circle">❮</a>
            <a href="#slide3" class="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide3" class="carousel-item relative w-full justify-center">
          <div class="card bg-base-100 shadow-xl max-w-2xl">
            <div class="card-body text-center">
              <div class="rating rating-lg justify-center mb-4">
                <input type="radio" class="mask mask-star-2 bg-${theme.primaryColor}" checked disabled />
                <input type="radio" class="mask mask-star-2 bg-${theme.primaryColor}" checked disabled />
                <input type="radio" class="mask mask-star-2 bg-${theme.primaryColor}" checked disabled />
                <input type="radio" class="mask mask-star-2 bg-${theme.primaryColor}" checked disabled />
                <input type="radio" class="mask mask-star-2 bg-${theme.primaryColor}" checked disabled />
              </div>
              <p class="text-lg italic mb-4">"Outstanding creativity and technical expertise. They understood our needs perfectly and delivered a masterpiece."</p>
              <p class="font-bold">- Corporate Client</p>
            </div>
          </div>
          <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" class="btn btn-circle">❮</a>
            <a href="#slide1" class="btn btn-circle">❯</a>
          </div>
        </div>
      </div>
    </div>
  </section>
`;
}

// CTA Section
function generateCTA(theme) {
  return `
  <!-- CTA Section -->
  <section class="py-20 bg-cover bg-center bg-fixed relative" style="background-image: url('assets/images/cta-bg.jpg');">
    <div class="absolute inset-0 bg-base-100/80 backdrop-blur-sm"></div>
    <div class="container mx-auto px-4 relative z-10 text-center">
      <h2 class="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
      <p class="text-xl mb-8 max-w-2xl mx-auto text-base-content/80">
        Let's collaborate to bring your architectural vision to life. Contact us today for a free consultation.
      </p>
      <div class="flex gap-4 justify-center">
        <a href="contact.html" class="btn btn-${theme.primaryColor} btn-lg">Schedule Consultation</a>
        <a href="tel:+919999999999" class="btn btn-outline btn-lg">Call Now</a>
      </div>
    </div>
  </section>
`;
}

// Footer
function generateFooter(firmName, theme) {
  return `
  <!-- Footer -->
  <footer class="footer p-10 bg-base-300 text-base-content">
    <aside>
      <p class="font-bold text-2xl">${firmName}</p>
      <p>Crafting architectural excellence since 2000</p>
      <p class="mt-4">© ${new Date().getFullYear()} ${firmName}. All rights reserved.</p>
    </aside>
    <nav>
      <h6 class="footer-title">Services</h6>
      <a class="link link-hover">Residential Design</a>
      <a class="link link-hover">Commercial Projects</a>
      <a class="link link-hover">Interior Design</a>
      <a class="link link-hover">Urban Planning</a>
    </nav>
    <nav>
      <h6 class="footer-title">Company</h6>
      <a href="about.html" class="link link-hover">About us</a>
      <a href="contact.html" class="link link-hover">Contact</a>
      <a href="portfolio.html" class="link link-hover">Portfolio</a>
      <a class="link link-hover">Careers</a>
    </nav>
    <nav>
      <h6 class="footer-title">Connect</h6>
      <div class="grid grid-flow-col gap-4">
        <a class="cursor-pointer hover:text-${theme.primaryColor}">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
          </svg>
        </a>
        <a class="cursor-pointer hover:text-${theme.primaryColor}">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
          </svg>
        </a>
        <a class="cursor-pointer hover:text-${theme.primaryColor}">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
          </svg>
        </a>
      </div>
    </nav>
  </footer>
`;
}

// Enhanced CSS with animations
function generateEnhancedCSS(theme) {
  return `
  <style>
    /* Custom animations */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-fade-in {
      animation: fadeIn 0.8s ease-out forwards;
    }

    .animate-fade-in-delay {
      animation: fadeIn 0.8s ease-out 0.2s forwards;
      opacity: 0;
    }

    .animate-fade-in-delay-2 {
      animation: fadeIn 0.8s ease-out 0.4s forwards;
      opacity: 0;
    }

    /* Smooth scroll */
    html {
      scroll-behavior: smooth;
    }

    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: oklch(var(--b2));
    }

    ::-webkit-scrollbar-thumb {
      background: oklch(var(--p));
      border-radius: 4px;
    }

    /* Page transitions */
    .page-content {
      animation: fadeIn 0.5s ease-out;
    }
  </style>
`;
}

// Counter animation script
function generateCounterScript() {
  return `
  <script>
    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounter = (counter) => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(() => animateCounter(counter), 1);
      } else {
        counter.innerText = target;
      }
    };

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // Smooth reveal for cards
    const cards = document.querySelectorAll('.card');
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.5s ease-out';
      cardObserver.observe(card);
    });
  </script>
`;
}

// Main function to enhance a website
function enhanceWebsite(firmData, websiteDir) {
  const { firm_name, professional_details, portfolio } = firmData;
  const specs = professional_details?.specialization || ['Architecture'];
  const style = portfolio?.signature_style || 'Modern Contemporary';

  // Determine theme based on style
  let themeName = 'Minimalist Luxury';
  if (style.toLowerCase().includes('industrial')) themeName = 'Bold Statement';
  else if (style.toLowerCase().includes('sustainable') || style.toLowerCase().includes('green')) themeName = 'Organic Premium';
  else if (style.toLowerCase().includes('traditional')) themeName = 'Editorial Elegance';
  else if (style.toLowerCase().includes('modern') || style.toLowerCase().includes('contemporary')) themeName = 'Tech Forward';
  else if (style.toLowerCase().includes('minimalist')) themeName = 'Minimalist Luxury';

  const theme = archetypeThemes[themeName];

  console.log(`Enhancing: ${firm_name}`);
  console.log(`  Theme: ${themeName} (${theme.daisyTheme})`);

  // Read existing index.html
  const indexPath = path.join(websiteDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.log(`  ✗ index.html not found`);
    return false;
  }

  // Generate enhanced homepage
  const tagline = `Transforming Spaces with ${style} Design`;

  const enhancedHTML = `<!DOCTYPE html>
<html lang="en" data-theme="${theme.daisyTheme}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${firm_name} - Premium Architecture</title>
  ${daisyUICDN}
  ${generateEnhancedCSS(theme)}
</head>
<body class="page-content">
  ${generateEnhancedNav(firm_name, theme)}

  <main>
    ${generateEnhancedHero(firm_name, tagline, theme)}
    ${generateServicesSection(specs, theme)}
    ${generateProjectCards(theme)}
    ${generateStatsSection(theme)}
    ${generateTestimonials(theme)}
    ${generateCTA(theme)}
  </main>

  ${generateFooter(firm_name, theme)}
  ${generateCounterScript()}
</body>
</html>`;

  // Overwrite the main index.html
  fs.writeFileSync(indexPath, enhancedHTML);
  console.log(`  ✓ Enhanced: index.html`);

  return true;
}

// Process all architects
async function enhanceAll(startIndex = 0, endIndex = null) {
  const dataPath = path.join(__dirname, '..', 'leads', 'architects', 'architects_200_list.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  endIndex = endIndex || data.length;

  console.log(`\n${'='.repeat(60)}`);
  console.log(`UI ENHANCER AGENT`);
  console.log(`${'='.repeat(60)}`);
  console.log(`\nEnhancing websites ${startIndex + 1} to ${endIndex}`);
  console.log(`Total: ${endIndex - startIndex} websites\n`);

  let success = 0;
  let failed = 0;

  for (let i = startIndex; i < endIndex; i++) {
    const arch = data[i];
    const websiteDir = path.join(__dirname, '..', 'leads', 'architects', 'no-site', arch.firm_name, 'website');

    if (!fs.existsSync(websiteDir)) {
      console.log(`[${i + 1}/${endIndex}] Skipping ${arch.firm_name} - no website dir`);
      failed++;
      continue;
    }

    console.log(`\n[${i + 1}/${endIndex}] ${arch.firm_name}`);

    if (enhanceWebsite(arch, websiteDir)) {
      success++;
    } else {
      failed++;
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`ENHANCEMENT COMPLETE`);
  console.log(`${'='.repeat(60)}`);
  console.log(`\n  Success: ${success}`);
  console.log(`  Failed:  ${failed}`);
  console.log(`${'='.repeat(60)}\n`);
}

// Scan and enhance only built websites (checks for index.html existence)
async function scanAndEnhance(watchMode = false) {
  const dataPath = path.join(__dirname, '..', 'leads', 'architects', 'architects_200_list.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  console.log(`\n${'='.repeat(60)}`);
  console.log(`UI ENHANCER AGENT - SCAN MODE`);
  console.log(`${'='.repeat(60)}`);

  const enhanced = new Set();
  let success = 0;
  let pending = 0;

  const scan = () => {
    for (let i = 0; i < data.length; i++) {
      const arch = data[i];
      const websiteDir = path.join(__dirname, '..', 'leads', 'architects', 'no-site', arch.firm_name, 'website');
      const indexPath = path.join(websiteDir, 'index.html');

      // Skip if already enhanced
      if (enhanced.has(arch.firm_name)) continue;

      // Check if website has been built (index.html exists)
      if (fs.existsSync(indexPath)) {
        // Check if it's already enhanced (contains DaisyUI)
        const content = fs.readFileSync(indexPath, 'utf8');
        if (content.includes('daisyui')) {
          enhanced.add(arch.firm_name);
          continue;
        }

        console.log(`\n[${enhanced.size + 1}/200] Found built website: ${arch.firm_name}`);

        if (enhanceWebsite(arch, websiteDir)) {
          enhanced.add(arch.firm_name);
          success++;
        }
      } else {
        pending++;
      }
    }

    return { success, pending: data.length - enhanced.size };
  };

  if (watchMode) {
    console.log(`\nWatching for new websites to enhance...`);
    console.log(`Press Ctrl+C to stop\n`);

    // Initial scan
    let result = scan();
    console.log(`\nInitial scan: ${enhanced.size} enhanced, ${result.pending} pending`);

    // Watch for new websites every 10 seconds
    const interval = setInterval(() => {
      const beforeCount = enhanced.size;
      result = scan();
      const newCount = enhanced.size - beforeCount;

      if (newCount > 0) {
        console.log(`\n--- Enhanced ${newCount} new website(s) | Total: ${enhanced.size}/200 ---`);
      }

      if (enhanced.size >= data.length) {
        console.log(`\n${'='.repeat(60)}`);
        console.log(`ALL WEBSITES ENHANCED!`);
        console.log(`${'='.repeat(60)}\n`);
        clearInterval(interval);
      }
    }, 10000);
  } else {
    // Single scan
    scan();

    console.log(`\n${'='.repeat(60)}`);
    console.log(`SCAN COMPLETE`);
    console.log(`${'='.repeat(60)}`);
    console.log(`\n  Enhanced: ${enhanced.size}`);
    console.log(`  Pending:  ${data.length - enhanced.size}`);
    console.log(`${'='.repeat(60)}\n`);
  }
}

// Export for module use
module.exports = { enhanceWebsite, enhanceAll, scanAndEnhance };

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.includes('--scan') || args.includes('-s')) {
    // Scan mode - enhance only built websites
    scanAndEnhance(false);
  } else if (args.includes('--watch') || args.includes('-w')) {
    // Watch mode - continuously scan and enhance
    scanAndEnhance(true);
  } else {
    // Range mode
    const start = parseInt(args[0]) || 0;
    const end = args[1] ? parseInt(args[1]) : null;
    enhanceAll(start, end).catch(console.error);
  }
}
