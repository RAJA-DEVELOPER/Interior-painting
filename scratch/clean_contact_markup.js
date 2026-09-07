const fs = require('fs');

// 1. Add Section 21 to section-align.css
let css = fs.readFileSync('assets/css/section-align.css', 'utf8');
const contactCss = `
/* ──────────────────────────────────────────────────────────
   21 · CONTACT PAGE COMPONENTS
   ────────────────────────────────────────────────────────── */
.quote-form-subtitle {
  font-size: var(--fs-16);
  color: var(--tx-3);
  margin-bottom: var(--sp-8);
}
.service-select-heading {
  font-size: var(--fs-13);
  font-weight: var(--fw-semi);
  color: var(--tx-2);
  margin-bottom: var(--sp-4);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
}
.quote-submit-btn {
  width: 100%;
  justify-content: center;
  margin-top: var(--sp-6);
}
.quote-submit-note {
  font-size: var(--fs-12);
  color: var(--tx-3);
  margin-top: var(--sp-3);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.why-us-promises {
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
  margin-top: var(--sp-7);
}
.promise-title {
  font-family: var(--serif);
  font-size: var(--fs-20);
  color: var(--tx-1);
  margin-bottom: var(--sp-2);
}
.promise-desc {
  font-size: var(--fs-13);
  color: var(--tx-3);
}

.social-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--sp-4);
  padding: var(--sp-8);
  border-radius: var(--r-xl);
  text-decoration: none;
  transition: var(--tr);
}
.social-card__title {
  font-family: var(--serif);
  font-size: var(--fs-20);
  color: var(--tx-1);
}
.social-card__handle {
  font-size: var(--fs-13);
  color: var(--tx-3);
}
.social-card__stat {
  font-size: var(--fs-12);
  color: var(--tx-3);
}
.social-card--instagram {
  background: linear-gradient(135deg, rgba(225,48,108,0.13), rgba(225,48,108,0.03));
  border: 1px solid rgba(225,48,108,0.15);
  color: #E1306C;
}
.social-card--facebook {
  background: linear-gradient(135deg, rgba(24,119,242,0.13), rgba(24,119,242,0.03));
  border: 1px solid rgba(24,119,242,0.15);
  color: #1877F2;
}
.social-card--whatsapp {
  background: linear-gradient(135deg, rgba(37,211,102,0.13), rgba(37,211,102,0.03));
  border: 1px solid rgba(37,211,102,0.15);
  color: #25D366;
}
.social-card--linkedin {
  background: linear-gradient(135deg, rgba(10,102,194,0.13), rgba(10,102,194,0.03));
  border: 1px solid rgba(10,102,194,0.15);
  color: #0A66C2;
}
`;
css += contactCss;
fs.writeFileSync('assets/css/section-align.css', css, 'utf8');
console.log('Appended Section 21 to section-align.css');

// 2. Clean contact.html
let html = fs.readFileSync('contact.html', 'utf8');

// Quote form intro
html = html.replace(/<p style="font-size:var\(--fs-16\);color:var\(--tx-3\);margin-bottom:var\(--sp-8\)">Fill in the form and our expert will call to schedule a visit at your convenience\.<\/p>/g, '<p class="quote-form-subtitle">Fill in the form and our expert will call to schedule a visit at your convenience.</p>');
html = html.replace(/<p style="font-size:var\(--fs-13\);font-weight:var\(--fw-semi\);color:var\(--tx-2\);margin-bottom:var\(--sp-4\);letter-spacing:var\(--ls-wide\)">SELECT SERVICES<\/p>/g, '<p class="service-select-heading">SELECT SERVICES</p>');
html = html.replace(/<button type="submit" class="btn btn-primary btn-lg" style="width:100%;justify-content:center;margin-top:var\(--sp-6\)" id="submitBtn">/g, '<button type="submit" class="btn btn-primary btn-lg quote-submit-btn" id="submitBtn">');
html = html.replace(/<p style="font-size:var\(--fs-12\);color:var\(--tx-3\);margin-top:var\(--sp-3\);text-align:center;display:flex;align-items:center;justify-content:center;gap:6px">/g, '<p class="quote-submit-note">');

