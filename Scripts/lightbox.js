/**
 * Lightbox for Case Study Screenshots & Previews
 * Supports click-to-expand, keyboard navigation (Esc, Left, Right),
 * swipe/backdrop dismiss, and clean accessibility focus management.
 */
(function () {
  'use strict';

  // Build lightbox markup once on DOM ready
  let lightboxEl = null;
  let dialogEl = null;
  let imgEl = null;
  let capEl = null;
  let prevBtn = null;
  let nextBtn = null;
  let closeBtn = null;

  let currentGallery = [];
  let currentIndex = 0;
  let lastActiveElement = null;

  function initLightboxDOM() {
    if (lightboxEl) return;

    lightboxEl = document.createElement('div');
    lightboxEl.className = 'cs-lightbox';
    lightboxEl.setAttribute('role', 'dialog');
    lightboxEl.setAttribute('aria-modal', 'true');
    lightboxEl.setAttribute('aria-label', 'Image preview');

    dialogEl = document.createElement('div');
    dialogEl.className = 'cs-lightbox__dialog';

    closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'cs-lightbox__btn cs-lightbox__close';
    closeBtn.setAttribute('aria-label', 'Close image preview');
    closeBtn.innerHTML = '<i class="ri-close-line" aria-hidden="true"></i>';

    prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'cs-lightbox__btn cs-lightbox__prev';
    prevBtn.setAttribute('aria-label', 'Previous image');
    prevBtn.innerHTML = '<i class="ri-arrow-left-s-line" aria-hidden="true"></i>';

    nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'cs-lightbox__btn cs-lightbox__next';
    nextBtn.setAttribute('aria-label', 'Next image');
    nextBtn.innerHTML = '<i class="ri-arrow-right-s-line" aria-hidden="true"></i>';

    const figure = document.createElement('figure');
    figure.className = 'cs-lightbox__figure';

    imgEl = document.createElement('img');
    imgEl.className = 'cs-lightbox__img';
    imgEl.alt = '';

    capEl = document.createElement('figcaption');
    capEl.className = 'cs-lightbox__cap';

    figure.appendChild(imgEl);
    figure.appendChild(capEl);

    dialogEl.appendChild(closeBtn);
    dialogEl.appendChild(prevBtn);
    dialogEl.appendChild(nextBtn);
    dialogEl.appendChild(figure);
    lightboxEl.appendChild(dialogEl);
    document.body.appendChild(lightboxEl);

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    lightboxEl.addEventListener('click', function (e) {
      if (e.target === lightboxEl) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (!lightboxEl.classList.contains('is-open')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        showNext();
      }
    });
  }

  function getUniqueGallery(clickedImg) {
    // Check if clickedImg is inside a marquee track
    const marq = clickedImg.closest('.cs-marq');
    if (marq) {
      // Collect unique images from the first set (or sets that don't have aria-hidden)
      const primarySet = marq.querySelector('.cs-marq__set:not([aria-hidden="true"])');
      const shots = primarySet
        ? Array.from(primarySet.querySelectorAll('.cs-shot img'))
        : Array.from(marq.querySelectorAll('.cs-shot img'));

      // Deduplicate by src
      const seen = new Set();
      const unique = [];
      shots.forEach(function (img) {
        if (!seen.has(img.src)) {
          seen.add(img.src);
          const fig = img.closest('figure');
          const capText = fig ? (fig.querySelector('figcaption')?.textContent?.trim() || img.alt) : img.alt;
          unique.push({
            src: img.src,
            alt: img.alt || capText || 'Case study screen',
            caption: capText || img.alt || ''
          });
        }
      });
      return unique;
    }

    // Otherwise check for visual or browser hero mockups
    const fig = clickedImg.closest('figure');
    const capText = fig ? (fig.querySelector('figcaption')?.textContent?.trim() || clickedImg.alt) : clickedImg.alt;
    return [{
      src: clickedImg.src,
      alt: clickedImg.alt || 'Case study screenshot',
      caption: capText || clickedImg.alt || ''
    }];
  }

  function updateLightboxView() {
    if (!currentGallery.length) return;
    const item = currentGallery[currentIndex];
    imgEl.src = item.src;
    imgEl.alt = item.alt;

    if (item.caption) {
      capEl.textContent = item.caption;
      capEl.style.display = 'inline-block';
    } else {
      capEl.style.display = 'none';
    }

    if (currentGallery.length > 1) {
      prevBtn.style.display = 'grid';
      nextBtn.style.display = 'grid';
    } else {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    }
  }

  function openLightbox(gallery, index) {
    initLightboxDOM();
    currentGallery = gallery;
    currentIndex = index;
    lastActiveElement = document.activeElement;

    updateLightboxView();

    lightboxEl.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    if (!lightboxEl) return;
    lightboxEl.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  function showPrev() {
    if (currentGallery.length <= 1) return;
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    updateLightboxView();
  }

  function showNext() {
    if (currentGallery.length <= 1) return;
    currentIndex = (currentIndex + 1) % currentGallery.length;
    updateLightboxView();
  }

  function setupClickTargets() {
    // Selector for interactive screenshots
    const targets = document.querySelectorAll('.cs-shot img, .cs-browser img, .cs-visual img');

    targets.forEach(function (img) {
      img.setAttribute('role', 'button');
      img.setAttribute('tabindex', '0');
      img.setAttribute('aria-label', (img.alt || 'Screenshot') + ' — click to enlarge');

      function handleOpen(e) {
        e.preventDefault();
        const gallery = getUniqueGallery(img);
        let foundIdx = gallery.findIndex(item => item.src === img.src);
        if (foundIdx === -1) foundIdx = 0;
        openLightbox(gallery, foundIdx);
      }

      img.addEventListener('click', handleOpen);
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          handleOpen(e);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupClickTargets);
  } else {
    setupClickTargets();
  }
})();
