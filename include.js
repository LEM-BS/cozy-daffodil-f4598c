async function loadIncludes() {
  try {
    const header = await fetch('/header.html');
    if (header.ok) {
      document.getElementById('header-include').innerHTML = await header.text();
    }

    const footer = await fetch('/footer.html');
    if (footer.ok) {
      document.getElementById('footer-include').innerHTML = await footer.text();
    }
  } catch (e) {
    console.error('Include load failed', e);
  }
}

loadIncludes();
