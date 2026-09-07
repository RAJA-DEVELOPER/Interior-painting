const fs = require('fs');
const path = require('path');

const files = [
  'index.html', 'home2.html', 'about.html', 'services.html',
  'blog.html', 'blog-detail.html', 'contact.html', 'maintenance.html',
  'privacy-policy.html', 'terms.html', 'sitemap.html', '404.html'
];

let brokenCount = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Match src="..." and href="..." that point to local files (assets/...)
  const regex = /(?:src|href)="([^"]+)"/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const assetPath = m[1];
    if (assetPath.startsWith('http://') || assetPath.startsWith('https://') || assetPath.startsWith('#') || assetPath.startsWith('mailto:') || assetPath.startsWith('tel:')) {
      continue;
    }
    // Remove query params or hash
    const cleanAsset = assetPath.split('?')[0].split('#')[0];
    if (!cleanAsset) continue;
    if (!fs.existsSync(cleanAsset)) {
      console.error(`[BROKEN] in ${file}: "${cleanAsset}" not found`);
      brokenCount++;
    }
  }
});

console.log(`Local asset check finished: ${brokenCount} broken local assets.`);
