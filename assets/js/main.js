/**
 * RENOVA — main.js
 * Core orchestrator: theme, nav, preloader, back-to-top, scroll, misc.
 * All page-specific modules (slider, before-after, filter, form, animations)
 * are loaded independently per page.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. PRELOADER ─────────────────────────────────────────────────────────
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.classList.add('hidden');
      // Remove from DOM after transition
      preloader.addEventListener('transitionend', () => preloader.remove(), { once: true });
    });
    // Failsafe: force-hide after 3s
    setTimeout(() => preloader && preloader.classList.add('hidden'), 3000);
  }

  // ── 2. PAGE TRANSITION ───────────────────────────────────────────────────
  const pageTransition = document.querySelector('.page-transition');
  if (pageTransition) {
    // Animate in on page load
    requestAnimationFrame(() => pageTransition.classList.add('out'));

    // Animate out on internal link click
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') ||
          href.startsWith('tel:') || href.startsWith('http') ||
          link.hasAttribute('target')) return;

      link.addEventListener('click', e => {
        e.preventDefault();
        pageTransition.classList.remove('out');
        setTimeout(() => { window.location.href = href; }, 380);
      });
    });
  }

  // ── 3. THEME TOGGLE ──────────────────────────────────────────────────────
  const root      = document.documentElement;
  const themeKey  = 'rn-theme';
  const saved     = localStorage.getItem(themeKey) || 'light';

  root.setAttribute('data-theme', saved);
  updateThemeIcons(saved);

  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next    = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem(themeKey, next);
      updateThemeIcons(next);
    });
  });

  function updateThemeIcons(theme) {
    document.querySelectorAll('.icon-sun').forEach(el => {
      el.style.display = theme === 'dark'  ? 'none'  : 'block';
    });
    document.querySelectorAll('.icon-moon').forEach(el => {
      el.style.display = theme === 'light' ? 'none'  : 'block';
    });
  }

  // ── 4. NAVBAR SCROLL BEHAVIOUR ───────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const SCROLL_THRESHOLD = 60;

    const onScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    // Some pages start with navbar always-scrolled (dark header)
    if (!navbar.classList.contains('scrolled')) {
      onScroll(); // set initial state
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  }

  // ── 5. MOBILE NAV OVERLAY ────────────────────────────────────────────────
  const hamburger  = document.getElementById('hamburger');
  const navOverlay = document.getElementById('navOverlay');
  const navClose   = document.getElementById('navClose');

  if (hamburger && navOverlay) {
    const openNav = () => {
      navOverlay.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      navClose && navClose.focus();
    };
    const closeNav = () => {
      navOverlay.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      hamburger.focus();
    };

    hamburger.addEventListener('click', openNav);
    navClose  && navClose.addEventListener('click', closeNav);

    // Close on overlay background click
    navOverlay.addEventListener('click', e => {
      if (e.target === navOverlay) closeNav();
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && navOverlay.classList.contains('open')) closeNav();
    });

    // Close on overlay link click
    navOverlay.querySelectorAll('.nav-overlay__link').forEach(link => {
      link.addEventListener('click', closeNav);
    });
  }

  // ── 6. BACK TO TOP ───────────────────────────────────────────────────────
  const btt = document.getElementById('backToTop');
  if (btt) {
    const toggleBtt = () => {
      btt.classList.toggle('visible', window.scrollY > 400);
    };
    window.addEventListener('scroll', toggleBtt, { passive: true });
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── 7. SMOOTH SCROLL FOR ANCHOR LINKS ────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const navH   = parseInt(getComputedStyle(root).getPropertyValue('--nav-h'), 10) || 80;
      const top    = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ── 8. FAQ ACCORDION ─────────────────────────────────────────────────────
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item     = btn.closest('.faq-item');
      const answer   = item.querySelector('.faq-answer');
      const inner    = answer.querySelector('.faq-answer-inner');
      const isOpen   = btn.getAttribute('aria-expanded') === 'true';
      const icon     = btn.querySelector('.faq-icon svg');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other === item) return;
        const otherBtn    = other.querySelector('.faq-question');
        const otherAnswer = other.querySelector('.faq-answer');
        const otherInner  = otherAnswer.querySelector('.faq-answer-inner');
        const otherIcon   = otherBtn.querySelector('.faq-icon svg');

        otherBtn.setAttribute('aria-expanded', 'false');
        otherAnswer.style.maxHeight = '0';
        if (otherIcon) otherIcon.style.transform = '';
      });

      if (isOpen) {
        btn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0';
        if (icon) icon.style.transform = '';
      } else {
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = inner.scrollHeight + 'px';
        if (icon) icon.style.transform = 'rotate(45deg)';
      }
    });
  });

  // ── 9. STICKY TOC ACTIVE STATE ───────────────────────────────────────────
  const tocLinks = document.querySelectorAll('.legal-toc-link, .toc-link');
  if (tocLinks.length > 0) {
    const navH     = parseInt(getComputedStyle(root).getPropertyValue('--nav-h'), 10) || 80;
    const sections = [];

    tocLinks.forEach(link => {
      const id = link.getAttribute('href').replace('#', '');
      const el = document.getElementById(id);
      if (el) sections.push({ el, link });
    });

    const setActive = () => {
      let active = null;
      sections.forEach(({ el }) => {
        if (el.getBoundingClientRect().top <= navH + 32) active = el;
      });
      tocLinks.forEach(l => l.classList.remove('active'));
      if (active) {
        sections.forEach(({ el, link }) => {
          if (el === active) link.classList.add('active');
        });
      }
    };

    window.addEventListener('scroll', setActive, { passive: true });
    setActive();
  }

  // ── 10. TESTIMONIAL CAROUSEL (auto-play) ─────────────────────────────────
  const testimonialTrack = document.querySelector('.testimonials-track');
  if (testimonialTrack) {
    const cards  = testimonialTrack.querySelectorAll('.testimonial-card');
    const dots   = document.querySelectorAll('.testimonial-dot');
    const total  = cards.length;
    let   index  = 0;
    let   timer;

    const goTo = (i) => {
      index = (i + total) % total;
      const offset = -(index * (100 / total));
      testimonialTrack.style.transform = `translateX(${offset}%)`;
      dots.forEach((d, di) => d.classList.toggle('active', di === index));
    };

    const next = () => goTo(index + 1);

    document.querySelector('.testimonials-prev')?.addEventListener('click', () => {
      clearInterval(timer); goTo(index - 1);
    });
    document.querySelector('.testimonials-next')?.addEventListener('click', () => {
      clearInterval(timer); goTo(index + 1);
    });
    dots.forEach((dot, di) => {
      dot.addEventListener('click', () => { clearInterval(timer); goTo(di); });
    });

    timer = setInterval(next, 5000);

    // Pause on hover
    testimonialTrack.closest('.testimonials-slider')?.addEventListener('mouseenter', () => clearInterval(timer));
    testimonialTrack.closest('.testimonials-slider')?.addEventListener('mouseleave', () => { timer = setInterval(next, 5000); });
  }

  // ── 11. LAZY IMAGE OBSERVER ───────────────────────────────────────────────
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
  }

  // ── 12. COUNTER ANIMATION ────────────────────────────────────────────────
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const dur    = 1800;
        const start  = performance.now();

        const tick = (now) => {
          const elapsed = Math.min((now - start) / dur, 1);
          const eased   = 1 - Math.pow(1 - elapsed, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (elapsed < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        countObserver.unobserve(el);
      });
    }, { threshold: 0.4 });

    counters.forEach(el => countObserver.observe(el));
  }

  // ── 13. ACTIVE NAV LINK HIGHLIGHT (desktop + hamburger) ─────────────────
  (() => {
    const path = location.pathname.split('/').pop() || 'index.html';
    const clean = (h) => (h || '').split('/').pop().split('?')[0].split('#')[0].toLowerCase();
    const cur = clean(path) || 'index.html';
    document.querySelectorAll('.nav-link, .nav-overlay__link').forEach(link => {
      const href = link.getAttribute('href') || '';
      const lp = clean(href);
      // Match exact file or handle index vs '' 
      const isActive = lp === cur || (cur === 'index.html' && (lp === '' || lp === 'index.html')) || (lp && cur.includes(lp) && lp !== 'index.html' && lp.length > 2);
      // More precise: compare without query/hash
      if (lp === cur) link.classList.add('active');
      // Special: home2.html should highlight home2
      if (cur === 'home2.html' && lp === 'home2.html') link.classList.add('active');
    });
  })();

  // ── 14. HOVER LIFT EFFECT ────────────────────────────────────────────────
  // Already handled by CSS — JS enhances with a tilt on certain cards
  document.querySelectorAll('.service-card, .project-card, .blog-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const tiltX  = -dy * 3;
      const tiltY  =  dx * 3;
      card.style.transform = `translateY(-4px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});
