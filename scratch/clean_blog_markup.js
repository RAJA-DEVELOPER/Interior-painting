const fs = require('fs');

// 1. Add Section 19 to section-align.css
let css = fs.readFileSync('assets/css/section-align.css', 'utf8');
const blogCss = `
/* ──────────────────────────────────────────────────────────
   19 · BLOG & EDITORIAL COMPONENTS
   ────────────────────────────────────────────────────────── */
.featured-article__content {
  display: flex;
  flex-direction: column;
}
.featured-article__title {
  font-family: var(--serif);
  font-size: var(--fs-h3);
  font-weight: var(--fw-reg);
  color: var(--tx-1);
  line-height: var(--lh-snug);
  margin-bottom: var(--sp-5);
}
.featured-article__desc {
  font-size: var(--fs-15);
  color: var(--tx-3);
  line-height: var(--lh-relaxed);
  margin-bottom: var(--sp-7);
}
.featured-article__author {
  display: flex;
  align-items: center;
  gap: var(--sp-4);
}
.featured-article__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.featured-article__author-name {
  font-size: var(--fs-14);
  font-weight: var(--fw-semi);
  color: var(--tx-1);
}
.featured-article__date {
  font-size: var(--fs-12);
  color: var(--tx-3);
}
.featured-article__link {
  margin-left: auto;
  font-size: var(--fs-13);
  font-weight: var(--fw-semi);
  color: var(--ac);
}

.articles-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--sp-8);
  flex-wrap: wrap;
  gap: var(--sp-4);
}
.articles-title {
  font-family: var(--serif);
  font-size: var(--fs-h3);
  color: var(--tx-1);
}

.spotlight-card-main {
  background: var(--bg-dark);
  border-radius: var(--r-2xl);
  overflow: hidden;
  position: relative;
  min-height: 480px;
  display: flex;
  align-items: flex-end;
}
.spotlight-card-main__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
}
.spotlight-card-main__body {
  position: relative;
  padding: var(--sp-10);
  z-index: 1;
}
.spotlight-card-main__title {
  font-family: var(--serif);
  font-size: var(--fs-32);
  color: #fff;
  line-height: var(--lh-snug);
  margin-bottom: var(--sp-4);
}

.spotlight-side-cards {
  display: flex;
  flex-direction: column;
  gap: var(--col-gap);
}
.spotlight-card-mini {
  background: var(--bg-card);
  border: 1px solid var(--bd);
  border-radius: var(--r-xl);
  overflow: hidden;
}
.spotlight-card-mini__img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
.spotlight-card-mini__body {
  padding: var(--sp-6);
}
.spotlight-card-mini__title {
  font-family: var(--serif);
  font-size: var(--fs-20);
  color: var(--tx-1);
  line-height: var(--lh-snug);
  margin-bottom: var(--sp-4);
}

.topic-card {
  display: flex;
  align-items: center;
  gap: var(--sp-4);
  padding: var(--sp-6);
  background: var(--bg-card);
  border: 1px solid var(--bd);
  border-radius: var(--r-xl);
  transition: var(--tr);
  text-decoration: none;
}
.topic-card__title {
  font-family: var(--serif);
  font-size: var(--fs-20);
  color: var(--tx-1);
}
.topic-card__count {
  font-size: var(--fs-13);
  color: var(--tx-3);
}

.newsletter-box {
  text-align: center;
}
.newsletter-box__title {
  font-family: var(--serif);
  font-size: var(--fs-h2);
  font-weight: var(--fw-light);
  color: #fff;
  margin-bottom: var(--sp-5);
}
.newsletter-box__desc {
  font-size: var(--fs-17);
  color: rgba(255,255,255,0.60);
  max-width: 44ch;
  margin: 0 auto var(--sp-10);
}
.newsletter-form {
  display: flex;
  gap: var(--sp-3);
  max-width: 420px;
  margin: 0 auto;
}
.newsletter-form .form-input {
  background: rgba(255,255,255,0.07);
  border-color: rgba(255,255,255,0.15);
  color: #fff;
  flex: 1;
}
.newsletter-disclaimer {
  font-size: var(--fs-12);
  color: rgba(255,255,255,0.30);
  margin-top: var(--sp-4);
  text-align: center;
}
.newsletter-disclaimer a {
  color: rgba(255,255,255,0.50);
}
`;
css += blogCss;
fs.writeFileSync('assets/css/section-align.css', css, 'utf8');
console.log('Appended Section 19 to section-align.css');

// 2. Clean blog.html
let html = fs.readFileSync('blog.html', 'utf8');

// Featured article
html = html.replace(/<span class="blog-card__cat" style="margin-bottom:var\(--sp-4\)">/g, '<span class="blog-card__cat">');
html = html.replace(/<h2 style="font-family:var\(--serif\);font-size:var\(--fs-h3\);font-weight:var\(--fw-reg\);color:var\(--tx-1\);line-height:var\(--lh-snug\);margin-bottom:var\(--sp-5\)">/g, '<h2 class="featured-article__title">');
html = html.replace(/<p style="font-size:var\(--fs-15\);color:var\(--tx-3\);line-height:var\(--lh-relaxed\);margin-bottom:var\(--sp-7\)">/g, '<p class="featured-article__desc">');
html = html.replace(/<div style="display:flex;align-items:center;gap:var\(--sp-4\)">/g, '<div class="featured-article__author">');
html = html.replace(/style="width:40px;height:40px;border-radius:50%;object-fit:cover"/g, 'class="featured-article__avatar"');
html = html.replace(/<div style="font-size:var\(--fs-14\);font-weight:var\(--fw-semi\);color:var\(--tx-1\)">/g, '<div class="featured-article__author-name">');
html = html.replace(/<div style="font-size:var\(--fs-12\);color:var\(--tx-3\)">/g, '<div class="featured-article__date">');
html = html.replace(/<span style="margin-left:auto;font-size:var\(--fs-13\);font-weight:var\(--fw-semi\);color:var\(--ac\)">/g, '<span class="featured-article__link">');

