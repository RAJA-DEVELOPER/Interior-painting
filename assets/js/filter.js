/**
 * RENOVA — Project Filter
 * Isotope-style filtering with smooth fade animations
 */

'use strict';

const initFilter = () => {
  const filterBars = document.querySelectorAll('.filter-bar');

  filterBars.forEach(bar => {
    // Robust container lookup: direct sibling, parent sibling, or #articlesGrid
    let container = bar.nextElementSibling;
    if (!container || !container.querySelector('[data-category]')) {
      container = bar.parentElement?.nextElementSibling;
    }
    if (!container || !container.querySelector('[data-category]')) {
      container = bar.closest('.articles-header')?.nextElementSibling;
    }
    if (!container || !container.querySelector('[data-category]')) {
      container = document.getElementById('articlesGrid') || document.querySelector('.articles-grid') || document.querySelector('.projects-grid');
    }
    if (!container) return;

    const items = [...container.querySelectorAll('[data-category]')];
    if (!items.length) return;

    const buttons = [...bar.querySelectorAll('.filter-btn')];

    // --- Premium sliding indicator for #projects (Home 2 Portfolio) ---
    const isPortfolio = bar.closest('#projects') !== null || container.closest('#projects') !== null;
    let indicator = null;
    if (isPortfolio) {
      indicator = bar.querySelector('.filter-indicator');
      if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'filter-indicator';
        indicator.setAttribute('aria-hidden', 'true');
        bar.insertBefore(indicator, bar.firstChild);
      }
      // Mark container for CSS that enables indicator mode
      const projectsSection = document.getElementById('projects');
      if (projectsSection) projectsSection.classList.add('has-indicator');
      // Ensure bar is positioned for indicator
      bar.style.position = 'relative';
    }

    // Generation token + timer registry: rapid clicks cancel stale runs
    // so categories never overlap/flicker.
    let generation = 0;
    let pendingTimers = [];
    const later = (fn, ms) => {
      const id = setTimeout(fn, ms);
      pendingTimers.push(id);
      return id;
    };
    const cancelPending = () => {
      pendingTimers.forEach(clearTimeout);
      pendingTimers = [];
    };
    const prefersReducedMotion = () =>
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateIndicator = () => {
      if (!indicator || !isPortfolio) return;
      const active = bar.querySelector('.filter-btn.active');
      if (!active) {
        indicator.classList.remove('visible');
        return;
      }
      // offset* is relative to the positioned bar, so it stays correct
      // when the pill bar is scrolled horizontally (mobile) or wrapped.
      indicator.style.left = active.offsetLeft + 'px';
      indicator.style.top = active.offsetTop + 'px';
      indicator.style.width = active.offsetWidth + 'px';
      indicator.style.height = active.offsetHeight + 'px';
      indicator.classList.add('visible');
    };

    // Keep the active pill in view when the bar overflows (mobile).
    // Called ONLY on user interaction — never on init/resize, so the
    // page is never yanked down to the filter bar on load.
    const ensureActiveVisible = () => {
      if (!isPortfolio) return;
      const active = bar.querySelector('.filter-btn.active');
      if (!active || typeof active.scrollIntoView !== 'function') return;
      try {
        active.scrollIntoView({
          block: 'nearest',
          inline: 'nearest',
          behavior: prefersReducedMotion() ? 'auto' : 'smooth'
        });
      } catch (_) { /* noop */ }
    };

    const filter = (cat, opts = {}) => {
      const myGen = ++generation;
      cancelPending();

      buttons.forEach(btn => {
        const isActive = btn.dataset.filter === cat;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      if (isPortfolio) {
        // Slide indicator after active class toggled
        requestAnimationFrame(() => updateIndicator());
      }

      const grid = items[0]?.closest('.articles-grid') || items[0]?.closest('.projects-grid');
      const matchesCat = (item) => cat === 'all' || item.dataset.category === cat;

      // ── Non-portfolio grids: keep previous simple behaviour ──
      if (!isPortfolio) {
        if (grid) {
          grid.style.removeProperty('grid-template-columns');
          grid.style.removeProperty('grid-auto-rows');
          grid.style.removeProperty('max-width');
          grid.style.removeProperty('margin-inline');
          grid.style.removeProperty('justify-items');
        }
        items.forEach((item) => {
          const matches = matchesCat(item);
          if (!matches) {
            item.classList.remove('filter-visible');
            item.classList.add('filter-hidden');
            item.style.opacity = '0';
            item.style.transform = 'scale(0.94) translateY(6px)';
            item.style.transition = 'opacity 0.28s cubic-bezier(0.16,1,0.3,1), transform 0.32s cubic-bezier(0.16,1,0.3,1)';
          } else {
            item.classList.remove('filter-hidden');
          }
        });
        later(() => {
          if (myGen !== generation) return;
          items.forEach((item) => {
            const matches = matchesCat(item);
            item.style.display = matches ? '' : 'none';
            item.classList.toggle('is-hidden', !matches);
            if (matches) {
              item.classList.add('filter-enter');
              item.classList.remove('filter-visible');
              item.style.opacity = '0';
              item.style.transform = 'scale(0.96) translateY(10px)';
            }
          });
          const visible = items.filter(item => item.style.display !== 'none');
          if (visible.length === 1 && grid) {
            grid.style.gridTemplateColumns = '1fr';
            visible[0].style.maxWidth = '560px';
            visible[0].style.marginInline = 'auto';
          } else {
            if (grid && visible.length <= 2) {
              grid.style.gridTemplateColumns = visible.length === 2 ? 'repeat(2, 1fr)' : '1fr';
            }
            visible.forEach(it => { it.style.maxWidth = ''; it.style.marginInline = ''; });
          }
          visible.forEach((item, idx) => {
            later(() => {
              if (myGen !== generation) return;
              item.classList.remove('filter-enter');
              item.classList.add('filter-visible');
              item.style.transition = 'opacity 0.42s cubic-bezier(0.16,1,0.3,1), transform 0.48s cubic-bezier(0.16,1,0.3,1)';
              item.style.opacity = '1';
              item.style.transform = 'scale(1) translateY(0)';
            }, idx * 45);
          });
        }, 200);
        return;
      }

      // ── Portfolio (Home 2): smooth, visually consistent switching ──
      // Strategy: lock grid height so the page doesn't jump; fade out only
      // departing cards; keep persisting cards perfectly still (no flicker);
      // stagger in only newly arriving cards with one shared easing curve.
      // Uniform 4/3 cards (CSS) keep every category the same shape.
      const toHide = items.filter(i => !matchesCat(i) && i.style.display !== 'none');
      const toShow = items.filter(i => matchesCat(i) && i.style.display === 'none');
      const staying = items.filter(i => matchesCat(i) && i.style.display !== 'none');

      const cleanupInline = (el) => {
        el.style.opacity = '';
        el.style.transform = '';
        el.style.transition = '';
      };

      if (prefersReducedMotion() || opts.instant) {
        items.forEach((item) => {
          const matches = matchesCat(item);
          item.style.display = matches ? '' : 'none';
          item.classList.toggle('is-hidden', !matches);
          item.classList.remove('filter-hidden', 'filter-enter');
          item.classList.toggle('filter-visible', matches);
          cleanupInline(item);
        });
        container.classList.remove('is-switching');
        container.style.minHeight = '';
        container.setAttribute('aria-live', 'polite');
        return;
      }

      // Lock height to the current rendered height — prevents layout jump
      // when the grid briefly holds fewer cards.
      const startH = container.offsetHeight;
      if (startH) {
        container.style.minHeight = startH + 'px';
      }
      container.classList.add('is-switching');

      // Phase 1: fade/scale out departing cards; pin staying cards clean.
      toHide.forEach((item) => {
        item.classList.remove('filter-visible', 'filter-enter');
        item.classList.add('filter-hidden');
        item.style.transition = 'opacity 0.22s cubic-bezier(0.16,1,0.3,1), transform 0.26s cubic-bezier(0.16,1,0.3,1)';
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95) translateY(8px)';
      });
      staying.forEach((item) => {
        item.classList.remove('filter-hidden', 'filter-enter');
        item.classList.add('filter-visible');
        cleanupInline(item);
      });

      later(() => {
        if (myGen !== generation) return;

        toHide.forEach((item) => {
          item.style.display = 'none';
          item.classList.add('is-hidden');
          item.classList.remove('filter-hidden');
          cleanupInline(item);
        });

        // Nothing new to reveal — just release the height lock.
        if (!toShow.length) {
          container.classList.remove('is-switching');
          container.style.minHeight = '';
          container.setAttribute('aria-live', 'polite');
          return;
        }

        // Prep entering cards in their final grid slots, then force one
        // reflow so all transitions start from the same frame.
        toShow.forEach((item) => {
          item.style.display = '';
          item.classList.remove('is-hidden');
          item.classList.remove('filter-visible', 'filter-hidden');
          item.classList.add('filter-enter');
          item.style.transition = 'none';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.96) translateY(12px)';
        });
        void container.offsetHeight;

        // Staggered entrance with a single shared curve — consistent feel
        // regardless of category (1, 2 or 9 cards).
        toShow.forEach((item, idx) => {
          later(() => {
            if (myGen !== generation) return;
            item.classList.remove('filter-enter');
            item.classList.add('filter-visible');
            item.style.transition = 'opacity 0.38s cubic-bezier(0.16,1,0.3,1), transform 0.44s cubic-bezier(0.16,1,0.3,1)';
            item.style.opacity = '1';
            item.style.transform = 'scale(1) translateY(0)';
            later(() => {
              if (myGen !== generation) return;
              // Clear inline styles so hover/overlay CSS regains full control.
              if (item.classList.contains('filter-visible')) cleanupInline(item);
            }, 480);
          }, 60 + idx * 60);
        });

        // Release the height lock once the longest entrance finishes.
        later(() => {
          if (myGen !== generation) return;
          container.classList.remove('is-switching');
          container.style.minHeight = '';
          container.setAttribute('aria-live', 'polite');
        }, 60 + toShow.length * 60 + 460);
      }, toHide.length ? 230 : 0);
    };

    buttons.forEach(btn => {
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', 'false');
      btn.addEventListener('click', () => {
        const cat = btn.dataset.filter || 'all';
        // Skip re-filtering the already-active category (avoids flicker).
        if (btn.classList.contains('active')) {
          updateIndicator();
          ensureActiveVisible();
          return;
        }
        // Pressed feedback is handled by CSS :active (no inline transform,
        // so the sliding indicator can measure the button cleanly).
        filter(cat);
        ensureActiveVisible();
      });
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
        // Arrow-key navigation between pills (roving tab-like UX).
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const idx = buttons.indexOf(btn);
          const next = e.key === 'ArrowRight'
            ? buttons[(idx + 1) % buttons.length]
            : buttons[(idx - 1 + buttons.length) % buttons.length];
          next.focus();
          next.click();
        }
      });
    });

    // Indicator reposition on resize / theme change
    if (isPortfolio) {
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateIndicator, 150);
      });
      // Re-position after fonts load
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => updateIndicator());
      }
      // Observe theme changes
      const observer = new MutationObserver(() => updateIndicator());
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    }

    // Initialize — instant (no entrance animation on page load)
    filter('all', { instant: true });
    if (isPortfolio) {
      // Ensure indicator visible after initial render
      setTimeout(updateIndicator, 100);
      setTimeout(updateIndicator, 400);
    }
  });
};

