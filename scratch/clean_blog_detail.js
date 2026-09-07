const fs = require('fs');

// 1. Add Section 20 to section-align.css if not already added
let css = fs.readFileSync('assets/css/section-align.css', 'utf8');
if (!css.includes('20 · ARTICLE & DETAIL COMPONENTS')) {
  const articleCss = `
/* ──────────────────────────────────────────────────────────
   20 · ARTICLE & DETAIL COMPONENTS
   ────────────────────────────────────────────────────────── */
.author-bio-card {
  background: var(--bg-alt);
  border-radius: var(--r-xl);
  padding: var(--sp-8);
  display: flex;
  gap: var(--sp-6);
  align-items: flex-start;
  margin-top: var(--sp-12);
  border: 1px solid var(--bd);
}
.author-bio-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}
.author-bio-name {
  font-family: var(--serif);
  font-size: var(--fs-20);
  color: var(--tx-1);
  margin-bottom: var(--sp-1);
}
.author-bio-role {
  font-size: var(--fs-13);
  color: var(--ac);
  margin-bottom: var(--sp-3);
}
.author-bio-text {
  font-size: var(--fs-14);
  color: var(--tx-3);
  line-height: var(--lh-relaxed);
}

.article-share {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  flex-wrap: wrap;
  margin-top: var(--sp-8);
  padding-top: var(--sp-6);
  border-top: 1px solid var(--bd);
}
.article-share-label {
  font-size: var(--fs-13);
  color: var(--tx-3);
}

.article-toc-widget {
  background: var(--bg-card);
  border: 1px solid var(--bd);
  border-radius: var(--r-xl);
  padding: var(--sp-7);
  margin-bottom: var(--sp-6);
}
.article-toc-title {
  font-size: var(--fs-13);
  font-weight: var(--fw-semi);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  color: var(--tx-3);
  margin-bottom: var(--sp-4);
}

.sidebar-cta-widget {
  background: var(--bg-dark);
  border-radius: var(--r-xl);
  padding: var(--sp-7);
  text-align: center;
}
.sidebar-cta-title {
  font-family: var(--serif);
  font-size: var(--fs-22);
  color: #fff;
  margin-bottom: var(--sp-4);
}
.sidebar-cta-desc {
  font-size: var(--fs-13);
  color: rgba(255,255,255,0.55);
  margin-bottom: var(--sp-6);
}
.sidebar-cta-widget .btn {
  width: 100%;
  justify-content: center;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: var(--sp-6);
}
.comment-item {
  display: flex;
  gap: var(--sp-4);
  padding: var(--sp-6);
  background: var(--bg-alt);
  border-radius: var(--r-xl);
}
.comment-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}
.comment-header {
  display: flex;
  gap: var(--sp-4);
  align-items: baseline;
  flex-wrap: wrap;
  margin-bottom: var(--sp-2);
}
.comment-author {
  font-weight: var(--fw-semi);
  color: var(--tx-1);
}
.comment-time {
  font-size: var(--fs-12);
  color: var(--tx-3);
}
.comment-body {
  font-size: var(--fs-15);
  color: var(--tx-2);
  line-height: var(--lh-relaxed);
}

.comment-form-card {
  margin-top: var(--sp-10);
  padding: var(--sp-8);
  background: var(--bg-alt);
  border-radius: var(--r-xl);
  border: 1px solid var(--bd);
}
.comment-form-title {
  font-family: var(--serif);
  font-size: var(--fs-24);
  color: var(--tx-1);
  margin-bottom: var(--sp-6);
}

.recommended-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--col-gap);
  margin-top: var(--sp-10);
}
.recommended-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--sp-4);
  padding: var(--sp-8);
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--r-xl);
  transition: var(--tr);
  text-decoration: none;
}
.recommended-card__title {
  font-family: var(--serif);
  font-size: var(--fs-22);
  color: #fff;
}
.recommended-card__desc {
  font-size: var(--fs-14);
  color: rgba(255,255,255,0.55);
}
.recommended-card__link {
  font-size: var(--fs-13);
  color: var(--ac);
  font-weight: var(--fw-semi);
}
@media (max-width: 900px) {
  .recommended-grid {
    grid-template-columns: 1fr;
  }
}
`;
  css += articleCss;
  fs.writeFileSync('assets/css/section-align.css', css, 'utf8');
  console.log('Appended Section 20 to section-align.css');
}

// 2. Clean blog-detail.html
let html = fs.readFileSync('blog-detail.html', 'utf8');

// Author Bio
html = html.replace(/<div style="background:var\(--bg-alt\);border-radius:var\(--r-xl\);padding:var\(--sp-8\);display:flex;gap:var\(--sp-6\);align-items:flex-start;margin-top:var\(--sp-12\);border:1px solid var\(--bd\)">/g, '<div class="author-bio-card">');
html = html.replace(/alt="Ananya Krishnan" style="width:70px;height:70px;border-radius:50%;object-fit:cover;flex-shrink:0"/g, 'alt="Ananya Krishnan" class="author-bio-avatar"');
html = html.replace(/<div style="font-family:var\(--serif\);font-size:var\(--fs-20\);color:var\(--tx-1\);margin-bottom:var\(--sp-1\)">/g, '<div class="author-bio-name">');
html = html.replace(/<div style="font-size:var\(--fs-13\);color:var\(--ac\);margin-bottom:var\(--sp-3\)">/g, '<div class="author-bio-role">');
html = html.replace(/<p style="font-size:var\(--fs-14\);color:var\(--tx-3\);line-height:var\(--lh-relaxed\)">/g, '<p class="author-bio-text">');

