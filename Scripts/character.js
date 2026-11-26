/* About character: rises in, says hi, and turns slightly toward the pointer on desktop. */
(function () {
  var fig = document.querySelector('.rd-photo--figure');
  if (!fig) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Entrance + greeting
  if (!reduce) {
    fig.classList.add('is-entering');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { fig.classList.add('is-in'); });
    });
  }
  setTimeout(function () { fig.classList.add('is-hi'); }, reduce ? 0 : 1100);
  setTimeout(function () { fig.classList.remove('is-hi'); }, reduce ? 4000 : 5200);

  // Pointer turn (mouse / trackpad only)
  if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  var area = document.getElementById('about') || fig;
  var img = fig.querySelector('.rd-photo__fig');
  var raf = 0;
  area.addEventListener('mousemove', function (e) {
    var r = fig.getBoundingClientRect();
    var dx = (e.clientX - (r.left + r.width / 2)) / Math.max(window.innerWidth / 2, 1);
    var dy = (e.clientY - (r.top + r.height * 0.3)) / Math.max(window.innerHeight / 2, 1);
    dx = Math.max(-1, Math.min(1, dx));
    dy = Math.max(-1, Math.min(1, dy));
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(function () {
      img.style.setProperty('--ry', (dx * 10).toFixed(2) + 'deg');
      img.style.setProperty('--rx', (-dy * 3).toFixed(2) + 'deg');
    });
  });
  area.addEventListener('mouseleave', function () {
    img.style.setProperty('--ry', '0deg');
    img.style.setProperty('--rx', '0deg');
  });
})();
