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

    const updateIndicator = () => {
      if (!indicator || !isPortfolio) return;
      const active = bar.querySelector('.filter-btn.active');
      if (!active) {
        indicator.classList.remove('visible');
        return;
      }
      // bar has 6px padding, indicator should align to button
      const barRect = bar.getBoundingClientRect();
      const btnRect = active.getBoundingClientRect();
      const left = btnRect.left - barRect.left;
      const width = btnRect.width;
      indicator.style.left = left + 'px';
      indicator.style.width = width + 'px';
      indicator.classList.add('visible');
    };

    const filter = (cat) => {
      buttons.forEach(btn => {
        const isActive = btn.dataset.filter === cat;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      if (isPortfolio) {
        // Animate indicator after active class toggled
        requestAnimationFrame(() => updateIndicator());
      }

      // Clear any inline grid overrides from previous filters
      const grid = items[0]?.closest('.articles-grid') || items[0]?.closest('.projects-grid');
      if (grid) {
        // keep fit-content centering for portfolio, but clear single-card overrides
        if (!isPortfolio) {
          grid.style.removeProperty('grid-template-columns');
        }
        grid.style.removeProperty('grid-auto-rows');
        if (!isPortfolio) {
          grid.style.removeProperty('max-width');
          grid.style.removeProperty('margin-inline');
        }
        grid.style.removeProperty('justify-items');
      }

      // Prepare grid for smooth height transition (portfolio)
      if (isPortfolio && container) {
        container.style.transition = 'min-height 0.35s cubic-bezier(0.16,1,0.3,1)';
      }

      // Fade out non-matching with spring easing
      items.forEach((item) => {
        const matches = cat === 'all' || item.dataset.category === cat;
        if (!matches) {
          item.classList.remove('filter-visible');
          item.classList.add('filter-hidden');
          // fallback inline for browsers without CSS class transition
          item.style.opacity = '0';
          item.style.transform = 'scale(0.94) translateY(6px)';
          item.style.transition = 'opacity 0.28s cubic-bezier(0.16,1,0.3,1), transform 0.32s cubic-bezier(0.16,1,0.3,1)';
        } else {
          item.classList.remove('filter-hidden');
        }
      });

      // After fade, hide them and reflow grid, then fade in matches
      setTimeout(() => {
        items.forEach((item) => {
          const matches = cat === 'all' || item.dataset.category === cat;
          item.style.display = matches ? '' : 'none';
          if (matches) {
            item.classList.add('filter-enter');
            item.classList.remove('filter-visible');
            item.style.opacity = '0';
            item.style.transform = 'scale(0.96) translateY(10px)';
          }
        });

        // Get visible items for stagger
        const visible = items.filter(item => item.style.display !== 'none');

        // Single card: center it (portfolio keeps pill bar centered, grid will handle)
        if (visible.length === 1 && grid && !isPortfolio) {
          grid.style.gridTemplateColumns = '1fr';
          visible[0].style.maxWidth = '560px';
          visible[0].style.marginInline = 'auto';
        } else {
          if (grid && visible.length <= 2 && !isPortfolio) {
            grid.style.gridTemplateColumns = visible.length === 2 ? 'repeat(2, 1fr)' : '1fr';
          }
          if (!isPortfolio) {
            visible.forEach(it => { it.style.maxWidth = ''; it.style.marginInline = ''; });
          }
        }

        // Stagger fade in with spring
        visible.forEach((item, idx) => {
          setTimeout(() => {
            item.classList.remove('filter-enter');
            item.classList.add('filter-visible');
            item.style.transition = 'opacity 0.42s cubic-bezier(0.16,1,0.3,1), transform 0.48s cubic-bezier(0.16,1,0.3,1)';
            item.style.opacity = '1';
            item.style.transform = 'scale(1) translateY(0)';
          }, idx * 45);
        });

        // Announce for a11y
        if (isPortfolio && container) {
          container.setAttribute('aria-live', 'polite');
        }
      }, isPortfolio ? 280 : 200);
    };

    buttons.forEach(btn => {
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', 'false');
      btn.addEventListener('click', () => {
        const cat = btn.dataset.filter || 'all';
        // Haptic feedback hint: add pressed state
        btn.style.transform = 'scale(0.96)';
        setTimeout(() => btn.style.transform = '', 120);
        filter(cat);
      });
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
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

    // Initialize
    filter('all');
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