// Why us promises
html = html.replace(/<div style="display:flex;flex-direction:column;gap:var\(--sp-4\);margin-top:var\(--sp-7\)">/g, '<div class="why-us-promises">');
html = html.replace(/<div style="font-family:var\(--serif\);font-size:var\(--fs-20\);color:var\(--tx-1\);margin-bottom:var\(--sp-2\)">/g, '<div class="promise-title">');
html = html.replace(/<div style="font-size:var\(--fs-13\);color:var\(--tx-3\)">/g, '<div class="promise-desc">');

// Social cards
html = html.replace(/<a href="#" style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:var\(--sp-4\);padding:var\(--sp-8\);background:linear-gradient\(135deg,#E1306C22,#E1306C08\);border:1px solid rgba\(225,48,108,0\.15\);border-radius:var\(--r-xl\);text-decoration:none;transition:var\(--tr\)" class="reveal delay-1 hover-lift">/g, '<a href="#" class="social-card social-card--instagram reveal delay-1 hover-lift">');
html = html.replace(/<svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" style="color:#E1306C">/g, '<svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">');

html = html.replace(/<a href="#" style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:var\(--sp-4\);padding:var\(--sp-8\);background:linear-gradient\(135deg,#1877F222,#1877F208\);border:1px solid rgba\(24,119,242,0\.15\);border-radius:var\(--r-xl\);text-decoration:none;transition:var\(--tr\)" class="reveal delay-2 hover-lift">/g, '<a href="#" class="social-card social-card--facebook reveal delay-2 hover-lift">');
html = html.replace(/<svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" style="color:#1877F2">/g, '<svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">');

html = html.replace(/<a href="https:\/\/wa\.me\/919820000123" style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:var\(--sp-4\);padding:var\(--sp-8\);background:linear-gradient\(135deg,#25D36622,#25D36608\);border:1px solid rgba\(37,211,102,0\.15\);border-radius:var\(--r-xl\);text-decoration:none;transition:var\(--tr\)" class="reveal delay-3 hover-lift" target="_blank" rel="noopener noreferrer">/g, '<a href="https://wa.me/919820000123" class="social-card social-card--whatsapp reveal delay-3 hover-lift" target="_blank" rel="noopener noreferrer">');
html = html.replace(/<svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" style="color:#25D366">/g, '<svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">');

html = html.replace(/<a href="#" style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:var\(--sp-4\);padding:var\(--sp-8\);background:linear-gradient\(135deg,#0A66C222,#0A66C208\);border:1px solid rgba\(10,102,194,0\.15\);border-radius:var\(--r-xl\);text-decoration:none;transition:var\(--tr\)" class="reveal delay-4 hover-lift">/g, '<a href="#" class="social-card social-card--linkedin reveal delay-4 hover-lift">');
html = html.replace(/<svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" style="color:#0A66C2">/g, '<svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">');

html = html.replace(/<div class="promise-desc">@renovacraft<\/div>/g, '<div class="social-card__handle">@renovacraft</div>');
html = html.replace(/<div style="font-size:var\(--fs-12\);color:var\(--tx-3\)">12\.4K followers<\/div>/g, '<div class="social-card__stat">12.4K followers</div>');

html = html.replace(/<div class="promise-desc">RENOVA Mumbai<\/div>/g, '<div class="social-card__handle">RENOVA Mumbai</div>');
html = html.replace(/<div style="font-size:var\(--fs-12\);color:var\(--tx-3\)">8\.1K likes<\/div>/g, '<div class="social-card__stat">8.1K likes</div>');

html = html.replace(/<div class="promise-desc">\+91 98200 00123<\/div>/g, '<div class="social-card__handle">+91 98200 00123</div>');
html = html.replace(/<div style="font-size:var\(--fs-12\);color:var\(--tx-3\)">Reply in 15 mins<\/div>/g, '<div class="social-card__stat">Reply in 15 mins</div>');

html = html.replace(/<div class="promise-desc">RENOVA Official<\/div>/g, '<div class="social-card__handle">RENOVA Official</div>');
html = html.replace(/<div style="font-size:var\(--fs-12\);color:var\(--tx-3\)">3\.2K followers<\/div>/g, '<div class="social-card__stat">3.2K followers</div>');

fs.writeFileSync('contact.html', html, 'utf8');
console.log('Cleaned contact.html successfully!');
