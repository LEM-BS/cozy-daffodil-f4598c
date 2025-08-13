(function(){
  function setup(){
    var navToggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');
    if (!navToggle || !navLinks) return;
    navToggle.addEventListener('click', function(){
      navLinks.classList.toggle('nav-open');
      navToggle.classList.toggle('open');
    });

    var path = window.location.pathname;
    navLinks.querySelectorAll('a').forEach(function(link){
      var href = link.getAttribute('href');
      if (href === path || (path === '/' && href === '/index.html')) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
