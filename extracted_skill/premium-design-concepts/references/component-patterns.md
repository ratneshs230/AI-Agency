# Component Patterns

## Hero Sections

### Full Viewport Hero with Scroll Indicator
```html
<section class="hero-full">
  <div class="hero-content">
    <h1 class="hero-title" data-aos="fade-up">Premium Experience</h1>
    <p class="hero-subtitle" data-aos="fade-up" data-aos-delay="100">Redefining digital excellence</p>
    <button class="cta-magnetic" data-aos="fade-up" data-aos-delay="200">Explore</button>
  </div>
  <div class="scroll-indicator">
    <span></span>
  </div>
</section>
```

```css
.hero-full {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  width: 30px;
  height: 50px;
  border: 2px solid #fff;
  border-radius: 25px;
}

.scroll-indicator span {
  display: block;
  width: 3px;
  height: 10px;
  background: #fff;
  margin: 10px auto;
  animation: scroll 2s infinite;
}

@keyframes scroll {
  0% { opacity: 0; transform: translateY(0); }
  40% { opacity: 1; }
  80% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 0; }
}
```

### Split Screen Hero
```html
<section class="hero-split">
  <div class="hero-left">
    <div class="content-wrapper">
      <h1>Design That Speaks</h1>
      <p>Creating experiences that matter</p>
      <button class="cta-button">Get Started</button>
    </div>
  </div>
  <div class="hero-right">
    <img src="hero-image.jpg" alt="Hero" />
    <div class="image-overlay"></div>
  </div>
</section>
```

## Navigation

### Transparent to Solid Navigation
```javascript
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav-header');
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});
```

```css
.nav-header {
  position: fixed;
  width: 100%;
  padding: 2rem 4rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0);
}

.nav-header.scrolled {
  padding: 1rem 4rem;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}
```

### Hamburger to Fullscreen Menu
```html
<button class="menu-toggle">
  <span></span>
  <span></span>
  <span></span>
</button>

<nav class="fullscreen-menu">
  <ul>
    <li><a href="#" data-text="Home">Home</a></li>
    <li><a href="#" data-text="About">About</a></li>
    <li><a href="#" data-text="Work">Work</a></li>
    <li><a href="#" data-text="Contact">Contact</a></li>
  </ul>
</nav>
```

## Cards

### Hover Lift Card
```css
.card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}
```

### Glass Morphism Card
```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}
```

### Perspective Tilt Card
```javascript
const card = document.querySelector('.tilt-card');
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = (y - centerY) / 10;
  const rotateY = (centerX - x) / 10;
  
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});
```

## Buttons

### Magnetic Button
```javascript
document.querySelectorAll('.magnetic').forEach(button => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translate(0, 0)';
  });
});
```

### Liquid Button
```css
.liquid-button {
  position: relative;
  padding: 1.5rem 3rem;
  border: none;
  background: #000;
  color: #fff;
  overflow: hidden;
  cursor: pointer;
}

.liquid-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: #fff;
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.liquid-button:hover::before {
  width: 300px;
  height: 300px;
}

.liquid-button:hover {
  color: #000;
}
```

## Forms

### Floating Label Input
```css
.form-group {
  position: relative;
  margin-bottom: 2rem;
}

.form-input {
  width: 100%;
  padding: 1rem 0;
  font-size: 1rem;
  border: none;
  border-bottom: 2px solid #ddd;
  outline: none;
  background: transparent;
}

.form-label {
  position: absolute;
  top: 1rem;
  left: 0;
  font-size: 1rem;
  color: #999;
  transition: all 0.3s;
  pointer-events: none;
}

.form-input:focus ~ .form-label,
.form-input:valid ~ .form-label {
  top: -0.5rem;
  font-size: 0.75rem;
  color: #000;
}
```

## Content Sections

### Parallax Image Section
```javascript
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.parallax-bg');
  parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
});
```

### Reveal on Scroll
```javascript
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});
```

```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

## Loading States

### Skeleton Screen
```css
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Progressive Image Loading
```javascript
const loadImage = (img) => {
  const src = img.dataset.src;
  if (!src) return;
  
  const tempImg = new Image();
  tempImg.src = src;
  tempImg.onload = () => {
    img.src = src;
    img.classList.add('loaded');
  };
};

const imgObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadImage(entry.target);
      imgObserver.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imgObserver.observe(img);
});
```