(function () {
  var cards = document.querySelectorAll('.project-card');

  cards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      // Only handle tap-toggle on touch devices
      if (!('ontouchstart' in window)) return;

      var isActive = card.classList.contains('is-active');

      // Close all others
      cards.forEach(function (c) { c.classList.remove('is-active'); });

      // Toggle this one
      if (!isActive) {
        card.classList.add('is-active');
      }
    });
  });

  // Clicking outside closes all
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.project-card')) {
      cards.forEach(function (c) { c.classList.remove('is-active'); });
    }
  });
})();
