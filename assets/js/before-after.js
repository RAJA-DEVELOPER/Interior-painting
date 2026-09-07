/**
 * RENOVA — Before / After Comparison Slider
 * Drag, touch and keyboard support
 */

'use strict';

const initBeforeAfter = () => {
  const wraps = document.querySelectorAll('.ba-wrap');

  wraps.forEach(wrap => {
    const after   = wrap.querySelector('.ba-after');
    const divider = wrap.querySelector('.ba-divider');
    const handle  = wrap.querySelector('.ba-handle');

    if (!after || !divider || !handle) return;

    let isDragging = false;
    let pct = 50;

    const setPosition = (x) => {
      const rect = wrap.getBoundingClientRect();
      const raw  = (x - rect.left) / rect.width * 100;
      pct = Math.min(Math.max(raw, 2), 98);

      divider.style.left = `${pct}%`;
      handle.style.left  = `${pct}%`;
      after.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    };

    // Mouse
    handle.addEventListener('mousedown', e => {
      isDragging = true;
      wrap.style.cursor = 'col-resize';
      e.preventDefault();
    });

    document.addEventListener('mousemove', e => {
      if (!isDragging) return;
      setPosition(e.clientX);
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      wrap.style.cursor = '';
    });

    // Touch
    handle.addEventListener('touchstart', e => {
      isDragging = true;
      e.preventDefault();
    }, { passive: false });

    document.addEventListener('touchmove', e => {
      if (!isDragging) return;
      setPosition(e.touches[0].clientX);
    }, { passive: true });

    document.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Click anywhere on wrap
    wrap.addEventListener('click', e => {
      if (!e.target.closest('.ba-handle')) {
        setPosition(e.clientX);
      }
    });

    // Keyboard
    handle.setAttribute('tabindex', '0');
    handle.setAttribute('role', 'slider');
    handle.setAttribute('aria-label', 'Before/After comparison slider');
    handle.setAttribute('aria-valuenow', '50');
    handle.setAttribute('aria-valuemin', '0');
    handle.setAttribute('aria-valuemax', '100');

    handle.addEventListener('keydown', e => {
      const step = e.shiftKey ? 10 : 2;
      if (e.key === 'ArrowLeft')  { pct = Math.max(pct - step, 2);  setExact(pct); }
      if (e.key === 'ArrowRight') { pct = Math.min(pct + step, 98); setExact(pct); }
    });

    const setExact = (p) => {
      pct = p;
      divider.style.left = `${pct}%`;
      handle.style.left  = `${pct}%`;
      after.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.setAttribute('aria-valuenow', Math.round(pct));
    };

    // Animate in on scroll
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      // Animate from 75% to 50%
      let p = 75;
      const anim = () => {
        p = p - 0.8;
        if (p <= 50) { setExact(50); return; }
        setExact(p);
        requestAnimationFrame(anim);
      };
      setTimeout(() => requestAnimationFrame(anim), 500);
      observer.unobserve(wrap);
    }, { threshold: 0.4 });

    observer.observe(wrap);

    // Initialize
    setExact(50);
  });
};

document.addEventListener('DOMContentLoaded', initBeforeAfter);
