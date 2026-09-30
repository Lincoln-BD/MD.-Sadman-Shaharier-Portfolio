import os
from build_common import page, page_hero, mini_cta, premium_cta_band, SOCIAL_LINKS_SVG

OUT = os.path.dirname(os.path.abspath(__file__))

def write(filename, html):
    with open(os.path.join(OUT, filename), "w", encoding="utf-8") as f:
        f.write(html)
    print("wrote", filename)

# =========================================================
# HOME
# =========================================================
home_hero = '''<section class="hero home-hero" id="home">
  <div class="lens-flare" aria-hidden="true"></div>
  <div class="home-intro">
    <div class="hero-avatar-wrap">
      <div class="hero-avatar-halo" aria-hidden="true"></div>
      <div class="hero-avatar-ring">
        <div class="hero-avatar-ring-inner">
          <img src="assets/img/profile.jpg" alt="MD. Sadman Shaharier" class="hero-avatar" width="168" height="168">
        </div>
      </div>
      <span class="hero-avatar-badge" title="Based in Dhaka, Bangladesh"><i data-lucide="map-pin"></i></span>
    </div>
    <span class="eyebrow" data-gsap="fade"><span class="eyebrow-dot"></span> AVAILABLE FOR OPPORTUNITIES</span>
    <h1 class="kinetic-heading" id="heroName">MD. SADMAN SHAHARIER</h1>
    <div class="home-role" id="cycleText" aria-live="polite"></div>
    <p class="lede" data-gsap="fade">Welcome to my digital home — a place where my professional journey, personal interests, ideas, learning, and experiences come together in one spot.</p>
    <div class="hero-ctas" data-gsap="fade" style="justify-content:center;">
      <a href="career.html" class="btn btn-elite magnetic">Explore My Career <i data-lucide="arrow-right"></i></a>
      <a href="connect.html" class="btn btn-glass btn-elite-outline magnetic">Connect With Me</a>
    </div>
    <div class="hero-stats" data-gsap="fade">
      <div class="hero-stat"><strong>3</strong><span>Languages</span></div>
      <div class="hero-stat-divider"></div>
      <div class="hero-stat"><strong>4</strong><span>Certifications</span></div>
      <div class="hero-stat-divider"></div>
      <div class="hero-stat"><strong>US · CA · JP</strong><span>Markets Recruited</span></div>
    </div>
  </div>

  <div class="home-questions">
    <div class="home-question glass" data-gsap="up"><strong>Who is Sadman?</strong>Recruitment specialist, lifelong learner, and a curious mind across tech, football, and faith.</div>
    <div class="home-question glass" data-gsap="up" style="--delay:0.08s"><strong>What does he do?</strong>Recruits IT talent for the US market as a Recruitment Specialist at Neural Semiconductor, onsite in Dhaka.</div>
    <div class="home-question glass" data-gsap="up" style="--delay:0.16s"><strong>What's on this site?</strong>Career journey, education, an Insights hub covering HR/AI/crypto/football/faith, and how to connect.</div>
    <div class="home-question glass" data-gsap="up" style="--delay:0.24s"><strong>How to connect?</strong>Email, LinkedIn, WhatsApp, or the contact form — pick whatever's easiest for you.</div>
  </div>
  <div class="scroll-cue">SCROLL<span>↓</span></div>
</section>'''

home_body = '''<section class="section" style="padding-top:20px;">
  <div class="section-head" data-gsap="up">
    <span class="tag-label"><i data-lucide="compass"></i> QUICK PATHS</span>
    <h2 class="kinetic-heading">Explore the Ecosystem</h2>
    <p>Different visitors come here for different reasons — pick where you'd like to start.</p>
  </div>
</section>
<div class="hub-grid" data-gsap-group>
  <a href="about.html" class="hub-card glass border-glow" data-accent="about" data-gsap="scale">
    <span class="hub-card-icon"><i data-lucide="user"></i></span>
    <h3>About</h3>
    <p>The story, values, and direction behind the career.</p>
    <span class="hub-link">Read the story <i data-lucide="arrow-up-right"></i></span>
  </a>
  <a href="journey.html" class="hub-card glass border-glow" data-accent="journey" data-gsap="scale">
    <span class="hub-card-icon"><i data-lucide="graduation-cap"></i></span>
    <h3>Education</h3>
    <p>From SSC to an upcoming Master's in Germany — the academic path so far.</p>
    <span class="hub-link">See timeline <i data-lucide="arrow-up-right"></i></span>
  </a>
  <a href="career.html" class="hub-card glass border-glow" data-accent="career" data-gsap="scale">
    <span class="hub-card-icon"><i data-lucide="briefcase"></i></span>
    <h3>Career</h3>
    <p>HR & Operations experience, roles, and where I'm headed next.</p>
    <span class="hub-link">View journey <i data-lucide="arrow-up-right"></i></span>
  </a>
  <a href="insights.html" class="hub-card glass border-glow" data-accent="insights" data-gsap="scale">
    <span class="hub-card-icon"><i data-lucide="lightbulb"></i></span>
    <h3>Insights</h3>
    <p>AI, crypto, football, faith & entertainment — one organized hub.</p>
    <span class="hub-link">Explore hub <i data-lucide="arrow-up-right"></i></span>
  </a>
  <a href="connect.html" class="hub-card glass border-glow" data-accent="connect" data-gsap="scale">
    <span class="hub-card-icon"><i data-lucide="satellite"></i></span>
    <h3>Connect</h3>
    <p>LinkedIn, email, WhatsApp, or a quick message — your choice.</p>
    <span class="hub-link">Say hello <i data-lucide="arrow-up-right"></i></span>
  </a>
</div>

<section class="section section-alt">
  <div class="section-head" data-gsap="up">
    <span class="tag-label"><i data-lucide="activity"></i> LATEST</span>
    <h2 class="kinetic-heading">What I'm Doing Now</h2>
    <p>A running log of current focus, progress, and milestones.</p>
  </div>
  <div class="updates-feed" style="padding:0;" id="latestUpdates"></div>
</section>'''

home_cta = premium_cta_band(
    "KNOW MORE",
    "Want the Fuller Picture?",
    "Beyond the résumé — the story, the values, and the easiest way to reach out.",
    "Know More", "about.html",
    "Connect With Me", "connect.html",
)

write("index.html", page(
    "home",
    "MD. Sadman Shaharier — Personal Digital Ecosystem",
    "The personal digital home of MD. Sadman Shaharier — Recruitment Specialist, lifelong learner, and curious mind across technology, football, and faith.",
    home_hero,
    home_body,
    cta=home_cta,
))

# =========================================================
# ABOUT
# =========================================================
about_hero = page_hero("user", "01 — MY STORY", "About Me",
    "Not just a job candidate — a person with a story, values, and a direction. Here's the fuller picture.")

about_body = '''<div class="about-grid">
  <div class="about-block glass" style="padding:28px 30px;" data-gsap="up">
    <h2>Who I Am</h2>
    <p>First and foremost, I'm a Muslim — striving to hold firmly to Tawhid, following Aqidah Tahawiyya, and trying to understand the Qur'an and Sunnah the way the Salaf understood them. Everything else about me sits under that.</p>
    <p>Professionally, I'm a Recruitment Specialist at Neural Semiconductor in the Staff Augmentation department, working onsite in Uttara, Dhaka — focused solely on the US market, hiring mainly for IT positions. In a previous role, I also gained recruiting experience covering Canada and Japan.</p>
    <p>Outside of work: I play and watch football, follow Bundesliga tactics closely, play cricket and badminton, study crypto markets, and keep an eye on where AI and technology are heading — despite coming from a business background.</p>
  </div>

  <div class="about-block glass" style="padding:28px 30px;" data-gsap="up">
    <h2>My Values & Mindset</h2>
    <p>I don't consider myself the most disciplined, hardworking, or naturally talented person out there — but here's what I do try to bring:</p>
    <div class="value-grid" data-gsap-group>
      <div class="value-chip glass" data-gsap="scale"><i data-lucide="handshake" class="value-icon"></i><h4>Mutual Growth</h4><p>Win together, not at someone else's expense.</p></div>
      <div class="value-chip glass" data-gsap="scale"><i data-lucide="users" class="value-icon"></i><h4>Teamwork</h4><p>Better outcomes come from working with people.</p></div>
      <div class="value-chip glass" data-gsap="scale"><i data-lucide="door-open" class="value-icon"></i><h4>Personal Space</h4><p>Respecting boundaries makes collaboration easier.</p></div>
      <div class="value-chip glass" data-gsap="scale"><i data-lucide="search" class="value-icon"></i><h4>Evidence-based</h4><p>Check the source before believing the claim.</p></div>
      <div class="value-chip glass" data-gsap="scale"><i data-lucide="flame" class="value-icon"></i><h4>Passion & Dedication</h4><p>What I care about, I show up for.</p></div>
    </div>
  </div>

  <div class="about-block glass" style="padding:28px 30px;" data-gsap="up">
    <h2>How I Think</h2>
    <p>I'm drawn to tactics, strategy, structure, and patterns — wherever they show up. A football manager's pressing scheme, a crypto chart's support and resistance, a shift in global politics, or just how I organize my own life — it's the same underlying instinct: find the structure, understand the pattern, then decide.</p>
  </div>

  <div class="about-block glass" style="padding:28px 30px;" data-gsap="up">
    <h2>Goals & Future Direction</h2>
    <p>A German visa rejection put my Chemnitz University of Technology Master's plan on hold — the offer was real and fully-funded, but the visa didn't come through this time. The plan hasn't changed, just the timeline: I'm regrouping and intend to apply again.</p>
    <p>In the meantime: grow further into technical recruitment at Neural Semiconductor, keep building German toward B1, and keep this website growing as an honest record of the journey.</p>
  </div>

  <div class="about-block glass" style="padding:28px 30px;" data-gsap="up">
    <h2>Currently Learning</h2>
    <p>German (A2, working toward B1), deepening crypto technical analysis (two years in and counting), and following how AI tools are reshaping recruitment and technical staffing.</p>
  </div>
</div>'''

