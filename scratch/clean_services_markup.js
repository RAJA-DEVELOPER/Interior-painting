const fs = require('fs');
let content = fs.readFileSync('services.html', 'utf8');

// 1. Service detail body classes for Exterior and Texture
content = content.replace(
  '<div class="service-detail reverse" id="exterior" aria-label="Exterior painting service">\n          <div class="service-detail__img hover-img">\n            <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80"\n                 alt="Exterior home painting with premium coating" loading="lazy">\n          </div>\n          <div class="reveal">',
  '<div class="service-detail reverse" id="exterior" aria-label="Exterior painting service">\n          <div class="service-detail__img hover-img">\n            <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80"\n                 alt="Exterior home painting with premium coating" loading="lazy">\n          </div>\n          <div class="service-detail__body reveal">'
);
// Also handle CRLF if needed
content = content.replace(
  '<div class="service-detail reverse" id="exterior" aria-label="Exterior painting service">\r\n          <div class="service-detail__img hover-img">\r\n            <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80"\r\n                 alt="Exterior home painting with premium coating" loading="lazy">\r\n          </div>\r\n          <div class="reveal">',
  '<div class="service-detail reverse" id="exterior" aria-label="Exterior painting service">\r\n          <div class="service-detail__img hover-img">\r\n            <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80"\r\n                 alt="Exterior home painting with premium coating" loading="lazy">\r\n          </div>\r\n          <div class="service-detail__body reveal">'
);

content = content.replace(
  '<div class="service-detail" id="texture" aria-label="Texture finishes service">\n          <div class="service-detail__img hover-img">\n            <img src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80"\n                 alt="Artistic texture wall finish application" loading="lazy">\n          </div>\n          <div class="reveal">',
  '<div class="service-detail" id="texture" aria-label="Texture finishes service">\n          <div class="service-detail__img hover-img">\n            <img src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80"\n                 alt="Artistic texture wall finish application" loading="lazy">\n          </div>\n          <div class="service-detail__body reveal">'
);
content = content.replace(
  '<div class="service-detail" id="texture" aria-label="Texture finishes service">\r\n          <div class="service-detail__img hover-img">\r\n            <img src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80"\r\n                 alt="Artistic texture wall finish application" loading="lazy">\r\n          </div>\r\n          <div class="reveal">',
  '<div class="service-detail" id="texture" aria-label="Texture finishes service">\r\n          <div class="service-detail__img hover-img">\r\n            <img src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80"\r\n                 alt="Artistic texture wall finish application" loading="lazy">\r\n          </div>\r\n          <div class="service-detail__body reveal">'
);

// 2. Clean Dual Service Cards
content = content.replace(/<div style="aspect-ratio:16\/9;overflow:hidden">/g, '<div class="dual-service-img">');
content = content.replace(/<img ([^>]+) style="width:100%;height:100%;object-fit:cover;transition:transform 0\.7s var\(--ease-out\)">/g, '<img $1>');
content = content.replace(/<h2 style="font-family:var\(--serif\);font-size:var\(--fs-h3\);font-weight:var\(--fw-light\);color:var\(--tx-1\);margin-bottom:var\(--sp-5\)">/g, '<h2 class="dual-service-title">');
content = content.replace(/<p style="font-size:var\(--fs-15\);color:var\(--tx-2\);line-height:var\(--lh-relaxed\);margin-bottom:var\(--sp-6\)">/g, '<p class="dual-service-desc">');
content = content.replace(/<ul style="display:flex;flex-direction:column;gap:var\(--sp-3\);margin-bottom:var\(--sp-7\)">/g, '<ul class="dual-service-list">');
content = content.replace(/<li style="display:flex;gap:var\(--sp-3\);font-size:var\(--fs-14\);color:var\(--tx-2\)"><span class="service-feature-dot"[^>]*><\/span>/g, '<li><span class="service-feature-dot"></span>');
content = content.replace(/<a href="contact\.html" class="btn btn-primary" style="margin-top:auto;align-self:flex-start">/g, '<a href="contact.html" class="btn btn-primary">');

// 3. Consultation Banner
content = content.replace(
  /<p class="eyebrow" style="color:var\(--ac\)">Service 06<\/p>\s*<h2 style="font-family:var\(--serif\);font-size:var\(--fs-h3\);font-weight:var\(--fw-light\);color:#fff;margin-bottom:var\(--sp-5\)">Colour Consultation<\/h2>\s*<p style="font-size:var\(--fs-15\);color:rgba\(255,255,255,0\.65\);line-height:var\(--lh-relaxed\)">/g,
  '<p class="eyebrow" style="color:var(--ac)">Service 06</p>\n            <h2 class="consultation-banner__title">Colour Consultation</h2>\n            <p class="consultation-banner__desc">'
);
content = content.replace(/<div style="text-align:right">/g, '<div class="consultation-banner__action">');
content = content.replace(/<div style="font-family:var\(--serif\);font-size:var\(--fs-48\);color:var\(--ac\);line-height:1;margin-bottom:var\(--sp-3\)">Free<\/div>/g, '<div class="consultation-banner__price">Free</div>');
content = content.replace(/<div style="font-size:var\(--fs-14\);color:rgba\(255,255,255,0\.50\);margin-bottom:var\(--sp-6\)">/g, '<div class="consultation-banner__note">');

// 4. Pricing & Rate table
content = content.replace(/style="width:100%;justify-content:center"/g, '');
content = content.replace(/<div style="margin-top:var\(--sp-16\)" class="reveal">/g, '<div class="rate-table-wrapper reveal">');
content = content.replace(/<h3 style="font-family:var\(--serif\);font-size:var\(--fs-h3\);color:var\(--tx-1\);margin-bottom:var\(--sp-8\);text-align:center">Service Rate Card<\/h3>/g, '<h3 class="rate-table-title">Service Rate Card</h3>');
content = content.replace(/<div style="overflow-x:auto;border-radius:var\(--r-lg\);box-shadow:var\(--sh-md\)">/g, '<div class="rate-table-container">');
content = content.replace(/<p style="font-size:var\(--fs-13\);color:var\(--tx-3\);margin-top:var\(--sp-4\);text-align:center">/g, '<p class="rate-table-footnote">');

// 5. Calculator
content = content.replace(/<div style="background:var\(--bg-card\);border:1px solid var\(--bd\);border-radius:var\(--r-2xl\);padding:var\(--sp-10\) var\(--sp-12\);" class="reveal">/g, '<div class="calculator-card reveal">');
content = content.replace(/<div style="margin-top:var\(--sp-8\);padding:var\(--sp-7\);background:var\(--bg-alt\);border-radius:var\(--r-lg\);display:flex;align-items:center;justify-content:space-between;gap:var\(--sp-4\);flex-wrap:wrap">/g, '<div class="calc-result-box">');
content = content.replace(/<div id="calc-result" style="font-family:var\(--serif\);font-size:var\(--fs-36\);color:var\(--ac\);line-height:1">/g, '<div id="calc-result" class="calc-result-number">');

fs.writeFileSync('services.html', content, 'utf8');
console.log('Cleaned services.html successfully!');
