const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html') && !['header.html','footer.html','testimonials.html'].includes(f));

files.forEach(file => {
  let html = fs.readFileSync(path.join(__dirname, file), 'utf8');

  if (html.includes('<div id="header-include"></div>')) {
    html = html.replace('<div id="header-include"></div>', '<!--#include virtual="/header.html" -->');
  }
  if (html.includes('<div id="footer-include"></div>')) {
    html = html.replace('<div id="footer-include"></div>', '<!--#include virtual="/footer.html" -->');
  }

  html = html.replace(/<script[^>]*>[^]*?<\/script>/g, block => {
    if (block.includes("fetch('/header.html'") || block.includes('fetch("/header.html"') || block.includes("fetch('/footer.html'") || block.includes('fetch("/footer.html"')) {
      return '';
    }
    return block;
  });

  if (!html.includes('nav.js')) {
    html = html.replace('</body>', '  <script src="/nav.js" defer></script>\n</body>');
  }

  fs.writeFileSync(path.join(__dirname, file), html);
});
