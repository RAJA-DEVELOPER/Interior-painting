/**
 * RENOVA — Hero Slider
 * Cinematic fullscreen image slider with autoplay, touch & keyboard
 */

'use strict';

const initSlider = (sliderEl) => {
  if (!sliderEl) return;

  const slides   = [...sliderEl.querySelectorAll('.slider__slide')];
  const dots     = [...sliderEl.querySelectorAll('.slider__dot')];
  const prevBtn  = sliderEl.querySelector('.slider__prev');
  const nextBtn  = sliderEl.querySelector('.slider__next');
  const progress = sliderEl.querySelector('.slider__progress');
  const counterCurr = sliderEl.querySelector('.slider__curr');
  const counterTotal = sliderEl.querySelector('.slider__total');

  if (!slides.length) return;

  let current  = 0;
  let timer    = null;
  let isRunning = true;
  const DURATION = 5500;
  const TOTAL = slides.length;

  // Init counter
  if (counterTotal) counterTotal.textContent = String(TOTAL).padStart(2, '0');

  const goTo = (index) => {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');

    current = (index + TOTAL) % TOTAL;

    slides[current].classList.add('active');
    dots[current]?.classList.add('active');

    if (counterCurr) {
      counterCurr.textContent = String(current + 1).padStart(2, '0');
    }

    // Reset progress animation
    if (progress) {
      progress.style.animation = 'none';
      void progress.offsetWidth; // reflow
      progress.style.animation = `sliderProgress ${DURATION}ms linear forwards`;
    }
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const startAutoplay = () => {
    stopAutoplay();
    if (isRunning) {
      timer = setInterval(next, DURATION);
    }
  };

  const stopAutoplay = () => {
    clearInterval(timer);
  };

  // Initial state
  goTo(0);
  startAutoplay();

  // Controls
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startAutoplay(); });
  });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (!sliderEl.closest('.hero-slider')) return;
    if (e.key === 'ArrowRight') { next(); startAutoplay(); }
    if (e.key === 'ArrowLeft')  { prev(); startAutoplay(); }
  });

  // Touch / Swipe
  let touchStartX = 0;
  let touchEndX   = 0;

  sliderEl.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  sliderEl.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev();
      startAutoplay();
    }
  }, { passive: true });

  // Pause on hover
  sliderEl.addEventListener('mouseenter', () => {
    isRunning = false;
    stopAutoplay();
    if (progress) progress.style.animationPlayState = 'paused';
  });

  sliderEl.addEventListener('mouseleave', () => {
    isRunning = true;
    startAutoplay();
    if (progress) progress.style.animationPlayState = 'running';
  });

  // Visibility API pause/resume
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoplay();
    } else if (isRunning) {
      startAutoplay();
    }
  });
};

// ──────────────────────────────────────────────────────────
// TESTIMONIAL SLIDER
// ──────────────────────────────────────────────────────────
const initTestimonialSlider = () => {
  const wrap  = document.querySelector('.testimonial-slider');
  if (!wrap) return;

  const track = wrap.querySelector('.testimonial-track');
  const cards = [...wrap.querySelectorAll('.testimonial-card')];
  // Client Stories controls are outside .testimonial-slider (in .sec-header-split/.testimonials-nav) — query from section/document
  const section = wrap.closest('section') || document;
  const dots = section.querySelectorAll('.testimonial-dot');
  const prev = section.querySelector('.testimonial-prev') || document.querySelector('.testimonial-prev');
  const next = section.querySelector('.testimonial-next') || document.querySelector('.testimonial-next');

  if (!track || cards.length < 2) return;

  let current = 0;
  const getVisibleCount = () => window.innerWidth < 768 ? 1 : 2;

  const goTo = (idx) => {
    const visibleCount = getVisibleCount();
    const max = Math.max(0, cards.length - visibleCount);
    current = Math.min(Math.max(idx, 0), max);

    // Use gap from track + margin from card to handle both spacing sources; after CSS fix margin is 0 and gap is authoritative
    const trackGap = parseFloat(getComputedStyle(track).gap || getComputedStyle(track).columnGap || 0);
    const cardMargin = parseFloat(getComputedStyle(cards[0]).marginRight || 0);
    const cardWidth = cards[0].offsetWidth + trackGap + cardMargin;
    track.style.transform = `translateX(-${current * cardWidth}px)`;

    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  };

  if (prev) prev.addEventListener('click', () => goTo(current - 1));
  if (next) next.addEventListener('click', () => goTo(current + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

  // Auto-play — pause on hover
  let timer = setInterval(() => {
    const vc = getVisibleCount();
    goTo(current + 1 > cards.length - vc ? 0 : current + 1);
  }, 6000);
  wrap.addEventListener('mouseenter', () => clearInterval(timer));
  wrap.addEventListener('mouseleave', () => {
    timer = setInterval(() => {
      const vc = getVisibleCount();
      goTo(current + 1 > cards.length - vc ? 0 : current + 1);
    }, 6000);
  });
  // Keep dots/controls in sync also when queried globally but section hosts controls
  section.addEventListener('mouseenter', () => clearInterval(timer));
  section.addEventListener('mouseleave', () => {
    clearInterval(timer);
    timer = setInterval(() => {
      const vc = getVisibleCount();
      goTo(current + 1 > cards.length - vc ? 0 : current + 1);
    }, 6000);
  });

  // Touch
  let touchX = 0;
  track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? goTo(current + 1) : goTo(current - 1);
  }, { passive: true });

  // Recalc on resize (visibleCount changes 2↔1)
  window.addEventListener('resize', () => goTo(current));

  goTo(0);
};

// ──────────────────────────────────────────────────────────
// INIT
// ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const heroSlider = document.querySelector('.hero-slider');
  initSlider(heroSlider);
  initTestimonialSlider();
});
