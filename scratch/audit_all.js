const fs = require('fs');

const files = [
  'index.html', 'home2.html', 'about.html', 'services.html',
  'blog.html', 'blog-detail.html', 'contact.html', 'maintenance.html',
  'privacy-policy.html', 'terms.html', 'sitemap.html', '404.html'
];

const report = {};

files.forEach(file => {
  const html = fs.readFileSync(file, 'utf8');
  report[file] = {
    sections: [],
    inlineStylesCount: (html.match(/style="[^"]*"/gi) || []).length,
    stylesheets: (html.match(/href="assets\/css\/[^"]*"/gi) || []).map(s => s.replace('href="assets/css/', '').replace('"', '')),
    hasHeader: /<header[^>]*class="[^"]*navbar/.test(html),
    hasFooter: /<footer[^>]*class="[^"]*footer/.test(html)
  };

  const secRegex = /<section([\s\S]*?)<\/section>/gi;
  let match, count = 0;
  while ((match = secRegex.exec(html)) !== null) {
    count++;
    const fullSec = match[0];
    const openTag = match[1].split('>')[0];
    const classMatch = openTag.match(/class="([^"]*)"/i);
    const idMatch = openTag.match(/id="([^"]*)"/i);
    const containerMatches = fullSec.match(/class="[^"]*(container(?:-narrow|-tight)?)[^"]*"/gi) || [];
    const containerClasses = containerMatches.map(m => (m.match(/class="([^"]*)"/i) || [])[1]);
    
    // Check header structure inside this section
    const hasSecHeader = /class="[^"]*sec-header[^"]*"/.test(fullSec);
    const isCenter = /class="[^"]*sec-header[^"]*center[^"]*"/.test(fullSec);
    const hasEyebrow = /class="[^"]*eyebrow[^"]*"/.test(fullSec);
    const hasSecTitle = /class="[^"]*sec-title[^"]*"/.test(fullSec);
    const hasSecSubtitle = /class="[^"]*sec-subtitle[^"]*"/.test(fullSec);

    // Section inline styles
    const secInlineStyles = (fullSec.match(/style="[^"]*"/gi) || []).length;

    report[file].sections.push({
      num: count,
      id: idMatch ? idMatch[1] : null,
      class: classMatch ? classMatch[1] : '',
      containers: containerClasses,
      secHeader: { exists: hasSecHeader, center: isCenter, eyebrow: hasEyebrow, title: hasSecTitle, subtitle: hasSecSubtitle },
      inlineStylesCount: secInlineStyles
    });
  }
});

fs.writeFileSync('scratch/audit_report.json', JSON.stringify(report, null, 2));
console.log('Report written to scratch/audit_report.json');
