const fs = require('fs');
let html = fs.readFileSync('about.html', 'utf8');

// Replace hero inline style
html = html.replace(
  '<div class="container about-hero__content">\n        <div style="max-width: 64ch;">',
  '<div class="container about-hero__content">\n        <div class="about-hero__inner">'
);
html = html.replace(
  '<div class="container about-hero__content">\r\n        <div style="max-width: 64ch;">',
  '<div class="container about-hero__content">\r\n        <div class="about-hero__inner">'
);

// Replace story stats row
const oldStatsRegex = /<div style="display:flex;gap:var\(--sp-10\);margin-bottom:var\(--sp-8\);flex-wrap:wrap;align-items:center">[\s\S]*?<\/div>\s*<\/div>\s*<a href="contact\.html"/;

const newStats = `<div class="story-stats-row">
              <div class="story-stat-item">
                <div class="story-stat-num">14</div>
                <div class="story-stat-label">Years</div>
              </div>
              <div class="story-stat-divider"></div>
              <div class="story-stat-item">
                <div class="story-stat-num">80+</div>
                <div class="story-stat-label">Artisans</div>
              </div>
              <div class="story-stat-divider"></div>
              <div class="story-stat-item">
                <div class="story-stat-num">4.2k</div>
                <div class="story-stat-label">Projects</div>
              </div>
            </div>
            <a href="contact.html"`;

if (oldStatsRegex.test(html)) {
  html = html.replace(oldStatsRegex, newStats);
  fs.writeFileSync('about.html', html, 'utf8');
  console.log('Successfully cleaned about.html!');
} else {
  console.error('Could not match stats in about.html');
}
