(function(){
  function setup(){
    var navToggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');
    if (!navToggle || !navLinks) return;
    navToggle.addEventListener('click', function(){
      navLinks.classList.toggle('nav-open');
      navToggle.classList.toggle('open');
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();