// Share
html = html.replace(/<div style="display:flex;gap:var\(--sp-3\);align-items:center;margin-top:var\(--sp-8\);padding-top:var\(--sp-6\);border-top:1px solid var\(--bd\);flex-wrap:wrap">/g, '<div class="article-share">');
html = html.replace(/<span style="font-size:var\(--fs-13\);color:var\(--tx-3\);line-height:2\.5">/g, '<span class="article-share-label">');
html = html.replace(/class="btn btn-sm btn-secondary" style="font-size:var\(--fs-12\)"/g, 'class="btn btn-sm btn-secondary"');

// TOC & Sidebar CTA
html = html.replace(/<div style="background:var\(--bg-card\);border:1px solid var\(--bd\);border-radius:var\(--r-xl\);padding:var\(--sp-7\);margin-bottom:var\(--sp-6\)">/g, '<div class="article-toc-widget">');
html = html.replace(/<h4 style="font-size:var\(--fs-13\);font-weight:var\(--fw-semi\);letter-spacing:var\(--ls-widest\);text-transform:uppercase;color:var\(--tx-3\);margin-bottom:var\(--sp-4\)">/g, '<h4 class="article-toc-title">');
html = html.replace(/<div style="background:var\(--bg-dark\);border-radius:var\(--r-xl\);padding:var\(--sp-7\);text-align:center">/g, '<div class="sidebar-cta-widget">');
html = html.replace(/<p style="font-family:var\(--serif\);font-size:var\(--fs-22\);color:#fff;margin-bottom:var\(--sp-4\)">/g, '<p class="sidebar-cta-title">');
html = html.replace(/<p style="font-size:var\(--fs-13\);color:rgba\(255,255,255,0\.55\);margin-bottom:var\(--sp-6\)">/g, '<p class="sidebar-cta-desc">');
html = html.replace(/<a href="contact\.html" class="btn btn-primary" style="width:100%;justify-content:center">/g, '<a href="contact.html" class="btn btn-primary">');

// Related & Comments
html = html.replace(/<div class="grid grid-3" style="margin-top:var\(--sp-10\)">/g, '<div class="grid grid-3">');
html = html.replace(/<div style="display:flex;flex-direction:column;gap:var\(--sp-6\)">/g, '<div class="comments-list">');
html = html.replace(/<div style="display:flex;gap:var\(--sp-4\);padding:var\(--sp-6\);background:var\(--bg-alt\);border-radius:var\(--r-xl\)" class="reveal delay-(\d)">/g, '<div class="comment-item reveal delay-$1">');
html = html.replace(/style="width:48px;height:48px;border-radius:50%;object-fit:cover;flex-shrink:0"/g, 'class="comment-avatar"');
html = html.replace(/<div style="display:flex;gap:var\(--sp-4\);align-items:baseline;flex-wrap:wrap;margin-bottom:var\(--sp-2\)">/g, '<div class="comment-header">');
html = html.replace(/<span style="font-weight:var\(--fw-semi\);color:var\(--tx-1\)">/g, '<span class="comment-author">');
html = html.replace(/<span style="font-size:var\(--fs-12\);color:var\(--tx-3\)">/g, '<span class="comment-time">');
html = html.replace(/<p style="font-size:var\(--fs-15\);color:var\(--tx-2\);line-height:var\(--lh-relaxed\)">/g, '<p class="comment-body">');

// Comment form
html = html.replace(/<div style="margin-top:var\(--sp-10\);padding:var\(--sp-8\);background:var\(--bg-alt\);border-radius:var\(--r-xl\);border:1px solid var\(--bd\)" class="reveal">/g, '<div class="comment-form-card reveal">');
html = html.replace(/<h3 style="font-family:var\(--serif\);font-size:var\(--fs-24\);color:var\(--tx-1\);margin-bottom:var\(--sp-6\)">/g, '<h3 class="comment-form-title">');
html = html.replace(/style="margin-top:var\(--sp-4\)"/g, '');
html = html.replace(/style="margin-top:var\(--sp-5\)"/g, '');

// Recommended services
html = html.replace(/<div class="grid grid-3" style="margin-top:var\(--sp-10\)">/g, '<div class="recommended-grid">');
html = html.replace(/<div style="display:grid;grid-template-columns:repeat\(3,1fr\);gap:var\(--col-gap\);margin-top:var\(--sp-10\)">/g, '<div class="recommended-grid">');
html = html.replace(/<a href="services\.html#([^"]+)" style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:var\(--sp-4\);padding:var\(--sp-8\);background:rgba\(255,255,255,0\.05\);border:1px solid rgba\(255,255,255,0\.08\);border-radius:var\(--r-xl\);transition:var\(--tr\);text-decoration:none" class="reveal delay-(\d) hover-lift">/g, '<a href="services.html#$1" class="recommended-card reveal delay-$2 hover-lift">');
html = html.replace(/<h3 style="font-family:var\(--serif\);font-size:var\(--fs-22\);color:#fff">/g, '<h3 class="recommended-card__title">');
html = html.replace(/<p style="font-size:var\(--fs-14\);color:rgba\(255,255,255,0\.55\)">/g, '<p class="recommended-card__desc">');
html = html.replace(/<span style="font-size:var\(--fs-13\);color:var\(--ac\);font-weight:var\(--fw-semi\)">/g, '<span class="recommended-card__link">');

// Clean hero author & date
html = html.replace(/<div style="font-size:var\(--fs-12\);color:rgba\(255,255,255,0\.55\)">/g, '<div class="article-hero__author-role">');
html = html.replace(/<div style="display:flex;gap:var\(--sp-5\);font-size:var\(--fs-13\);color:rgba\(255,255,255,0\.55\)">/g, '<div class="article-hero__meta-items">');

fs.writeFileSync('blog-detail.html', html, 'utf8');
console.log('Cleaned blog-detail.html successfully!');
