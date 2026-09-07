const fs = require('fs');
const html = fs.readFileSync('blog-detail.html', 'utf8');
const lines = html.split('\n');

lines.forEach((l, idx) => {
  if (l.includes('style=')) {
    console.log(`L${idx + 1}: ${l.trim()}`);
  }
});
