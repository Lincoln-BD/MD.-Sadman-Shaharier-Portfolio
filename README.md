# MD. Sadman Shaharier — Cosmic Portfolio

A premium, single-page personal portfolio with a live 3D galaxy background, click-to-read articles, and glassmorphism UI. Plain HTML/CSS/JS — no build step required.

## 📁 Files

```
index.html   → structure, content, and article templates
style.css    → design system, 3D nav, modal styles, responsive rules
script.js    → galaxy, scroll animations, modals, all interactions
README.md    → this file
```

## 🛠 Before you publish

1. `data-email="hello@example.com"` in `index.html` → your real email
2. The three social `href="#"` links → your real LinkedIn / Facebook / X URLs

## 🚀 What's inside

- **3D galaxy background** — Three.js starfield, nebula glow, shooting stars
- **3D nav** — links lift in 3D on hover, a glowing indicator slides to the active section, mobile menu flips in card-by-card
- **Click-to-read articles** — Skills, Sports HUD, Global Panorama, and Deen cards open full articles in a modal, including:
  - A crypto & blockchain guide (BTC, ETH, XRP, SEI, CoinMarketCap, support/resistance, fair value gaps, investing basics via Binance)
  - An Iman, Islam & Kalima study article for the Deen Academy
- **Smooth scroll** — Lenis, single-driver (fixed a stutter bug from an earlier version), synced with GSAP ScrollTrigger
- **Kinetic typography** — hero name and every section heading animate in letter by letter
- **Performance tuning** — fewer particles and lighter effects automatically on smaller/mobile screens
- **Respects `prefers-reduced-motion`**

## 📤 Push to GitHub

```bash
cd portfolio
git init
git add .
git commit -m "Update: 3D nav, new name, article content, performance fixes"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## 🌐 Free hosting with GitHub Pages

1. Push the repo (steps above)
2. On GitHub: **Settings → Pages → Source → Deploy from branch → main → / (root)**
3. Live at `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## ⚙️ Tech used (via CDN, already linked in `index.html`)

- [Three.js](https://threejs.org/) r128 — galaxy background
- [GSAP](https://gsap.com/) + ScrollTrigger — scroll animations
- [Lenis](https://lenis.darkroom.engineering/) — smooth scroll
- [Lucide](https://lucide.dev/) — icon graphics
- Google Fonts — Space Grotesk, Inter, JetBrains Mono

## ⚠️ Content note

The crypto article ends with an educational-only disclaimer — it explains concepts, not investment advice. The Deen Academy article is a concise study summary, not a substitute for a qualified teacher.
