document.addEventListener("DOMContentLoaded", function () {
  // ========== Button Functionalities ==========

  // Download Resume Button
  /*const downloadResumeBtn = document.querySelector('a[download="My Resume.docx"]');
  if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      // In a real implementation, this would trigger the actual download
      console.log("Resume download initiated");
    });
  }*/

  // Project Links (GitHub and View Live/Demo)
  document.querySelectorAll('.project-card a').forEach(link => {
    link.addEventListener('click', function (e) {
      if (this.querySelector('i[class*="ri-github-line"]')) {
        e.preventDefault();
        window.open('https://github.com/Fakhurddin', '_blank');
      } else if (this.querySelector('i[class*="ri-external-link-line"]')) {
        e.preventDefault();
        // In a real implementation, this would open the specific project URL
        window.open('https://www.loom.com/', '_blank');
      }
    });
  });

  // Social Links
  document.querySelectorAll('a i[class*="ri-linkedin-fill"]').forEach(icon => {
    icon.closest('a').addEventListener('click', function (e) {
      e.preventDefault();
      window.open('https://www.linkedin.com/in/fakhurddin-junejo-65a127386', '_blank');
    });
  });

  document.querySelectorAll('a i[class*="ri-github-fill"]').forEach(icon => {
    icon.closest('a').addEventListener('click', function (e) {
      e.preventDefault();
      window.open('https://github.com/Fakhurddin', '_blank');
    });
  });

  // Schedule on Calendly Button
  const calendlyBtn = document.querySelector('a i[class*="ri-calendar-line"]')?.closest('a');
  if (calendlyBtn) {
    calendlyBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.open('https://calendly.com/fakhurjunejo12/portfolio-consultation', '_blank');
    });
  }
});
