(function () {
  const navLinks = document.querySelectorAll('.lp-nav__link');
  const sections = document.querySelectorAll('#about, #products, #projects, #skills, #experience, #contact');
  const rightPanel = document.querySelector('.right-panel');

  let lockId = '';
  // The visitor scrolling by hand ends the click highlight
  ['wheel', 'touchstart', 'keydown'].forEach(function (ev) {
    window.addEventListener(ev, function () { lockId = ''; }, { passive: true });
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      lockId = targetId.slice(1);                  // keep the clicked item highlighted
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActive();
      history.pushState(null, '', targetId);
    });
  });

  // Sliding card behind the current section's link
  const pill = document.querySelector('.lp-nav__pill');
  function movePill(link) {
    if (!pill) return;
    if (!link) { pill.classList.remove('is-on'); return; }
    pill.style.transform = 'translateY(' + link.offsetTop + 'px)';
    pill.style.height = link.offsetHeight + 'px';
    pill.classList.add('is-on');
  }

  function setActive() {
    let currentId = '';
    // A section becomes current once its top passes a line near the top of the screen,
    // so short sections (like Skills) still get their turn.
    const line = Math.max(120, window.innerHeight * 0.25);
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= line) currentId = section.id;
    });
    // At the very bottom, the last section (Contact) is current even if it is short
    const doc = document.documentElement;
    if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4 && sections.length) {
      currentId = sections[sections.length - 1].id;
    }
    if (lockId) currentId = lockId;
    let activeLink = null;
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href').replace('#', '');
      const on = href === currentId;
      link.classList.toggle('active', on);
      if (on) activeLink = link;
    });
    movePill(activeLink);
  }

  // On desktop the right panel scrolls; on mobile the window scrolls
  if (rightPanel) {
    rightPanel.addEventListener('scroll', setActive, { passive: true });
  }
  window.addEventListener('scroll', setActive, { passive: true });
  window.addEventListener('resize', setActive);
  setActive();
})();

// Name in the left panel: smooth scroll back to the top and clear the #section from the address
(function () {
  var link = document.getElementById('nameTop');
  if (!link) return;
  link.addEventListener('click', function (e) {
    e.preventDefault();
    var smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  });
})();

// Old links to #services now open the Skills section
if (location.hash === '#services') {
  history.replaceState(null, '', location.pathname + location.search + '#skills');
  var sk = document.getElementById('skills'); if (sk) sk.scrollIntoView();
}
