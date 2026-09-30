/* =========================================================
   PORTFOLIO SCRIPT — MD. Sadman Shaharier
   ========================================================= */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasHover = window.matchMedia('(hover: hover)').matches;
const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
let lenisInstance = null;

/* =========================================================
   1. THREE.JS COSMIC GALAXY BACKGROUND (perf-tuned)
   ========================================================= */
function initGalaxy() {
  const canvas = document.getElementById('galaxy');
  if (!canvas || typeof THREE === 'undefined') return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
  } catch (e) {
    canvas.style.display = 'none';
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 60;

  // Lower pixel ratio cap on small screens for smoother mobile performance
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmallScreen ? 1 : 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Each page reads its own --section-accent (already set per body[data-page]
  // in CSS) so the SAME starfield feels like a different world per section,
  // without spinning up any extra WebGL scenes or particles. Violet is kept
  // as one constant layer — the "ecosystem" thread running through every page.
  let accentColor;
  try {
    const accentHex = getComputedStyle(document.body).getPropertyValue('--section-accent').trim();
    accentColor = new THREE.Color(accentHex || '#7B5CFA');
  } catch (e) {
    accentColor = new THREE.Color(0x7B5CFA);
  }
  const violetColor = new THREE.Color(0x7B5CFA);
  const accentSoft = accentColor.clone().lerp(violetColor, 0.35);
  const neutralColor = new THREE.Color(0xCBCDEC);

  const starColors = [accentColor.getHex(), violetColor.getHex(), accentSoft.getHex(), neutralColor.getHex()];
  const starGroups = [];

  function buildStarLayer(count, spread, size, colorHex) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: colorHex, size, transparent: true, opacity: 0.75,
      sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    return points;
  }

  // Reduced particle counts for lighter, faster rendering (esp. on mobile)
  const scale = isSmallScreen ? 0.35 : 1;
  starGroups.push(buildStarLayer(Math.round(900 * scale), 400, 0.9, starColors[0]));
  starGroups.push(buildStarLayer(Math.round(650 * scale), 300, 0.7, starColors[1]));
  starGroups.push(buildStarLayer(Math.round(500 * scale), 220, 1.1, starColors[2]));
  starGroups.push(buildStarLayer(Math.round(1100 * scale), 500, 0.5, starColors[3]));

  function makeNebulaTexture(colorA, colorB) {
    const size = 256;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, colorA);
    grad.addColorStop(0.5, colorB);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
  }

  if (!isSmallScreen) {
    const r = Math.round(accentColor.r * 255), g = Math.round(accentColor.g * 255), b = Math.round(accentColor.b * 255);
    const nebulaTex1 = makeNebulaTexture(`rgba(${r},${g},${b},0.25)`, `rgba(${r},${g},${b},0.05)`);
    const nebulaTex2 = makeNebulaTexture('rgba(123,92,250,0.22)', 'rgba(123,92,250,0.04)');
    function addNebula(texture, x, y, z, sc) {
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
      const sprite = new THREE.Sprite(material);
      sprite.position.set(x, y, z);
      sprite.scale.set(sc, sc, 1);
      scene.add(sprite);
    }
    addNebula(nebulaTex1, -60, 20, -150, 220);
    addNebula(nebulaTex2, 70, -30, -200, 260);
  }

  const shootingStars = [];
  function spawnShootingStar() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array([0, 0, 0, -6, -2, 0]);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.9 });
    const line = new THREE.Line(geometry, material);
    line.position.set((Math.random() - 0.5) * 200, Math.random() * 100 + 20, -100 - Math.random() * 100);
    line.rotation.z = Math.random() * 0.4 - 0.2;
    scene.add(line);
    shootingStars.push({ mesh: line, life: 0, maxLife: 60 + Math.random() * 40 });
  }
  let shootingTimer = 0;

  let targetRotX = 0, targetRotY = 0;
  if (hasHover) {
    window.addEventListener('mousemove', (e) => {
      targetRotY = (e.clientX / window.innerWidth - 0.5) * 0.15;
      targetRotX = (e.clientY / window.innerHeight - 0.5) * 0.1;
    }, { passive: true });
  }

  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', resize);

  let paused = document.hidden || document.documentElement.getAttribute('data-theme') === 'light';
  document.addEventListener('visibilitychange', () => {
    paused = document.hidden || document.documentElement.getAttribute('data-theme') === 'light';
  });
  window.addEventListener('themechange', () => {
    paused = document.documentElement.getAttribute('data-theme') === 'light';
  });

  function animate() {
    requestAnimationFrame(animate);
    if (paused) return;

    starGroups.forEach((group, i) => {
      group.rotation.y += 0.00025 * (i % 2 === 0 ? 1 : -1) * (reduceMotion ? 0.2 : 1);
      group.rotation.x += 0.00008;
    });
    scene.rotation.y += (targetRotY - scene.rotation.y) * 0.03;
    scene.rotation.x += (targetRotX - scene.rotation.x) * 0.03;

    if (!reduceMotion) {
      shootingTimer++;
      if (shootingTimer > 180 && Math.random() > 0.985) { spawnShootingStar(); shootingTimer = 0; }
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life++;
        s.mesh.position.x += 2.2;
        s.mesh.position.y -= 0.9;
        s.mesh.material.opacity = 0.9 * (1 - s.life / s.maxLife);
        if (s.life >= s.maxLife) { scene.remove(s.mesh); shootingStars.splice(i, 1); }
      }
    }
    renderer.render(scene, camera);
  }
  animate();
}