write("about.html", page(
    "about",
    "About — MD. Sadman Shaharier",
    "The story, values, and direction behind MD. Sadman Shaharier — beyond just a resume.",
    about_hero,
    about_body,
    cta=mini_cta("Curious about the career side?", "See the full professional timeline and current role.", "View Career", "career.html"),
))

# =========================================================
# JOURNEY (Education)
# =========================================================
journey_hero = page_hero("graduation-cap", "02 — INTELLECTUAL FOUNDATIONS", "Education Journey",
    "Four academic milestones — each one a building block toward the next.")

journey_body = '''<section class="section" style="padding-top:0;">
  <div class="edu-matrix">
    <div class="edu-line" aria-hidden="true"></div>

    <div class="edu-node flip-card" data-gsap="scale" tabindex="0">
      <div class="flip-inner">
        <div class="flip-front glass border-glow">
          <span class="edu-step">SSC</span>
          <h3>Chittagong City Corp. Model High School</h3>
        </div>
        <div class="flip-back glass">
          <p><strong>Secondary School Certificate</strong></p>
          <p>The foundation year — core sciences, mathematics, and language, sat under the Chittagong City Corporation education board.</p>
        </div>
      </div>
    </div>

    <div class="edu-node flip-card" data-gsap="scale" tabindex="0" style="--delay:0.1s">
      <div class="flip-inner">
        <div class="flip-front glass border-glow">
          <span class="edu-step">HSC</span>
          <h3>Chittagong Collegiate College</h3>
        </div>
        <div class="flip-back glass">
          <p><strong>Higher Secondary Certificate</strong></p>
          <p>One of Chittagong's most reputed colleges — where analytical thinking and academic discipline were sharpened.</p>
        </div>
      </div>
    </div>

    <div class="edu-node flip-card" data-gsap="scale" tabindex="0" style="--delay:0.2s">
      <div class="flip-inner">
        <div class="flip-front glass border-glow">
          <span class="edu-step">BBA</span>
          <h3>Int'l Islamic University Chittagong</h3>
        </div>
        <div class="flip-back glass">
          <p><strong>Major: Human Resource Management</strong></p>
          <p>Built a practical foundation in people management, organizational behavior, and business operations.</p>
        </div>
      </div>
    </div>

    <div class="edu-node flip-card edu-next" data-gsap="scale" tabindex="0" style="--delay:0.3s">
      <div class="flip-inner">
        <div class="flip-front glass border-glow">
          <span class="edu-step step-next">MSc</span>
          <h3>Chemnitz University of Technology</h3>
        </div>
        <div class="flip-back glass">
          <p><strong>Germany 🟡 Reapplying</strong></p>
          <p>The fully-funded offer stood, but a visa rejection put this on hold. Regrouping and planning to apply again — German study continues in the meantime.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="section-head" data-gsap="up">
    <span class="tag-label"><i data-lucide="languages"></i> LANGUAGES & CERTIFICATIONS</span>
    <h2 class="kinetic-heading">Still Building Toward Germany</h2>
    <p>A visa setback paused the move, not the plan. Language progress continues either way.</p>
  </div>
  <div class="skill-categories" data-gsap-group>
    <div class="skill-cat float-card border-glow" data-gsap="scale">
      <span class="skill-cat-icon"><i data-lucide="languages"></i></span>
      <h3>German — A1 to A2</h3>
      <p class="skill-desc">Passed the <strong>Goethe-Zertifikat A1 (Start Deutsch 1)</strong> from the Goethe-Institut on 19 April 2026 in Dhaka, covering Listening, Reading, Writing, and Speaking. Now building toward A2 using daily spaced-repetition vocabulary, Deutsche Welle listening practice, and Tandem speaking sessions.</p>
      <div class="neon-tags">
        <span class="neon-tag aqua">Goethe A1 — Passed</span>
        <span class="neon-tag aqua">A2 In Progress</span>
      </div>
    </div>
    <div class="skill-cat float-card border-glow" data-gsap="scale" style="--delay:0.15s">
      <span class="skill-cat-icon"><i data-lucide="badge-check"></i></span>
      <h3>English — Professional Fluency</h3>
      <p class="skill-desc">Used daily in remote HR & Operations work — written reporting, candidate communication, and cross-border coordination.</p>
      <div class="neon-tags">
        <span class="neon-tag violet">Professional Working Proficiency</span>
      </div>
    </div>
  </div>
</section>'''

write("journey.html", page(
    "journey",
    "Education Journey — MD. Sadman Shaharier",
    "Academic timeline of MD. Sadman Shaharier — from SSC in Chittagong to a Master's plan in Germany, currently being revisited after a visa setback.",
    journey_hero,
    journey_body,
    cta=mini_cta("Ready for the next chapter?", "See how this education is shaping the career ahead.", "View Career", "career.html"),
))

# =========================================================
# CAREER
# =========================================================
career_hero = page_hero("briefcase", "03 — PROFESSIONAL JOURNEY", "Career & Professional Journey",
    "Career progression in HR & Operations — click a role for the full detail.")

