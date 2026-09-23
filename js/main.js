/**
 * Sasmitha Nimesh - Portfolio JavaScript Application
 * Clean showcase experience focusing on projects, engineering capabilities,
 * 3D perspective animations, video reel, custom cursor, and
 * interactive Artificial Neural Network (ANN) & Mathematical Theory Canvas Background.
 */

// Sasmitha's Real Projects Data
const PROJECTS_DATA = {
  'student-performance': {
    title: 'Student Performance Analysis',
    tag: 'AI & Data Science',
    year: '2025',
    client: 'Academic Research & Data Lab',
    services: 'Exploratory Data Analysis, R Language, Statistical Modeling, Data Visualization',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
    description: 'A research-heavy data analysis project identifying how digital resource engagement and study patterns directly impact academic achievement. Built using R, ggplot2, and statistical hypothesis testing.',
    challenge: 'Isolating confounding demographic variables from actual digital learning engagement metrics across multivariate student datasets.',
    solution: 'Designed an end-to-end data cleaning and exploratory analytics pipeline in R Studio, uncovering key engagement thresholds that correlate with a 24% increase in academic success.',
    github: 'https://github.com/SasmithaNimesh/EDA-Student-Performance-Analysis-R',
    linkedin: 'https://www.linkedin.com/posts/sasmitha-nimesh-rathnayaka_dataanalysis-rprogramming-statistics-activity-7428807290536984576-rElv'
  },
  'smart-shopping-cart': {
    title: 'Smart Shopping Buddy',
    tag: 'Robotics & IoT',
    year: '2025',
    client: 'Retail Innovation Initiative',
    services: 'ESP32 Microcontroller, RFID Sensors, Weight Calibration, Firebase Cloud, Telegram Bot API',
    image: 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?auto=format&fit=crop&w=1600&q=80',
    description: 'An autonomous IoT-based smart shopping cart powered by ESP32 that automates physical item scanning via RFID, cross-verifies weight in real-time to prevent theft, and streamlines checkout through Firebase cloud integration and automated Telegram digital receipts.',
    challenge: 'Preventing checkout fraud and sensor latency while maintaining sub-second scanning response in real-time supermarket conditions.',
    solution: 'Integrated high-precision load cell calibration with dual-verification RFID scanning, transmitting live encrypted telemetry directly to Firebase and pinging instant itemized Telegram invoices.',
    github: 'https://github.com/SasmithaNimesh/Smart-Shop-Buddy-IoT-Smart-Shopping-Cart',
    linkedin: 'https://www.linkedin.com/posts/sasmitha-nimesh-rathnayaka_robotics-iot-esp32-ugcPost-7452297234404253696-VsCR'
  },
  'agrovision': {
    title: 'AgroVision Smart Farming',
    tag: 'Software & Smart Agriculture',
    year: '2024',
    client: 'Agritech Innovation Project',
    services: 'Java OOP, Swing GUI Dashboard, Automated Sensor Emulation, Irrigation Scheduling',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=80',
    description: 'A comprehensive Java-based desktop application designed for automated irrigation management and precision crop health monitoring. Built with robust Object-Oriented principles and an interactive management dashboard.',
    challenge: 'Structuring modular multi-zone sensor polling and rule-based automated valve triggers without memory overhead.',
    solution: 'Developed a decoupled Java architecture using Observer and Factory design patterns, enabling real-time soil moisture monitoring and smart water conservation schedules.',
    github: 'https://github.com/SasmithaNimesh/AgroVision-Farm-Management-System-Java',
    linkedin: 'https://www.linkedin.com/posts/sasmitha-nimesh-rathnayaka_java-oop-softwaredevelopment-activity-7428805794210631680-2TAQ'
  },
  'connect-lanka': {
    title: 'Connect Lanka Tourism',
    tag: 'Full-Stack Web',
    year: '2024',
    client: 'Sri Lanka Tourism Tech',
    services: 'Full-Stack Web Dev, JavaScript (ES6+), MongoDB, MySQL, UI/UX Design, REST APIs',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1600&q=80',
    description: 'A responsive digital platform connecting international travelers with certified local guides and authentic cultural experiences across Sri Lanka. Features interactive itinerary planning and verified booking workflows.',
    challenge: 'Designing an accessible, mobile-first interface capable of handling dynamic booking queries and bilingual location catalogs.',
    solution: 'Engineered a modern web platform with responsive CSS architecture, optimized asset loading, and flexible NoSQL/SQL data schemas.',
    github: 'https://github.com/SasmithaNimesh/ConnectLanka-Tourism-Website',
    liveUrl: 'https://sasmithanimesh.github.io/ConnectLanka-Tourism-Website/'
  }
};

