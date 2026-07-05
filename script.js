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

  const starColors = [0x8670F0, 0xF55FA6, 0x4DE0C0, 0xCBCDEC];
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
    const nebulaTex1 = makeNebulaTexture('rgba(134,112,240,0.25)', 'rgba(134,112,240,0.05)');
    const nebulaTex2 = makeNebulaTexture('rgba(245,95,166,0.22)', 'rgba(245,95,166,0.04)');
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

  let paused = document.hidden;
  document.addEventListener('visibilitychange', () => { paused = document.hidden; });

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
  const palette = ['rgba(134,112,240,0.7)', 'rgba(245,95,166,0.7)', 'rgba(77,224,192,0.7)'];

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

  // Scroll-velocity ambient motion blur — desktop only, lighter touch for smoothness,
  // and skipped entirely while a modal is open (avoids extra repaint cost + visual clash).
  if (!isSmallScreen) {
    let blurAmount = 0;
    lenis.on('scroll', (e) => {
      if (window.__modalOpen) return;
      const v = Math.min(Math.abs(e.velocity || 0), 2);
      blurAmount = Math.max(blurAmount, v * 1.0);
    });
    function decayBlur() {
      if (window.__modalOpen) {
        document.body.style.filter = 'none';
      } else {
        blurAmount *= 0.85;
        if (blurAmount < 0.05) blurAmount = 0;
        document.body.style.filter = blurAmount > 0.05 ? `blur(${blurAmount.toFixed(2)}px)` : 'none';
      }
      requestAnimationFrame(decayBlur);
    }
    decayBlur();
  }

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

  document.querySelectorAll('[data-gsap]').forEach((el) => {
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
  gsap.to('[data-gsap="fade"]', { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, delay: 0.5, ease: 'power2.out' });

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
   9. NAV SCROLLSPY — sliding 3D indicator
   ========================================================= */
function initNavScrollSpy() {
  const indicator = document.getElementById('navIndicator');
  const links = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = links.map(a => document.getElementById(a.dataset.section)).filter(Boolean);
  if (!indicator || !links.length || !sections.length) return;

  function moveIndicatorTo(link) {
    if (!link || window.innerWidth <= 640) return;
    const wrapRect = link.closest('.nav-links').getBoundingClientRect();
    const rect = link.getBoundingClientRect();
    indicator.style.left = `${rect.left - wrapRect.left}px`;
    indicator.style.width = `${rect.width}px`;
    indicator.style.opacity = '1';
  }

  function setActive(id) {
    links.forEach(l => l.classList.toggle('active', l.dataset.section === id));
    const activeLink = links.find(l => l.dataset.section === id);
    moveIndicatorTo(activeLink);
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(s => observer.observe(s));
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
   11. 3D CURSOR TILT (hero photo card)
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
   INIT
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();

  initKineticTypography();
  initCycleText();
  initGalaxy();
  initCursorTrail();
  initSmoothScroll();
  initScrollAnimations();
  initExpandableCards();
  initMobileNav();
  initNavScrollSpy();
  initEmailCopy();
  initTiltCard();
  initSpotlight();
  initMagneticButtons();
  initAmbientSound();
  initModals();
});
