const fs = require('fs');
const filePath = 'services.html';
let content = fs.readFileSync(filePath, 'utf8');

const targetRegex = /<\/head>\r?\n\s*<div class="service-feature"><span class="service-feature-dot"><\/span>Anti-algae & anti-fungal primer<\/div>/;

const replacement = `</head>
<body>

  <div class="preloader" id="preloader" aria-hidden="true">
    <div class="preloader__inner">
      <div class="preloader__logo">RENOVA</div>
      <div class="preloader__bar"></div>
    </div>
  </div>
  <div class="page-transition" aria-hidden="true"></div>

  <a href="https://wa.me/919820000123" class="whatsapp-float" aria-label="Chat on WhatsApp" target="_blank" rel="noopener noreferrer">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>
  <button class="back-to-top" id="backToTop" aria-label="Back to top">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18,15 12,9 6,15"/></svg>
  </button>

  <!-- NAVBAR -->
  <header class="navbar" id="navbar" role="banner">
    <div class="navbar__inner">
      <a href="index.html" class="nav-logo" aria-label="RENOVA Home"><span class="nav-logo__mark" aria-hidden="true"><img src="assets/img/logo-mark.svg" alt="" width="38" height="38" loading="eager" decoding="async"></span><span class="nav-logo__text">RENO<span>VA</span></span></a>
      <nav class="nav-menu" role="navigation" aria-label="Main navigation">
        <a href="index.html"    class="nav-link">Home</a>
        <a href="home2.html"   class="nav-link">home2</a>
        <a href="about.html"   class="nav-link">About</a>
        <a href="services.html" class="nav-link active">Services</a>
        <a href="blog.html"    class="nav-link">Blog</a>
        <a href="contact.html" class="nav-link">Contact</a>
      </nav>
      <div class="nav-actions">
        <button class="theme-toggle" aria-label="Toggle dark mode">
          <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
        <a href="contact.html" class="btn btn-primary btn-sm">Free Quote</a>
        <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <div class="nav-overlay" id="navOverlay" role="dialog" aria-modal="true">
    <button class="nav-overlay__close" id="navClose" aria-label="Close menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
    <nav class="nav-overlay__links">
      <a href="index.html"    class="nav-overlay__link">Home</a>
      <a href="home2.html"   class="nav-overlay__link">home2</a>
      <a href="about.html"   class="nav-overlay__link">About</a>
      <a href="services.html" class="nav-overlay__link active">Services</a>
      <a href="blog.html"    class="nav-overlay__link">Blog</a>
      <a href="contact.html" class="nav-overlay__link">Contact</a>
    </nav>
    <div class="nav-overlay__btn"><a href="contact.html" class="btn btn-primary btn-lg">Get Free Quote</a></div>
  </div>

  <main>

    <!-- ══ SECTION 1: SERVICES HERO ══ -->
    <section class="services-hero" id="services-hero" aria-label="Services hero">
      <div class="services-hero__bg">
        <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1920&q=80" alt="Elegant renovated interior" loading="eager">
      </div>
      <div class="services-hero__grid"></div>
      <div class="container container-tight text-center">
        <div>
          <p class="eyebrow">What We Offer</p>
          <h1 class="sec-title" style="color:#fff">
            Complete Painting &<br>Renovation Services
          </h1>
          <p class="sec-subtitle">
            From single-wall accent painting to complete structural waterproofing and ceiling design — explore our comprehensive range of residential and commercial services across Mumbai.
          </p>
        </div>
        <div class="services-hero__pills">
          <a href="#interior" class="btn btn-ghost btn-sm">Interior</a>
          <a href="#exterior" class="btn btn-ghost btn-sm">Exterior</a>
          <a href="#texture" class="btn btn-ghost btn-sm">Texture</a>
          <a href="#waterproofing" class="btn btn-ghost btn-sm">Waterproofing</a>
          <a href="#ceiling" class="btn btn-ghost btn-sm">False Ceiling</a>
          <a href="#pricing" class="btn btn-ghost btn-sm">Pricing</a>
        </div>
      </div>
    </section>

    <!-- ══ SECTION 2: INTERIOR & EXTERIOR SERVICES ══ -->
    <section class="section" id="interior" aria-label="Interior and exterior painting services">
      <div class="container">

        <!-- Interior -->
        <div class="service-detail reveal">
          <div class="service-detail__img hover-img">
            <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
                 alt="Premium interior wall painting" loading="lazy">
          </div>
          <div class="service-detail__body reveal">
            <p class="eyebrow">Service 01</p>
            <h2 class="sec-title">Interior Wall<br>Painting</h2>
            <p style="font-size:var(--fs-17);color:var(--tx-2);line-height:var(--lh-relaxed);margin-bottom:var(--sp-6)">
              Our interior painting service covers everything from bedroom accent walls to full-home repaints. We use low-VOC, premium-grade paints for a flawless, durable finish that transforms your living space.
            </p>
            <div class="service-features">
              <div class="service-feature"><span class="service-feature-dot"></span>Surface preparation & crack filling</div>
              <div class="service-feature"><span class="service-feature-dot"></span>2-coat primer + 2-coat finish</div>
              <div class="service-feature"><span class="service-feature-dot"></span>Low-VOC & odorless paint options</div>
              <div class="service-feature"><span class="service-feature-dot"></span>Precision edge cutting & masking</div>
              <div class="service-feature"><span class="service-feature-dot"></span>Accent & feature walls</div>
              <div class="service-feature"><span class="service-feature-dot"></span>Full site protection & cleanup</div>
            </div>
            <a href="contact.html" class="btn btn-primary">Get Interior Quote</a>
          </div>
        </div>

        <!-- Exterior -->
        <div class="service-detail reverse" id="exterior" aria-label="Exterior painting service">
          <div class="service-detail__img hover-img">
            <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80"
                 alt="Exterior home painting with premium coating" loading="lazy">
          </div>
          <div class="reveal">
            <p class="eyebrow">Service 02</p>
            <h2 class="sec-title">Exterior<br>Painting</h2>
            <p style="font-size:var(--fs-17);color:var(--tx-2);line-height:var(--lh-relaxed);margin-bottom:var(--sp-6)">
              Your home's exterior faces Mumbai's monsoons, heat and pollution. We use weather-shield coatings that resist fading, algae, and water seepage — keeping your façade pristine for years.
            </p>
            <div class="service-features">
              <div class="service-feature"><span class="service-feature-dot"></span>Exterior wall assessment</div>
              <div class="service-feature"><span class="service-feature-dot"></span>Anti-algae & anti-fungal primer</div>`;

if (!targetRegex.test(content)) {
  console.error("targetRegex did not match!");
} else {
  content = content.replace(targetRegex, replacement);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log("Successfully restored services.html with CRLF support!");
}