// ──────────────────────────────────────────────────────────
// FAQ ACCORDION
// ──────────────────────────────────────────────────────────
const initFAQ = () => {
  const faqs = document.querySelectorAll('.faq-list');

  faqs.forEach(list => {
    const items = [...list.querySelectorAll('.faq-item')];

    items.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer   = item.querySelector('.faq-answer');
      if (!question || !answer) return;

      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all in this list
        items.forEach(i => {
          i.classList.remove('open');
          const a = i.querySelector('.faq-answer');
          if (a) a.style.maxHeight = '0';
          const q = i.querySelector('.faq-question');
          if (q) q.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          question.setAttribute('aria-expanded', 'true');
        }
      });

      // Accessibility
      question.setAttribute('aria-expanded', 'false');
      question.setAttribute('role', 'button');
    });
  });
};

// ──────────────────────────────────────────────────────────
// COLOR SWATCH SELECTOR
// ──────────────────────────────────────────────────────────
const initColorSwatches = () => {
  const swatchGroups = document.querySelectorAll('.swatch-group');

  swatchGroups.forEach(group => {
    const swatches = [...group.querySelectorAll('.swatch')];
    const preview  = group.nextElementSibling?.querySelector('.swatch-preview');

    swatches.forEach(sw => {
      sw.addEventListener('click', () => {
        swatches.forEach(s => s.classList.remove('active'));
        sw.classList.add('active');

        if (preview) {
          const color = sw.dataset.color;
          preview.style.backgroundColor = color;
          const name = group.parentElement?.querySelector('.swatch-name');
          if (name) name.textContent = sw.dataset.name || '';
        }
      });
    });
  });
};

// ──────────────────────────────────────────────────────────
// INIT
// ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initFilter();
  initFAQ();
  initColorSwatches();
});
