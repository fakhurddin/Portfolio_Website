(function () {
  var x = 0, y = 0;

  document.addEventListener('mousemove', function (e) {
    x = e.clientX;
    y = e.clientY;
    document.documentElement.style.setProperty('--cursor-x', x + 'px');
    document.documentElement.style.setProperty('--cursor-y', y + 'px');
  });
})();
