(function () {
  const navLinks = document.querySelectorAll('.lp-nav__link');
  const sections = document.querySelectorAll('#about, #products, #projects, #services, #experience, #contact');
  const rightPanel = document.querySelector('.right-panel');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    sections.forEach(function (section) {
      const top = section.getBoundingClientRect().top;
      if (top <= window.innerHeight * 0.4) {
        currentId = section.id;
      }
    });
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