/* =========================================================
   2. CURSOR PARTICLE TRAIL (desktop only, for performance)
   ========================================================= */
function initCursorTrail() {
  const canvas = document.getElementById('trail');
  if (!canvas || reduceMotion || !hasHover || isSmallScreen) { if (canvas) canvas.style.display = 'none'; return; }
  const ctx = canvas.getContext('2d');
  let particles = [];
  const palette = ['rgba(123,92,250,0.7)', 'rgba(232,71,142,0.7)', 'rgba(34,201,160,0.7)'];

  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  let lastSpawn = 0;
  window.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSpawn < 30) return;
    lastSpawn = now;
    particles.push({
      x: e.clientX, y: e.clientY, r: Math.random() * 2 + 1.5,
      vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
      life: 1, color: palette[Math.floor(Math.random() * palette.length)]
    });
    if (particles.length > 50) particles.shift();
  }, { passive: true });

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.life -= 0.02;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * Math.max(p.life, 0), 0, Math.PI * 2);
      ctx.fillStyle = p.color.replace('0.7', (0.7 * Math.max(p.life, 0)).toFixed(2));
      ctx.fill();
    });
    particles = particles.filter(p => p.life > 0);
    requestAnimationFrame(tick);
  }
  tick();
}

/* =========================================================
   3. SMOOTH SCROLL — single driver, snappier feel
   ========================================================= */
function initSmoothScroll() {
  if (reduceMotion || typeof Lenis === 'undefined') return null;

  const lenis = new Lenis({
    duration: 0.8,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    // Let native scrolling happen normally inside the article modal
    // (fixes: mouse wheel not scrolling the "Read More" popup)
    prevent: (node) => !!(node && node.closest && node.closest('.modal-panel'))
  });
  lenisInstance = lenis;

  if (typeof gsap !== 'undefined') {
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    if (typeof ScrollTrigger !== 'undefined') lenis.on('scroll', ScrollTrigger.update);
  } else {
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  // NOTE: an earlier "ambient motion blur" effect (blurring the page based on
  // scroll velocity) was removed. It compounded with the many backdrop-filter
  // blurred glass cards and produced a visible flash/blackout, especially at
  // the bottom of pages where Lenis's rubber-band deceleration spikes velocity.
  // Stability > decorative motion blur.

  return lenis;
}

/* =========================================================
   4. GSAP SCROLL STORYTELLING
   ========================================================= */
function initScrollAnimations() {
  if (typeof gsap === 'undefined') {
    document.querySelectorAll('[data-gsap]').forEach(el => el.style.opacity = 1);
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  if (reduceMotion) {
    document.querySelectorAll('[data-gsap]').forEach(el => gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1 }));
    return;
  }

  const variants = {
    fade:  { from: { opacity: 0, y: 10 },  to: { opacity: 1, y: 0 } },
    up:    { from: { opacity: 0, y: 40 },  to: { opacity: 1, y: 0 } },
    left:  { from: { opacity: 0, x: -50 }, to: { opacity: 1, x: 0 } },
    right: { from: { opacity: 0, x: 50 },  to: { opacity: 1, x: 0 } },
    scale: { from: { opacity: 0, scale: 0.85, y: 20 }, to: { opacity: 1, scale: 1, y: 0 } }
  };

  // Grouped cards (grids of 4-8 items) share ONE ScrollTrigger with a stagger,
  // instead of one ScrollTrigger per card. Fewer scroll listeners = smoother
  // scrolling on card-dense pages (Insights, Connect, Career skills, etc).
  document.querySelectorAll('[data-gsap-group]').forEach((group) => {
    const items = Array.from(group.querySelectorAll('[data-gsap]'));
    if (!items.length) return;
    const type = items[0].getAttribute('data-gsap') || 'scale';
    const v = variants[type] || variants.scale;
    gsap.fromTo(items, v.from, {
      ...v.to,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: group, start: 'top 88%', toggleActions: 'play none none reverse' }
    });
    items.forEach(el => el.setAttribute('data-gsap-grouped', 'true'));
  });

  document.querySelectorAll('[data-gsap]:not([data-gsap-grouped])').forEach((el) => {
    const type = el.getAttribute('data-gsap') || 'fade';
    const v = variants[type] || variants.fade;
    gsap.fromTo(el, v.from, {
      ...v.to,
      duration: 0.9,
      ease: 'power3.out',
      delay: parseFloat(getComputedStyle(el).getPropertyValue('--delay')) || 0,
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
    });
  });
}

