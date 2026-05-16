(function () {
  const navLinks = document.querySelectorAll('.lp-nav__link');
  const sections = document.querySelectorAll('#about, #projects, #services, #contact');
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

  function setActive() {
    let currentId = '';
    sections.forEach(function (section) {
      const top = section.getBoundingClientRect().top;
      if (top <= window.innerHeight * 0.4) {
        currentId = section.id;
      }
    });
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === currentId);
    });
  }

  // On desktop the right panel scrolls; on mobile the window scrolls
  if (rightPanel) {
    rightPanel.addEventListener('scroll', setActive, { passive: true });
  }
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();
