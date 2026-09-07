const fs = require('fs');
let css = fs.readFileSync('assets/css/visual-polish.css', 'utf8');
css = css.replace('.dual-service-card > div[style*="aspect-ratio"],', '.dual-service-img,');
fs.writeFileSync('assets/css/visual-polish.css', css, 'utf8');
console.log('Cleaned patchwork selector in visual-polish.css!');
