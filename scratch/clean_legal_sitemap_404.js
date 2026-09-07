const fs = require('fs');

// 1. Add Section 22 to section-align.css
let css = fs.readFileSync('assets/css/section-align.css', 'utf8');
const sitemapCss = `
/* ──────────────────────────────────────────────────────────
   22 · SITEMAP & LEGAL COMPONENTS
   ────────────────────────────────────────────────────────── */
.sitemap-subheading {
  font-family: var(--serif);
  font-size: var(--fs-18);
  color: var(--tx-1);
  margin-top: var(--sp-7);
  margin-bottom: var(--sp-4);
  padding-top: var(--sp-5);
  border-top: 1px solid var(--bd);
}
.xml-cta__content {
  flex: 1;
}
.xml-cta__title {
  font-family: var(--serif);
  font-size: var(--fs-22);
  color: var(--tx-1);
  margin-bottom: var(--sp-2);
}
.xml-cta__desc {
  font-size: var(--fs-14);
  color: var(--tx-3);
  margin-bottom: 0;
}
.xml-cta .btn {
  flex-shrink: 0;
}
.sitemap-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--col-gap);
  margin-top: var(--sp-10);
  text-align: center;
}
.sitemap-stat-card {
  padding: var(--sp-6);
  border: 1px solid var(--bd);
  border-radius: var(--r-xl);
  background: var(--bg-card);
}
.sitemap-stat-num {
  font-family: var(--serif);
  font-size: var(--fs-36);
  color: var(--ac);
}
.sitemap-stat-label {
  font-size: var(--fs-13);
  color: var(--tx-3);
  margin-top: var(--sp-1);
}
@media (max-width: 768px) {
  .sitemap-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  .sitemap-stats-grid {
    grid-template-columns: 1fr;
  }
}
`;
if (!css.includes('22 · SITEMAP & LEGAL COMPONENTS')) {
  css += sitemapCss;
  fs.writeFileSync('assets/css/section-align.css', css, 'utf8');
  console.log('Appended Section 22 to section-align.css');
}

// 2. Clean privacy-policy.html
let privacy = fs.readFileSync('privacy-policy.html', 'utf8');
privacy = privacy.replace(
  /<h1 style="font-family:var\(--serif\);font-size:var\(--fs-h1\);font-weight:var\(--fw-light\);color:#fff;margin-top:var\(--sp-5\)">Privacy Policy<\/h1>\s*<p style="font-size:var\(--fs-15\);color:rgba\(255,255,255,0\.55\);margin-top:var\(--sp-3\)">Last updated: ([^<]+)<\/p>/g,
  '<h1>Privacy Policy</h1>\n        <p>Last updated: $1</p>'
);
fs.writeFileSync('privacy-policy.html', privacy, 'utf8');
console.log('Cleaned privacy-policy.html');

// 3. Clean terms.html
let terms = fs.readFileSync('terms.html', 'utf8');
terms = terms.replace(
  /<h1 style="font-family:var\(--serif\);font-size:var\(--fs-h1\);font-weight:var\(--fw-light\);color:#fff;margin-top:var\(--sp-5\)">Terms &amp; Conditions<\/h1>\s*<p style="font-size:var\(--fs-15\);color:rgba\(255,255,255,0\.55\);margin-top:var\(--sp-3\)">([^<]+)<\/p>/g,
  '<h1>Terms &amp; Conditions</h1>\n        <p>$1</p>'
);
fs.writeFileSync('terms.html', terms, 'utf8');
console.log('Cleaned terms.html');

// 4. Clean sitemap.html
let sitemap = fs.readFileSync('sitemap.html', 'utf8');
sitemap = sitemap.replace(/<div class="container" style="position:relative;z-index:1">\s*<h1 style="font-family:var\(--serif\);font-size:var\(--fs-h1\);font-weight:var\(--fw-light\);color:#fff;margin-top:var\(--sp-5\)">Sitemap<\/h1>\s*<p style="font-size:var\(--fs-16\);color:rgba\(255,255,255,0\.55\);margin-top:var\(--sp-3\);max-width:54ch">/g, '<div class="container">\n        <h1>Sitemap</h1>\n        <p>');
sitemap = sitemap.replace(/<h3 style="font-family:var\(--serif\);font-size:var\(--fs-18\);color:var\(--tx-1\);margin-top:var\(--sp-7\);margin-bottom:var\(--sp-4\);padding-top:var\(--sp-5\);border-top:1px solid var\(--bd\)">Contact Points<\/h3>/g, '<h3 class="sitemap-subheading">Contact Points</h3>');
sitemap = sitemap.replace(/<h3 style="font-family:var\(--serif\);font-size:var\(--fs-18\);color:var\(--tx-1\);margin-top:var\(--sp-7\);margin-bottom:var\(--sp-4\);padding-top:var\(--sp-5\);border-top:1px solid var\(--bd\)">Social Media<\/h3>/g, '<h3 class="sitemap-subheading">Social Media</h3>');