career_body = '''<section class="section" style="padding-top:0;">
  <div class="orbit-timeline">
    <div class="orbit-spine" aria-hidden="true"></div>

    <button class="orbit-card current" data-expand data-gsap="left">
      <div class="orbit-marker"><span class="marker-pulse"></span></div>
      <div class="orbit-main">
        <span class="orbit-tag">CURRENT</span>
        <h3>Recruitment Specialist</h3>
        <p class="orbit-org">Neural Semiconductor · Staff Augmentation · Onsite, Uttara, Dhaka</p>
      </div>
      <span class="expand-icon"><i data-lucide="plus"></i></span>
      <div class="orbit-detail">
        <ul>
          <li>Full-cycle recruitment for staff augmentation roles, focused solely on the US market, hiring mainly for IT positions for our clients</li>
          <li>Source, screen, and shortlist technical and professional candidates against client requirements</li>
          <li>Coordinate interview scheduling, feedback loops, and offer negotiation across multiple time zones</li>
          <li>Maintain candidate pipelines and ATS records for active and upcoming requisitions</li>
          <li>Collaborate with account managers and clients to align on role requirements and hiring timelines</li>
          <li>Work onsite from Uttara, Dhaka, coordinating closely with the wider Staff Augmentation team</li>
        </ul>
      </div>
    </button>

    <button class="orbit-card" data-expand data-gsap="left">
      <div class="orbit-marker"><span class="marker-pulse"></span></div>
      <div class="orbit-main">
        <span class="orbit-tag">PAST</span>
        <h3>HR & Operations Coordinator</h3>
        <p class="orbit-org">Metro Hospitality · Remote</p>
      </div>
      <span class="expand-icon"><i data-lucide="plus"></i></span>
      <div class="orbit-detail">
        <ul>
          <li>Coordinated day-to-day HR and operational support for US hospitality clients remotely</li>
          <li>Monitored surveillance systems to ensure operational continuity and security compliance</li>
          <li>Maintained incident logs, operational reports, and escalation records</li>
          <li>Identified and escalated operational, technical, and security issues</li>
          <li>Supported the HR Manager in recruitment: resume screening, candidate shortlisting, interview scheduling, and coordination</li>
          <li>Maintained HR databases and employee records</li>
          <li>Prepared HR and operational reports for management</li>
          <li>Ensured compliance with internal policies and confidentiality standards</li>
        </ul>
      </div>
    </button>

    <button class="orbit-card" data-expand data-gsap="left">
      <div class="orbit-marker"><span class="marker-pulse"></span></div>
      <div class="orbit-main">
        <span class="orbit-tag">PAST</span>
        <h3>Executive Recruiter</h3>
        <p class="orbit-org">Steadfast International Services · Remote</p>
      </div>
      <span class="expand-icon"><i data-lucide="plus"></i></span>
      <div class="orbit-detail">
        <ul>
          <li>Managed end-to-end recruitment for diverse roles across IT, Engineering, Business, Healthcare, and Technical sectors</li>
          <li>Recruited primarily for the US market, with additional experience covering Canada and Japan</li>
          <li>Posted jobs on multiple platforms, screened resumes, and coordinated candidate submissions to recruiters</li>
          <li>Maintained accurate ATS records and databases; ensured data quality and timely updates</li>
          <li>Scheduled interviews, coordinated candidate follow-ups, and assisted with onboarding documentation</li>
          <li>Supported internal HR and recruitment reporting to ensure accuracy and compliance</li>
          <li>Negotiated salaries and relocation terms; maintained professional communication with candidates via email and phone</li>
        </ul>
      </div>
    </button>

    <button class="orbit-card" data-expand data-gsap="left">
      <div class="orbit-marker"><span class="marker-pulse"></span></div>
      <div class="orbit-main">
        <span class="orbit-tag">INTERNSHIP</span>
        <h3>HR Intern</h3>
        <p class="orbit-org">Patenga Footwear Pvt. Ltd.</p>
      </div>
      <span class="expand-icon"><i data-lucide="plus"></i></span>
      <div class="orbit-detail">
        <ul>
          <li>Assisted in recruitment and worker onboarding processes</li>
          <li>Organized employee files and HR documentation</li>
          <li>Supported the HR team in disciplinary and conflict-resolution cases</li>
          <li>Ensured compliance with company policies and labor regulations</li>
        </ul>
      </div>
    </button>
  </div>
</section>

<section class="section section-alt">
  <div class="section-head" data-gsap="up">
    <span class="tag-label"><i data-lucide="brain-circuit"></i> STRATEGIC EXPERTISE</span>
    <h2 class="kinetic-heading">Skills & Toolkit</h2>
    <p>Core capability clusters, organized by category — not made-up percentages.</p>
  </div>
  <div class="skill-categories" data-gsap-group>
    <div class="skill-cat float-card border-glow" data-gsap="scale">
      <span class="skill-cat-icon"><i data-lucide="users"></i></span>
      <h3>Technical & Staff Augmentation Recruiting</h3>
      <p class="skill-desc">Full-cycle recruitment for staff augmentation roles, currently focused on IT positions for the US market, with past experience also covering Canada and Japan.</p>
      <div class="neon-tags"><span class="neon-tag violet">Full-Cycle Recruiting</span><span class="neon-tag violet">ATS Management</span></div>
    </div>
    <div class="skill-cat float-card border-glow" data-gsap="scale" style="--delay:0.1s">
      <span class="skill-cat-icon"><i data-lucide="settings-2"></i></span>
      <h3>Operations</h3>
      <p class="skill-desc">Remote and onsite operational coordination, incident logging, compliance monitoring, and cross-team escalation across hospitality and staffing environments.</p>
      <div class="neon-tags"><span class="neon-tag pink">Process Coordination</span><span class="neon-tag pink">Compliance</span></div>
    </div>
    <div class="skill-cat float-card border-glow" data-gsap="scale" style="--delay:0.2s">
      <span class="skill-cat-icon"><i data-lucide="trending-up"></i></span>
      <h3>Growth & Digital Marketing</h3>
      <p class="skill-desc">Strategy-first thinking on positioning, campaign structure, and the awareness → conversion funnel, applied to real goals.</p>
      <div class="neon-tags"><span class="neon-tag aqua">Positioning</span><span class="neon-tag aqua">Funnel Strategy</span></div>
    </div>
    <div class="skill-cat float-card border-glow" data-gsap="scale" style="--delay:0.3s">
      <span class="skill-cat-icon"><i data-lucide="languages"></i></span>
      <h3>Languages</h3>
      <p class="skill-desc">Professional English, plus German being built step by step (A1 certified, A2 in progress) for study and life in Germany.</p>
      <div class="neon-tags"><span class="neon-tag gold">English</span><span class="neon-tag gold">German A1→A2</span></div>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="section-head" data-gsap="up">
    <span class="tag-label"><i data-lucide="award"></i> CREDENTIALS</span>
    <h2 class="kinetic-heading">Certifications & Training</h2>
    <p>Structured learning outside the day job — soft skills, HR fundamentals, and digital marketing.</p>
  </div>
  <div class="skill-categories" data-gsap-group>
    <div class="skill-cat float-card border-glow" data-gsap="scale">
      <span class="skill-cat-icon"><i data-lucide="heart-handshake"></i></span>
      <h3>Emotional Intelligence: Cultivating Immensely Human Interactions</h3>
      <p class="skill-desc">University of Michigan, via Coursera · Completed June 2022. Focused on how emotional intelligence improves communication, relationships, and everyday interactions — professionally and personally.</p>
      <div class="neon-tags"><span class="neon-tag pink">Emotional Intelligence</span><span class="neon-tag pink">Communication</span></div>
    </div>
    <div class="skill-cat float-card border-glow" data-gsap="scale" style="--delay:0.1s">
      <span class="skill-cat-icon"><i data-lucide="users"></i></span>
      <h3>Function of HR Department</h3>
      <p class="skill-desc">ENSDI · Issued December 2022 · Credential ID ENSDI 11068 · 8 weeks, 32 hours. Practical training on the core functions and responsibilities of an HR department, strengthening foundational HR and workplace-operations knowledge.</p>
      <div class="neon-tags"><span class="neon-tag violet">HR Functions</span><span class="neon-tag violet">Workplace Practices</span></div>
    </div>
    <div class="skill-cat float-card border-glow" data-gsap="scale" style="--delay:0.2s">
      <span class="skill-cat-icon"><i data-lucide="trending-up"></i></span>
      <h3>Digital Marketing — Full Professional Training</h3>
      <p class="skill-desc">Creative IT Institute · Completed February 2021, on a competitive scholarship earned through a university competition. Covered the foundational concepts and practical aspects of digital marketing.</p>
      <div class="neon-tags"><span class="neon-tag aqua">Digital Marketing</span><span class="neon-tag aqua">Scholarship</span></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="resume-box glass border-glow" data-gsap="scale">
    <div>
      <h3><i data-lucide="file-lock-2"></i> Request My Resume</h3>
      <p>My full resume isn't posted publicly. Send a short request and I'll get back to you directly.</p>
    </div>
    <button class="btn btn-elite magnetic" id="resumeRequestBtn" type="button">Request My Resume <i data-lucide="arrow-right"></i></button>
  </div>
</section>

<!-- Resume request modal -->
<div class="form-modal-overlay" id="resumeModalOverlay" role="dialog" aria-modal="true" aria-hidden="true">
  <div class="form-modal-panel glass">
    <button class="form-close" id="resumeModalClose" aria-label="Close"><i data-lucide="x"></i></button>
    <h3>Request My Resume</h3>
    <p>Tell me a little about why you'd like a copy — I personally review and respond to every request.</p>
    <form id="resumeRequestForm">
      <div class="field-group"><label for="reqName">Your name</label><input type="text" id="reqName" required></div>
      <div class="field-group"><label for="reqEmail">Your email</label><input type="email" id="reqEmail" required></div>
      <div class="field-group"><label for="reqReason">Reason (optional)</label><textarea id="reqReason" placeholder="e.g. hiring for an HR role, collaboration, networking..."></textarea></div>
      <button type="submit" class="btn btn-elite btn-form">Send Request <i data-lucide="send"></i></button>
      <p class="form-status" id="resumeRequestStatus"></p>
    </form>
  </div>
</div>'''

write("career.html", page(
    "career",
    "Career — MD. Sadman Shaharier",
    "Recruitment and HR career journey of MD. Sadman Shaharier, plus skills, toolkit, and how to request a resume.",
    career_hero,
    career_body,
    cta=mini_cta("Want to dig into specific topics?", "HR, AI, crypto, and more — organized in one place.", "Browse Insights", "insights.html"),
))

# =========================================================
# INSIGHTS HUB
# =========================================================
insights_hero = page_hero("lightbulb", "04 — KNOWLEDGE & INSIGHTS HUB", "Insights",
    "One organized ecosystem — HR, technology, markets, sports, faith, and entertainment, without the repetition.")

def insight_card(icon, color_class, title, desc, href, cta_label):
    return f'''<a href="{href}" class="insight-card glass border-glow" data-gsap="scale">
    <span class="insight-icon" style="background:rgba(123,92,250,0.14); color:var(--{color_class});"><i data-lucide="{icon}"></i></span>
    <h3>{title}</h3>
    <p>{desc}</p>
    <span class="read-more">{cta_label} <i data-lucide="arrow-up-right"></i></span>
  </a>'''

