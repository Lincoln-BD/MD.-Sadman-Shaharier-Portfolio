/* =========================================================
   PWA — service worker registration, update banner, install prompt
   ========================================================= */

/* ---------- Service worker registration + update banner ---------- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js', { scope: './' })
      .then((registration) => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;
          newWorker.addEventListener('statechange', () => {
            // "installed" + an existing controller means this is a genuine
            // update (not the very first install) — safe to notify.
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              showUpdateBanner(newWorker);
            }
          });
        });
      })
      .catch((err) => console.warn('[PWA] Service worker registration failed:', err));

    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
  });
}

function showUpdateBanner(worker) {
  if (document.getElementById('pwaUpdateBanner')) return;

  const banner = document.createElement('div');
  banner.id = 'pwaUpdateBanner';
  banner.className = 'pwa-update-banner';
  banner.setAttribute('role', 'status');
  banner.innerHTML = `
    <span>A new version is available</span>
    <button type="button" class="pwa-update-btn" id="pwaUpdateBtn">Refresh to update</button>
    <button type="button" class="pwa-banner-close" id="pwaUpdateClose" aria-label="Dismiss">&times;</button>
  `;
  document.body.appendChild(banner);
  requestAnimationFrame(() => banner.classList.add('visible'));

  document.getElementById('pwaUpdateBtn').addEventListener('click', () => {
    worker.postMessage({ type: 'SKIP_WAITING' });
  });
  document.getElementById('pwaUpdateClose').addEventListener('click', () => {
    banner.classList.remove('visible');
    setTimeout(() => banner.remove(), 300);
  });
}

/* ---------- Install App button (persistent nav icon, always visible) ---------- */
(function initInstallPrompt() {
  let deferredPrompt = null;
  const btn = document.getElementById('installToggle');
  if (!btn) return;

  function isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  }

  function markInstalled() {
    btn.classList.add('installed');
    btn.setAttribute('title', 'Already installed');
    btn.setAttribute('aria-label', 'App is already installed');
    btn.innerHTML = '<i data-lucide="check"></i>';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  function showFallbackTip() {
    const existing = document.getElementById('pwaInstallTip');
    if (existing) { existing.remove(); return; }

    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const message = isIOS
      ? 'On iPhone/iPad: tap the Share icon in Safari, then "Add to Home Screen".'
      : 'Your browser doesn\'t support one-tap install here — check its menu for "Install app" or "Add to Home Screen".';

    const tip = document.createElement('div');
    tip.id = 'pwaInstallTip';
    tip.className = 'pwa-install-tip';
    tip.innerHTML = `<span>${message}</span><button type="button" aria-label="Close">&times;</button>`;
    document.body.appendChild(tip);
    requestAnimationFrame(() => tip.classList.add('visible'));
    tip.querySelector('button').addEventListener('click', () => {
      tip.classList.remove('visible');
      setTimeout(() => tip.remove(), 250);
    });
    setTimeout(() => {
      if (document.getElementById('pwaInstallTip')) {
        tip.classList.remove('visible');
        setTimeout(() => tip.remove(), 250);
      }
    }, 6000);
  }

  if (isStandalone()) {
    markInstalled();
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });

  btn.addEventListener('click', async () => {
    if (isStandalone()) return; // already installed, button is inert
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      deferredPrompt = null;
      if (outcome === 'accepted') markInstalled();
    } else {
      showFallbackTip();
    }
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    markInstalled();
  });
})();