/* =========================================================
   5. KINETIC TYPOGRAPHY
   ========================================================= */
function splitIntoLetters(el, className) {
  const text = el.textContent.trim();
  el.textContent = '';
  // Split by word first, so each word is wrapped in an atomic "nowrap" span.
  // This guarantees the browser can only line-break BETWEEN words, never inside one
  // (fixes "Shaharier" incorrectly rendering as "Sha Haraier").
  const words = text.split(' ');
  words.forEach((word, wi) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'word-wrap';
    word.split('').forEach(ch => {
      const span = document.createElement('span');
      span.className = className;
      span.textContent = ch;
      wordSpan.appendChild(span);
    });
    el.appendChild(wordSpan);
    if (wi < words.length - 1) el.appendChild(document.createTextNode(' '));
  });
}

function initKineticTypography() {
  const heroName = document.getElementById('heroName');
  if (heroName) splitIntoLetters(heroName, 'letter');
  document.querySelectorAll('.kinetic-heading').forEach(h => splitIntoLetters(h, 'letter'));

  if (reduceMotion || typeof gsap === 'undefined') {
    document.querySelectorAll('.letter').forEach(l => { l.style.opacity = 1; l.style.transform = 'none'; });
    return;
  }

  if (heroName) {
    gsap.to(heroName.querySelectorAll('.letter'), { opacity: 1, y: 0, duration: 0.6, stagger: 0.035, ease: 'back.out(1.6)', delay: 0.2 });
  }
  // NOTE: a blanket gsap.to('[data-gsap="fade"]', ...) tween used to live here.
  // It animated the same elements that initScrollAnimations() ALSO animates via
  // scrollTrigger fromTo() — two tweens racing on the same opacity/y properties
  // caused a visible flash/flicker (element fades in, then snaps back to
  // opacity:0, then fades in again). Removed; initScrollAnimations() alone now
  // owns every [data-gsap] reveal, including the "fade" variant.

  document.querySelectorAll('.section-head .kinetic-heading, .footer-card .kinetic-heading').forEach(h => {
    gsap.to(h.querySelectorAll('.letter'), {
      opacity: 1, y: 0, duration: 0.5, stagger: 0.025, ease: 'power2.out',
      scrollTrigger: { trigger: h, start: 'top 90%', toggleActions: 'play none none reverse' }
    });
  });
}

/* =========================================================
   6. CYCLING HERO ROLE TEXT
   ========================================================= */
function initCycleText() {
  const roles = [
    "HR & Operations Executive",
    "Future MSc Student 🇩🇪",
    "Football Intelligence Analyst",
    "Markets & Blockchain Watcher"
  ];
  const el = document.getElementById('cycleText');
  if (!el) return;
  if (reduceMotion) { el.textContent = roles[0]; return; }

  let ri = 0, ci = 0, deleting = false;
  function loop() {
    const current = roles[ri];
    if (!deleting) {
      ci++;
      el.textContent = current.slice(0, ci);
      if (ci === current.length) { deleting = true; setTimeout(loop, 1500); return; }
    } else {
      ci--;
      el.textContent = current.slice(0, ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(loop, deleting ? 30 : 50);
  }
  loop();
}

/* =========================================================
   7. EXPANDABLE ORBIT CARDS (experience)
   ========================================================= */
function initExpandableCards() {
  document.querySelectorAll('[data-expand]').forEach(card => {
    card.addEventListener('click', () => {
      const isOpen = card.classList.contains('expanded');
      document.querySelectorAll('[data-expand]').forEach(c => c.classList.remove('expanded'));
      if (!isOpen) card.classList.add('expanded');
      // The card's height just changed, which shifts every element below it.
      // Without this, ScrollTrigger keeps using stale start/end positions for
      // everything further down the page — the exact cause of the "shake /
      // jump / hang" reported after clicking into a card.
      if (typeof ScrollTrigger !== 'undefined') {
        setTimeout(() => ScrollTrigger.refresh(), 420);
      }
    });
  });
}

/* =========================================================
   8. MOBILE NAV (3D flip panel)
   ========================================================= */
function initMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!navToggle || !navLinks) return;
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

/* =========================================================
   9. NAV ACTIVE STATE — sliding 3D indicator
   Works two ways:
   (a) In-page scrollspy — if a nav link has data-section="id"
       AND an element with that id exists on the current page
       (used when a page still has multiple anchor sections).
   (b) Cross-page state — every page's <body> carries a
       data-page="career" attribute; every top-level nav link
       carries a matching data-page="career" attribute. Since
       this is now a multi-page site, this is the common case.
   ========================================================= */
function initNavScrollSpy() {
  const indicator = document.getElementById('navIndicator');
  const links = Array.from(document.querySelectorAll('.nav-links > li > a'));
  if (!indicator || !links.length) return;

  const currentPage = document.body.getAttribute('data-page');

  function moveIndicatorTo(link) {
    if (!link || window.innerWidth <= 640) return;
    const wrapRect = link.closest('.nav-links').getBoundingClientRect();
    const rect = link.getBoundingClientRect();
    indicator.style.left = `${rect.left - wrapRect.left}px`;
    indicator.style.width = `${rect.width}px`;
    indicator.style.opacity = '1';
  }

  function setActive(id) {
    links.forEach(l => l.classList.toggle('active', l.dataset.section === id || l.dataset.page === id));
    const activeLink = links.find(l => l.dataset.section === id || l.dataset.page === id);
    moveIndicatorTo(activeLink);
  }

  // (a) In-page scrollspy, only if this page actually has matching sections
  const sectionLinks = links.filter(a => a.dataset.section);
  const sections = sectionLinks.map(a => document.getElementById(a.dataset.section)).filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(s => observer.observe(s));
  } else if (currentPage) {
    // (b) Cross-page — highlight the link matching this page's data-page attribute
    setActive(currentPage);
  }

  window.addEventListener('resize', () => {
    const active = links.find(l => l.classList.contains('active'));
    if (active) moveIndicatorTo(active);
  });
}