insights_body = f'''<div class="insight-grid" data-gsap-group>
  {insight_card("cpu", "cyanblue", "AI & Technology", "Where artificial intelligence and robotics are heading, and what it means for how we work.", "tech-ai.html", "Explore")}
  {insight_card("coins", "aqua", "Crypto & Markets", "A beginner-friendly guide plus live prices for 8 major coins, converted to BDT.", "crypto.html", "Explore")}
  {insight_card("radar", "amber", "Sports — Football", "Tactical philosophies, principles, and why I've been a Germany fan since 2006.", "football.html", "Explore")}
  {insight_card("moon-star", "gold", "Deen", "A guided journey in two parts — the search for truth, then understanding and living Islam.", "deen.html", "Explore")}
  {insight_card("clapperboard", "rose", "Entertainment", "Series and films worth the watch — quick, honest takes.", "movies.html", "Explore")}
</div>'''

write("insights.html", page(
    "insights",
    "Insights — MD. Sadman Shaharier",
    "Knowledge and insights hub covering HR, AI, cryptocurrency, football, faith, and entertainment.",
    insights_hero,
    insights_body,
    cta=mini_cta("Have a topic you want covered?", "Reach out — new insight articles get added regularly.", "Suggest a topic", "connect.html"),
))

# =========================================================
# FOOTBALL
# =========================================================
football_hero = page_hero("radar", "PERSONAL UNIVERSE · FOOTBALL", "Football Intelligence",
    "Two lenses on the same passion: tactical analysis, and actually playing the game.")

football_body = '''<section class="section" style="padding-top:0;">
  <div class="hud-grid">
    <div class="hud-panel tactical border-glow" data-gsap="right">
      <div class="hud-panel-head"><span class="hud-dot violet"></span><span>TACTICAL ANALYTICS</span></div>
      <h3>Football Intelligence</h3>
      <p class="hud-desc">Deep-dive technical and tactical breakdowns of the Bundesliga — with absolute priority on <strong>FC Bayern München</strong>: pressing structure, build-up shape, and matchday adjustments. I'm an official member of <strong>FC Bayern München Fans Bangladesh</strong>, the first and only Bayern-recognized official fan club in the country. Right now I'm a big admirer of what <strong>Vincent Kompany</strong> is building at Bayern, and of <strong>Pep Guardiola's</strong> footballing philosophy more broadly — plus I follow other Bundesliga clubs and the German national team.</p>
      <div class="hud-readouts">
        <div class="readout"><span class="readout-label">PRIORITY CLUB</span><span class="readout-val violet">FC Bayern 🔴</span></div>
        <div class="readout"><span class="readout-label">FAN CLUB</span><span class="readout-val violet">FCB Fans Bangladesh</span></div>
        <div class="readout"><span class="readout-label">LEAGUE FOCUS</span><span class="readout-val violet">Bundesliga + Die Mannschaft</span></div>
        <div class="readout"><span class="readout-label">ADMIRED</span><span class="readout-val violet">Kompany · Guardiola</span></div>
      </div>
    </div>
    <div class="hud-panel active border-glow" data-gsap="left">
      <div class="hud-panel-head"><span class="hud-dot pink"></span><span>ACTIVE ATHLETICISM</span></div>
      <h3>Played & Competed</h3>
      <p class="hud-desc">Football isn't just something I watch — I play it too, alongside cricket and badminton.</p>
      <div class="active-grid">
        <div class="active-tile"><i data-lucide="dribbble"></i>Cricket</div>
        <div class="active-tile"><i data-lucide="circle-dot"></i>Football</div>
        <div class="active-tile"><i data-lucide="badge"></i>Badminton</div>
        <div class="active-tile glow-badge"><i data-lucide="gamepad-2"></i>eFootball</div>
      </div>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="section-head" data-gsap="up">
    <span class="tag-label"><i data-lucide="heart"></i> ORIGIN STORY</span>
    <h2 class="kinetic-heading">The Germany Connection</h2>
  </div>
  <div class="about-grid" style="margin:0; max-width:820px;">
    <div class="about-block glass" style="padding:28px 30px;" data-gsap="up">
      <p>I became a Germany fan in 2006 — before I really understood the game itself. Germany hosted the World Cup that year, and between newspaper coverage and, mostly, the wall-to-wall TV ads during the tournament, I fell for their history without yet knowing much about football tactics. The knowledge came later; the loyalty came first.</p>
      <p>That loyalty deepened years afterward through <strong>Joachim Löw's golden-era Germany</strong> — the team that went on to dominate world football — and I'm still deeply attached to that era. These days, the same pull shows up in how closely I follow Bayern under Kompany and in my admiration for Pep Guardiola's approach to the game.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="section-head" data-gsap="up">
    <span class="tag-label"><i data-lucide="book-open"></i> THE GLOSSARY</span>
    <h2 class="kinetic-heading">Football Philosophies & Tactics</h2>
    <p>The major systems and principles that shape how modern football is played.</p>
  </div>
  <div style="max-width:820px; margin:0 auto;">
    <h3 style="font-family:var(--font-display); font-size:19px; margin-bottom:14px;">Philosophies</h3>
    <div class="coin-grid" data-gsap-group>
      <div class="coin-card" data-gsap="scale"><span class="coin-symbol">POS</span><h4>Positional Play (Tiki-Taka)</h4><p>Patient, short-passing possession that overloads zones to break defensive lines. Associated with Guardiola, Barcelona, and Bayern.</p></div>
      <div class="coin-card" data-gsap="scale"><span class="coin-symbol">GEG</span><h4>Gegenpressing</h4><p>Winning the ball back immediately after losing it, before the opponent can organize. A hallmark of Klopp and German football broadly.</p></div>
      <div class="coin-card" data-gsap="scale"><span class="coin-symbol">CAT</span><h4>Catenaccio</h4><p>A defense-first system built around a disciplined back line and quick counters, historically associated with Italian football.</p></div>
      <div class="coin-card" data-gsap="scale"><span class="coin-symbol">TOT</span><h4>Total Football</h4><p>Any outfield player can rotate into any position, built on fluidity and constant space creation. The Cruyff-era Ajax and Netherlands approach.</p></div>
      <div class="coin-card" data-gsap="scale"><span class="coin-symbol">CTR</span><h4>Counter-Attacking</h4><p>Sit deeper, absorb pressure, then break at speed the moment possession is won.</p></div>
      <div class="coin-card" data-gsap="scale"><span class="coin-symbol">DIR</span><h4>Direct Play (Route One)</h4><p>Bypasses midfield with long, direct balls to attackers — prioritizing speed and directness over sustained control.</p></div>
    </div>

    <h3 style="font-family:var(--font-display); font-size:19px; margin:28px 0 14px;">Core Principles</h3>
    <div class="about-block glass" style="padding:24px 28px;" data-gsap="up">
      <ul style="color:var(--frost-dim); font-size:14px; padding-left:18px; display:flex; flex-direction:column; gap:8px;">
        <li><strong>Pressing triggers</strong> — the specific cues (a bad touch, a sideways pass, a heavy first touch) that signal a team to press as a unit.</li>
        <li><strong>Build-up phases</strong> — how a team progresses the ball through the first third (own defense), middle third, and final third differently.</li>
        <li><strong>Width vs. compactness</strong> — the trade-off between stretching the pitch to create space and staying narrow to control central areas.</li>
        <li><strong>Transitions</strong> — the moments immediately after winning or losing the ball, often where the biggest chances (and risks) happen.</li>
        <li><strong>Overlaps & underlaps</strong> — a fullback running outside (overlap) or inside (underlap) a winger to create a numerical advantage out wide.</li>
        <li><strong>False 9 / inverted fullback</strong> — modern role-twisting: a striker dropping deep to link play, or a fullback tucking into midfield in possession.</li>
      </ul>
    </div>
  </div>
</section>'''

write("football.html", page(
    "football",
    "Football Intelligence — MD. Sadman Shaharier",
    "Football tactical philosophies and principles, a lifelong Germany fan story, plus sports actually played.",
    football_hero,
    football_body,
    cta=mini_cta("Want to explore another category?", "AI, crypto, football, faith & entertainment — one organized hub.", "Back to Insights", "insights.html"),
))

# =========================================================
# TECH & AI
# =========================================================
tech_hero = page_hero("cpu", "PERSONAL UNIVERSE · TECH & AI", "Technology, AI & Global Panorama",
    "Despite a business background, I love learning about science, AI, and IT. This is where that curiosity lives — tracking where AI, robotics, and global power shifts are heading.")

