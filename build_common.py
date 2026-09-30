# Shared partials for every page of the site.
# Edit NAV_ITEMS here to change the navigation on ALL pages at once
# (you'll need to re-run build.py after editing any page content).

NAV_ITEMS = [
    ("Home", "index.html", "home"),
    ("About", "about.html", "about"),
    ("Journey", "journey.html", "journey"),
    ("Career", "career.html", "career"),
    ("Insights", "insights.html", "insights"),
    ("Connect", "connect.html", "connect"),
]

SOCIAL_LINKS_SVG = {
    "linkedin": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.44-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>',
    "facebook": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>',
    "x": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.6 8.68L22.9 22h-6.9l-5.4-6.63L4.3 22H1.2l8.13-9.3L1 2h7.1l4.9 6.06L18.9 2zm-2.4 18h1.9L7.6 3.9H5.6L16.5 20z"/></svg>',
    "whatsapp": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.11h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.14.82.84-3.06-.2-.31a8.2 8.2 0 0 1-1.26-4.34c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.55-3.7 8.2-8.24 8.2zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.4-.12-.56.13-.17.25-.65.81-.79.97-.15.17-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.22-.73-.66-1.23-1.46-1.37-1.71-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.36-.77-1.86-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01a.92.92 0 0 0-.67.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.25 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.11-.23-.17-.48-.29z"/></svg>',
}

def head(title, description, extra_css=""):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{description}">
<meta name="theme-color" content="#0A0A16">
<link rel="manifest" href="manifest.json">
<link rel="icon" href="assets/icons/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="assets/icons/apple-touch-icon.png">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Digital Hub">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Amiri:wght@400;700&family=Noto+Sans+Bengali:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
{extra_css}<script>
  (function() {{
    var saved = localStorage.getItem('theme');
    var theme = saved || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  }})();
</script>
</head>'''


def background():
    return '''<canvas id="galaxy" aria-hidden="true"></canvas>
<canvas id="trail" aria-hidden="true"></canvas>
<div class="atmosphere" aria-hidden="true"></div>
<div class="bg-fog" aria-hidden="true"></div>
<div class="blob blob-a" aria-hidden="true"></div>
<div class="blob blob-b" aria-hidden="true"></div>
<div class="blob blob-c" aria-hidden="true"></div>
<div class="cursor-spotlight" id="spotlight" aria-hidden="true"></div>
<div class="grain-overlay" aria-hidden="true"></div>'''


def nav(current_page):
    items_html = []
    for label, href, page_key in NAV_ITEMS:
        items_html.append(f'<li><a href="{href}" data-page="{page_key}">{label}</a></li>')
    links = "\n      ".join(items_html)
    return f'''<nav class="nav" id="nav">
  <div class="nav-inner glass">
    <a href="index.html" class="nav-logo">MS<span class="dot">.</span></a>
    <button class="theme-toggle" id="themeToggle" aria-label="Toggle light or dark mode">
      <i data-lucide="moon" id="themeIcon"></i>
    </button>
    <button class="sound-toggle" id="soundToggle" aria-pressed="false" aria-label="Toggle ambient sound">
      <i data-lucide="volume-x" id="soundIcon"></i>
    </button>
    <button class="install-toggle" id="installToggle" aria-label="Install this site as an app" title="Install App">
      <i data-lucide="download"></i>
    </button>
    <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <div class="nav-links-wrap">
      <span class="nav-indicator" id="navIndicator" aria-hidden="true"></span>
      <ul class="nav-links" id="navLinks">
      {links}
      </ul>
    </div>
  </div>
</nav>'''


def page_hero(eyebrow_icon, eyebrow_text, h1, p):
    return f'''<header class="page-hero">
  <span class="tag-label" data-gsap="fade"><i data-lucide="{eyebrow_icon}"></i> {eyebrow_text}</span>
  <h1 data-gsap="up">{h1}</h1>
  <p data-gsap="up">{p}</p>
</header>'''


def mini_cta(title, text, cta_label, cta_href):
    return f'''<section class="mini-cta">
  <div class="mini-cta-card glass border-glow" data-gsap="scale">
    <div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
    <a href="{cta_href}" class="btn btn-primary magnetic">{cta_label}</a>
  </div>
</section>'''


def premium_cta_band(eyebrow, title, text, primary_label, primary_href, secondary_label, secondary_href):
    return f'''<section class="premium-cta">
  <div class="premium-cta-inner" data-gsap="scale">
    <span class="tag-label"><i data-lucide="sparkles"></i> {eyebrow}</span>
    <h2>{title}</h2>
    <p>{text}</p>
    <div class="premium-cta-btns">
      <a href="{primary_href}" class="btn btn-elite magnetic">{primary_label} <i data-lucide="arrow-right"></i></a>
      <a href="{secondary_href}" class="btn btn-glass btn-elite-outline magnetic">{secondary_label}</a>
    </div>
  </div>
</section>'''


def slim_footer():
    return '''<footer class="slim-footer">
  © 2026 MD. Sadman Shaharier · <a href="connect.html">Get in touch</a>
</footer>'''


def scripts():
    return '''<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"></script>
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<script src="assets/js/data.js"></script>
<script src="assets/js/script.js"></script>
<script src="assets/js/chatbot.js"></script>
<script src="assets/js/pwa.js"></script>'''


def page(current_page, title, description, hero, body, cta=None, extra_css="", extra_before_scripts=""):
    """Assembles a full HTML page from shared partials + page-specific body."""
    cta_html = cta if cta else ""
    return f'''{head(title, description, extra_css)}
<body data-page="{current_page}">

{background()}

{nav(current_page)}

{hero}

{body}

{cta_html}

{slim_footer()}

{extra_before_scripts}
{scripts()}
</body>
</html>
'''
