document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll('.service-card');

  cards.forEach(card => {
    const toggle = card.querySelector('.service-toggle');
    const icon = card.querySelector('.toggle-icon');
    const content = card.querySelector('.service-content');
    const span = toggle.querySelector('span');

    // Initial setup
    content.style.overflow = 'hidden';
    content.style.display = 'none';

    toggle.addEventListener('click', (e) => {
      e.preventDefault();

      const isExpanded = card.classList.contains('expanded');

      // ========= CLOSE CURRENT CARD =========
      if (isExpanded) {
        content.style.maxHeight = `${content.scrollHeight}px`;
        void content.offsetHeight; // Trigger reflow
        content.style.maxHeight = '0';
        icon.style.transform = '';
        span.textContent = "Learn More";

        content.addEventListener('transitionend', function handler() {
          content.style.display = 'none';
          card.classList.remove('expanded');
          content.removeEventListener('transitionend', handler);
        }, { once: true });

        return;
      }

      // ========= CLOSE ANY OTHER OPEN CARD =========
      const openCard = document.querySelector('.service-card.expanded');
      if (openCard) {
        const openContent = openCard.querySelector('.service-content');
        const openIcon = openCard.querySelector('.toggle-icon');
        const openSpan = openCard.querySelector('.service-toggle span');

        openContent.style.maxHeight = `${openContent.scrollHeight}px`;
        void openContent.offsetHeight;
        openContent.style.maxHeight = '0';
        openIcon.style.transform = '';
        openSpan.textContent = "Learn More";

        openContent.addEventListener('transitionend', function handler() {
          openContent.style.display = 'none';
          openCard.classList.remove('expanded');
          openContent.removeEventListener('transitionend', handler);
        }, { once: true });
      }

      // ========= OPEN CLICKED CARD =========
      content.style.display = 'block';
      const contentHeight = content.scrollHeight;
      content.style.maxHeight = '0';
      void content.offsetHeight;
      content.style.maxHeight = `${contentHeight}px`;

      card.classList.add('expanded');
      icon.style.transform = 'rotate(180deg)';
      span.textContent = "Show Less";
    });
  });
});
