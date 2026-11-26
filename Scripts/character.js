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
  var STEP = 3000;                       // same rhythm as the side pills
  var idx = -1, timer = 0, paused = false;

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

  // idx -1 = "Hi!", 0..4 = the messages
  function render() {
    if (idx < 0) {
      text.textContent = 'Hi!';
      hand.hidden = false;
      bubble.setAttribute('href', '#about');
      bubble.removeAttribute('target'); bubble.removeAttribute('rel');
      fig.classList.add('is-greeting');
    } else {
      var m = MESSAGES[idx];
      text.textContent = m.t;
      hand.hidden = true;
      fig.classList.remove('is-greeting');
      bubble.setAttribute('href', m.href);
      if (m.ext) { bubble.setAttribute('target', '_blank'); bubble.setAttribute('rel', 'noopener noreferrer'); }
      else { bubble.removeAttribute('target'); bubble.removeAttribute('rel'); }
    }
    fit();
  }

  function swap(to) {
    if (reduce) { idx = to; render(); return; }
    bubble.classList.add('is-swap');                     // soft fade out
    setTimeout(function () {
      idx = to; render();
      fig.classList.remove('is-hi'); void bubble.offsetWidth; fig.classList.add('is-hi');   // replay wave/pop
      bubble.classList.remove('is-swap');                // fade back in
    }, 260);
  }

  // "Hi!" is shown once on arrival; after that only the five messages loop
  function step() { swap((idx + 1) % MESSAGES.length); }

  function start() {
    clearInterval(timer);
    timer = setInterval(function () { if (!paused && !document.hidden) step(); }, STEP);
  }

  // Entrance, first greeting, then rotate on its own
  if (!reduce) {
    fig.classList.add('is-entering');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { fig.classList.add('is-in'); });
    });
  }
  if (bubble) setTimeout(function () {
    idx = -1; render(); fig.classList.add('is-hi'); start();
  }, reduce ? 0 : 1100);

  // Hold still while the pointer is on the bubble so it can be clicked
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    bubble.addEventListener('mouseenter', function () { paused = true; });
    bubble.addEventListener('mouseleave', function () { paused = false; });
  }
  function next() { step(); start(); }

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