tech_body = '''<div class="insight-grid" style="padding-top:0;">
  <div class="insight-card glass border-glow" data-gsap="scale">
    <span class="insight-icon" style="background:rgba(232,71,142,0.14); color:var(--pink);"><i data-lucide="cpu"></i></span>
    <h3>Artificial Intelligence</h3>
    <p>AI systems learn patterns from data to perform tasks — from writing and translation to decision-making — and are becoming part of everyday tools.</p>
  </div>
  <div class="insight-card glass border-glow" data-gsap="scale" style="--delay:0.1s">
    <span class="insight-icon" style="background:rgba(232,71,142,0.14); color:var(--pink);"><i data-lucide="bot"></i></span>
    <h3>Autonomous Robotics</h3>
    <p>Robots that can sense their environment and act without constant human control — used in factories, and increasingly, in daily life.</p>
  </div>
  <div class="insight-card glass border-glow" data-gsap="scale" style="--delay:0.2s">
    <span class="insight-icon" style="background:rgba(27,168,196,0.14); color:var(--cyanblue);"><i data-lucide="globe-2"></i></span>
    <h3>Global Power Shifts</h3>
    <p>Following shifts in global alliances, economic policy between major powers, and the political landscape across Muslim-majority nations — understanding events in context rather than reacting to single headlines.</p>
  </div>
</div>'''

write("tech-ai.html", page(
    "tech-ai",
    "Technology, AI & Global Panorama — MD. Sadman Shaharier",
    "Notes on artificial intelligence, robotics, and global geopolitical shifts.",
    tech_hero,
    tech_body,
    cta=mini_cta("Want to explore another category?", "AI, crypto, football, faith & entertainment — one organized hub.", "Back to Insights", "insights.html"),
))

# =========================================================
# CRYPTO
# =========================================================
crypto_hero = page_hero("coins", "PERSONAL UNIVERSE · CRYPTOCURRENCY", "Cryptocurrency & Blockchain",
    "A beginner-friendly guide — plus live prices for 8 major coins, converted to BDT.")

crypto_body = '''<section class="section" style="padding-top:0;">
  <div class="about-block glass" style="padding:28px 30px; max-width:820px; margin:0 auto 30px;" data-gsap="up">
    <h2>What is Crypto?</h2>
    <p>Cryptocurrency is digital money that runs on a <strong>blockchain</strong> — a public record book shared across thousands of computers instead of one bank. No single company controls it, and every transaction is recorded permanently and openly.</p>
    <p>I've been studying and practicing technical analysis for over two years now — this page is where that ongoing learning shows up.</p>
  </div>

  <div style="max-width:820px; margin:0 auto;">
    <h3 style="font-family:var(--font-display); font-size:19px; margin-bottom:14px;">Live Market Snapshot <span class="live-badge">LIVE</span></h3>
    <p style="color:var(--frost-dim); font-size:14px; margin-bottom:14px;">Prices below update automatically, converted from USD to BDT, and sorted biggest-to-smallest by market cap.</p>
    <div class="crypto-table-wrap">
      <table class="crypto-table">
        <thead><tr><th>Coin</th><th>Price</th><th>Market Cap</th><th>24h</th></tr></thead>
        <tbody id="cryptoLiveGrid"><tr><td colspan="4" class="crypto-loading">Loading live prices…</td></tr></tbody>
      </table>
    </div>
    <div class="crypto-meta">
      <span id="cryptoStatus">Loading…</span>
      <button id="cryptoRefreshBtn" class="crypto-refresh" type="button">⟳ Refresh now</button>
    </div>
    <p class="crypto-attribution">Prices via CoinGecko · Exchange rate via ExchangeRate-API · Auto-refreshes every 5 minutes</p>
  </div>
</section>

<section class="section section-alt">
  <div class="section-head" data-gsap="up">
    <span class="tag-label"><i data-lucide="line-chart"></i> BTC DAILY ANALYSIS</span>
    <h2 class="kinetic-heading">Trader Signal Watch</h2>
    <p>Where I look for the latest BTC signals — the newest analysis always lives on their own pages, not copied here.</p>
  </div>
  <div class="insight-grid" data-gsap-group>
    <a href="https://x.com/LennaertSnyder" target="_blank" rel="noopener" class="insight-card glass border-glow" data-gsap="scale">
      <span class="insight-icon" style="background:rgba(123,92,250,0.14); color:var(--violet);"><i data-lucide="trending-up"></i></span>
      <h3>Lennaert Snyder</h3>
      <p>@LennaertSnyder on X — the latest BTC price analysis and trade setups show up there first.</p>
      <span class="read-more">View on X <i data-lucide="arrow-up-right"></i></span>
    </a>
    <a href="https://x.com/TedPillows" target="_blank" rel="noopener" class="insight-card glass border-glow" data-gsap="scale">
      <span class="insight-icon" style="background:rgba(34,201,160,0.14); color:var(--aqua);"><i data-lucide="trending-up"></i></span>
      <h3>Ted</h3>
      <p>@TedPillows on X — his latest BTC market outlook and key levels, straight from the source.</p>
      <span class="read-more">View on X <i data-lucide="arrow-up-right"></i></span>
    </a>
    <a href="https://growingbulls.org/scanner/" target="_blank" rel="noopener" class="insight-card glass border-glow" data-gsap="scale">
      <span class="insight-icon" style="background:rgba(240,193,121,0.14); color:var(--gold);"><i data-lucide="radar"></i></span>
      <h3>Growing Bulls — Pump Intelligence</h3>
      <p>A scanner tool for spotting crypto pump signals, for those who want to go a layer deeper.</p>
      <span class="read-more">Open Scanner <i data-lucide="arrow-up-right"></i></span>
    </a>
  </div>
  <p class="disclaimer" style="max-width:880px; margin:24px auto 0;"><i data-lucide="info"></i> Third-party market analysis shared for informational purposes only. Not financial advice. Always do your own research and manage your own risk.</p>
</section>

<section class="section section-alt">
  <div class="section-head" data-gsap="up">
    <span class="tag-label"><i data-lucide="info"></i> THE 8 COINS, EXPLAINED SIMPLY</span>
    <h2 class="kinetic-heading">Coin Guide</h2>
  </div>
  <div class="coin-grid" data-gsap-group>
    <div class="coin-card" data-gsap="scale"><span class="coin-symbol">BTC</span><h4>Bitcoin</h4><p>The first cryptocurrency. Often called "digital gold" — used mainly as a store of value.</p></div>
    <div class="coin-card" data-gsap="scale"><span class="coin-symbol">ETH</span><h4>Ethereum</h4><p>A blockchain that runs programs called "smart contracts." Powers most apps, tokens, and NFTs.</p></div>
    <div class="coin-card" data-gsap="scale"><span class="coin-symbol">XRP</span><h4>XRP (Ripple)</h4><p>Built for fast, cheap cross-border payments between banks and payment providers.</p></div>
    <div class="coin-card" data-gsap="scale"><span class="coin-symbol">SOL</span><h4>Solana</h4><p>A high-speed blockchain known for very fast, low-cost transactions.</p></div>
    <div class="coin-card" data-gsap="scale"><span class="coin-symbol">DOGE</span><h4>Dogecoin</h4><p>Started as a joke coin, now widely used for tipping and payments thanks to a large, active community.</p></div>
    <div class="coin-card" data-gsap="scale"><span class="coin-symbol">TAO</span><h4>Bittensor</h4><p>Powers a decentralized network that trains and rewards artificial intelligence models.</p></div>
    <div class="coin-card" data-gsap="scale"><span class="coin-symbol">SUI</span><h4>Sui</h4><p>A newer blockchain designed for fast, parallel transaction processing.</p></div>
    <div class="coin-card" data-gsap="scale"><span class="coin-symbol">SEI</span><h4>Sei</h4><p>A high-speed blockchain built specifically for fast trading applications.</p></div>
  </div>
</section>

<section class="section">
  <div class="about-grid" style="margin:0; max-width:820px;">
    <div class="about-block glass" style="padding:24px 28px;" data-gsap="up">
      <h2>How to Invest via Binance (General Steps)</h2>
      <ol style="color:var(--frost-dim); font-size:14px; padding-left:18px; display:flex; flex-direction:column; gap:6px;">
        <li>Create an account and complete identity verification (KYC)</li>
        <li>Deposit funds using a bank transfer or card</li>
        <li>Use the <strong>Spot</strong> market to buy a coin at the current price</li>
        <li>Turn on 2-factor authentication (2FA) to secure your account</li>
        <li>Consider moving larger holdings to a personal wallet for safekeeping</li>
      </ol>
    </div>
    <div class="about-block glass" style="padding:24px 28px;" data-gsap="up">
      <h2>Technical Analysis Basics</h2>
      <p><strong>CoinMarketCap (CMC)</strong> — check a coin's price, ranking, and trading volume before researching further.</p>
      <p><strong>Support & Resistance</strong> — price levels where a coin has repeatedly stopped falling (support) or rising (resistance).</p>
      <p><strong>Fair Value Gap (FVG)</strong> — a gap left on the chart when price moves fast in one direction, which price often returns to "fill" later.</p>
    </div>
  </div>
  <p class="disclaimer" style="max-width:820px; margin:24px auto 0;"><i data-lucide="info"></i> Educational overview only — not financial advice. Prices are approximate and crypto markets are highly volatile; always do your own research.</p>
</section>'''

