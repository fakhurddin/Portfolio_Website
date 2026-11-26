/* Soft fade-up for sections and cards as they scroll into view (runs once). */
(function () {
  var root = document.documentElement;
  if (!root.classList.contains('rv-on')) return;

  var items = [];
  document.querySelectorAll('[data-reveal]').forEach(function (el) { items.push(el); });
  document.querySelectorAll('[data-stagger]').forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.setAttribute('data-reveal', '');
      child.style.setProperty('--rv-delay', Math.min(i, 5) * 70 + 'ms');
      items.push(child);
    });
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });

  items.forEach(function (el) { io.observe(el); });

  // Safety net: never leave content hidden (e.g. printing, very tall screens)
  window.addEventListener('beforeprint', function () { items.forEach(function (el) { el.classList.add('is-in'); }); });
  setTimeout(function () {
    items.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-in');
    });
  }, 1200);
})();
