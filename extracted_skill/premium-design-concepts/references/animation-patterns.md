# Animation Patterns

## Core Animation Principles

### Timing Functions
```css
:root {
  /* Smooth and natural */
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  
  /* Snappy and responsive */
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* Gentle and elegant */
  --ease-in-out-quad: cubic-bezier(0.455, 0.03, 0.515, 0.955);
  
  /* Quick and sharp */
  --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
}
```

### Duration Guidelines
```css
:root {
  --duration-instant: 100ms;  /* Hover states */
  --duration-quick: 200ms;    /* Small transitions */
  --duration-normal: 300ms;   /* Standard animations */
  --duration-slow: 500ms;     /* Complex animations */
  --duration-slower: 800ms;   /* Page transitions */
}
```

## Entrance Animations

### Fade Up
```css
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-up {
  animation: fadeUp 0.6s var(--ease-out-expo) forwards;
}
```

### Scale In
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.scale-in {
  animation: scaleIn 0.5s var(--ease-out-back) forwards;
}
```

### Slide In
```css
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-in-left {
  animation: slideInLeft 0.6s var(--ease-out-quart) forwards;
}
```

### Stagger Children
```css
.stagger-container > * {
  opacity: 0;
  animation: fadeUp 0.6s var(--ease-out-expo) forwards;
}

.stagger-container > *:nth-child(1) { animation-delay: 0ms; }
.stagger-container > *:nth-child(2) { animation-delay: 100ms; }
.stagger-container > *:nth-child(3) { animation-delay: 200ms; }
.stagger-container > *:nth-child(4) { animation-delay: 300ms; }
```

## Scroll Animations

### Parallax Scrolling
```javascript
const parallaxElements = document.querySelectorAll('.parallax');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  
  parallaxElements.forEach(element => {
    const speed = element.dataset.speed || 0.5;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
});
```

### Scroll Progress Indicator
```html
<div class="progress-bar"></div>
```

```css
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transform-origin: left;
  transform: scaleX(0);
  transition: transform 0.2s ease;
  z-index: 1000;
}
```

```javascript
window.addEventListener('scroll', () => {
  const winScroll = window.pageYOffset;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (winScroll / height);
  
  document.querySelector('.progress-bar').style.transform = `scaleX(${scrolled})`;
});
```

### Reveal on Scroll
```javascript
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
});

revealElements.forEach(element => {
  revealObserver.observe(element);
});
```

## Hover Animations

### 3D Card Flip
```css
.card-flip {
  perspective: 1000px;
}

.card-flip-inner {
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card-flip:hover .card-flip-inner {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}
```

### Magnetic Hover
```javascript
const magnetic = document.querySelectorAll('.magnetic');

magnetic.forEach(element => {
  element.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = element.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / width * 20;
    const y = (e.clientY - top - height / 2) / height * 20;
    
    element.style.transform = `translate(${x}px, ${y}px)`;
  });
  
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'translate(0, 0)';
  });
});
```

### Underline Grow
```css
.link-underline {
  position: relative;
  text-decoration: none;
}

.link-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: width 0.3s ease;
}

.link-underline:hover::after {
  width: 100%;
}
```

## Text Animations

### Typewriter Effect
```javascript
const typeWriter = (element, text, speed = 100) => {
  let i = 0;
  const type = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };
  type();
};
```

### Split Text Animation
```javascript
const splitText = (element) => {
  const text = element.textContent;
  element.innerHTML = '';
  
  [...text].forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.animationDelay = `${i * 50}ms`;
    span.classList.add('char-animate');
    element.appendChild(span);
  });
};
```

```css
.char-animate {
  display: inline-block;
  opacity: 0;
  animation: charFadeIn 0.5s ease forwards;
}

@keyframes charFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
  from {
    opacity: 0;
    transform: translateY(20px);
  }
}
```

### Gradient Text Animation
```css
.gradient-animate {
  background: linear-gradient(
    270deg,
    #667eea,
    #764ba2,
    #f093fb,
    #f5576c
  );
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

## Loading Animations

### Pulse Loader
```css
.pulse-loader {
  display: inline-block;
  width: 40px;
  height: 40px;
  background-color: #667eea;
  border-radius: 100%;
  animation: pulse 1.0s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
```

### Morphing Shape
```css
.morph {
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  animation: morph 8s ease-in-out infinite;
}

@keyframes morph {
  0%, 100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
  50% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
  }
}
```

## Advanced Animations

### Liquid Distortion (SVG)
```html
<svg>
  <filter id="liquid">
    <feTurbulence baseFrequency="0.01" numOctaves="3" result="noise" seed="1"/>
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="10"/>
  </filter>
</svg>
```

```css
.liquid-text {
  filter: url(#liquid);
  animation: liquid 10s infinite;
}

@keyframes liquid {
  0%, 100% { filter: url(#liquid) blur(0px); }
  50% { filter: url(#liquid) blur(1px); }
}
```

### Particle System
```javascript
class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.radius = Math.random() * 2 + 1;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    
    if (this.x < 0 || this.x > this.canvas.width) this.vx = -this.vx;
    if (this.y < 0 || this.y > this.canvas.height) this.vy = -this.vy;
  }
  
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(102, 126, 234, 0.5)';
    this.ctx.fill();
  }
}
```

## Performance Tips

### Use CSS Transform
```css
/* Good - Uses GPU acceleration */
.element {
  transform: translateX(100px);
}

/* Avoid - Triggers layout recalculation */
.element {
  left: 100px;
}
```

### Will-Change Property
```css
.will-animate {
  will-change: transform, opacity;
}

/* Remove after animation */
.animation-done {
  will-change: auto;
}
```

### RequestAnimationFrame
```javascript
let ticking = false;

function updateAnimation() {
  // Animation logic here
  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateAnimation);
    ticking = true;
  }
}

window.addEventListener('scroll', requestTick);
```