write("crypto.html", page(
    "crypto",
    "Cryptocurrency & Blockchain — MD. Sadman Shaharier",
    "Beginner-friendly cryptocurrency guide with live prices for 8 major coins, converted to BDT.",
    crypto_hero,
    crypto_body,
    cta=mini_cta("Want to explore another category?", "AI, crypto, football, faith & entertainment — one organized hub.", "Back to Insights", "insights.html"),
))

# =========================================================
# MOVIES
# =========================================================
movies_hero = page_hero("clapperboard", "PERSONAL UNIVERSE · ENTERTAINMENT", "Movies & Series",
    "Flip a card to see the take.")

movies_body = '''<section class="section" style="padding-top:0;">
  <div class="ent-block">
    <h3 class="ent-subhead"><i data-lucide="tv"></i> High-Stakes Series</h3>
    <div class="ent-row">
      <div class="ent-card flip-card" tabindex="0" data-gsap="scale"><div class="flip-inner"><div class="flip-front ent-front g1"><span class="ent-emoji">🐉</span><span class="ent-title">Game of Thrones</span></div><div class="flip-back ent-back glass"><span class="rating-pill violet">Epic Scale</span><p>Power, politics, and betrayal at their sharpest.</p></div></div></div>
      <div class="ent-card flip-card" tabindex="0" data-gsap="scale"><div class="flip-inner"><div class="flip-front ent-front g2"><span class="ent-emoji">🔥</span><span class="ent-title">House of the Dragon</span></div><div class="flip-back ent-back glass"><span class="rating-pill pink">Dynasty Drama</span><p>The Targaryen fire, before the fall.</p></div></div></div>
      <div class="ent-card flip-card" tabindex="0" data-gsap="scale"><div class="flip-inner"><div class="flip-front ent-front g3"><span class="ent-emoji">🚕</span><span class="ent-title">The Boys</span></div><div class="flip-back ent-back glass"><span class="rating-pill aqua">Dark Satire</span><p>Superheroes, unfiltered and brutal.</p></div></div></div>
    </div>
  </div>

  <div class="ent-block">
    <h3 class="ent-subhead"><i data-lucide="film"></i> Masterclass Cinema</h3>
    <div class="ent-row ent-row-wide">
      <div class="ent-card flip-card" tabindex="0" data-gsap="scale"><div class="flip-inner"><div class="flip-front ent-front g4"><span class="ent-emoji">🔫</span><span class="ent-title">John Wick</span></div><div class="flip-back ent-back glass"><span class="rating-pill violet">Action Precision</span></div></div></div>
      <div class="ent-card flip-card" tabindex="0" data-gsap="scale"><div class="flip-inner"><div class="flip-front ent-front g5"><span class="ent-emoji">🦇</span><span class="ent-title">The Dark Knight</span></div><div class="flip-back ent-back glass"><span class="rating-pill pink">Genre-Defining</span></div></div></div>
      <div class="ent-card flip-card" tabindex="0" data-gsap="scale"><div class="flip-inner"><div class="flip-front ent-front g6"><span class="ent-emoji">🌀</span><span class="ent-title">Inception</span></div><div class="flip-back ent-back glass"><span class="rating-pill aqua">Mind-Bending</span></div></div></div>
      <div class="ent-card flip-card" tabindex="0" data-gsap="scale"><div class="flip-inner"><div class="flip-front ent-front g7"><span class="ent-emoji">🐻</span><span class="ent-title">The Revenant</span></div><div class="flip-back ent-back glass"><span class="rating-pill violet">Raw Survival</span></div></div></div>
      <div class="ent-card flip-card" tabindex="0" data-gsap="scale"><div class="flip-inner"><div class="flip-front ent-front g8"><span class="ent-emoji">💎</span><span class="ent-title">Blood Diamond</span></div><div class="flip-back ent-back glass"><span class="rating-pill pink">Hard-Hitting</span></div></div></div>
      <div class="ent-card flip-card" tabindex="0" data-gsap="scale"><div class="flip-inner"><div class="flip-front ent-front g9"><span class="ent-emoji">🎭</span><span class="ent-title">Parasite</span></div><div class="flip-back ent-back glass"><span class="rating-pill aqua">Masterclass</span></div></div></div>
    </div>
  </div>
</section>'''

write("movies.html", page(
    "movies",
    "Movies & Series — MD. Sadman Shaharier",
    "Series and films worth the watch, with quick honest takes.",
    movies_hero,
    movies_body,
    cta=mini_cta("Want to explore another category?", "AI, crypto, football, faith & entertainment — one organized hub.", "Back to Insights", "insights.html"),
))

# =========================================================
# DEEN
# =========================================================
deen_hero = page_hero("moon-star", "DEEN — THE JOURNEY TO TRUTH", "Deen — The Journey to Truth",
    "A guided journey in two parts: first the search for truth, then understanding and living Islam. Click any step to go deeper.")

def journey_step(number, icon, title, summary, detail_html, destination=None, dest_label="Destination", start_expanded=False):
    dest_html = ""
    if destination:
        dest_html = f'''<div class="step-destination"><i data-lucide="flag"></i><span><strong>{dest_label}:</strong> {destination}</span></div>'''
    expanded_class = " expanded" if start_expanded else ""
    return f'''<button class="orbit-card{expanded_class}" data-expand data-gsap="left">
      <div class="orbit-marker"><span class="marker-pulse"></span></div>
      <div class="orbit-main">
        <span class="orbit-tag"><i data-lucide="{icon}"></i> STEP {number:02d}</span>
        <h3>{title}</h3>
        <p class="orbit-org">{summary}</p>
      </div>
      <span class="expand-icon"><i data-lucide="plus"></i></span>
      <div class="orbit-detail">
        {detail_html}
        {dest_html}
      </div>
    </button>'''

def group_divider(color, icon, badge_text, title, desc):
    return f'''<div class="group-divider {color}" data-gsap="up">
    <span class="group-badge"><i data-lucide="{icon}"></i> {badge_text}</span>
    <h2>{title}</h2>
    <p>{desc}</p>
  </div>'''

def pillar_card(icon, title, back_label, back_text):
    return f'''<div class="flip-card tall" tabindex="0" data-gsap="scale">
      <div class="flip-inner">
        <div class="flip-front pillar-front glass border-glow">
          <i data-lucide="{icon}"></i>
          <h4>{title}</h4>
        </div>
        <div class="flip-back gold-back glass">
          <p><strong>{back_label}</strong><br>{back_text}</p>
        </div>
      </div>
    </div>'''