// Articles Section Header
html = html.replace(/<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var\(--sp-8\);flex-wrap:wrap;gap:var\(--sp-4\)">/g, '<div class="articles-header">');
html = html.replace(/<h2 style="font-family:var\(--serif\);font-size:var\(--fs-h3\);color:var\(--tx-1\)" class="reveal">/g, '<h2 class="articles-title reveal">');
html = html.replace(/<div class="filter-bar" style="margin-bottom:0"/g, '<div class="filter-bar"');

// Popular posts
html = html.replace(/class="popular-post" style="text-decoration:none"/g, 'class="popular-post"');

// Spotlight Section
html = html.replace(/<article style="background:var\(--bg-dark\);border-radius:var\(--r-2xl\);overflow:hidden;position:relative;min-height:480px;display:flex;align-items:flex-end" class="reveal delay-1">/g, '<article class="spotlight-card-main reveal delay-1">');
html = html.replace(/style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0\.5"/g, 'class="spotlight-card-main__img"');
html = html.replace(/<div style="position:relative;padding:var\(--sp-10\)">/g, '<div class="spotlight-card-main__body">');
html = html.replace(/<span class="blog-card__cat" style="display:block;margin-bottom:var\(--sp-3\)">/g, '<span class="blog-card__cat">');
html = html.replace(/<h3 style="font-family:var\(--serif\);font-size:var\(--fs-32\);color:#fff;line-height:var\(--lh-snug\);margin-bottom:var\(--sp-4\)">/g, '<h3 class="spotlight-card-main__title">');

html = html.replace(/<div style="display:flex;flex-direction:column;gap:var\(--col-gap\)">/g, '<div class="spotlight-side-cards">');
html = html.replace(/<article style="background:var\(--bg-card\);border:1px solid var\(--bd\);border-radius:var\(--r-xl\);overflow:hidden" class="reveal delay-2">/g, '<article class="spotlight-card-mini reveal delay-2">');
html = html.replace(/<article style="background:var\(--bg-card\);border:1px solid var\(--bd\);border-radius:var\(--r-xl\);overflow:hidden" class="reveal delay-3">/g, '<article class="spotlight-card-mini reveal delay-3">');
html = html.replace(/style="width:100%;height:180px;object-fit:cover"/g, 'class="spotlight-card-mini__img"');
html = html.replace(/<div style="padding:var\(--sp-6\)">/g, '<div class="spotlight-card-mini__body">');
html = html.replace(/<span class="blog-card__cat" style="display:block;margin-bottom:var\(--sp-2\)">/g, '<span class="blog-card__cat">');
html = html.replace(/<h3 style="font-family:var\(--serif\);font-size:var\(--fs-20\);color:var\(--tx-1\);line-height:var\(--lh-snug\);margin-bottom:var\(--sp-4\)">/g, '<h3 class="spotlight-card-mini__title">');
html = html.replace(/class="btn-arrow" style="font-size:var\(--fs-13\)"/g, 'class="btn-arrow"');

// Topics Section
html = html.replace(/<a href="#" style="display:flex;align-items:center;gap:var\(--sp-4\);padding:var\(--sp-6\);background:var\(--bg-card\);border:1px solid var\(--bd\);border-radius:var\(--r-xl\);transition:var\(--tr\);text-decoration:none" class="reveal delay-(\d) hover-lift">/g, '<a href="#" class="topic-card reveal delay-$1 hover-lift">');
html = html.replace(/<div style="font-family:var\(--serif\);font-size:var\(--fs-20\);color:var\(--tx-1\)">/g, '<div class="topic-card__title">');
html = html.replace(/<div style="font-size:var\(--fs-13\);color:var\(--tx-3\)">/g, '<div class="topic-card__count">');

// Newsletter Section
html = html.replace(/<div class="container container-tight" style="text-align:center">/g, '<div class="container container-tight newsletter-box">');
html = html.replace(/<h2 style="font-family:var\(--serif\);font-size:var\(--fs-h2\);font-weight:var\(--fw-light\);color:#fff;margin-bottom:var\(--sp-5\)" class="reveal">/g, '<h2 class="newsletter-box__title reveal">');
html = html.replace(/<p style="font-size:var\(--fs-17\);color:rgba\(255,255,255,0\.60\);max-width:44ch;margin:0 auto var\(--sp-10\)" class="reveal">/g, '<p class="newsletter-box__desc reveal">');
html = html.replace(/<form style="display:flex;gap:var\(--sp-3\);max-width:420px;margin:0 auto" class="reveal"/g, '<form class="newsletter-form reveal"');
html = html.replace(/style="background:rgba\(255,255,255,0\.07\);border-color:rgba\(255,255,255,0\.15\);color:#fff;flex:1"/g, '');
html = html.replace(/<p style="font-size:var\(--fs-12\);color:rgba\(255,255,255,0\.30\);margin-top:var\(--sp-4\)" class="reveal">/g, '<p class="newsletter-disclaimer reveal">');
html = html.replace(/style="color:rgba\(255,255,255,0\.50\)"/g, '');

fs.writeFileSync('blog.html', html, 'utf8');
console.log('Cleaned blog.html successfully!');
