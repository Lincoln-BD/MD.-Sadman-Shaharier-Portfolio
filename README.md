# Lincoln — Cosmic Portfolio

A premium, single-page personal portfolio with a live 3D galaxy background, smooth scroll storytelling, and glassmorphism UI. Built as plain HTML/CSS/JS — no build step, no npm install required.

## 🚀 Live Features

- **3D Galaxy background** — Three.js particle starfield, layered nebula glow, shooting stars, mouse-parallax rotation
- **Smooth scroll** — Lenis inertia scrolling synced with GSAP ScrollTrigger
- **Scroll storytelling** — every section animates in with its own motion style (fade, slide, scale)
- **Kinetic typography** — hero name animates in letter by letter
- **3D tilt hero card** — photo placeholder tilts toward your cursor
- **Water-ripple layer** — canvas ripple effect that follows mouse movement over the hero
- **Magnetic buttons** — buttons and social icons gently pull toward the cursor
- **Flip cards** — education and entertainment cards flip on hover/tap
- **Ambient sound toggle** — optional soft drone generated with the Web Audio API (no audio file needed)
- **Fully responsive** — mobile, tablet, laptop, ultrawide
- **Respects `prefers-reduced-motion`** — all animation disables gracefully for users who've turned it off

## 📁 Files

```
index.html   → structure & content
style.css    → design system, layout, responsive rules
script.js    → galaxy, scroll animations, all interactions
README.md    → this file
```

## 🛠 Before you publish

Update these two placeholders in `index.html`:

1. `data-email="hello@example.com"` → your real email
2. The three social `href="#"` links → your real LinkedIn / Facebook / X profile URLs

## 📤 Push to GitHub

```bash
cd portfolio
git init
git add .
git commit -m "Initial commit — cosmic portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## 🌐 Free hosting with GitHub Pages

1. Push the repo (steps above)
2. On GitHub: **Settings → Pages → Source → Deploy from branch → main → / (root)**
3. Your site goes live at `https://YOUR_USERNAME.github.io/YOUR_REPO/`

No build step, no dependencies to install — it just works.

## ⚙️ Tech used (all via CDN, already linked in `index.html`)

- [Three.js](https://threejs.org/) r128 — galaxy background
- [GSAP](https://gsap.com/) + ScrollTrigger — scroll animations
- [Lenis](https://lenis.darkroom.engineering/) — smooth scroll
- Google Fonts — Space Grotesk, Inter, JetBrains Mono

## ♿ Accessibility notes

- Respects `prefers-reduced-motion` throughout (galaxy slows, animations skip to final state, cursor effects disable)
- Keyboard-navigable nav, flip cards, and expandable experience cards
- ARIA labels on icon-only buttons (sound toggle, social icons, nav toggle)
