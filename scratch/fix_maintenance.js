const fs = require('fs');
let content = fs.readFileSync('maintenance.html', 'utf8');

// Fix the head of maintenance.html
const cleanHead = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/svg+xml" href="assets/img/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/img/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="assets/img/apple-touch-icon.png">
  <link rel="manifest" href="site.webmanifest">
  <meta name="theme-color" content="#202124">
  <meta name="msapplication-TileColor" content="#202124">
  <title>We'll Be Back Shortly — RENOVA</title>
  <meta name="description" content="RENOVA's website is undergoing scheduled maintenance. We'll be back shortly. Contact us directly via phone or WhatsApp.">
  <meta name="robots" content="noindex, nofollow">

  <!-- HTTP-equiv refresh removed for maintenance — set server-side -->

  <link rel="stylesheet" href="assets/css/variables.css">
  <link rel="stylesheet" href="assets/css/base.css">
  <link rel="stylesheet" href="assets/css/components.css">
  <link rel="stylesheet" href="assets/css/animations.css">
  <link rel="stylesheet" href="assets/css/hero-center.css">
  <link rel="stylesheet" href="assets/css/section-align.css">
  <link rel="stylesheet" href="assets/css/visual-polish.css">

  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`;

// Replace from beginning to the first *, *::before
const match = content.match(/[\s\S]*?\*,\s*\*::before,\s*\*::after\s*\{\s*box-sizing:\s*border-box;\s*margin:\s*0;\s*padding:\s*0;\s*\}/);
if (match) {
  content = content.replace(match[0], cleanHead);
  fs.writeFileSync('maintenance.html', content, 'utf8');
  console.log('Successfully cleaned maintenance.html head!');
} else {
  console.error('Could not match head in maintenance.html');
}
