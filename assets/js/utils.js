/**
 * RENOVA — Utility Functions
 * Shared helpers used across all modules
 */

'use strict';

// ── DOM Helpers ──────────────────────────────
export const $ = (sel, ctx = document) => ctx.querySelector(sel);
export const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

export const on = (el, ev, fn, opts = {}) => {
  if (!el) return;
  el.addEventListener(ev, fn, opts);
};

export const off = (el, ev, fn) => {
  if (!el) return;
  el.removeEventListener(ev, fn);
};

// ── Class Helpers ─────────────────────────────
export const addClass    = (el, ...cls) => el?.classList.add(...cls);
export const removeClass = (el, ...cls) => el?.classList.remove(...cls);
export const toggleClass = (el, cls)    => el?.classList.toggle(cls);
export const hasClass    = (el, cls)    => el?.classList.contains(cls);

// ── Timing ───────────────────────────────────
export const debounce = (fn, wait = 200) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
};

export const throttle = (fn, limit = 100) => {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= limit) {
      last = now;
      fn(...args);
    }
  };
};

// ── Number Formatting ─────────────────────────
export const formatNumber = (n) => {
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'k';
  return String(n);
};

export const lerp = (a, b, t) => a + (b - a) * t;
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

// ── Storage ───────────────────────────────────
export const store = {
  get: (key, fallback = null) => {
    try {
      const val = localStorage.getItem(key);
      return val !== null ? JSON.parse(val) : fallback;
    } catch { return fallback; }
  },
  set: (key, val) => {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  },
  remove: (key) => {
    try { localStorage.removeItem(key); } catch {}
  }
};

// ── URL & Routing ─────────────────────────────
export const getPageName = () => {
  const path = window.location.pathname;
  const parts = path.split('/').filter(Boolean);
  const last = parts[parts.length - 1] || 'index.html';
  return last.replace('.html', '');
};

// ── Active Nav Link ───────────────────────────
export const setActiveNavLink = () => {
  const page = getPageName();
  $$('.nav-link, .nav-overlay__link, .footer__link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const hrefPage = href.split('/').pop().replace('.html', '') || 'index';
    if (
      hrefPage === page ||
      (page === '' && hrefPage === 'index') ||
      (page === 'index' && hrefPage === 'index')
    ) {
      addClass(link, 'active');
    }
  });
};

// ── Smooth Scroll ─────────────────────────────
export const smoothScrollTo = (target, offset = 88) => {
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
};

// ── Image Lazy Load Observer ─────────────────
export const initLazyImages = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.onload = () => addClass(img, 'loaded');
        delete img.dataset.src;
      }
      observer.unobserve(img);
    });
  }, { rootMargin: '200px' });

  $$('img[loading="lazy"]').forEach(img => observer.observe(img));
};

// ── Toast Notification ────────────────────────
let toastContainer;

export const toast = (message, type = 'info', duration = 4000) => {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const icons = {
    success: '✓',
    error:   '✕',
    info:    '●',
  };

  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span>${icons[type] || '●'}</span><span>${message}</span>`;
  toastContainer.appendChild(el);

  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    el.style.transition = '0.3s ease';
    setTimeout(() => el.remove(), 300);
  }, duration);
};

// ── Cursor Follower ───────────────────────────
export const initCursor = () => {
  if (window.matchMedia('(hover: none)').matches) return;

  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.className  = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);

  let mx = 0, my = 0, rx = 0, ry = 0;

  window.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = `${mx}px`;
    dot.style.top  = `${my}px`;
  });

  const animateRing = () => {
    rx = lerp(rx, mx, 0.12);
    ry = lerp(ry, my, 0.12);
    ring.style.left = `${rx}px`;
    ring.style.top  = `${ry}px`;
    requestAnimationFrame(animateRing);
  };
  animateRing();

  $$('a, button, [data-cursor="expand"]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.width  = '0';
      dot.style.height = '0';
      ring.style.width  = '52px';
      ring.style.height = '52px';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.width  = '';
      dot.style.height = '';
      ring.style.width  = '';
      ring.style.height = '';
    });
  });
};

// ── Email Validation ─────────────────────────
export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

// ── Phone Validation ─────────────────────────
export const isValidPhone = (phone) =>
  /^[+\d\s\-()]{7,15}$/.test(phone.trim());
