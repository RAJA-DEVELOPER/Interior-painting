const fs = require('fs');
const files = [
  'index.html', 'home2.html', 'about.html', 'services.html',
  'blog.html', 'blog-detail.html', 'contact.html', 'maintenance.html',
  'privacy-policy.html', 'terms.html', 'sitemap.html', '404.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  const sections = content.match(/<section[^>]*>/gi) || [];
  const inlineStyles = content.match(/style="[^"]*"/gi) || [];
  const containers = content.match(/class="[^"]*container[^"]*"/gi) || [];
  
  // Find all section tag classes or ids
  const secDetails = sections.map(s => {
    const classMatch = s.match(/class="([^"]*)"/i);
    const idMatch = s.match(/id="([^"]*)"/i);
    return (classMatch ? '.' + classMatch[1].replace(/\s+/g, '.') : '') + (idMatch ? '#' + idMatch[1] : '');
  });

  console.log(`\n=== ${file} ===`);
  console.log(`Sections (${sections.length}):`, secDetails.join(' | '));
  console.log(`Container occurrences: ${containers.length}`);
  console.log(`Inline style attributes: ${inlineStyles.length}`);
});
