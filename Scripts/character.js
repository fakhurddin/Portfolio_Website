/* About character: rises in, says hi, shows a random message on each click,
   and turns slightly toward the pointer on desktop. */
(function () {
  var fig = document.querySelector('.rd-photo--figure');
  if (!fig) return;
  var bubble = fig.querySelector('.rd-hi');
  var text = bubble && bubble.querySelector('.rd-hi__text');
  var hand = bubble && bubble.querySelector('.rd-hi__hand');
  var img = fig.querySelector('.rd-photo__fig');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Messages shown on click. Clicking the bubble takes the visitor there.
  var MESSAGES = [
    { t: 'Drop me a message ✉️', href: '#contact' },
    { t: 'Let’s build something 🚀', href: '#contact' },
    { t: 'Psst… see my case studies 👇', href: '#products' },
    { t: 'Curious about SabKi Sawari? 🚐', href: 'work/sabki-sawari/' },
    { t: 'Try my churn demo 🔮', href: 'https://telcochurnprediction-rphdf9uthz5k9pwdtai8y8.streamlit.app/', ext: true }
  ];
  var last = -1, hideTimer = 0;

  // Keep the bubble on screen: slide it left (over the shoulder) if it would overflow
  // Keep the bubble on screen without covering the face: wrap first, nudge only if still needed
  function fit() {
    bubble.style.translate = '';
    bubble.style.maxWidth = '';
    var start = fig.getBoundingClientRect().left + bubble.offsetLeft;
    var room = document.documentElement.clientWidth - 12 - start;
    if (bubble.offsetWidth > room) bubble.style.maxWidth = Math.max(room, 96) + 'px';
    var over = start + bubble.offsetWidth - (document.documentElement.clientWidth - 12);
    if (over > 0) bubble.style.translate = '-' + Math.ceil(over) + 'px 0';
  }

  function show(ms) {
    fit();
    fig.classList.remove('is-hi');
    void bubble.offsetWidth;            // restart the pop animation
    fig.classList.add('is-hi');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () { fig.classList.remove('is-hi'); }, ms);
  }

  function sayHi(ms) {
    text.textContent = 'Hi!';
    hand.hidden = false;
    bubble.setAttribute('href', '#about');
    bubble.removeAttribute('target');
    bubble.removeAttribute('rel');
    fig.classList.add('is-greeting');
    show(ms);
  }

  function next() {
    var i;
    do { i = Math.floor(Math.random() * MESSAGES.length); } while (i === last && MESSAGES.length > 1);
    last = i;
    var m = MESSAGES[i];
    text.textContent = m.t;
    hand.hidden = true;
    fig.classList.remove('is-greeting');
    bubble.setAttribute('href', m.href);
    if (m.ext) { bubble.setAttribute('target', '_blank'); bubble.setAttribute('rel', 'noopener noreferrer'); }
    else { bubble.removeAttribute('target'); bubble.removeAttribute('rel'); }
    show(3500);
  }

  // Entrance + first greeting
  if (!reduce) {
    fig.classList.add('is-entering');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { fig.classList.add('is-in'); });
    });
  }
  if (bubble) setTimeout(function () { sayHi(4000); }, reduce ? 0 : 1100);

  // Click / tap / keyboard: a new message each time
  fig.addEventListener('click', function (e) {
    if (e.target.closest('.rd-hi')) return;   // clicking the bubble follows its link
    next();
  });
  fig.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); next(); }
  });

  // Pointer turn (mouse / trackpad only)
  window.addEventListener('resize', function () { if (fig.classList.contains('is-hi')) fit(); });
  if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  var area = document.getElementById('about') || fig;
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