/* =========================================================
   10. COPY EMAIL
   ========================================================= */
function initEmailCopy() {
  const emailCopy = document.getElementById('emailCopy');
  const copyHint = document.getElementById('copyHint');
  if (!emailCopy) return;
  emailCopy.addEventListener('click', async () => {
    const email = emailCopy.getAttribute('data-email');
    try {
      await navigator.clipboard.writeText(email);
      copyHint.textContent = 'Copied ✓';
    } catch {
      copyHint.textContent = 'Copy failed — select manually';
    }
    setTimeout(() => { copyHint.textContent = 'Click to copy'; }, 2000);
  });
}

/* =========================================================
   11. 3D CURSOR TILT (hero emblem badge)
   ========================================================= */
function initTiltCard() {
  const tiltCard = document.getElementById('tiltCard');
  if (!tiltCard || reduceMotion || !hasHover) return;
  const wrap = tiltCard.closest('.hero-photo-wrap');
  let ticking = false, lastEvent = null;

  wrap.addEventListener('mousemove', (e) => {
    lastEvent = e;
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const rect = tiltCard.getBoundingClientRect();
      const x = (lastEvent.clientX - rect.left) / rect.width;
      const y = (lastEvent.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 24;
      const rotateX = (0.5 - y) * 24;
      tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      tiltCard.style.setProperty('--mx', `${x * 100}%`);
      tiltCard.style.setProperty('--my', `${y * 100}%`);
      ticking = false;
    });
  }, { passive: true });
  wrap.addEventListener('mouseleave', () => { tiltCard.style.transform = 'rotateX(0deg) rotateY(0deg)'; });
}

/* =========================================================
   12. CURSOR SPOTLIGHT
   ========================================================= */
function initSpotlight() {
  const spotlight = document.getElementById('spotlight');
  if (!spotlight || reduceMotion || !hasHover || isSmallScreen) { if (spotlight) spotlight.style.display = 'none'; return; }
  window.addEventListener('mousemove', (e) => {
    spotlight.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  }, { passive: true });
}

/* =========================================================
   13. MAGNETIC BUTTONS
   ========================================================= */
function initMagneticButtons() {
  if (reduceMotion || !hasHover) return;
  document.querySelectorAll('.magnetic').forEach(btn => {
    let ticking = false, lastEvent = null;
    btn.addEventListener('mousemove', (e) => {
      lastEvent = e;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = btn.getBoundingClientRect();
        const x = lastEvent.clientX - rect.left - rect.width / 2;
        const y = lastEvent.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        ticking = false;
      });
    }, { passive: true });
    btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
  });
}

/* =========================================================
   14. AMBIENT SOUND TOGGLE
   ========================================================= */
/* =========================================================
   14B. LIGHT / DARK THEME TOGGLE
   The initial theme is already set by the inline script in
   <head> (before paint, to avoid a flash). This just handles
   the button click, persistence, and icon swap.
   ========================================================= */
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  if (!toggle) return;

  function applyIcon(theme) {
    if (icon && typeof lucide !== 'undefined') {
      icon.setAttribute('data-lucide', theme === 'light' ? 'sun' : 'moon');
      lucide.createIcons();
    }
  }
  applyIcon(document.documentElement.getAttribute('data-theme') || 'dark');

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    applyIcon(next);
    // Let other modules (like the galaxy background) react to the change
    window.dispatchEvent(new Event('themechange'));
  });
}

