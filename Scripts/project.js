document.addEventListener('DOMContentLoaded', () => {
  // ================================
  // MOBILE KPI TOGGLE (One tap show, auto-hide after 2.5s)
  // ================================
  const handleMobileKPI = () => {
    const projectCards = document.querySelectorAll('.project-card');
    let activeTimer = null;

    projectCards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (window.innerWidth > 768) return; // Only on mobile

        const kpi = card.querySelector('.project-kpi');
        if (!kpi) return;

        // Cancel existing timer if running
        if (activeTimer) clearTimeout(activeTimer);

        // Show KPI
        kpi.classList.add('show-kpi');

        // Auto-hide KPI after 2.5s
        activeTimer = setTimeout(() => {
          kpi.classList.remove('show-kpi');
          activeTimer = null;
        }, 2500);
      });
    });

    // Hide KPI when clicking outside project cards
    document.addEventListener('click', (e) => {
      if (window.innerWidth > 768) return;
      if (!e.target.closest('.project-card')) {
        document.querySelectorAll('.project-kpi').forEach(kpi => {
          kpi.classList.remove('show-kpi');
        });

        if (activeTimer) {
          clearTimeout(activeTimer);
          activeTimer = null;
        }
      }
    });
  };

  // ================================
  // PROJECT FILTERING
  // ================================
  const initProjectFilter = () => {
    const filterButtons = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.project-card');

    // Set "All" as default active filter
    const defaultFilter = document.querySelector('.project-filter[data-filter="all"]');
    if (defaultFilter) {
      defaultFilter.classList.add('active');
    }

    // Add transition to cards
    projectCards.forEach(card => {
      card.style.transition = 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
    });

    filterButtons.forEach(button => {
      button.addEventListener('click', function () {
        const filter = this.dataset.filter || 'all';

        projectCards.forEach(card => {
          const category = card.dataset.category || '';
          const shouldHide = filter !== 'all' && !category.includes(filter);
          card.classList.toggle('is-hidden', shouldHide);
        });

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
      });
    });
  };

  // ================================
  // INIT + RESPONSIVE CLEANUP
  // ================================
  handleMobileKPI();
  initProjectFilter();

  // Hide KPI on window resize (when switching to desktop view)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      document.querySelectorAll('.project-kpi').forEach(kpi => {
        kpi.classList.remove('show-kpi');
      });
    }
  });
});
