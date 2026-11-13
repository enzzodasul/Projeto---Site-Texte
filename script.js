/* ═══════════════════════════════════════
   ENZZO DA SUL — OFFICIAL HUB v2.0
   Interactive Script
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Mobile Menu ───
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  // ─── Navbar shrink on scroll ───
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.style.padding = '0';
      navbar.style.borderBottomColor = 'rgba(212,168,83,.15)';
    } else {
      navbar.style.padding = '';
      navbar.style.borderBottomColor = '';
    }
  });

  // ─── Smooth scroll for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = navbar ? navbar.offsetHeight + 10 : 0;
        const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // ─── Intersection Observer for fade-in animations ───
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add animation styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1);
    }
    .animate-in.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // Observe all animatable elements
  document.querySelectorAll(
    '.glass, .section-tag, .section-title, .sobre-text, .sobre-img, .num-item, .social-tile, .clip-card'
  ).forEach((el, i) => {
    el.classList.add('animate-in');
    el.style.transitionDelay = `${Math.min(i * 0.06, 0.4)}s`;
    observer.observe(el);
  });

  // ─── Number counter animation ───
  const numVals = document.querySelectorAll('.num-val');
  const numObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.dataset.target;
        if (target) {
          let current = 0;
          const end = parseInt(target);
          const step = Math.ceil(end / 80);
          const timer = setInterval(() => {
            current += step;
            if (current >= end) {
              current = end;
              clearInterval(timer);
            }
            el.textContent = current.toLocaleString('pt-BR') + '+';
          }, 20);
        }
        numObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  numVals.forEach(el => numObserver.observe(el));

  // ─── Track row hover sound feedback (subtle) ───
  let audioCtx = null;
  document.querySelectorAll('.track-row, .clip-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    });
  });

  console.log('⚡ Enzzo da Sul Official Hub v2.0 loaded');
});
