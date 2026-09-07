const http = require('http');

const pages = [
  '',
  'index.html',
  'home2.html',
  'about.html',
  'services.html',
  'blog.html',
  'blog-detail.html',
  'contact.html',
  'maintenance.html',
  'privacy-policy.html',
  'terms.html',
  'sitemap.html',
  '404.html'
];

async function checkPage(path) {
  return new Promise((resolve) => {
    http.get(`http://127.0.0.1:8080/${path}`, (res) => {
      resolve({ path, statusCode: res.statusCode });
    }).on('error', (err) => {
      resolve({ path, error: err.message });
    });
  });
}

async function run() {
  console.log('Testing HTTP responses from http://127.0.0.1:8080...');
  for (const p of pages) {
    const res = await checkPage(p);
    console.log(`Page "${p || '/'}" => Status: ${res.statusCode || 'ERROR: ' + res.error}`);
  }
}

run();
