const fs = require('fs');
let css = fs.readFileSync('assets/css/section-align.css', 'utf8');

const addition = `
/* ──────────────────────────────────────────────────────────
   17 · ABOUT PAGE ENHANCEMENTS
   ────────────────────────────────────────────────────────── */
.story-stats-row {
  display: flex;
  gap: var(--sp-10);
  margin-bottom: var(--sp-8);
  flex-wrap: wrap;
  align-items: baseline;
}
.story-stat-item {
  display: flex;
  flex-direction: column;
}
.story-stat-num {
  font-family: var(--serif);
  font-size: var(--fs-56);
  color: var(--ac);
  line-height: 1;
}
.story-stat-label {
  font-size: var(--fs-13);
  color: var(--tx-3);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
  margin-top: var(--sp-1);
}
.story-stat-divider {
  width: 1px;
  height: 48px;
  background: var(--bd);
  align-self: center;
}
.about-hero__inner {
  max-width: 64ch;
  margin-inline: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
`;

css += addition;
fs.writeFileSync('assets/css/section-align.css', css, 'utf8');
console.log('Appended Section 17 to section-align.css!');
