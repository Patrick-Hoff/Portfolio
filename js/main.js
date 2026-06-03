/* ============================================================
   Portfolio — Patrick Hoffmann Campos
   main.js — Interactions & Animations
   ============================================================ */

'use strict';

/* ===== HEADER SCROLL ===== */
(function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ===== MOBILE MENU ===== */
(function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  const open  = () => { toggle.classList.add('open'); menu.classList.add('open'); toggle.setAttribute('aria-expanded', 'true'); };
  const close = () => { toggle.classList.remove('open'); menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); };

  toggle.addEventListener('click', () => {
    menu.classList.contains('open') ? close() : open();
  });

  menu.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', close));

  document.addEventListener('click', (e) => {
    if (menu.classList.contains('open') && !menu.contains(e.target) && !toggle.contains(e.target)) {
      close();
    }
  });
})();

/* ===== ACTIVE NAV HIGHLIGHT ===== */
(function initActiveNav() {
  const links    = document.querySelectorAll('.nav-link');
  const sections = [...document.querySelectorAll('section[id]')];
  const OFFSET   = 100; // px below header to count as "entered"

  function setActive(id) {
    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  }

  function onScroll() {
    const scrollY = window.scrollY + OFFSET;

    // Walk sections from bottom to top — first one whose top is above scrollY wins
    let current = sections[0].id;
    for (const section of sections) {
      if (section.offsetTop <= scrollY) {
        current = section.id;
      }
    }
    setActive(current);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();

/* ===== SCROLL REVEAL ===== */
(function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -48px 0px',
  });

  els.forEach(el => observer.observe(el));
})();

/* ===== TYPEWRITER ===== */
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const titles = [
    'Desenvolvedor Full Stack Jr',
    'Front-end Developer',
    'Back-end Developer',
    'React Developer',
    'Node.js Developer',
  ];

  let tIdx  = 0;
  let cIdx  = 0;
  let del   = false;

  function tick() {
    const word = titles[tIdx];
    el.textContent = del
      ? word.slice(0, cIdx - 1)
      : word.slice(0, cIdx + 1);

    del ? cIdx-- : cIdx++;

    let delay = del ? 55 : 95;

    if (!del && cIdx === word.length) {
      delay = 2200;
      del = true;
    } else if (del && cIdx === 0) {
      del  = false;
      tIdx = (tIdx + 1) % titles.length;
      delay = 380;
    }

    setTimeout(tick, delay);
  }

  tick();
})();

/* ===== STATS COUNTER ===== */
(function initStatsCounter() {
  const statsRow = document.querySelector('.hero-stats');
  if (!statsRow) return;

  let ran = false;

  const runCounters = () => {
    if (ran) return;
    ran = true;

    statsRow.querySelectorAll('.stat-number').forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      if (isNaN(target)) return;

      const duration = 1200;
      const step     = 16;
      const steps    = duration / step;
      const inc      = target / steps;
      let current    = 0;

      const timer = setInterval(() => {
        current += inc;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current);
      }, step);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      runCounters();
      observer.disconnect();
    }
  }, { threshold: 0.5 });

  observer.observe(statsRow);
})();

/* ===== PROJECT CARD TILT ===== */
(function initCardTilt() {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) return;

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-5px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform 0.4s ease, box-shadow 0.3s ease, border-color 0.3s ease';
    });
  });
})();

/* ===== SKILL ITEM SPRING HOVER ===== */
(function initSkillHover() {
  document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transition = 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.transition = 'all 0.3s ease';
    });
  });
})();

/* ===== SMOOTH ANCHOR SCROLL ===== */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();

/* ===== TIMELINE ENTRANCE ===== */
(function initTimelineEntrance() {
  const items = document.querySelectorAll('.timeline-item');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelector('.timeline-dot').style.transform = 'scale(1.15)';
        setTimeout(() => {
          entry.target.querySelector('.timeline-dot').style.transform = '';
        }, 300);
      }
    });
  }, { threshold: 0.5 });

  items.forEach(item => observer.observe(item));
})();

/* ===== CONTACT FORM FEEDBACK ===== */
(function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', function () {
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    btn.innerHTML = '<span>Enviando…</span><i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;
  });
})();

/* ===== PARALLAX ORB (subtle) ===== */
(function initParallax() {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) return;

  const orbs = document.querySelectorAll('.hero-orb');
  if (!orbs.length) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      orbs.forEach((orb, i) => {
        const speed = 0.06 + i * 0.025;
        orb.style.transform = `translateY(${y * speed}px)`;
      });
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
})();
