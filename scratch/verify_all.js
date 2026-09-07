const fs = require('fs');

const files = [
  'index.html', 'home2.html', 'about.html', 'services.html',
  'blog.html', 'blog-detail.html', 'contact.html', 'maintenance.html',
  'privacy-policy.html', 'terms.html', 'sitemap.html', '404.html'
];

const requiredStylesheets = [
  'assets/css/variables.css',
  'assets/css/base.css',
  'assets/css/components.css',
  'assets/css/animations.css',
  'assets/css/hero-center.css',
  'assets/css/section-align.css',
  'assets/css/visual-polish.css'
];

let allPassed = true;

console.log('=== 1. VERIFYING STYLESHEET ORDER & INCLUSION ===');
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const missing = [];
  requiredStylesheets.forEach(css => {
    if (!content.includes(`href="${css}"`)) {
      missing.push(css);
    }
  });
  if (missing.length > 0) {
    console.error(`[FAIL] ${f} is missing stylesheets:`, missing);
    allPassed = false;
  } else {
    console.log(`[PASS] ${f} has all 7 core stylesheets`);
  }
});

console.log('\n=== 2. VERIFYING HTML STRUCTURE & BALANCED TAGS ===');
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  
  // Count key tags
  const openMain = (content.match(/<main[\s>]/gi) || []).length;
  const closeMain = (content.match(/<\/main>/gi) || []).length;
  if (openMain !== closeMain) {
    console.error(`[FAIL] ${f}: Mismatched <main> (${openMain} open vs ${closeMain} close)`);
    allPassed = false;
  }

  const openHeader = (content.match(/<header[\s>]/gi) || []).length;
  const closeHeader = (content.match(/<\/header>/gi) || []).length;
  if (openHeader !== closeHeader) {
    console.error(`[FAIL] ${f}: Mismatched <header> (${openHeader} open vs ${closeHeader} close)`);
    allPassed = false;
  }

  const openFooter = (content.match(/<footer[\s>]/gi) || []).length;
  const closeFooter = (content.match(/<\/footer>/gi) || []).length;
  if (openFooter !== closeFooter) {
    console.error(`[FAIL] ${f}: Mismatched <footer> (${openFooter} open vs ${closeFooter} close)`);
    allPassed = false;
  }

  const openSections = (content.match(/<section[\s>]/gi) || []).length;
  const closeSections = (content.match(/<\/section>/gi) || []).length;
  if (openSections !== closeSections) {
    console.error(`[FAIL] ${f}: Mismatched <section> (${openSections} open vs ${closeSections} close)`);
    allPassed = false;
  }

  // Check div balance
  const openDivs = (content.match(/<div[\s>]/gi) || []).length;
  const closeDivs = (content.match(/<\/div>/gi) || []).length;
  if (openDivs !== closeDivs) {
    console.warn(`[WARN] ${f}: <div> count difference: ${openDivs} open vs ${closeDivs} close`);
  } else {
    console.log(`[PASS] ${f}: Balanced structure (Main: ${openMain}, Header: ${openHeader}, Footer: ${openFooter}, Sections: ${openSections}, Divs: ${openDivs})`);
  }
});

console.log('\n=== 3. VERIFYING CSS FOR PATCHWORK FRAGILITY ===');
const cssFiles = [
  'assets/css/hero-center.css',
  'assets/css/section-align.css',
  'assets/css/visual-polish.css'
];

cssFiles.forEach(cssF => {
  const css = fs.readFileSync(cssF, 'utf8');
  const badPatterns = [
    /\[style\*=/i,
    /max-width:\s*var\(--max-w\)\s*!important/i,
    /div\[style\*="max-width"\]/i
  ];
  badPatterns.forEach(pat => {
    if (pat.test(css)) {
      console.warn(`[ALERT] ${cssF} matches patchwork pattern ${pat}`);
    }
  });
});

console.log('\n=== 4. ANCHOR LINK TARGET VERIFICATION ===');
// Verify that in services.html, #interior, #exterior, #texture, #waterproofing, #ceiling, #pricing all exist
const servicesHtml = fs.readFileSync('services.html', 'utf8');
const expectedServiceIds = ['interior', 'exterior', 'texture', 'waterproofing', 'ceiling', 'pricing', 'calculator', 'faq'];
expectedServiceIds.forEach(id => {
  if (!servicesHtml.includes(`id="${id}"`)) {
    console.error(`[FAIL] services.html missing section id="${id}"`);
    allPassed = false;
  } else {
    console.log(`[PASS] services.html contains id="${id}"`);
  }
});

console.log(`\nOVERALL VERIFICATION: ${allPassed ? 'ALL CHECKS PASSED PERFECTLY!' : 'ISSUES DETECTED'}`);