# ---------------------------------------------------------
# GROUP ONE — THE SEARCH FOR TRUTH (sequence & destinations
# preserved exactly as specified; do not reorder or replace)
# ---------------------------------------------------------
deen_body = group_divider(
    "blue", "search", "GROUP ONE · THE SEARCH FOR TRUTH",
    "From \u201cDoes God Exist?\u201d to \u201cWhy Islam?\u201d",
    "For anyone searching, questioning, or investigating. The journey begins with fundamental questions and moves step by step, without assuming the conclusion at the start.",
) + '''
<section class="section" style="padding-top:20px;">
  <div class="orbit-timeline">
    <div class="orbit-spine" aria-hidden="true"></div>
''' + journey_step(
    1, "globe", "Does God Exist?",
    "Why does anything exist at all? Is there a Creator behind existence?",
    """<p>This starts with the fundamental question of existence itself. Topics examined here include:</p>
      <ul>
        <li>The Contingency Argument</li>
        <li>Contingent existence and the Necessary Being</li>
        <li>The question of infinite regress</li>
        <li>The origin and intelligibility of the universe</li>
        <li>Logical and philosophical arguments</li>
        <li>Relevant scientific observations, presented responsibly</li>
      </ul>""",
    destination="Contingent existence points toward an ultimate, independent source of existence — a Necessary Being or Creator.",
    start_expanded=True,
) + journey_step(
    2, "infinity", "Okay, God Exists — But Is There One God or Many?",
    "Once a Creator is considered, the next question is about His nature.",
    """<p>This is a logical investigation based on the concept of a Necessary and independent Being:</p>
      <ul>
        <li>Is the Creator created or uncreated?</li>
        <li>Can the ultimate Creator have a creator?</li>
        <li>Does God have parents or ancestors — or children or descendants?</li>
        <li>Is the Creator dependent on anyone?</li>
        <li>Is there one ultimate God, or multiple gods?</li>
      </ul>
      <p>This also explores the philosophical problem of multiple independent, ultimate authorities and competing ultimate wills.</p>""",
    destination="The investigation points toward one ultimate, independent, uncreated Creator.",
) + journey_step(
    3, "help-circle", "Okay, There Is One God — But Who Is He, Why Did He Create Us, and How Can We Know?",
    "One God exists — but who is He, why did He create us, and how can we know?",
    """<p>This opens a much bigger set of questions humanity has always faced:</p>
      <ul>
        <li>Who is this One God, and what is He like?</li>
        <li>Why did He create the universe — and why did He create us?</li>
        <li>What is our purpose, and what does He want from us?</li>
        <li>How should we live? What happens after death?</li>
      </ul>
      <p><strong>The central problem:</strong> there are many things about the Creator, creation, and our purpose that human beings cannot simply know by guessing.</p>
      <p style="font-family:var(--font-mono); font-size:12.5px; color:var(--sky); margin-top:14px;">Revelation → Prophets → Divine Guidance → Scriptures</p>""",
    destination="We need divine guidance from the Creator Himself.",
) + journey_step(
    4, "split", "If God Gave Guidance, There Are Many Religions and Scriptures — Which Should We Trust?",
    "Which religion is truly from God, and which is not?",
    """<p>Around the world, many religions and scriptures claim to contain truth or divine guidance. Some claims may be:</p>
      <ul>
        <li>Human-made from the beginning</li>
        <li>Changed or corrupted over time</li>
        <li>No longer preserved in their original form</li>
        <li>Unable to reasonably establish a divine origin</li>
      </ul>""",
    destination="We cannot blindly accept every claim. We must separate truth from falsehood.",
) + journey_step(
    5, "scale", "Separating Truth from Falsehood — Examining Religions & Scriptures",
    "Now we establish a fair method for searching for truth.",
    """<p>Religious claims are examined using:</p>
      <ul>
        <li>Logic and reason</li>
        <li>Authentic sources</li>
        <li>History</li>
        <li>Facts and evidence</li>
        <li>Textual preservation</li>
        <li>Science, where genuinely relevant</li>
        <li>Internal consistency</li>
      </ul>
      <p>The goal is not simply to defend what we already believe.</p>""",
    destination="The goal is to honestly follow the evidence wherever it leads.",
    dest_label="Guiding Principle",
) + journey_step(
    6, "scroll", "The Abrahamic Tradition — Prophets, Revelations & Scriptures",
    "Investigating the connected chain of Prophets, revelations, and scriptures — Torah and Bible included.",
    """<p>This means examining the connected chain of Prophets and revelations, the historical development of the scriptures, the current forms of the Torah and Biblical scriptures, and their textual history and transmission — including whether the original revelations can be shown to have remained intact and preserved.</p>
      <p><strong>The central investigation:</strong> the Islamic position is not that every earlier revelation was originally false. Rather, the Qur'an teaches that Allah sent genuine revelation to earlier Prophets. The question is whether the scriptures available today remain in their original, authentic form. This calls for careful historical and textual examination, rather than simply asserting that other scriptures are false.</p>""",
    destination="If earlier revelations were genuinely from God but their original forms are no longer reliably preserved, then we must investigate whether there is a revelation that has remained preserved. This naturally brings us to the Qur'an.",
) + journey_step(
    7, "book-open", "The Qur'an — Is It Truly From God?",
    "The Qur'an itself must be investigated — not simply accepted because Muslims believe in it.",
    """<p>This means examining:</p>
      <ul>
        <li>Its preservation and transmission</li>
        <li>Its message about the One God</li>
        <li>Its historical context</li>
        <li>Its extraordinary characteristics and signs</li>
        <li>Its evidence and miracles, using only strong and responsible claims</li>
        <li>Whether its origin can reasonably be explained as anything other than divine revelation</li>
      </ul>""",
    destination="Is the Qur'an truly the preserved revelation from the One God?",
) + journey_step(
    8, "user-check", "Muhammad \ufdfa — Was He Truly God's Messenger?",
    "If the Qur'an is from God, then the man who delivered it must also be investigated.",
    """<p>This means examining:</p>
      <ul>
        <li>His biography and character</li>
        <li>His life and historical context</li>
        <li>His claim to Prophethood</li>
        <li>Evidence connected to his Prophethood</li>
        <li>His miracles, based on reliable sources</li>
        <li>His prophecies</li>
        <li>References or expectations related to a future messenger in earlier traditions, examined carefully and fairly</li>
      </ul>""",
    destination="Was Muhammad \ufdfa truly the final Messenger of the One God?",
) + journey_step(
    9, "check-circle-2", "Islam — The Final Conclusion",
    "The Qur'an and Muhammad \ufdfa lead us to Islam — more than a new religion that began with him.",
    """<p>The Qur'an presents the central message of all true Prophets as: <strong>submit to the One true God and worship Him alone.</strong> This is Tawhid — affirming Allah's absolute Oneness and directing worship to Him alone.</p>""",
) + '''
  </div>
</section>'''

# ---------------------------------------------------------
# CENTRAL BRIDGE — The Shahadah
# ---------------------------------------------------------
deen_body += '''
<section class="shahadah-bridge">
  <div class="shahadah-panel" data-gsap="scale">
    <p class="shahadah-arabic" lang="ar" dir="rtl">لَا إِلٰهَ إِلَّا اللّٰهُ مُحَمَّدٌ رَسُولُ اللّٰهِ</p>
    <p class="shahadah-translit">La ilaha illa Allah, Muhammadur Rasulullah</p>
    <p class="shahadah-translation">There is no deity worthy of worship except Allah, and Muhammad \ufdfa is the Messenger of Allah.</p>
    <p class="shahadah-bridge-note">This is the <strong>core message and testimony of Islam</strong> — the natural conclusion of the search for truth, and the entrance into understanding and living Islam. The question shifts from <em>"Is Islam true?"</em> to <em>"What does Islam teach me to believe, and how should I live?"</em></p>
  </div>
</section>'''

# ---------------------------------------------------------
# GROUP TWO — UNDERSTANDING & LIVING ISLAM
# ---------------------------------------------------------
deen_body += group_divider(
    "gold", "heart", "GROUP TWO · UNDERSTANDING & LIVING ISLAM",
    "From Iman \u2192 Islam \u2192 A Life of Submission",
    "Faith is the foundation; worship and practice are how that faith is lived. This part explains what a Muslim believes, and how that belief is expressed.",
)

deen_body += f'''
<section class="section" style="padding-top:20px;">
  <div class="shahadah-pillars-grid">
    <div class="about-block glass" style="padding:26px 28px;" data-gsap="up">
      <h2><i data-lucide="moon-star" style="color:var(--gold); width:20px; height:20px;"></i> La ilaha illa Allah</h2>
      <p>There is no deity worthy of worship except Allah. This establishes Tawhid — worshipping Allah alone and directing every act of worship to Him alone.</p>
    </div>
    <div class="about-block glass" style="padding:26px 28px;" data-gsap="up">
      <h2><i data-lucide="user-check" style="color:var(--gold); width:20px; height:20px;"></i> Muhammadur Rasulullah</h2>
      <p>Muhammad \ufdfa is the Messenger of Allah — accepting him as Allah's Messenger, and following his authentic guidance.</p>
    </div>
  </div>
  <p class="journey-intro" style="margin-top:24px;">The Shahadah isn't simply a sentence to recite — it represents faith, understanding, acceptance, and commitment. It's the foundation and gateway to everything that follows.</p>
</section>

<section class="section section-alt">
  <div class="section-head" data-gsap="up">
    <span class="tag-label"><i data-lucide="sparkles"></i> ARKAN AL-IMAN</span>
    <h2 class="kinetic-heading">The Six Pillars of Faith</h2>
    <p>Iman shapes what a Muslim understands to be true about existence, Allah, humanity, and the life to come. Flip a card to explore.</p>
  </div>
  <div class="pillar-grid" data-gsap-group>
    {pillar_card("star", "Belief in Allah", "1 of 6", "Understanding belief in Allah, His uniqueness, and His rightful position as the only One worthy of worship.")}
    {pillar_card("feather", "Belief in the Angels", "2 of 6", "Believing in the angels as part of Allah's creation and the unseen world.")}
    {pillar_card("book-open", "Belief in the Revealed Books", "3 of 6", "Believing that Allah sent revelation and guidance to His messengers.")}
    {pillar_card("users", "Belief in the Messengers", "4 of 6", "Believing in the messengers sent by Allah, and accepting Muhammad \ufdfa as the final Messenger.")}
    {pillar_card("hourglass", "Belief in the Last Day", "5 of 6", "Believing in resurrection, accountability, judgment, Paradise, and Hell.")}
    {pillar_card("compass", "Belief in Qadr (Divine Decree)", "6 of 6", "Believing in Allah's complete knowledge and decree, while understanding human responsibility and accountability.")}
  </div>
</section>

<section class="section">
  <div class="section-head" data-gsap="up">
    <span class="tag-label"><i data-lucide="landmark"></i> ARKAN AL-ISLAM</span>
    <h2 class="kinetic-heading">The Five Pillars of Islam</h2>
    <p>The pillars of Islam transform belief into a lived life of worship and submission to Allah.</p>
  </div>
  <div class="pillar-grid" data-gsap-group>
    {pillar_card("check-circle-2", "Shahadah — Testimony of Faith", "1 of 5", "The foundation of belief and entry into Islam.")}
    {pillar_card("clock", "Salah — Prayer", "2 of 5", "The obligatory daily connection between the servant and Allah.")}
    {pillar_card("coins", "Zakah — Obligatory Charity", "3 of 5", "A structured act of worship and social responsibility for those upon whom it is obligatory.")}
    {pillar_card("moon", "Sawm — Fasting Ramadan", "4 of 5", "Fasting during Ramadan as an act of worship, discipline, and devotion to Allah.")}
    {pillar_card("map-pin", "Hajj — Pilgrimage", "5 of 5", "The pilgrimage to Makkah once in a lifetime, for those physically and financially able.")}
  </div>
</section>

<section class="section">
  <div class="section-head" data-gsap="up">
    <span class="tag-label"><i data-lucide="tv"></i> WATCH · LEARN · REFLECT</span>
    <h2 class="kinetic-heading">Deen & Faith Media Library</h2>
    <p>A curated collection of lectures, discussions, and visual learning experiences exploring faith, creation, humanity, Islamic belief, and the message of the Prophets.</p>
  </div>

  <div class="watch-journey-strip" data-gsap="fade">
    <span class="journey-chip"><i data-lucide="sparkles"></i> Explore Creation & Origins</span>
    <i data-lucide="arrow-right" class="chip-arrow"></i>
    <span class="journey-chip"><i data-lucide="book-open"></i> Foundations of Faith</span>
    <i data-lucide="arrow-right" class="chip-arrow"></i>
    <span class="journey-chip"><i data-lucide="clapperboard"></i> Stories & Visual Learning</span>
  </div>

  <div class="player-wrap" data-gsap="scale">
    <div class="player-frame-outer">
      <iframe id="deenPlayer" src="" title="Deen & Faith playlist player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>
    </div>
    <div class="player-now-playing"><span class="live-dot"></span>Now Playing: <strong id="nowPlayingTitle">—</strong><a id="openOnYoutube" href="#" target="_blank" rel="noopener" class="player-open-link">Open on YouTube <i data-lucide="arrow-up-right"></i></a></div>
  </div>

  <div class="playlist-grid" id="playlistCards" data-gsap-group role="group" aria-label="Choose a playlist to watch"></div>
</section>'''

