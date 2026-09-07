const fs = require('fs');
const css = fs.readFileSync('assets/css/visual-polish.css', 'utf8');
const lines = css.split('\n');

lines.forEach((l, idx) => {
  if (l.includes('[style*=')) {
    console.log(`L${idx + 1}: ${l.trim()}`);
  }
});
