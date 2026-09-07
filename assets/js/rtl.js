// RENOVA — RTL Toggle (all pages)
// Toggles <html dir="ltr|rtl">, persists in localStorage, updates button label
(function () {
  const KEY = 'renova-dir';
  const html = document.documentElement;

  function apply(dir) {
    html.setAttribute('dir', dir);
    html.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
    const btn = document.getElementById('rtlToggle');
    if (btn) {
      btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to Left-to-Right' : 'Switch to Right-to-Left (RTL)');
      btn.setAttribute('title', dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
      btn.setAttribute('aria-pressed', dir === 'rtl' ? 'true' : 'false');
    }
    try { localStorage.setItem(KEY, dir); } catch (e) {}
  }

  function init() {
    let saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    const initial = saved === 'rtl' || saved === 'ltr' ? saved : (html.getAttribute('dir') || 'ltr');
    apply(initial);

    const btn = document.getElementById('rtlToggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const cur = html.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
        const next = cur === 'rtl' ? 'ltr' : 'rtl';
        apply(next);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
