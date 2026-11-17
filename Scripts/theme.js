(function () {
  var html  = document.documentElement;
  var btn   = document.getElementById('themeToggle');
  var icon  = document.getElementById('themeIcon');

  var saved = localStorage.getItem('theme') || 'dark';
  apply(saved);

  btn.addEventListener('click', function () {
    apply(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    // small rotate so the switch feels deliberate
    icon.classList.remove('is-turning');
    void icon.offsetWidth;
    icon.classList.add('is-turning');
  });

  function apply(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    // dark mode shows the sun (switch to light); light mode shows the moon
    icon.className = theme === 'dark' ? 'ri-sun-fill' : 'ri-moon-fill';
    var label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
  }
})();
