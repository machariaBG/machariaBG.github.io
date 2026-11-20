document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.getElementById('gallery-dialog');
  if (dialog) {
    const currentImg = document.getElementById('lb-current-img');
    const btnPrev = dialog.querySelector('.lb-prev');
    const btnNext = dialog.querySelector('.lb-next');
    const btnClose = dialog.querySelector('.lb-close');
    const titleDisplay = document.getElementById('lb-title');
    const counterDisplay = document.getElementById('lb-counter');
    const thumbsContainer = document.getElementById('lb-thumbs');

    let errorDisplay = dialog.querySelector('.lb-error');
    if (!errorDisplay) {
      errorDisplay = document.createElement('div');
      errorDisplay.className = 'lb-error is-hidden';
      currentImg.parentNode.appendChild(errorDisplay);
    }

    let activeCollection = [];
    let currentIndex = 0;
    let currentLoadAbort = null;
    let returnFocusElement = null;

    let fadeOutTimer = null;
    let fadeInTimer = null;
    let closeTimer = null;
    let errorTimer = null;

    const clearAllTimers = () => {
      if (fadeOutTimer) { clearTimeout(fadeOutTimer); fadeOutTimer = null; }
      if (fadeInTimer) { clearTimeout(fadeInTimer); fadeInTimer = null; }
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      if (errorTimer) { clearTimeout(errorTimer); errorTimer = null; }
    };

    const allLinks = document.querySelectorAll('.gallery-item');
    allLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        returnFocusElement = link;

        const scope = link.closest('.gallery-grid') || link.closest('.cs-body') || link.parentElement;
        activeCollection = Array.from(scope.querySelectorAll('.gallery-item:not(.hidden)'));

        const idx = activeCollection.indexOf(link);
        openGallery(idx > -1 ? idx : 0);
      });
    });

    const openGallery = (index) => {
      cleanupState();
      buildThumbs();
      dialog.showModal();
      goTo(index, true);
    };

    const buildThumbs = () => {
      thumbsContainer.innerHTML = '';
      activeCollection.forEach((link, idx) => {
        const img = link.querySelector('img');
        const thumbBtn = document.createElement('button');
        thumbBtn.type = 'button';
        thumbBtn.className = 'lb-thumb';
        thumbBtn.setAttribute('aria-label', `View image ${idx + 1}`);

        const thumbImg = document.createElement('img');
        thumbImg.alt = '';
        thumbImg.loading = 'lazy';
        thumbImg.decoding = 'async';
        if (img) {
          thumbImg.src = img.currentSrc || img.src;
        }
        thumbBtn.appendChild(thumbImg);

        thumbBtn.addEventListener('click', () => {
          if (currentIndex !== idx) goTo(idx);
        });
        thumbsContainer.appendChild(thumbBtn);
      });
    };

    const cleanupState = () => {
      clearAllTimers();
      if (currentLoadAbort) currentLoadAbort.abort();
      currentImg.classList.remove('active');
    };

    const closeGallery = () => {
      cleanupState();
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const finishClose = () => {
        currentImg.removeAttribute('src');
        currentImg.classList.remove('is-hidden');
        errorDisplay.classList.add('is-hidden');
        if (dialog.open) dialog.close();
        if (returnFocusElement) returnFocusElement.focus();
      };

      if (prefersReducedMotion) {
        finishClose();
      } else {
        closeTimer = setTimeout(finishClose, 300);
      }
    };

    const showLoadError = (prefersReducedMotion) => {
      currentImg.classList.remove('active');
      errorTimer = setTimeout(() => {
        if (currentLoadAbort && currentLoadAbort.signal.aborted) return;
        currentImg.classList.add('is-hidden');
        errorDisplay.innerHTML = '';

        const msg = document.createElement('p');
        msg.textContent = 'Failed to load image.';
        const retryBtn = document.createElement('button');
        retryBtn.type = 'button';
        retryBtn.className = 'btn btn-outline lb-retry-btn';
        retryBtn.textContent = 'Retry';
        retryBtn.addEventListener('click', () => goTo(currentIndex, true), { once: true });

        errorDisplay.appendChild(msg);
        errorDisplay.appendChild(retryBtn);
        errorDisplay.classList.remove('is-hidden');
      }, prefersReducedMotion ? 0 : 150);
    };

    const goTo = (index, immediate = false) => {
      cleanupState();

      currentIndex = index;
      const thumbs = thumbsContainer.querySelectorAll('.lb-thumb');

      thumbs.forEach((t) => {
        t.classList.remove('active');
        t.removeAttribute('aria-current');
      });
      if (thumbs[currentIndex]) {
        thumbs[currentIndex].classList.add('active');
        thumbs[currentIndex].setAttribute('aria-current', 'true');

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          thumbs[currentIndex].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }

      const targetLink = activeCollection[currentIndex];
      const targetSrc = targetLink.href;
      const figureLabel = targetLink.closest('.case-figure')?.querySelector('.visual-label')?.textContent;
      const title = targetLink.dataset.title || figureLabel || targetLink.querySelector('.gallery-title')?.textContent || 'Image';
      const alt = targetLink.querySelector('img')?.alt || title;

      titleDisplay.textContent = title;
      counterDisplay.textContent = `${currentIndex + 1} of ${activeCollection.length}`;
      errorDisplay.classList.add('is-hidden');

      currentLoadAbort = new AbortController();
      const { signal } = currentLoadAbort;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const preloadImg = new Image();

      preloadImg.onload = () => {
        if (signal.aborted) return;

        if (immediate || prefersReducedMotion) {
          currentImg.src = targetSrc;
          currentImg.alt = alt;
          currentImg.classList.remove('is-hidden');
          currentImg.classList.add('active');
        } else {
          currentImg.classList.remove('active');
          fadeOutTimer = setTimeout(() => {
            if (signal.aborted) return;
            currentImg.src = targetSrc;
            currentImg.alt = alt;
            currentImg.classList.remove('is-hidden');
            currentImg.classList.add('active');
            fadeInTimer = setTimeout(() => {
              fadeInTimer = null;
            }, 300);
          }, 150);
        }
      };

      preloadImg.onerror = () => {
        if (signal.aborted) return;
        showLoadError(prefersReducedMotion);
      };

      preloadImg.src = targetSrc;
    };

    const next = () => {
      if (activeCollection.length > 1) {
        goTo((currentIndex + 1) % activeCollection.length);
      }
    };

    const prev = () => {
      if (activeCollection.length > 1) {
        goTo((currentIndex - 1 + activeCollection.length) % activeCollection.length);
      }
    };

    btnNext.addEventListener('click', next);
    btnPrev.addEventListener('click', prev);
    btnClose.addEventListener('click', (e) => { e.preventDefault(); closeGallery(); });

    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      closeGallery();
    });

    dialog.addEventListener('click', (e) => {
      if (e.target === dialog || e.target.classList.contains('lb-wrapper')) {
        closeGallery();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!dialog.open) return;
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });

    let touchStartX = 0;
    let touchStartY = 0;
    const wrapper = dialog.querySelector('.lb-wrapper');

    if (wrapper) {
      wrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }, { passive: true });

      wrapper.addEventListener('touchend', (e) => {
        const diffX = touchStartX - e.changedTouches[0].screenX;
        const diffY = touchStartY - e.changedTouches[0].screenY;

        if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX > 0) next();
          else prev();
        }
      }, { passive: true });
    }
  }

  // Homepage Hero Video Control
  const video = document.getElementById('hero-video');
  const toggleBtn = document.getElementById('video-toggle');
  if (video && toggleBtn) {
    const pauseIcon = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
    const playIcon = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let userPaused = prefersReducedMotion;
    let isInViewport = true;
    let isPageVisible = !document.hidden;

    const setPausedState = () => {
      video.pause();
      toggleBtn.innerHTML = playIcon;
      toggleBtn.setAttribute('aria-label', 'Play animation');
    };

    const setPlayState = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => setPausedState());
      }
      toggleBtn.innerHTML = pauseIcon;
      toggleBtn.setAttribute('aria-label', 'Pause animation');
    };

    const syncPlayback = () => {
      if (isInViewport && isPageVisible && !userPaused) {
        setPlayState();
      } else if (!video.paused) {
        setPausedState();
      } else if (userPaused) {
        setPausedState();
      }
    };

    syncPlayback();

    toggleBtn.addEventListener('click', () => {
      if (video.paused) {
        userPaused = false;
        setPlayState();
      } else {
        userPaused = true;
        setPausedState();
      }
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isInViewport = entry.isIntersecting;
          syncPlayback();
        });
      }, { threshold: 0.1 });
      observer.observe(video);
    }

    document.addEventListener('visibilitychange', () => {
      isPageVisible = !document.hidden;
      syncPlayback();
    });
  }

  // Gaming Journal Screenshot Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const gameItems = document.querySelectorAll('.gallery-item[data-game]');
  const screenshotGrid = document.getElementById('screenshot-grid');
  const announcer = document.getElementById('filter-announcer');

  if (filterButtons.length > 0 && screenshotGrid) {
    const updateGridLayout = (count) => {
      screenshotGrid.className = 'gallery-grid interests-gallery';
      if (count === 1) {
        screenshotGrid.classList.add('grid-layout-1');
      } else if (count === 2) {
        screenshotGrid.classList.add('grid-layout-2');
      } else {
        screenshotGrid.classList.add('grid-layout-multi');
      }
    };

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        const gameTitle = btn.innerText;

        filterButtons.forEach((b) => {
          b.classList.remove('active');
          b.classList.add('btn-outline');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.classList.remove('btn-outline');
        btn.setAttribute('aria-pressed', 'true');

        let count = 0;
        gameItems.forEach((item) => {
          if (filter === 'all' || item.getAttribute('data-game') === filter) {
            item.classList.remove('hidden');
            count++;
          } else {
            item.classList.add('hidden');
          }
        });

        updateGridLayout(count);

        if (announcer) {
          announcer.textContent = `Showing ${count} screenshot${count !== 1 ? 's' : ''} for ${gameTitle}.`;
        }
      });
    });

    updateGridLayout(gameItems.length);
  }

  // Progressive Enhancement: Copy Email
  document.querySelectorAll('[data-copy-email]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const email = btn.getAttribute('data-copy-email');
      const status = document.getElementById('copy-status');
      if (!email) return;

      try {
        await navigator.clipboard.writeText(email);
        if (status) status.textContent = 'Copied!';
        setTimeout(() => {
          if (status) status.textContent = '';
        }, 2500);
      } catch (_) {
        if (status) status.textContent = 'Copy unavailable — please use email link.';
      }
    });
  });

  // Progressive Enhancement: Print Page
  document.querySelectorAll('[data-print-page]').forEach((btn) => {
    btn.addEventListener('click', () => window.print());
  });
});
