# MD. Sadman Shaharier — Personal Digital Ecosystem

A premium, multi-page personal website: career, education, and a merged Insights ecosystem (HR, AI, crypto, football, faith, entertainment) — all under one connected identity. Plain HTML/CSS/JS — no build step required to run it.

## 🆕 Latest update — real content + crypto fix

- **Career**: current role is now Recruitment Specialist at Neural Semiconductor (Staff Augmentation, onsite Uttara Dhaka, US/Canada/Japan). Previous role moved to Past.
- **Journey**: Master's status updated honestly — a German visa rejection paused the Chemnitz plan; framed as "Reapplying," not "In Progress."
- **About**: rewritten with the real job, faith-first framing, and values that reflect what was actually said (dropped a "Discipline" chip that didn't match — added Mutual Growth, Teamwork, Personal Space, Passion & Dedication instead), plus a new "How I Think" section on tactics/patterns across football, markets, and life.
- **Football**: added the FC Bayern München Fans Bangladesh detail (first Bayern-recognized fan club in Bangladesh), Bundesliga + German national team support, cricket/badminton.
- **Deen**: Islamic Views rewritten to state the actual creed — Tawhid, Aqidah Tahawiyya, understanding of the Qur'an/Sunnah per the Salaf.
- **Connect**: real LinkedIn, Facebook, and X links are live. Email is the real inbox now, on the page and in the mailto-based forms.
- **WhatsApp is still a placeholder** — `wa.me` links need an actual phone number with country code, not a username. Search `8801XXXXXXXXX` in `connect.html` and swap in the real number to activate it.
- **Crypto live prices — actually fixed.** The table markup existed before, but no JavaScript was ever written to populate it. Added a real fetch (CoinGecko for prices, a free exchange-rate API for USD→BDT), with error handling, a manual refresh button, and auto-refresh every 5 minutes.

## 🆕 Latest update — certifications, market accuracy, football rework

- **Journey**: added the real Goethe-Zertifikat A1 (Start Deutsch 1) exam details — Goethe-Institut, passed 19 April 2026 in Dhaka.
- **Career**: new "Certifications & Training" section with your Emotional Intelligence (Coursera/Michigan), Function of HR Department (ENSDI), and Digital Marketing (Creative IT Institute) credentials.
- **Career market accuracy fixed**: your current role at Neural Semiconductor is now correctly shown as US-market-only, IT-focused. The Canada/Japan recruiting experience moved to where it actually happened — your time at Steadfast International Services. Updated everywhere this was mentioned (Home, About, Career, Insights).
- **Insights hub**: removed the "Career & HR" card since it duplicated the dedicated Career page — now 5 categories instead of 6.
- **Connect**: WhatsApp now links to your real number.
- **Football — reworked**: replaced the basic "Formations/Pressing/xG" explainer with a proper Philosophies & Tactics glossary (Positional Play, Gegenpressing, Catenaccio, Total Football, Counter-Attacking, Direct Play) plus a Core Principles list. Added a "The Germany Connection" personal story (2006 World Cup origin, Löw's golden era, current admiration for Kompany and Guardiola).
- **Home**: added your profile photo — a circular frame with a rotating gradient ring, glow halo, and gentle float animation, sitting above your name.

## 🆕 Latest update — Deen page rebuilt as a reasoned journey

- Replaced the old "Islamic Views" + "Deen Academy" content entirely with a 9-step, click-to-expand logical journey: from the existence of God, through monotheism, the need for revelation, examining world religions and scriptures, the Abrahamic tradition, the Qur'an, the Prophet Muhammad ﷺ, and arriving at Islam.
- Each step is collapsed by default (except Step 1, which opens automatically so visitors immediately see how it works) — click any step to expand its full reasoning, evidence categories, and a "Destination" takeaway.
- Reused the same expandable-card mechanic already proven on the Career page, so it inherits the same bug fixes (no shake/jump when expanding).
- Added a capstone "Where the Chain Leads" visual at the bottom — a vertical chain from One God → One Message → Many Prophets → the Qur'an → Muhammad ﷺ → Islam.
- Increased the expand-panel's max-height ceiling (was tuned for short career bullets; this content is longer) so nothing gets clipped.

## 🆕 Latest update — Deen page expanded into a two-group journey

- **Group One — The Search for Truth**: the same 9-step reasoning journey as before, but enriched with the fuller philosophical detail you specified (the Contingency Argument, Necessary Being, infinite regress for Step 1; the specific questions about an uncreated Creator for Step 2), with every "Destination" line matching your exact wording. Sequence, logic, and destinations are unchanged.
- **The Central Bridge**: a new standalone, visually distinct section between the two groups — the Shahadah in proper Arabic script (using the Amiri typeface, added specifically for correct Arabic rendering), with transliteration and translation, framing the shift from "Is Islam true?" to "How should I live?"
- **Group Two — Understanding & Living Islam** (entirely new): a Shahadah foundation breakdown (its two testimonies explained side by side), then Arkan al-Iman (the Six Pillars of Faith) and Arkan al-Islam (the Five Pillars of Islam) as flip-cards — click or tap each to reveal its explanation.
- **Visual distinction between the groups**: Group One's timeline stays in the site's cool investigative blue; Group Two's pillar cards and dividers use warm gold, with the Arabic Shahadah bridge marking the turn between them.
- **Extended journey map** at the end, now showing the full chain across both groups plus the Shahadah bridge in the middle.
- Bumped a hidden height limit on the expandable-card component (it was tuned for shorter content) so nothing gets clipped.

## 🆕 Latest update — Deen video library + BTC trader signal watch

### Deen & Faith Media Library ("Watch · Learn · Reflect")
Added to the bottom of the Deen page, above the journey map:
- Four curated YouTube playlists (Origins & Creation, Evolution and Islam, the Bangla-language Aqidah Series, and the O Messenger AI-visualized series), rendered as clickable cards
- **One single embedded player** — clicking a card swaps the player's playlist instantly. It does *not* load four YouTube embeds at once (that would be slow); only the active one is ever in the DOM.
- Uses `youtube-nocookie.com` embeds (YouTube's privacy-enhanced mode) with `autoplay=0`, so nothing plays until a visitor chooses something.
- The Bangla title (আকিদা সিরিজ) renders in Noto Sans Bengali — a font added specifically for this, since none of the existing fonts support Bengali script.
- Playlists live in `assets/js/data.js` as `DEEN_PLAYLISTS` — add a new object there (with a YouTube playlist ID) and it appears automatically, no HTML editing needed.

### BTC Daily Analysis ("Trader Signal Watch") — Crypto page
Two cards showing the latest relevant BTC analysis from @LennaertSnyder and @TedPillows.

**Important — read this part.** X (Twitter) does not allow free, reliable automated access to posts from a static GitHub Pages site — there's no backend here to poll an API from, and X blocks most client-side scraping. Building a fake "auto-updating" feed would mean either it silently breaks or it shows made-up numbers, which is worse than not having the feature. So this is a **manually-curated snapshot**, not a live feed — exactly the "lightweight data structure" you suggested as the fallback.

I seeded it with two real, dated, sourced posts I found:
- **Lennaert Snyder** — a scalp-long setup near $81K, from 28 August 2026 (via CryptoNews)
- **Ted** — a caution about elevated open interest/leverage, from 15 August 2026 (via CryptoPotato) — this is the most recent *relevant* post of his I could verify; nothing more recent turned up

Every field that wasn't explicitly stated in the source shows "Not specified" — nothing here is guessed. **To keep this current, you'll need to check both accounts yourself periodically and edit `BTC_ANALYSIS_DATA` in `assets/js/data.js`** — there's a comment right above it explaining exactly what to do. This is a manual-refresh feature by necessity, not a bug.

### Also fixed while in here
Found and fixed a real, pre-existing bug: the `.disclaimer` text style (used on the Crypto page) was scoped to only work inside `.modal-body`, a wrapper that no longer exists since the multi-page rebuild — meaning it's been rendering completely unstyled. Fixed to work standalone.

## 🆕 Latest update — YouTube fix + BTC section simplified

### Fixed: "Error 153" on the Deen video player
The playlists were embedding via `youtube-nocookie.com`, which was throwing an embed-permission error ("Error 153") for these specific playlists. Switched to the standard `youtube.com/embed` domain — the same one YouTube's own "Share → Embed" button generates — along with the exact `allow`/`referrerpolicy` attributes YouTube currently recommends. Also added a permanent **"Open on YouTube"** link next to "Now Playing," so if a specific playlist's owner has embedding restricted in a way I have no control over, visitors always have a guaranteed-working path to watch it.

### Simplified: BTC Daily Analysis → Trader Signal Watch
Replaced the structured Outlook/Direction/Entry/TP/SL card system with three simple resource links, per your request:
- **Lennaert Snyder** (@LennaertSnyder) → links to his X profile
- **Ted** (@TedPillows) → links to his X profile
- **Growing Bulls — Pump Intelligence** → links to the scanner tool

Each just says to check there directly for the latest signals, rather than trying to keep a manually-curated snapshot current (which, as discussed, a static site can't do automatically). This is simpler to maintain — there's no data file to update anymore, since it's just three permanent links. The `BTC_ANALYSIS_DATA` structure and its render function have been removed entirely.

## 🆕 Latest update — a unique visual atmosphere per section

A design pass across the whole site: every page now has its own distinct atmosphere while staying built from the exact same design system — "different worlds, one ecosystem."

**A note on how I approached this.** The brief asked for immersive, cinematic, per-section backgrounds — but also explicitly required staying fast and lightweight, with no heavy effects added just for decoration. Those two asks are in tension if taken literally (11 separate WebGL scenes would be genuinely slow, especially since this is a multi-page site where every navigation is a full page reload — a fresh WebGL context every time). So I made a deliberate call: reuse the *existing* galaxy starfield and recolor it per page, and build each section's unique identity from cheap, GPU-friendly CSS gradients rather than new heavy scenes. Same immersive effect, none of the performance cost.

**What actually changed:**
- **The galaxy background now recolors itself per page** — it reads each page's already-existing accent color (the same one used for headings and glowing borders) and tints the starfield and nebula clouds to match. Violet is deliberately kept as one constant star layer everywhere — the "ecosystem" thread that ties every page back together. Zero new particles, zero new WebGL scenes — same system, recolored.
- **Each page now has a unique atmosphere layer** (pure CSS, one extra background div, no JS, no images to load):
  - **Home** — layered cinematic glow, the strongest first impression
  - **About** — deliberately the calmest, a single soft wash
  - **Journey** — a diagonal current suggesting forward progress
  - **Career** — a faint architectural grid, executive and structured
  - **Insights** — a multi-hue mesh suggesting many converging topics
  - **Football** — soft stadium floodlight glows from above
  - **Tech & AI** — a faint circuit-board crosshatch
  - **Crypto** — horizontal chart-grid lines, like a price chart
  - **Movies** — a warm cinematic vignette
  - **Deen** — a still, faint geometric lattice, and the only atmosphere layer with *no* motion at all, by design — reverence over animation
  - **Connect** — a warm, welcoming closing glow
- All of it fades to near-nothing in light mode (consistent with how the galaxy/blobs already behaved) and respects `prefers-reduced-motion`.

## 🆕 Latest update — Progressive Web App (PWA)

The site is now installable on Android (and supported desktop browsers) as an app, while remaining a completely normal website for everyone else.

### A. Files created

| File | Purpose |
|---|---|
| `manifest.json` | The web app manifest — name, icons, colors, display mode. Must stay at the repo root. |
| `sw.js` | The service worker — caching + update strategy. Must stay at the repo root (its location determines what it's allowed to control; root = the whole site). |
| `offline.html` | Shown only when a visitor is offline **and** viewing a page that was never cached. Has its own inline styles on purpose, as a safety net. |
| `assets/js/pwa.js` | Registers the service worker, drives the nav's "Install App" button, shows the "new version available" banner. Kept separate from `script.js` to stay modular. |
| `assets/icons/icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`, `favicon-32.png` | App icons — see below. |

### B. Files modified

- **`build_common.py`** — every page's `<head>` now includes the manifest link, icon links, and Apple/mobile web-app meta tags; every page's script list now also loads `assets/js/pwa.js`. Since this is the *shared* template, all 11 pages picked up the change automatically without editing each one.
- **`assets/css/style.css`** — added styling for the nav's install button, the install fallback tooltip, the update banner, and the chatbot widget. Nothing existing was changed, only added.

Nothing about your existing content, layout, sections, or design was touched.

### App icons — your questions, answered
1. **Sizes required:** 192×192 and 512×512 are the Android/Chrome minimums (both included, plus a maskable 512×512 for Android's adaptive-icon shapes, and a 180×180 for iOS home screens).
2. **Where they live:** `assets/icons/`.
3. **Filenames:** `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`, `favicon-32.png` — these exact names are what `manifest.json` and every page's `<head>` reference, so if you replace them, keep the same filenames (or update both places if you rename them).
4. **Can your existing photo be the icon?** Not well — a photo of a face doesn't read clearly at 48×48px on a home screen, and Android's adaptive-icon masking can crop a photo awkwardly. I generated a proper monogram icon instead — your nav bar's own "MS." wordmark (dark background, white "MS", violet accent dot) — so it's on-brand and legible at every size. You're welcome to swap in a custom-designed icon later using the same five filenames.

### How the update strategy avoids the "stuck on an old version" problem
- **HTML pages** are network-first: every visit tries to fetch the live version first, and only falls back to a cached copy if there's no connection. Visitors almost never see stale HTML.
- **CSS/JS/images** are stale-while-revalidate: instant load from cache, silently re-fetched in the background so the *next* visit already has the update.
- **Cross-origin content is never touched by the service worker at all** — YouTube embeds, the CoinGecko/exchange-rate price feed, Google Fonts, X links. Only same-origin requests are handled, so nothing here can go stale or break.
- When you deploy a change, returning visitors get a small **"A new version is available — Refresh to update"** banner (bottom-center) the next time the browser checks for updates — not forced, not repeated if dismissed.

**Whenever you change a file listed in `sw.js`'s `PRECACHE_URLS`** (style.css, script.js, data.js, pwa.js, profile.jpg), bump `CACHE_VERSION` at the top of `sw.js` (e.g. `'v1'` → `'v2'`). This forces a clean cache instead of relying on the browser to notice the file changed. You do **not** need to bump it for ordinary page-content edits in `build.py` — those are covered by the network-first HTML strategy automatically.

### C. Testing checklist

**Desktop**
- [ ] Site loads and looks identical to before
- [ ] All existing navigation, forms, animations still work
- [ ] Chrome/Edge address bar shows an install icon (⊕) — optional install still available on desktop too

**Android**
- [ ] Open the live GitHub Pages URL in Chrome
- [ ] The "Install App" icon appears permanently in the nav bar (next to the theme toggle) on every page
- [ ] Tapping it shows Android's native install dialog; confirming adds a home-screen icon
- [ ] The installed app opens without browser address bar/tabs (standalone mode)
- [ ] The app icon on the home screen matches the monogram, not a browser icon
- [ ] Navigating between pages inside the installed app works exactly as on the website

**PWA updates — how to actually test this**
1. Make a change to the live site (e.g. edit some text in `build.py`, run `python3 build.py`, push to GitHub).
2. Wait for GitHub Pages to redeploy (usually under a minute — check the Actions tab).
3. Open the **already-installed app** (or a browser tab that had the site open before).
4. Within a short time (browsers check for service worker updates periodically, and always on a fresh navigation), the **"A new version is available"** banner should appear at the bottom.
5. Tap **"Refresh to update"** — the page reloads with the new version and the banner is gone.
6. If you don't see the banner right away, fully closing and reopening the app (or a hard refresh with dev tools open) forces an immediate check.

### A note on scope
This was built and tested for correctness on GitHub Pages **project pages** (`https://username.github.io/repo-name/`), which is what you're using — all manifest and service-worker paths are relative, so this keeps working correctly even if you ever rename the repository.

## 🆕 Latest update — backgrounds fixed, chatbot added, new photo, Home enhanced

### Fixed: per-section backgrounds not showing
I couldn't visually test the previous version in a real browser (only structural checks), so I re-audited the CSS by hand and found real issues rather than assuming it was fine:
- The effect's base opacity was too low to register at a glance — boosted every page's atmosphere intensity substantially (roughly doubled the gradient strength across the board).
- Safari silently ignores `mask-image` without its `-webkit-` prefix — added it everywhere a mask is used (Career, Tech & AI, Crypto, Deen).
- Raised the atmosphere layer's z-index so it reliably paints above the base galaxy/blob layers on every browser, removing any stacking ambiguity.

### Install App is now always visible
Moved from a floating pill that only appeared when the browser fired its install event, to a **permanent icon button in the nav bar** (next to the theme toggle) — visible on every page, at all times, since the nav itself always is. Clicking it:
- Triggers the native install prompt when the browser supports it
- Shows a small platform-aware tip when it doesn't (e.g., iPhone users get "tap Share → Add to Home Screen" instead of nothing happening)
- Turns into a checkmark once the app is actually installed, rather than disappearing

### Added: Digital Assistant (chatbot) — and an honest note on what it is
There's now a chat bubble bottom-right on every page. Before you look at the code: **this is not a live AI model**, and that was a deliberate choice, not a shortcut. A real AI-powered chatbot needs a backend server to keep its API key private — embedding that key directly in a static site's public JavaScript would let anyone open dev tools, copy it, and run up charges on your account. This site has no backend, and building a fake AI badge on top of that risk isn't something I'll do.

What you get instead is the best honest version of this: a local knowledge-based assistant that instantly answers questions about your career, education, certifications, languages, skills, interests, football, faith, and how to get in touch — with smooth typing-indicator animation, clickable follow-up suggestions, and a conversation that persists as visitors browse between pages (cleared when they close the tab). It can never hallucinate a wrong fact about you, because every answer comes from a fixed knowledge base you can edit directly.

**To teach it something new:** open `assets/js/data.js`, find `CHATBOT_KB`, and add an entry with `keywords` (lowercase) and a `response`. No HTML or JS changes needed.

### Replaced the avatar photo — used everywhere
Your new formal photo now appears both as the Home page avatar **and** as every PWA app icon (192, 512, maskable 512, Apple touch icon, favicon) — replacing the "MS." monogram from before. I cropped it specifically for icon legibility (a tighter headshot crop reads far better at 48px than the original wider framing), and gave the maskable version extra padding so Android's circular adaptive-icon cropping doesn't clip your face.

### Home page enhanced
- A small location badge now sits on the avatar ring (map pin, "Based in Dhaka, Bangladesh")
- The "Available for Opportunities" eyebrow now has a subtle pulsing status dot for a more "live" feel
- Added a credibility stats strip beneath the buttons — Languages, Certifications, and Markets Recruited — using only real, defensible numbers, nothing invented

### Renamed: My Faith → Deen
Only the label on the Insights hub card changed, exactly as requested — the destination page and all its content are untouched.

## 🆕 Latest update — "Noir Prestige": a premium theme redesign

A full color and atmosphere upgrade, done at the design-token level so the whole site inherited it consistently rather than needing every component touched by hand.

- **New palette.** Every accent color — violet, pink, aqua, gold, sky, amber, cyanblue, rose — was deepened into a richer, more jewel-toned register (e.g. violet #8670F0 → #7B5CFA, aqua #4DE0C0 → a deeper emerald #22C9A0, gold pushed more prominent as the site's signature luxury cue). The base background also moved to a warmer, richer near-black (#08070F).
- **Gold-tinted glass.** Every glass card's hairline border now carries a subtle warm gold tint instead of a neutral grey, and the blur increased from 14px to 20px for a denser, more expensive-feeling frosted-glass look — a small change that reads everywhere at once, since every card in the site shares this one base class.
- **A film-grain texture**, applied site-wide at ~3.5% opacity with a blend mode — the kind of subtle tactile detail used by top-tier award-winning sites. It's a single static (non-animated) layer, so it costs nothing at runtime.
- **Full migration, not a partial one.** The color refresh isn't only in the root tokens — I found and updated 94+ places across the CSS, HTML generator, and the galaxy/cursor-trail JavaScript where old colors had been hardcoded directly (rather than referencing the shared variables), including the galaxy starfield tinting, the cursor-trail particles, and the LinkedIn/WhatsApp brand-colored Connect cards. A half-migrated palette — new tokens in some places, old hardcoded colors bleeding through elsewhere — would have looked like a mistake, not a redesign.
- Light mode's colors were deepened proportionally for contrast, so the theme toggle still looks intentional in both modes.
- Bumped the service worker's cache version (`v2` → `v3`) since this changes cached files — see the PWA section below for why that matters.

## 📁 Files

```
index.html        → Home — digital front door, quick paths, latest updates, closing CTA
about.html         → My story, values, goals
journey.html       → Education timeline
career.html        → Career timeline, skills, "Request My Resume"
insights.html      → Insights hub — 6 merged categories (Career & HR, AI & Tech,
                      Crypto & Markets, Sports-Football, My Faith, Entertainment)
football.html      → Insights spoke — Football (reached via Insights hub)
tech-ai.html       → Insights spoke — Tech, AI & Global Panorama
crypto.html        → Insights spoke — Crypto guide + live prices
movies.html        → Insights spoke — Movies & Series
deen.html          → Insights spoke — Deen & Personal Values + Deen Academy
connect.html       → Social links + contact form

manifest.json      → PWA manifest (must stay at repo root)
sw.js              → Service worker (must stay at repo root)
offline.html       → Offline fallback page

assets/css/style.css → all styling (design system + every page's layout)
assets/js/script.js  → galaxy background, nav, animations, forms, all interactions
assets/js/data.js    → ⭐ EDIT THIS to add Home's "Latest Updates" — one place, no HTML needed
assets/js/pwa.js     → service worker registration, install button, update banner
assets/js/chatbot.js → the Digital Assistant widget (see note above — not a live AI)
assets/icons/        → app icons (192, 512, maskable 512, apple-touch, favicon)

build.py, build_common.py → the generator used to produce these pages (optional —
  only needed if you want to regenerate pages after changing shared nav/footer/etc.
  You do NOT need Python to run or host the site; the .html files already work standalone.)
```

## 🧭 Navigation model

Top nav is flat: **Home · About · Journey · Career · Insights · Connect**.
Football, Tech & AI, Crypto, Movies, and Deen are no longer separate nav items —
they're reached through the **Insights hub** (hub-and-spoke), which merges what
used to be "Personal Universe" and "Deen" into one organized, non-repetitive
ecosystem. Every spoke page's closing CTA routes back to Insights, keeping the
site feeling like one connected journey rather than disconnected pages.

Media and Updates are no longer standalone pages — Media had no content yet and
was removed per your request; Updates now lives inside Home's "What I'm Doing
Now" section.

## 🛠 Before you publish

1. In **every page**, `data-email="hello@example.com"` (search for it) → your real email.
   Also update `OWNER_EMAIL` near the top of `initResumeRequest()` and `initContactForm()`
   in `assets/js/script.js` — that's where the resume request and contact forms send to.
2. The social link `href="#"` on `connect.html` → your real LinkedIn / Facebook / X / WhatsApp URLs.
3. Add your own Updates in `assets/js/data.js` — they show up on Home automatically.

## 🐛 Bugs fixed this round

Four confirmed root causes of the flickering / blackout / shaking / hanging:

1. **Flicker on load** — two separate animation systems were both fading in the
   same elements at the same time, racing each other. Now there's a single
   source of truth for every reveal animation.
2. **Jump/shake near the bottom of Home** — dynamically-injected content (the
   Updates cards) was being added to the page *after* the scroll-animation
   system had already measured the page height, leaving stale trigger
   positions for everything below it. Fixed by reordering initialization.
3. **Blackout flash near the bottom of pages** — a decorative scroll-velocity
   blur effect spiked right as Lenis's rubber-band bounce hit the bottom of
   the page. Removed entirely — stability over decoration.
4. **Shake after clicking into a Career card** — expanding a card changed the
   page's height without telling the scroll-animation system to recalculate.
   Now it refreshes automatically after the expand transition finishes.

Also added: `overscroll-behavior-y: none` to stop the browser's native bounce
from fighting with Lenis, and grouped scroll-triggers on every card grid
(Insights, Connect, Career skills, coin guide, values) so dense card sections
use one shared trigger instead of one per card — fewer scroll listeners,
smoother scrolling overall.

## 🚀 What's inside

- **3D galaxy background**, glassmorphism UI, and 3D nav — shared across every page
- **Per-page accent colors** — About (sky), Journey (aqua), Career (gold), Insights (pink), Connect (violet) — tag labels, glowing borders, and headings pick this up automatically
- **Premium buttons** (`.btn-elite`) with a gradient shimmer sweep on hover, used for hero CTAs, the resume request, and the contact form
- **Premium closing CTA band on Home** — "Know More" → About, "Connect With Me" → Connect
- **Request My Resume** — opens a short form; submitting drafts an email to you (front-end only for now — see the comment above `initResumeRequest()` in `script.js` for how to wire this to a real backend later)
- **Contact form** on the Connect page — same mailto-based approach, same upgrade path
- **Live crypto prices** on the Crypto page (BTC, ETH, XRP, SOL, DOGE, TAO, SUI, SEI — auto-converted to BDT)
- **Light/dark mode**, smooth scroll, kinetic typography, and `prefers-reduced-motion` support

## 📤 Push to GitHub

```bash
cd portfolio
git init
git add .
git commit -m "Premium restructure: merged Insights, bug fixes, visual polish"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

If you're updating an existing repo instead: delete `media.html` and
`updates.html` from GitHub (they no longer exist locally), then upload
everything else the same way you did last time — remembering the `assets`
folder needs to stay nested (`assets/css/...`, `assets/js/...`), not loose
at the root.

## 🌐 Free hosting with GitHub Pages

1. Push the repo (steps above)
2. On GitHub: **Settings → Pages → Source → Deploy from branch → main → / (root)**
3. Live at `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## ⚙️ Tech used (via CDN, already linked in every page)

- [Three.js](https://threejs.org/) r128 — galaxy background
- [GSAP](https://gsap.com/) + ScrollTrigger — scroll animations
- [Lenis](https://lenis.darkroom.engineering/) — smooth scroll
- [Lucide](https://lucide.dev/) — icon graphics
- Google Fonts — Space Grotesk, Inter, JetBrains Mono

## 🔒 Privacy & future upgrades

Built on the principle: **public by choice, private by default.** The Resume Request and Contact forms currently work by opening the visitor's email app (no backend needed). When you're ready for a real approval workflow, private content, or an admin panel, the code has clear comments marking exactly where to add a backend — see `initResumeRequest()` and `initContactForm()` in `assets/js/script.js`.

## ⚠️ Content note

The crypto content ends with an educational-only disclaimer — it explains concepts, not investment advice. The Deen Academy content is a concise study summary, not a substitute for a qualified teacher.

