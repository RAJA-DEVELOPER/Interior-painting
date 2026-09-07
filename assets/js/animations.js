/**
 * RENOVA — Scroll Reveal Animations
 * IntersectionObserver based reveal system
 */

'use strict';

// ──────────────────────────────────────────────────────────
// SCROLL REVEAL
// ──────────────────────────────────────────────────────────
const initScrollReveal = () => {
  const revealEls = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale'
  );

  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
};

// ──────────────────────────────────────────────────────────
// PARALLAX
// ──────────────────────────────────────────────────────────
const initParallax = () => {
  const items = document.querySelectorAll('[data-parallax]');
  if (!items.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const animate = () => {
    const scrollY = window.scrollY;
    items.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      const rect  = el.getBoundingClientRect();
      const mid   = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${mid * speed}px)`;
    });
  };

  window.addEventListener('scroll', animate, { passive: true });
  animate();
};

// ──────────────────────────────────────────────────────────
// HERO WORD-BY-WORD REVEAL
// ──────────────────────────────────────────────────────────
const initHeroText = () => {
  const heroTitles = document.querySelectorAll('[data-hero-text]');
  heroTitles.forEach(el => {
    const words = el.textContent.split(' ');
    el.innerHTML = words
      .map((w, i) =>
        `<span class="hero-word" style="display:inline-block;overflow:hidden;">
           <span class="hero-word-inner" style="transition-delay:${i * 80 + 400}ms">${w}&nbsp;</span>
         </span>`
      )
      .join('');

    // Trigger after brief delay
    requestAnimationFrame(() => {
      setTimeout(() => {
        el.querySelectorAll('.hero-word-inner').forEach(inner => {
          inner.classList.add('revealed');
        });
      }, 100);
    });
  });
};

// ──────────────────────────────────────────────────────────
// STICKY SECTION HEADER HIGHLIGHT
// ──────────────────────────────────────────────────────────
const initSectionObserver = () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.legal-toc-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(sec => observer.observe(sec));
};

// ──────────────────────────────────────────────────────────
// INIT
// ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initParallax();
  initHeroText();
  initSectionObserver();
});
