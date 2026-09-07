const fs = require('fs');

const files = [
  'index.html', 'home2.html', 'about.html', 'services.html',
  'blog.html', 'blog-detail.html', 'contact.html', 'maintenance.html',
  'privacy-policy.html', 'terms.html', 'sitemap.html', '404.html'
];

files.forEach(file => {
  const html = fs.readFileSync(file, 'utf8');
  console.log(`\n======================================================`);
  console.log(`PAGE: ${file}`);
  console.log(`======================================================`);

  // Match all <section ...> or main content blocks
  const secRegex = /<section([\s\S]*?)<\/section>/gi;
  let match;
  let count = 0;
  while ((match = secRegex.exec(html)) !== null) {
    count++;
    const fullSec = match[0];
    const openTag = match[1].split('>')[0];
    const hasContainer = /class="[^"]*container[^"]*"/.test(fullSec);
    const containerType = (fullSec.match(/class="[^"]*(container(?:-narrow|-tight)?)[^"]*"/i) || [])[1] || 'none';
    
    // Check header
    const hasSecHeader = /class="[^"]*sec-header[^"]*"/.test(fullSec);
    const hasEyebrow = /class="[^"]*eyebrow[^"]*"/.test(fullSec);
    const hasSecTitle = /class="[^"]*sec-title[^"]*"/.test(fullSec);
    const hasSecSubtitle = /class="[^"]*sec-subtitle[^"]*"/.test(fullSec);
    
    // Check h1/h2/h3
    const headings = (fullSec.match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/gi) || [])
      .map(h => h.replace(/<[^>]+>/g, '').trim().substring(0, 40));

    console.log(`Section ${count}: <section${openTag}>`);
    console.log(`  Container: ${containerType} | Header: sec-header=${hasSecHeader}, eyebrow=${hasEyebrow}, title=${hasSecTitle}, sub=${hasSecSubtitle}`);
    console.log(`  Headings: ${headings.slice(0, 3).join(' | ')}`);
  }
});