sitemap = sitemap.replace(/<div style="flex:1">\s*<h3 style="font-family:var\(--serif\);font-size:var\(--fs-22\);color:var\(--tx-1\);margin-bottom:var\(--sp-2\)">XML Sitemap for Search Engines<\/h3>\s*<p style="font-size:var\(--fs-14\);color:var\(--tx-3\);margin-bottom:0">/g, '<div class="xml-cta__content">\n            <h3 class="xml-cta__title">XML Sitemap for Search Engines</h3>\n            <p class="xml-cta__desc">');
sitemap = sitemap.replace(/<a href="sitemap\.xml" class="btn btn-secondary" style="flex-shrink:0">/g, '<a href="sitemap.xml" class="btn btn-secondary">');

sitemap = sitemap.replace(/<div class="grid grid-4 reveal" style="margin-top:var\(--sp-10\);text-align:center;">/g, '<div class="sitemap-stats-grid reveal">');
sitemap = sitemap.replace(/<div style="padding:var\(--sp-6\);border:1px solid var\(--bd\);border-radius:var\(--r-xl\)">/g, '<div class="sitemap-stat-card">');
sitemap = sitemap.replace(/<div style="font-family:var\(--serif\);font-size:var\(--fs-36\);color:var\(--ac\)">/g, '<div class="sitemap-stat-num">');
sitemap = sitemap.replace(/<div style="font-size:var\(--fs-13\);color:var\(--tx-3\);margin-top:var\(--sp-1\)">/g, '<div class="sitemap-stat-label">');
sitemap = sitemap.replace(/<div class="footer__bottom" style="padding-top:0">/g, '<div class="footer__bottom">');

fs.writeFileSync('sitemap.html', sitemap, 'utf8');
console.log('Cleaned sitemap.html');

// 5. Clean 404.html
let notFound = fs.readFileSync('404.html', 'utf8');
const topbarTarget = `<div style="position:absolute;top:0;left:0;right:0;padding:var(--sp-5) var(--gutter);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.06)">
        <a href="index.html" aria-label="RENOVA Home" style="display:inline-flex;align-items:center;gap:10px;font-family:var(--serif);font-size:var(--fs-24);font-weight:var(--fw-light);color:#fff;letter-spacing:0.1em;text-decoration:none"><span aria-hidden="true" style="width:38px;height:38px;border-radius:9px;overflow:hidden;display:block;flex-shrink:0"><img src="assets/img/logo-mark-light.svg" alt="" width="38" height="38" style="width:100%;height:100%;display:block"></span>RENO<span style="color:var(--ac)">VA</span></a>
        <a href="contact.html" class="btn btn-primary btn-sm">Free Quote</a>
      </div>`;

const topbarReplacement = `<div class="error-topbar">
        <a href="index.html" aria-label="RENOVA Home" class="error-logo"><span aria-hidden="true" class="error-logo__mark"><img src="assets/img/logo-mark-light.svg" alt="" width="38" height="38"></span>RENO<span class="accent">VA</span></a>
        <a href="contact.html" class="btn btn-primary btn-sm">Free Quote</a>
      </div>`;

notFound = notFound.replace(topbarTarget, topbarReplacement);
// Also add error-topbar styles to 404.html style tag if not already there
if (!notFound.includes('.error-topbar')) {
  const errorStyles = `
    .error-topbar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: var(--sp-5) var(--gutter);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      z-index: 10;
    }
    .error-logo {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-family: var(--serif);
      font-size: var(--fs-24);
      font-weight: var(--fw-light);
      color: #fff;
      letter-spacing: 0.1em;
      text-decoration: none;
    }
    .error-logo__mark {
      width: 38px;
      height: 38px;
      border-radius: 9px;
      overflow: hidden;
      display: block;
      flex-shrink: 0;
    }
    .error-logo__mark img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .error-logo span.accent {
      color: var(--ac);
    }
  </style>`;
  notFound = notFound.replace('</style>', errorStyles);
}
fs.writeFileSync('404.html', notFound, 'utf8');
console.log('Cleaned 404.html');
