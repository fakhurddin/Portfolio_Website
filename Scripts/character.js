/* About character: rises in, says hi, cycles short messages,
   and opens his eyes with a smile when hovered (CSS). */
(function () {
  var fig = document.querySelector('.rd-photo--figure');
  if (!fig) return;
  var bubble = fig.querySelector('.rd-hi');
  var text = bubble && bubble.querySelector('.rd-hi__text');
  var hand = bubble && bubble.querySelector('.rd-hi__hand');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Messages shown on click. Clicking the bubble takes the visitor there.
  var MESSAGES = [
    { t: 'Drop me a message ✉️', href: '#contact' },
    { t: 'Let’s build something 🚀', href: '#contact' },
    { t: 'Psst… see my case studies 👇', href: '#products' },
    { t: 'Curious about SabKi Sawari? 🚐', href: 'work/sabki-sawari/' },
    { t: 'Try my churn demo 🔮', href: 'https://telcochurnprediction-rphdf9uthz5k9pwdtai8y8.streamlit.app/', ext: true }
  ];
  var SHOW = 5000, GAP = 5000;            // each message shows 5 s, then the bubble rests 5 s
  var idx = -1, timer = 0, paused = false;

  // Messages never wrap. Beside the head (in line with the right pills) when the longest
  // message fits there; otherwise (tablets, phones) just above the head.
  var maxW = 0;
  function measure() {
    var keep = text.textContent, keepHand = hand.hidden;
    hand.hidden = true; maxW = 0;
    ['Hi! 👋'].concat(MESSAGES.map(function (m) { return m.t; })).forEach(function (t) {
      text.textContent = t; maxW = Math.max(maxW, bubble.offsetWidth);
    });
    text.textContent = keep; hand.hidden = keepHand;
  }
  function fit() {
    if (!maxW) measure();
    var r = fig.getBoundingClientRect(), vw = document.documentElement.clientWidth;
    var besideFits = r.left + r.width - 28 + maxW <= vw - 12;
    fig.classList.toggle('hi-top', !besideFits);
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

  function show() {
    fit();
    fig.classList.remove('is-hi'); void bubble.offsetWidth; fig.classList.add('is-hi');   // pop in (+ wave on Hi)
  }

  // visible SHOW ms -> hidden GAP ms -> next message ... ("Hi!" only once, on arrival)
  function cycle() {
    clearTimeout(timer);
    timer = setTimeout(function () {
      if (paused) { cycle(); return; }               // keep it up while the pointer is on it
      fig.classList.remove('is-hi');
      timer = setTimeout(function () {
        idx = (idx + 1) % MESSAGES.length;
        render(); show(); cycle();
      }, GAP);
    }, SHOW);
  }

  if (bubble) fit();                      // decide bubble placement before anything shows

  // Entrance, first greeting, then the message cycle
  if (!reduce) {
    fig.classList.add('is-entering');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { fig.classList.add('is-in'); });
    });
  }
  if (bubble) setTimeout(function () { idx = -1; render(); show(); cycle(); }, reduce ? 0 : 1100);

  // Hold still while the pointer is on the bubble so it can be clicked
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    bubble.addEventListener('mouseenter', function () { paused = true; });
    bubble.addEventListener('mouseleave', function () { paused = false; });
  }
  function next() { idx = (idx + 1) % MESSAGES.length; render(); show(); cycle(); }

  // Eyes: closed by default, open on hover (CSS). Touch screens have no hover,
  // so a tap opens them for 3 seconds. 'is-ready' switches to the quick blink speed after the entrance.
  setTimeout(function () { fig.classList.add('is-ready'); }, reduce ? 0 : 1300);
  var wakeTimer = 0;
  fig.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'mouse') return;
    fig.classList.add('is-awake');
    clearTimeout(wakeTimer);
    wakeTimer = setTimeout(function () { fig.classList.remove('is-awake'); }, 3000);
  });

  // Click / tap / keyboard: a new message each time
  fig.addEventListener('click', function (e) {
    if (e.target.closest('.rd-hi')) return;   // clicking the bubble follows its link
    next();
  });
  fig.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); next(); }
  });

  window.addEventListener('resize', function () { maxW = 0; fit(); });
})();
