/* CV button: choose PDF or Word, then that file downloads. */
(function () {
  var btn = document.getElementById('cvBtn');
  var menu = document.getElementById('cvMenu');
  if (!btn || !menu) return;
  function open(v) {
    menu.hidden = !v;
    btn.setAttribute('aria-expanded', v ? 'true' : 'false');
    if (v) menu.querySelector('a').focus({ preventScroll: true });
  }
  btn.addEventListener('click', function (e) { e.stopPropagation(); open(menu.hidden); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) setTimeout(function () { open(false); }, 50); });
  document.addEventListener('click', function (e) { if (!menu.hidden && !e.target.closest('.rd-cv-wrap')) open(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { open(false); btn.focus(); } });
})();
