const fs = require('fs');

const files = [
  'index.html', 'home2.html', 'about.html', 'services.html',
  'blog.html', 'blog-detail.html', 'contact.html', 'sitemap.html'
];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  console.log(`\n================== ${file} INLINE STYLES ==================`);
  lines.forEach((line, i) => {
    if (line.includes('style=')) {
      const match = line.match(/<([a-z0-9]+)[^>]*style="([^"]*)"/i);
      if (match) {
        console.log(`L${i+1} <${match[1]}>: ${match[2]}`);
      }
    }
  });
});