/**
 * Interactive Artificial Neural Network (ANN) & Mathematical Theory Background
 * High-performance 60fps canvas engine simulating neural nodes, synaptic pulses,
 * backpropagation vectors, and floating mathematical manifolds in electric black & blue.
 */
class ANNMathBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.nodes = [];
    this.pulses = [];
    this.mathSymbols = [];
    this.mouse = { x: -1000, y: -1000, radius: 180 };

    this.mathTheories = [
      '∇L = ∂L/∂W',
      'σ(z) = 1/(1+e⁻ᶻ)',
      'y = f(W·x + b)',
      'J(θ) = -1/m ∑ y log(ŷ)',
      'f(x) = max(0, x)',
      'W := W - η·∇L',
      'eⁱᵠ = cos φ + i sin φ',
      '∂L/∂a^{[l]}',
      'det(A - λI) = 0',
      'h_{t} = tanh(W·x + U·h_{t-1})',
      'E = ½∑(y - ŷ)²',
      'Softmax: eᶻⁱ / ∑eᶻʲ'
    ];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });

    this.spawnNodes();
    this.spawnMathSymbols();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.scale(this.dpr, this.dpr);
  }

  spawnNodes() {
    this.nodes = [];
    const nodeCount = Math.floor((this.width * this.height) / 16000); // responsive density
    const count = Math.min(Math.max(nodeCount, 45), 90);

    for (let i = 0; i < count; i++) {
      this.nodes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.2 + 1.2,
        layer: Math.floor(Math.random() * 4), // 0 to 3 depth
        activation: Math.random(), // pulsing activation
        pulseSpeed: 0.015 + Math.random() * 0.02
      });
    }
  }

  spawnMathSymbols() {
    this.mathSymbols = [];
    const count = Math.min(Math.floor(this.width / 130), 12);

    for (let i = 0; i < count; i++) {
      this.mathSymbols.push({
        text: this.mathTheories[i % this.mathTheories.length],
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.15 - Math.random() * 0.2, // gentle drift upwards
        opacity: 0.08 + Math.random() * 0.12,
        size: 11 + Math.random() * 4
      });
    }
  }

  addSynapticPulse(fromNode, toNode) {
    if (this.pulses.length > 35) return;
    this.pulses.push({
      fromNode: fromNode,
      toNode: toNode,
      progress: 0,
      speed: 0.016 + Math.random() * 0.02
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Subtle Mathematical Grid Lattice & Curves (Vector manifold field)
    this.ctx.save();
    this.ctx.strokeStyle = 'rgba(56, 189, 248, 0.025)';
    this.ctx.lineWidth = 1;
    const gridSize = 120;
    for (let x = 0; x < this.width; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }
    for (let y = 0; y < this.height; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }
    this.ctx.restore();

    // 2. Render Drifting Complex Math Theories & Equations
    this.ctx.save();
    this.ctx.font = '500 12px "Space Grotesk", monospace';
    this.mathSymbols.forEach((sym) => {
      sym.x += sym.vx;
      sym.y += sym.vy;

      if (sym.y < -30) sym.y = this.height + 20;
      if (sym.x < -100) sym.x = this.width + 50;
      if (sym.x > this.width + 100) sym.x = -50;

      this.ctx.fillStyle = `rgba(56, 189, 248, ${sym.opacity})`;
      this.ctx.fillText(sym.text, sym.x, sym.y);
    });
    this.ctx.restore();

    // 3. Update & Draw Neural Synapses (Interconnections)
    const maxDist = 155;
    for (let i = 0; i < this.nodes.length; i++) {
      const a = this.nodes[i];

      // Move nodes
      a.x += a.vx;
      a.y += a.vy;

      // Resilient boundary clamping & bouncing
      if (a.x < 0) { a.x = 0; a.vx = Math.abs(a.vx); }
      else if (a.x > this.width) { a.x = this.width; a.vx = -Math.abs(a.vx); }
      if (a.y < 0) { a.y = 0; a.vy = Math.abs(a.vy); }
      else if (a.y > this.height) { a.y = this.height; a.vy = -Math.abs(a.vy); }

      // Mouse interactivity (neural excitation field)
      const dxMouse = a.x - this.mouse.x;
      const dyMouse = a.y - this.mouse.y;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
      if (distMouse < this.mouse.radius) {
        const force = (1 - distMouse / this.mouse.radius) * 0.6;
        a.x += (dxMouse / distMouse) * force * 3;
        a.y += (dyMouse / distMouse) * force * 3;
      }

      // Synaptic links
      for (let j = i + 1; j < this.nodes.length; j++) {
        const b = this.nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.28;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
          this.ctx.lineWidth = a.layer === b.layer ? 1.2 : 0.7;
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.stroke();

          // Occasionally trigger electrical synaptic pulse
          if (Math.random() < 0.0007) {
            this.addSynapticPulse(a, b);
          }
        }
      }

      // Draw Neural Node Junction
      a.activation += a.pulseSpeed;
      const glow = Math.sin(a.activation) * 0.5 + 0.5;

      // Radial node glow
      this.ctx.beginPath();
      this.ctx.arc(a.x, a.y, a.radius * 2.5, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(56, 189, 248, ${0.08 + glow * 0.15})`;
      this.ctx.fill();

      // Node core
      this.ctx.beginPath();
      this.ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = glow > 0.7 ? '#64ffda' : '#38bdf8';
      this.ctx.shadowColor = '#38bdf8';
      this.ctx.shadowBlur = 6;
      this.ctx.fill();
      this.ctx.shadowBlur = 0; // reset
    }

    // 4. Update & Draw Synaptic Electrical Pulses (Spikes with comet trail)
    for (let k = this.pulses.length - 1; k >= 0; k--) {
      const p = this.pulses[k];
      p.progress += p.speed;

      if (p.progress >= 1) {
        this.pulses.splice(k, 1);
        continue;
      }

      const currX = p.fromNode.x + (p.toNode.x - p.fromNode.x) * p.progress;
      const currY = p.fromNode.y + (p.toNode.y - p.fromNode.y) * p.progress;

      // Draw electrical comet tail
      const tailProgress = Math.max(0, p.progress - 0.22);
      const tailX = p.fromNode.x + (p.toNode.x - p.fromNode.x) * tailProgress;
      const tailY = p.fromNode.y + (p.toNode.y - p.fromNode.y) * tailProgress;

      this.ctx.beginPath();
      this.ctx.moveTo(tailX, tailY);
      this.ctx.lineTo(currX, currY);
      this.ctx.strokeStyle = 'rgba(100, 255, 218, 0.75)';
      this.ctx.lineWidth = 1.8;
      this.ctx.stroke();

      // Glowing pulse head
      this.ctx.beginPath();
      this.ctx.arc(currX, currY, 2.4, 0, Math.PI * 2);
      this.ctx.fillStyle = '#64ffda';
      this.ctx.shadowColor = '#64ffda';
      this.ctx.shadowBlur = 10;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }
  }

  animate() {
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

class PortfolioApp {
  constructor() {
    this.cursorX = window.innerWidth / 2;
    this.cursorY = window.innerHeight / 2;
    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;
    this.init();
  }

  init() {
    this.initANNBackground();
    this.initCursor();
    this.initHeaderScroll();
    this.initScrollAnimations();
    this.initHeroSlideshow();
    this.initVideoLightbox();
    this.initCaseStudies();
    this.initMobileMenu();
    this.initThoughts();
  }

  initANNBackground() {
    this.annBg = new ANNMathBackground('ann-math-canvas');
  }

  // Smooth Custom Cursor
  initCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const dot = document.querySelector('.custom-cursor-dot');
    if (!cursor || !dot) return;

    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      dot.style.left = `${this.mouseX}px`;
      dot.style.top = `${this.mouseY}px`;
      cursor.style.opacity = '1';
      dot.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      dot.style.opacity = '0';
      if (this.annBg) {
        this.annBg.mouse.x = -1000;
        this.annBg.mouse.y = -1000;
      }
    });

    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      dot.style.opacity = '1';
    });

    const render = () => {
      this.cursorX += (this.mouseX - this.cursorX) * 0.15;
      this.cursorY += (this.mouseY - this.cursorY) * 0.15;
      cursor.style.left = `${this.cursorX}px`;
      cursor.style.top = `${this.cursorY}px`;
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    const hoverables = document.querySelectorAll('a, button, .project-card, .thought-row');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        if (el.classList.contains('project-card')) {
          cursor.classList.add('view-project');
        } else {
          cursor.classList.add('hovered');
        }
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered', 'view-project');
      });
    });
  }

  // Header Background on Scroll
  initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 3D Perspective Roll-In & Scroll Reveal
  initScrollAnimations() {
    const targets = document.querySelectorAll('.perspective-wrap');
    
    // Immediate fallback check for elements already in viewport on page load
    targets.forEach((target) => {
      const rect = target.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        setTimeout(() => target.classList.remove('animate-init'), 80);
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('animate-init');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    targets.forEach((target) => observer.observe(target));
  }

  // Hero Profile Showcase Slideshow (5-second cycle, smooth fade/slide, hover pause, interactive dots)
  initHeroSlideshow() {
    const container = document.getElementById('hero-slideshow');
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-slide-dot');
    if (!container || slides.length === 0) return;

    let currentIndex = 0;
    let timer = null;
    const intervalTime = 5000; // 5 seconds per slide
    let startTime = Date.now();
    let remainingTime = intervalTime;
    let isPaused = false;

    const animateProgress = () => {
      dots.forEach((dot, idx) => {
        const prog = dot.querySelector('.dot-progress');
        if (!prog) return;
        if (idx === currentIndex) {
          prog.style.transition = 'none';
          prog.style.width = '0%';
          // Force layout reflow so the transition starts smoothly from 0%
          void prog.offsetWidth;
          prog.style.transition = `width ${remainingTime}ms linear`;
          prog.style.width = '100%';
        } else {
          prog.style.transition = 'none';
          prog.style.width = '0%';
        }
      });
    };

    const goToSlide = (index) => {
      if (index < 0 || index >= slides.length) return;
      slides[currentIndex].classList.remove('active');
      dots[currentIndex].classList.remove('active');

      currentIndex = index;

      slides[currentIndex].classList.add('active');
      dots[currentIndex].classList.add('active');

      remainingTime = intervalTime;
      startTime = Date.now();
      animateProgress();

      clearTimeout(timer);
      if (!isPaused) {
        timer = setTimeout(() => {
          goToSlide((currentIndex + 1) % slides.length);
        }, remainingTime);
      }
    };

    const pauseSlideshow = () => {
      if (isPaused) return;
      isPaused = true;
      clearTimeout(timer);
      container.classList.add('paused');
      const elapsed = Date.now() - startTime;
      remainingTime = Math.max(400, remainingTime - elapsed);

      // Freeze progress bar width at current progress
      const activeProgress = dots[currentIndex]?.querySelector('.dot-progress');
      if (activeProgress) {
        const computedWidth = window.getComputedStyle(activeProgress).width;
        activeProgress.style.transition = 'none';
        activeProgress.style.width = computedWidth;
      }
    };

    const resumeSlideshow = () => {
      if (!isPaused) return;
      isPaused = false;
      container.classList.remove('paused');
      startTime = Date.now();

      const activeProgress = dots[currentIndex]?.querySelector('.dot-progress');
      if (activeProgress) {
        void activeProgress.offsetWidth;
        activeProgress.style.transition = `width ${remainingTime}ms linear`;
        activeProgress.style.width = '100%';
      }

      timer = setTimeout(() => {
        goToSlide((currentIndex + 1) % slides.length);
      }, remainingTime);
    };

    // Pause on hover, resume on mouse leave
    container.addEventListener('mouseenter', pauseSlideshow);
    container.addEventListener('mouseleave', resumeSlideshow);

    // Click interactive dots
    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        const targetIdx = parseInt(dot.getAttribute('data-slide-to'), 10);
        if (!isNaN(targetIdx) && targetIdx !== currentIndex) {
          goToSlide(targetIdx);
        }
      });
    });

    // Start with Photo 1
    goToSlide(0);
  }

  // Video Lightbox Modal
  initVideoLightbox() {
    const triggers = document.querySelectorAll('[data-open-reel]');
    const lightbox = document.querySelector('.video-lightbox');
    const closeBtn = document.querySelector('.video-lightbox-close');
    const video = document.querySelector('.video-lightbox video');

    if (!lightbox) return;

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        lightbox.classList.add('active');
        if (video) {
          video.currentTime = 0;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Autoplay policy fallback: video remains ready for user click
            });
          }
        }
      });
    });

    const closeReel = () => {
      lightbox.classList.remove('active');
      if (video) video.pause();
    };

    if (closeBtn) closeBtn.addEventListener('click', closeReel);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeReel();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) closeReel();
    });
  }

  // Case Study Quick-View Modals
  initCaseStudies() {
    const cards = document.querySelectorAll('.project-card[data-project-id]');
    const modal = document.querySelector('.casestudy-modal');
    const closeBtn = document.querySelector('.casestudy-close-btn');

    if (!modal) return;

    const openModal = (pid) => {
      const data = PROJECTS_DATA[pid];
      if (!data) return;

      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-tag').textContent = data.tag;
      document.getElementById('modal-client').textContent = data.client;
      document.getElementById('modal-year').textContent = data.year;
      document.getElementById('modal-services').textContent = data.services;
      document.getElementById('modal-desc').textContent = data.description;
      document.getElementById('modal-challenge').textContent = data.challenge;
      document.getElementById('modal-solution').textContent = data.solution;
      document.getElementById('modal-img').src = data.image;

      // Dynamic links in modal
      const linksContainer = document.getElementById('modal-links');
      if (linksContainer) {
        let linksHtml = '';
        if (data.github) {
          linksHtml += `<a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn-case-link"><img src="assets/anchor-icon.svg" width="16" height="16" alt="GitHub" /> GitHub Repository &rarr;</a>`;
        }
        if (data.linkedin) {
          linksHtml += `<a href="${data.linkedin}" target="_blank" rel="noopener noreferrer" class="btn-case-link">LinkedIn Post &rarr;</a>`;
        }
        if (data.liveUrl) {
          linksHtml += `<a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-case-link" style="background:#38bdf8; color:#03060d;">Live Web Demo &rarr;</a>`;
        }
        linksContainer.innerHTML = linksHtml;
      }

      modal.classList.add('active');
      if (closeBtn) closeBtn.focus();
    };

    cards.forEach((card) => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const pid = card.getAttribute('data-project-id');
        openModal(pid);
      });

      // Keyboard support for project cards
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const pid = card.getAttribute('data-project-id');
          openModal(pid);
        }
      });
    });

    const closeModal = () => modal.classList.remove('active');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
  }

  // Thoughts / Insights Section Click Handler
  initThoughts() {
    const rows = document.querySelectorAll('.thought-row');
    rows.forEach((row) => {
      row.setAttribute('tabindex', '0');
      row.addEventListener('click', () => {
        const link = row.getAttribute('data-link');
        if (link) {
          window.open(link, '_blank', 'noopener,noreferrer');
        }
      });
      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          row.click();
        }
      });
    });
  }

  // Mobile Hamburger Menu
  initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav-links');
    if (!btn || !nav) return;

    btn.setAttribute('aria-expanded', 'false');

    const toggleNav = () => {
      const isOpen = nav.classList.toggle('mobile-open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleNav();
    });

    nav.querySelectorAll('.nav-link, .nav-resume-btn').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('mobile-open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('mobile-open') && !nav.contains(e.target) && !btn.contains(e.target)) {
        nav.classList.remove('mobile-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('mobile-open')) {
        nav.classList.remove('mobile-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.portfolioApp = new PortfolioApp();
  if (window.portfolioApp) {
    window.portfolioApp.initThoughts();
  }
});
