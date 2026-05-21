(function () {
  var html  = document.documentElement;
  var btn   = document.getElementById('themeToggle');
  var icon  = document.getElementById('themeIcon');

  var saved = localStorage.getItem('theme') || 'dark';
  apply(saved);

  btn.addEventListener('click', function () {
    apply(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  function apply(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    icon.className = theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
  }
})();
