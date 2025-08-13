(function(){
  function init(){
    var headerPromise = fetch('/header.html')
      .then(function(r){ return r.text(); })
      .then(function(html){
        var el = document.getElementById('header-include');
        if (el) el.innerHTML = html;
      })
      .catch(function(err){ console.error('Header load failed:', err); });

    var footerPromise = fetch('/footer.html')
      .then(function(r){ return r.text(); })
      .then(function(html){
        var el = document.getElementById('footer-include');
        if (el) el.innerHTML = html;
      })
      .catch(function(err){ console.error('Footer load failed:', err); });

    Promise.all([headerPromise, footerPromise]).then(setupNav);
  }

  function setupNav(){
    var navToggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');
    if (!navToggle || !navLinks) return;
    navToggle.addEventListener('click', function(){
      navLinks.classList.toggle('nav-open');
      navToggle.classList.toggle('open');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

