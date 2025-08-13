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

  document.addEventListener('DOMContentLoaded', function(){
    var headerContainer = document.getElementById('header-include');
    if (headerContainer) {
      fetch('/header.html')
        .then(function(r){ return r.text(); })
        .then(function(html){
          headerContainer.innerHTML = html;
          setup();
        })
        .catch(function(err){
          console.error('Header load failed:', err);
          setup();
        });
    } else {
      setup();
    }

    var footerContainer = document.getElementById('footer-include');
    if (footerContainer) {
      fetch('/footer.html')
        .then(function(r){ return r.text(); })
        .then(function(html){ footerContainer.innerHTML = html; })
        .catch(function(err){ console.error('Footer load failed:', err); });
    }
  });
})();
