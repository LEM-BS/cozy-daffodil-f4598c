(function () {
  function setupNav() {
    var navToggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');
    if (!navToggle || !navLinks) return;
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('nav-open');
      navToggle.classList.toggle('open');
    });
  }

  function load(id, url) {
    var el = document.getElementById(id);
    if (!el) return Promise.resolve();
    return fetch(url)
      .then(function (r) { return r.text(); })
      .then(function (html) { el.innerHTML = html; });
  }

  function init() {
    load('header-include', '/header.html').then(setupNav);
    load('footer-include', '/footer.html');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