function initAmbientSound() {
  const toggle = document.getElementById('soundToggle');
  const icon = document.getElementById('soundIcon');
  if (!toggle) return;

  let audioCtx = null, nodes = null, playing = false;

  function buildDrone() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    osc1.type = 'sine'; osc1.frequency.value = 60;
    osc2.type = 'sine'; osc2.frequency.value = 90.3;
    filter.type = 'lowpass'; filter.frequency.value = 300;
    gain.gain.value = 0;
    osc1.connect(filter); osc2.connect(filter);
    filter.connect(gain); gain.connect(audioCtx.destination);
    osc1.start(); osc2.start();
    return { osc1, osc2, gain, filter };
  }

  toggle.addEventListener('click', async () => {
    if (!audioCtx) nodes = buildDrone();
    if (audioCtx.state === 'suspended') await audioCtx.resume();
    playing = !playing;
    toggle.setAttribute('aria-pressed', playing ? 'true' : 'false');
    if (icon && typeof lucide !== 'undefined') {
      icon.setAttribute('data-lucide', playing ? 'volume-2' : 'volume-x');
      lucide.createIcons();
    }
    nodes.gain.gain.linearRampToValueAtTime(playing ? 0.035 : 0, audioCtx.currentTime + 0.6);
  });
}

/* =========================================================
   15. MODAL / ARTICLE READER
   ========================================================= */
/* =========================================================
   15. LIVE CRYPTO PRICES — auto-updating, converted to BDT
   Uses CoinGecko (free, no key required for personal-use volume)
   and ExchangeRate-API (free, no key) for the USD→BDT rate.
   ========================================================= */
const CRYPTO_COINS = [
  { symbol: 'BTC',  name: 'Bitcoin',    id: 'bitcoin' },
  { symbol: 'ETH',  name: 'Ethereum',   id: 'ethereum' },
  { symbol: 'XRP',  name: 'XRP',        id: 'ripple' },
  { symbol: 'SOL',  name: 'Solana',     id: 'solana' },
  { symbol: 'DOGE', name: 'Dogecoin',   id: 'dogecoin' },
  { symbol: 'TAO',  name: 'Bittensor',  id: 'bittensor' },
  { symbol: 'SUI',  name: 'Sui',        id: 'sui' },
  { symbol: 'SEI',  name: 'Sei',        id: 'sei-network' }
];
const FALLBACK_USD_BDT = 122; // only used if the live exchange-rate fetch fails
const CRYPTO_REFRESH_MS = 5 * 60 * 1000; // auto-refresh every 5 minutes

let cryptoRefreshInterval = null;
let cryptoFetchInFlight = false;

// Formats a BDT number using Lac (10^5) and Crore (10^7), per Bangladeshi convention
function formatBDT(amount) {
  if (amount == null || isNaN(amount)) return '—';
  const CRORE = 1e7, LAC = 1e5;
  if (Math.abs(amount) >= CRORE) return `৳${(amount / CRORE).toLocaleString('en-US', { maximumFractionDigits: 2 })} Cr`;
  if (Math.abs(amount) >= LAC) return `৳${(amount / LAC).toLocaleString('en-US', { maximumFractionDigits: 2 })} Lac`;
  return `৳${amount.toLocaleString('en-US', { maximumFractionDigits: amount < 1 ? 4 : 2 })}`;
}

async function fetchUsdToBdtRate() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await res.json();
    if (data && data.rates && data.rates.BDT) return data.rates.BDT;
  } catch (e) { /* network/CORS issue — fall back below */ }
  return FALLBACK_USD_BDT;
}

async function fetchCryptoUsdPrices() {
  const ids = CRYPTO_COINS.map(c => c.id).join(',');
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('CoinGecko request failed: ' + res.status);
  return res.json();
}

function renderCryptoRows(prices, rate) {
  const tbody = document.getElementById('cryptoLiveGrid');
  if (!tbody) return;

  const rows = CRYPTO_COINS.map(coin => {
    const d = prices ? prices[coin.id] : null;
    if (!d || d.usd == null) return { ...coin, price: null, cap: null, change: null };
    return {
      ...coin,
      price: d.usd * rate,
      cap: d.usd_market_cap ? d.usd_market_cap * rate : null,
      change: typeof d.usd_24h_change === 'number' ? d.usd_24h_change : null
    };
  }).sort((a, b) => (b.cap || 0) - (a.cap || 0)); // smart structure: biggest market cap first

  tbody.innerHTML = rows.map(r => {
    const changeClass = r.change == null ? '' : (r.change >= 0 ? 'change-up' : 'change-down');
    const changeText = r.change == null ? '—' : `${r.change >= 0 ? '+' : ''}${r.change.toFixed(2)}%`;
    return `<tr>
      <td class="coin-cell"><span class="coin-symbol">${r.symbol}</span>${r.name}</td>
      <td>${r.price != null ? formatBDT(r.price) : '—'}</td>
      <td>${r.cap != null ? formatBDT(r.cap) : '—'}</td>
      <td class="${changeClass}">${changeText}</td>
    </tr>`;
  }).join('');
}