# ---------------------------------------------------------
# THE COMPLETE DEEN JOURNEY — full map, both groups
# ---------------------------------------------------------
deen_body += '''
<section class="section section-alt">
  <div class="section-head" data-gsap="up">
    <span class="tag-label"><i data-lucide="link"></i> THE COMPLETE DEEN JOURNEY</span>
    <h2 class="kinetic-heading">Where the Chain Leads</h2>
  </div>
  <div class="belief-chain" data-gsap="scale" style="max-width:460px;">
    <div class="belief-chain-item blue-item">Does God Exist?</div>
    <i data-lucide="arrow-down" class="belief-chain-arrow blue-arrow"></i>
    <div class="belief-chain-item blue-item">One God, or Many?</div>
    <i data-lucide="arrow-down" class="belief-chain-arrow blue-arrow"></i>
    <div class="belief-chain-item blue-item">Who Is He, and How Can We Know?</div>
    <i data-lucide="arrow-down" class="belief-chain-arrow blue-arrow"></i>
    <div class="belief-chain-item blue-item">Which Scripture Can We Trust?</div>
    <i data-lucide="arrow-down" class="belief-chain-arrow blue-arrow"></i>
    <div class="belief-chain-item blue-item">Separating Truth from Falsehood</div>
    <i data-lucide="arrow-down" class="belief-chain-arrow blue-arrow"></i>
    <div class="belief-chain-item blue-item">The Abrahamic Tradition</div>
    <i data-lucide="arrow-down" class="belief-chain-arrow blue-arrow"></i>
    <div class="belief-chain-item blue-item">The Qur'an — From God?</div>
    <i data-lucide="arrow-down" class="belief-chain-arrow blue-arrow"></i>
    <div class="belief-chain-item blue-item">Muhammad \ufdfa — God's Messenger?</div>
    <i data-lucide="arrow-down" class="belief-chain-arrow blue-arrow"></i>
    <div class="belief-chain-item blue-item">Islam — The Final Conclusion</div>
    <i data-lucide="arrow-down" class="belief-chain-arrow"></i>
    <div class="belief-chain-item bridge">لَا إِلٰهَ إِلَّا اللّٰهُ مُحَمَّدٌ رَسُولُ اللّٰهِ</div>
    <i data-lucide="arrow-down" class="belief-chain-arrow"></i>
    <div class="belief-chain-item">The Shahadah — The Foundation</div>
    <i data-lucide="arrow-down" class="belief-chain-arrow"></i>
    <div class="belief-chain-item">Arkan al-Iman — What a Muslim Believes</div>
    <i data-lucide="arrow-down" class="belief-chain-arrow"></i>
    <div class="belief-chain-item final">Arkan al-Islam — How a Muslim Lives</div>
  </div>
</section>'''

write("deen.html", page(
    "deen",
    "Deen — The Journey to Truth — MD. Sadman Shaharier",
    "A guided journey from the existence of God to Islam, then from the Shahadah into Iman and the Five Pillars — plus a curated video library.",
    deen_hero,
    deen_body,
    cta=mini_cta("Want to explore another category?", "AI, crypto, football, faith & entertainment — one organized hub.", "Back to Insights", "insights.html"),
))

# NOTE: Media and Updates are no longer standalone pages.
# - Media removed per brief (no content yet, was causing layout/perf issues).
# - Updates is folded into Home's "What I'm Doing Now" section instead of
#   living on its own as a mostly-empty page.

# =========================================================
# CONNECT
# =========================================================
connect_hero = page_hero("satellite", "MATRIX CONNECTION", "Let's Connect",
    "Open to opportunities, collaboration, or a good conversation about football, markets, or ideas.")

connect_body = f'''<section class="section" style="padding-top:0;">
  <div style="text-align:center; margin-bottom:36px;">
    <button class="email-copy magnetic" id="emailCopy" data-email="sadmanshaharier96@gmail.com" style="margin:0 auto;">
      <i data-lucide="mail"></i>
      <span id="emailText">sadmanshaharier96@gmail.com</span>
      <span class="copy-hint" id="copyHint">Click to copy</span>
    </button>
  </div>

  <div class="connect-grid" data-gsap-group>
    <a href="https://www.linkedin.com/in/mdsadmanshaharier/" target="_blank" rel="noopener" class="connect-card brand-linkedin glass border-glow" data-gsap="scale"><span class="connect-icon">{SOCIAL_LINKS_SVG["linkedin"]}</span><span>LinkedIn</span></a>
    <a href="https://www.facebook.com/MD.Sadman.Shaharier" target="_blank" rel="noopener" class="connect-card brand-facebook glass border-glow" data-gsap="scale"><span class="connect-icon">{SOCIAL_LINKS_SVG["facebook"]}</span><span>Facebook</span></a>
    <a href="https://x.com/LincolnBD" target="_blank" rel="noopener" class="connect-card brand-x glass border-glow" data-gsap="scale"><span class="connect-icon">{SOCIAL_LINKS_SVG["x"]}</span><span>X / Twitter</span></a>
    <a href="https://wa.me/8801843660244" target="_blank" rel="noopener" class="connect-card brand-whatsapp glass border-glow" data-gsap="scale"><span class="connect-icon">{SOCIAL_LINKS_SVG["whatsapp"]}</span><span>WhatsApp</span></a>
  </div>

  <div class="contact-form-wrap glass border-glow" data-gsap="scale">
    <h3>Send a Message</h3>
    <form id="contactForm">
      <div class="field-group"><label for="cName">Your name</label><input type="text" id="cName" required></div>
      <div class="field-group"><label for="cEmail">Your email</label><input type="email" id="cEmail" required></div>
      <div class="field-group"><label for="cMessage">Message</label><textarea id="cMessage" required placeholder="Professional inquiry, collaboration idea, or just a hello..."></textarea></div>
      <button type="submit" class="btn btn-elite btn-form">Send Message <i data-lucide="send"></i></button>
      <p class="form-status" id="contactFormStatus"></p>
    </form>
  </div>
</section>'''

write("connect.html", page(
    "connect",
    "Connect — MD. Sadman Shaharier",
    "Get in touch with MD. Sadman Shaharier via email, LinkedIn, WhatsApp, or a direct message.",
    connect_hero,
    connect_body,
))

print("\\nAll pages generated.")
