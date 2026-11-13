document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.getElementById('gallery-dialog');
  if (!dialog) return;

  const currentImg = document.getElementById('lb-current-img');
  const btnPrev = dialog.querySelector('.lb-prev');
  const btnNext = dialog.querySelector('.lb-next');
  const btnClose = dialog.querySelector('.lb-close');
  const titleDisplay = document.getElementById('lb-title');
  const counterDisplay = document.getElementById('lb-counter');
  const thumbsContainer = document.getElementById('lb-thumbs');

  // Error container
  let errorDisplay = dialog.querySelector('.lb-error');
  if (!errorDisplay) {
    errorDisplay = document.createElement('div');
    errorDisplay.className = 'lb-error';
    errorDisplay.style.display = 'none';
    currentImg.parentNode.appendChild(errorDisplay);
  }

  let activeCollection = [];
  let currentIndex = 0;
  
  // State
  let isTransitioning = false;
  let currentLoadAbort = null;
  let returnFocusElement = null;
  
  // Timer references for strict cancellation
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
      
      const grid = link.closest('.gallery-grid') || link.parentElement;
      activeCollection = Array.from(grid.querySelectorAll('.gallery-item:not(.hidden)'));
      
      const idx = activeCollection.indexOf(link);
      openGallery(idx > -1 ? idx : 0);
    });
  });

  const openGallery = (index) => {
    cleanupState(); // Clear any pending close timers or delayed callbacks
    buildThumbs();
    dialog.showModal();
    goTo(index, true);
  };

  const buildThumbs = () => {
    thumbsContainer.innerHTML = '';
    activeCollection.forEach((link, idx) => {
      const img = link.querySelector('img');
      const thumbBtn = document.createElement('button');
      thumbBtn.className = 'lb-thumb';
      thumbBtn.setAttribute('aria-label', `View image ${idx + 1}`);
      const thumbImg = document.createElement('img');
      thumbImg.src = img.src;
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
    isTransitioning = false;
    currentImg.classList.remove('active');
  };

  const closeGallery = () => {
    cleanupState();
    
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    const finishClose = () => {
      currentImg.src = '';
      errorDisplay.style.display = 'none';
      if (dialog.open) dialog.close();
      if (returnFocusElement) returnFocusElement.focus();
    };

    if (prefersReducedMotion) {
      finishClose();
    } else {
      closeTimer = setTimeout(finishClose, 300);
    }
  };

  const goTo = (index, immediate = false) => {
    if (isTransitioning) return;
    
    cleanupState(); // strictly clear previous ops
    
    currentIndex = index;
    const thumbs = thumbsContainer.querySelectorAll('.lb-thumb');
    
    thumbs.forEach(t => {
      t.classList.remove('active');
      t.removeAttribute('aria-current');
    });
    if (thumbs[currentIndex]) {
      thumbs[currentIndex].classList.add('active');
      thumbs[currentIndex].setAttribute('aria-current', 'true');
      
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        thumbs[currentIndex].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }

    const targetLink = activeCollection[currentIndex];
    const targetSrc = targetLink.href;
    const title = targetLink.querySelector('.gallery-title')?.textContent || 'Artwork';
    const alt = targetLink.querySelector('img')?.alt || 'Artwork';

    titleDisplay.textContent = title;
    counterDisplay.textContent = `${currentIndex + 1} of ${activeCollection.length}`;
    errorDisplay.style.display = 'none';

    currentLoadAbort = new AbortController();
    isTransitioning = true;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const preloadImg = new Image();
    
    preloadImg.onload = () => {
      if (currentLoadAbort.signal.aborted) return;
      
      if (immediate || prefersReducedMotion) {
        currentImg.src = targetSrc;
        currentImg.alt = alt;
        currentImg.style.display = '';
        currentImg.classList.add('active');
        isTransitioning = false;
      } else {
        currentImg.classList.remove('active');
        fadeOutTimer = setTimeout(() => {
          if (currentLoadAbort.signal.aborted) return;
          currentImg.src = targetSrc;
          currentImg.alt = alt;
          currentImg.style.display = '';
          currentImg.classList.add('active');
          fadeInTimer = setTimeout(() => { isTransitioning = false; }, 300);
        }, 150);
      }
    };

    preloadImg.onerror = () => {
      if (currentLoadAbort.signal.aborted) return;
      currentImg.classList.remove('active');
      
      errorTimer = setTimeout(() => {
        if (currentLoadAbort.signal.aborted) return;
        currentImg.style.display = 'none';
        errorDisplay.style.display = 'block';
        errorDisplay.innerHTML = `<p>Failed to load image.</p><button class="btn btn-outline" style="color:white; border-color:white;" id="lb-retry-btn">Retry</button>`;
        
        const retryBtn = document.getElementById('lb-retry-btn');
        if (retryBtn) {
          retryBtn.addEventListener('click', () => {
            if (!isTransitioning) goTo(currentIndex, true);
          }, { once: true });
        }
        isTransitioning = false;
      }, prefersReducedMotion ? 0 : 150);
    };
    
    preloadImg.src = targetSrc;
  };

  const next = () => {
    if (!isTransitioning && activeCollection.length > 1) {
      goTo((currentIndex + 1) % activeCollection.length);
    }
  };
  
  const prev = () => {
    if (!isTransitioning && activeCollection.length > 1) {
      goTo((currentIndex - 1 + activeCollection.length) % activeCollection.length);
    }
  };

  btnNext.addEventListener('click', next);
  btnPrev.addEventListener('click', prev);
  btnClose.addEventListener('click', (e) => { e.preventDefault(); closeGallery(); });
  
  // Native dialog cancel handles Escape reliably
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

  // Touch Swipe
  let touchStartX = 0;
  let touchStartY = 0;
  const wrapper = dialog.querySelector('.lb-wrapper');
  
  if (wrapper) {
    wrapper.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    wrapper.addEventListener('touchend', e => {
      if(isTransitioning) return;
      const diffX = touchStartX - e.changedTouches[0].screenX;
      const diffY = touchStartY - e.changedTouches[0].screenY;
      
      // Primarily horizontal swipe
      if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) next();
        else prev();
      }
    }, { passive: true });
  }

  // Homepage Hero Video Control
  const video = document.getElementById("hero-video");
  const toggleBtn = document.getElementById("video-toggle");
  if (video && toggleBtn) {
    video.setAttribute("poster", "/assets/images/Professional%20Headshot.jpg");

    const pauseIcon = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
    const playIcon = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';

    let userPaused = false;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

    if (prefersReducedMotion) {
      userPaused = true;
      setPausedState();
    }

    toggleBtn.addEventListener("click", () => {
      if (video.paused) {
        userPaused = false;
        setPlayState();
      } else {
        userPaused = true;
        setPausedState();
      }
    });

    const handleVisibility = (isVisible) => {
      if (!isVisible && !video.paused) {
        setPausedState();
      } else if (isVisible && !userPaused) {
        setPlayState();
      }
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => handleVisibility(entry.isIntersecting));
      }, { threshold: 0.1 });
      observer.observe(video);
    }
    
    document.addEventListener("visibilitychange", () => {
      handleVisibility(!document.hidden);
    });
  }

  // Gaming Journal Screenshot Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const gameItems = document.querySelectorAll('.gallery-item[data-game]');
  const screenshotGrid = document.getElementById('screenshot-grid');
  const announcer = document.getElementById('filter-announcer');

  if (filterButtons.length > 0 && screenshotGrid) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        const gameTitle = btn.innerText;

        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.classList.add('btn-outline');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.classList.remove('btn-outline');
        btn.setAttribute('aria-pressed', 'true');

        let count = 0;
        gameItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-game') === filter) {
            item.classList.remove('hidden');
            item.style.display = 'block';
            count++;
          } else {
            item.classList.add('hidden');
            item.style.display = 'none';
          }
        });

        screenshotGrid.className = 'gallery-grid interests-gallery';
        if (count === 1) {
          screenshotGrid.classList.add('grid-layout-1');
        } else if (count === 2) {
          screenshotGrid.classList.add('grid-layout-2');
        } else {
          screenshotGrid.classList.add('grid-layout-multi');
        }

        if (announcer) {
          announcer.textContent = `Showing ${count} screenshot${count !== 1 ? 's' : ''} for ${gameTitle}.`;
        }
      });
    });

    const allCount = gameItems.length;
    if (allCount === 1) {
      screenshotGrid.classList.add('grid-layout-1');
    } else if (allCount === 2) {
      screenshotGrid.classList.add('grid-layout-2');
    } else {
      screenshotGrid.classList.add('grid-layout-multi');
    }
  }
});