async function refreshCryptoWidget() {
  const tbody = document.getElementById('cryptoLiveGrid');
  const statusEl = document.getElementById('cryptoStatus');
  if (!tbody || cryptoFetchInFlight) return;
  cryptoFetchInFlight = true;
  if (statusEl) statusEl.textContent = 'Updating…';

  try {
    const [rate, prices] = await Promise.all([fetchUsdToBdtRate(), fetchCryptoUsdPrices()]);
    renderCryptoRows(prices, rate);
    if (statusEl) {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      statusEl.textContent = `Updated ${time} · 1 USD ≈ ৳${rate.toFixed(2)}`;
    }
  } catch (err) {
    if (statusEl) statusEl.textContent = 'Live prices unavailable right now — please try refreshing';
    if (tbody.querySelector('.crypto-loading')) {
      tbody.innerHTML = `<tr><td colspan="4" class="crypto-loading">Couldn't load live prices. Check your connection and tap Refresh.</td></tr>`;
    }
    console.error('Crypto widget fetch failed:', err);
  } finally {
    cryptoFetchInFlight = false;
  }
}

function startCryptoWidget() {
  refreshCryptoWidget();
  if (cryptoRefreshInterval) clearInterval(cryptoRefreshInterval);
  cryptoRefreshInterval = setInterval(refreshCryptoWidget, CRYPTO_REFRESH_MS);
  const refreshBtn = document.getElementById('cryptoRefreshBtn');
  if (refreshBtn) refreshBtn.addEventListener('click', refreshCryptoWidget);
}

function stopCryptoWidget() {
  if (cryptoRefreshInterval) { clearInterval(cryptoRefreshInterval); cryptoRefreshInterval = null; }
}

/* =========================================================
   16. MODAL / ARTICLE READER
   ========================================================= */
/* =========================================================
   16B. LIVE CRYPTO PRICES (crypto.html only)
   Fetches BTC/ETH/XRP/SOL/DOGE/TAO/SUI/SEI from CoinGecko's
   free public endpoint, converts USD → BDT via a free no-key
   exchange-rate API, and renders a live table. Auto-refreshes
   every 5 minutes; a manual refresh button is also wired up.
   NOTE: this function previously didn't exist at all — the
   HTML skeleton was there but nothing ever populated it. That
   was the actual bug behind "live prices aren't working."
   ========================================================= */
function initCryptoPrices() {
  const grid = document.getElementById('cryptoLiveGrid');
  if (!grid) return; // only present on crypto.html

  const statusEl = document.getElementById('cryptoStatus');
  const refreshBtn = document.getElementById('cryptoRefreshBtn');

  const COINS = [
    { id: 'bitcoin',       symbol: 'BTC',  name: 'Bitcoin' },
    { id: 'ethereum',      symbol: 'ETH',  name: 'Ethereum' },
    { id: 'ripple',        symbol: 'XRP',  name: 'XRP' },
    { id: 'solana',        symbol: 'SOL',  name: 'Solana' },
    { id: 'dogecoin',      symbol: 'DOGE', name: 'Dogecoin' },
    { id: 'bittensor',     symbol: 'TAO',  name: 'Bittensor' },
    { id: 'sui',           symbol: 'SUI',  name: 'Sui' },
    { id: 'sei-network',   symbol: 'SEI',  name: 'Sei' }
  ];
  const FALLBACK_BDT_RATE = 122; // used only if the live exchange-rate fetch fails

  function fmtBDT(n) {
    if (n >= 1000) return '৳' + Math.round(n).toLocaleString('en-US');
    return '৳' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  }
  function fmtUSDCompact(n) {
    if (n >= 1e12) return '$' + (n / 1e12).toFixed(2) + 'T';
    if (n >= 1e9)  return '$' + (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6)  return '$' + (n / 1e6).toFixed(2) + 'M';
    return '$' + Math.round(n).toLocaleString('en-US');
  }

  async function fetchRate() {
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await res.json();
      if (data && data.rates && data.rates.BDT) return data.rates.BDT;
    } catch (e) { /* fall through to fallback */ }
    return FALLBACK_BDT_RATE;
  }

  async function fetchPrices() {
    const ids = COINS.map(c => c.id).join(',');
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('CoinGecko request failed: ' + res.status);
    return res.json();
  }

  async function loadPrices(isManualRefresh) {
    if (statusEl) statusEl.textContent = isManualRefresh ? 'Refreshing…' : 'Loading…';
    if (refreshBtn) refreshBtn.disabled = true;

    try {
      const [prices, bdtRate] = await Promise.all([fetchPrices(), fetchRate()]);

      const rows = COINS.map(coin => {
        const d = prices[coin.id];
        if (!d || typeof d.usd !== 'number') {
          return `<tr><td class="coin-cell"><span class="coin-symbol">${coin.symbol}</span>${coin.name}</td><td colspan="3" style="color:var(--frost-dim);">unavailable</td></tr>`;
        }
        const priceBdt = fmtBDT(d.usd * bdtRate);
        const cap = typeof d.usd_market_cap === 'number' ? fmtUSDCompact(d.usd_market_cap) : '—';
        const change = typeof d.usd_24h_change === 'number' ? d.usd_24h_change : null;
        const changeClass = change === null ? '' : (change >= 0 ? 'style="color:var(--aqua);"' : 'style="color:var(--pink);"');
        const changeText = change === null ? '—' : `${change >= 0 ? '▲' : '▼'} ${Math.abs(change).toFixed(2)}%`;
        return `<tr>
          <td class="coin-cell"><span class="coin-symbol">${coin.symbol}</span>${coin.name}</td>
          <td>${priceBdt}</td>
          <td>${cap}</td>
          <td ${changeClass}>${changeText}</td>
        </tr>`;
      }).join('');

      grid.innerHTML = rows;
      if (statusEl) {
        const now = new Date();
        statusEl.textContent = `Updated ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} · 1 USD ≈ ৳${bdtRate.toFixed(2)}`;
      }
    } catch (err) {
      grid.innerHTML = `<tr><td colspan="4" class="crypto-loading">Live prices are temporarily unavailable. <button id="cryptoRetryInline" style="background:none;border:none;color:var(--violet);text-decoration:underline;cursor:pointer;font-family:inherit;">Try again</button></td></tr>`;
      if (statusEl) statusEl.textContent = 'Could not reach the price feed.';
      const retryBtn = document.getElementById('cryptoRetryInline');
      if (retryBtn) retryBtn.addEventListener('click', () => loadPrices(true));
    } finally {
      if (refreshBtn) refreshBtn.disabled = false;
    }
  }

  loadPrices(false);
  if (refreshBtn) refreshBtn.addEventListener('click', () => loadPrices(true));
  // Auto-refresh every 5 minutes, matching the "Auto-refreshes every 5 minutes" note on the page
  setInterval(() => loadPrices(false), 5 * 60 * 1000);
}

