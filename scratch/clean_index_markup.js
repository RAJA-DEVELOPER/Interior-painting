const fs = require('fs');

// 1. Update section-align.css
let css = fs.readFileSync('assets/css/section-align.css', 'utf8');
const newCss = `
/* ──────────────────────────────────────────────────────────
   18 · INDEX & COMPONENT REFINEMENTS
   ────────────────────────────────────────────────────────── */
.bg-dark .stat-item {
  background: #26272b;
}
.bg-dark .stat-num {
  color: #F0EDE6;
}
.bg-dark .stat-label {
  color: rgba(255,255,255,0.45);
}
.cta-disclaimer {
  font-size: var(--fs-12);
  color: rgba(255,255,255,0.35);
  margin-top: var(--sp-4);
  text-align: center;
}
.ba-feature-list {
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
  margin-bottom: var(--sp-8);
}
.ba-feature-item {
  display: flex;
  gap: var(--sp-3);
  align-items: center;
  font-size: var(--fs-15);
  color: var(--tx-2);
}
.ba-desc {
  font-size: var(--fs-17);
  color: var(--tx-3);
  line-height: var(--lh-relaxed);
  max-width: 40ch;
  margin-bottom: var(--sp-8);
}
`;
css += newCss;
fs.writeFileSync('assets/css/section-align.css', css, 'utf8');
console.log('Updated section-align.css for index refinements');

// 2. Clean index.html
let html = fs.readFileSync('index.html', 'utf8');

// Clean Transformations section
html = html.replace(/<p style="font-size:var\(--fs-17\);color:var\(--tx-3\);line-height:var\(--lh-relaxed\);max-width:40ch;margin-bottom:var\(--sp-8\)">/g, '<p class="ba-desc">');
html = html.replace(/<ul style="display:flex;flex-direction:column;gap:var\(--sp-4\);margin-bottom:var\(--sp-8\)">/g, '<ul class="ba-feature-list">');
html = html.replace(/<li style="display:flex;gap:var\(--sp-3\);align-items:center;font-size:var\(--fs-15\);color:var\(--tx-2\)">/g, '<li class="ba-feature-item">');

// Clean stats section
html = html.replace(/<div class="stats-grid" style="--bg-card:#26272b;border:1px solid rgba\(255,255,255,0\.06\)">/g, '<div class="stats-grid">');
html = html.replace(/<div class="stat-item (reveal delay-\d)" style="background:#26272b">/g, '<div class="stat-item $1">');
html = html.replace(/<div class="stat-num" style="color:#F0EDE6">/g, '<div class="stat-num">');
html = html.replace(/<div class="stat-label" style="color:rgba\(255,255,255,0\.45\)">/g, '<div class="stat-label">');

// Clean CTA section
html = html.replace(/<p class="eyebrow reveal" style="justify-content:center;color:var\(--ac\)">Start Your Journey<\/p>/g, '<p class="eyebrow reveal" style="color:var(--ac)">Start Your Journey</p>');
html = html.replace(/<h2 class="sec-title reveal" style="color:#fff;margin-inline:auto;max-width:16ch;text-align:center">/g, '<h2 class="sec-title reveal">');
html = html.replace(/<p class="sec-subtitle reveal" style="color:rgba\(255,255,255,0\.65\);text-align:center;margin-inline:auto">/g, '<p class="sec-subtitle reveal">');
html = html.replace(/<p style="font-size:var\(--fs-12\);color:rgba\(255,255,255,0\.35\);margin-top:var\(--sp-4\);text-align:center" class="reveal">/g, '<p class="cta-disclaimer reveal">');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Cleaned index.html successfully!');
