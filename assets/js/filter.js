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

    const filter = (cat) => {
      buttons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === cat);
      });

      // Clear any inline grid overrides from previous filters
      const grid = items[0]?.closest('.articles-grid');
      if (grid) {
        grid.style.removeProperty('grid-template-columns');
        grid.style.removeProperty('grid-auto-rows');
        grid.style.removeProperty('max-width');
        grid.style.removeProperty('margin-inline');
        grid.style.removeProperty('justify-items');
      }

      // Fade out non-matching
      items.forEach((item) => {
        const matches = cat === 'all' || item.dataset.category === cat;
        if (!matches) {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.96)';
          item.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        }
      });

      // After fade, hide them and reflow grid, then fade in matches
      setTimeout(() => {
        items.forEach((item) => {
          const matches = cat === 'all' || item.dataset.category === cat;
          item.style.display = matches ? '' : 'none';
          if (matches) {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.97) translateY(8px)';
          }
        });

        // Get visible items for stagger
        const visible = items.filter(item => item.style.display !== 'none');

        // Single card: center it
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

        // Stagger fade in
        visible.forEach((item, idx) => {
          setTimeout(() => {
            item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1) translateY(0)';
          }, idx * 35);
        });
      }, 200);
    };

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.filter || 'all';
        filter(cat);
      });
    });

    // Initialize
    filter('all');
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