function initModals() {
  const overlay = document.getElementById('modalOverlay');
  const body = document.getElementById('modalBody');
  const closeBtn = document.getElementById('modalClose');
  const panel = overlay ? overlay.querySelector('.modal-panel') : null;
  if (!overlay || !body) return;

  // Defensive backup: even if Lenis's own exclusion misses it, stop the
  // wheel/touch event from ever bubbling up to Lenis's page-level listener.
  if (panel) {
    panel.addEventListener('wheel', (e) => e.stopPropagation(), { passive: true });
    panel.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: true });
  }

  let lastFocused = null;

  function openModal(templateId) {
    const template = document.getElementById(templateId);
    if (!template) return;
    body.innerHTML = '';
    body.appendChild(template.content.cloneNode(true));
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // The live price table only exists in the crypto article — start/stop
    // its auto-refresh loop only while that specific modal is open.
    if (templateId === 'modal-crypto') {
      startCryptoWidget();
    } else {
      stopCryptoWidget();
    }

    lastFocused = document.activeElement;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    window.__modalOpen = true;
    if (lenisInstance) lenisInstance.stop();
    closeBtn.focus();
  }

  function closeModal() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    window.__modalOpen = false;
    stopCryptoWidget();
    if (lenisInstance) lenisInstance.start();
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', () => openModal(trigger.getAttribute('data-modal')));
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });
}

/* =========================================================
   17. RESUME REQUEST (front-end only for now)
   NOTE FOR FUTURE UPGRADE: this currently opens the visitor's
   email client with a pre-filled message via a mailto: link.
   To turn this into a real "approve / deny" system later:
     1. Swap the form's submit handler below for a fetch() call
        to a backend endpoint (e.g. a small Node/Supabase function).
     2. Store each request (name, email, reason, date, status).
     3. Build a private admin view where you approve/deny and the
        approved requester gets a real download link or email.
   ========================================================= */
function initResumeRequest() {
  const openBtn = document.getElementById('resumeRequestBtn');
  const overlay = document.getElementById('resumeModalOverlay');
  if (!openBtn || !overlay) return;
  const closeBtn = document.getElementById('resumeModalClose');
  const form = document.getElementById('resumeRequestForm');
  const status = document.getElementById('resumeRequestStatus');
  const OWNER_EMAIL = 'sadmanshaharier96@gmail.com';

  function open() { overlay.classList.add('open'); overlay.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
  function close() { overlay.classList.remove('open'); overlay.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#reqName').value.trim();
    const email = form.querySelector('#reqEmail').value.trim();
    const reason = form.querySelector('#reqReason').value.trim();
    if (!name || !email) return;

    const subject = encodeURIComponent(`Resume request from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nReason: ${reason || '(not provided)'}\n\n— Sent from the "Request My Resume" form`);
    window.location.href = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;

    status.textContent = 'Opening your email app to send the request…';
    status.classList.add('visible');
    setTimeout(() => { close(); form.reset(); status.classList.remove('visible'); }, 2500);
  });
}

/* =========================================================
   18. CONTACT FORM (mailto-based — same upgrade note as above)
   ========================================================= */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const status = document.getElementById('contactFormStatus');
  const OWNER_EMAIL = 'sadmanshaharier96@gmail.com';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#cName').value.trim();
    const email = form.querySelector('#cEmail').value.trim();
    const message = form.querySelector('#cMessage').value.trim();
    if (!name || !email || !message) return;

    const subject = encodeURIComponent(`Website message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;

    if (status) {
      status.textContent = 'Opening your email app…';
      status.classList.add('visible');
      setTimeout(() => status.classList.remove('visible'), 3000);
    }
    form.reset();
  });
}

/* =========================================================
   19. DATA-DRIVEN RENDERERS
   Reads from assets/js/data.js (UPDATES_DATA) so content can be
   added in ONE place without touching HTML.
   ========================================================= */
function updateCard(u) {
  return `<article class="update-item glass" data-gsap="up">
    <div class="update-meta"><span class="update-date">${u.date}</span><span class="update-tag">${u.tag}</span></div>
    <h3>${u.title}</h3>
    <p>${u.description}</p>
  </article>`;
}

function renderLatestUpdates() {
  const el = document.getElementById('latestUpdates');
  if (!el || typeof UPDATES_DATA === 'undefined') return;
  el.innerHTML = UPDATES_DATA.map(updateCard).join('');
  if (typeof lucide !== 'undefined') lucide.createIcons();
  // This injects new DOM content AFTER initScrollAnimations() already measured
  // the page. Without a refresh, ScrollTrigger keeps stale positions for
  // everything below — the main cause of the reported jump/shake/hang near
  // the bottom of the Home page.
  if (typeof ScrollTrigger !== 'undefined') {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }
}

/* =========================================================
   20. DEEN — WATCH · LEARN · REFLECT (YouTube playlist library)
   Renders playlist cards from DEEN_PLAYLISTS and drives a single
   shared <iframe> — only one playlist is ever loaded at a time,
   switched by updating the iframe's src on click. No API key,
   no backend, works on GitHub Pages.
   ========================================================= */
function initDeenPlaylists() {
  const cardsEl = document.getElementById('playlistCards');
  const playerEl = document.getElementById('deenPlayer');
  const nowPlayingEl = document.getElementById('nowPlayingTitle');
  const openLinkEl = document.getElementById('openOnYoutube');
  if (!cardsEl || !playerEl || typeof DEEN_PLAYLISTS === 'undefined') return;

  function cardHtml(p, index) {
    const titleClass = p.bangla ? 'bangla-text' : '';
    return `<button class="playlist-card${index === 0 ? ' active' : ''}" data-index="${index}" data-gsap="scale"
        aria-pressed="${index === 0 ? 'true' : 'false'}"
        aria-label="Watch ${p.title.replace(/"/g, '&quot;')}">
      <div class="playlist-card-head">
        <span class="playlist-card-icon"><i data-lucide="${p.icon}"></i></span>
        <span class="playlist-card-cat">${p.category}</span>
      </div>
      <h4 class="${titleClass}">${p.title}</h4>
      <p>${p.description}</p>
      <span class="playlist-card-cta">Watch / Explore <i data-lucide="play"></i></span>
    </button>`;
  }

  function loadPlaylist(index) {
    const p = DEEN_PLAYLISTS[index];
    if (!p) return;
    // NOTE: youtube-nocookie.com was tried first but threw "Error 153"
    // (an embed-permission check) for these specific playlists. The
    // standard youtube.com/embed domain — the one YouTube's own "Share >
    // Embed" button generates — is the most broadly compatible option.
    playerEl.src = `https://www.youtube.com/embed/videoseries?list=${p.playlistId}&autoplay=0&rel=0`;
    playerEl.title = p.title;
    if (nowPlayingEl) nowPlayingEl.textContent = p.title;
    if (openLinkEl) openLinkEl.href = `https://www.youtube.com/playlist?list=${p.playlistId}`;
    cardsEl.querySelectorAll('.playlist-card').forEach((c, i) => {
      const isActive = i === index;
      c.classList.toggle('active', isActive);
      c.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  cardsEl.innerHTML = DEEN_PLAYLISTS.map(cardHtml).join('');
  if (typeof lucide !== 'undefined') lucide.createIcons();
  loadPlaylist(0); // first playlist featured by default, muted/paused (autoplay=0)

  cardsEl.addEventListener('click', (e) => {
    const card = e.target.closest('.playlist-card');
    if (!card) return;
    loadPlaylist(parseInt(card.dataset.index, 10));
    playerEl.closest('.player-wrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  if (typeof ScrollTrigger !== 'undefined') {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }
}

/* =========================================================
   INIT
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();

  initKineticTypography();
  initCycleText();
  initGalaxy();
  initCursorTrail();
  initSmoothScroll();
  renderLatestUpdates();
  initDeenPlaylists();
  initScrollAnimations();
  initExpandableCards();
  initMobileNav();
  initNavScrollSpy();
  initResumeRequest();
  initContactForm();
  initCryptoPrices();
  initEmailCopy();
  initTiltCard();
  initSpotlight();
  initMagneticButtons();
  initThemeToggle();
  initAmbientSound();
  initModals();
});
