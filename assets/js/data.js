/* =========================================================
   SITE DATA — the ONE place to edit Updates & Gallery content.
   Add a new object to the top of an array and it will appear
   on the site automatically (Home shows the latest 3 updates,
   updates.html shows all of them).
   ========================================================= */

const DEEN_PLAYLISTS = [
  {
    id: "world-before-adam",
    title: "The World Before Adam (A.S.)",
    category: "Origins, Creation & Humanity",
    description: "Exploring questions surrounding creation, humanity, and the world before Adam (A.S.).",
    playlistId: "PLe4QV06SrLqDSs7qGhbo0BhPrrBR2JLOn",
    icon: "sparkles"
  },
  {
    id: "evolution-and-islam",
    title: "Evolution and Islam",
    category: "Origins, Creation & Humanity",
    description: "Exploring evolution and its relationship with Islamic perspectives and questions about human origins.",
    playlistId: "PLe4QV06SrLqCCyP0-Iez3C1qw37d7n31F",
    icon: "dna"
  },
  {
    id: "aqidah-series",
    title: "আকিদা সিরিজ (Aqidah Series)",
    category: "Foundations of Faith",
    description: "A structured series exploring the foundations and principles of Islamic belief.",
    playlistId: "PL7E7DFtKYTnZajnNkWP_Lmw9HnwkNdtE5",
    icon: "book-open",
    bangla: true
  },
  {
    id: "o-messenger",
    title: "O Messenger — AI-Visualized Series",
    category: "Stories & Visual Learning",
    description: "A visually engaging series exploring the message and stories connected with the Messengers and Prophets.",
    playlistId: "PLlZazEh_c4nScNCvGBn8OEf6ujk-sDUpg",
    icon: "clapperboard"
  }
  /* Add more playlists above this line — each needs a unique id and a YouTube playlistId (the part after "list=" in the playlist URL). */
];

/* =========================================================
   SMART ASSISTANT — knowledge base for the local FAQ chatbot.
   This is NOT a live AI model — see assets/js/chatbot.js for why
   (short version: embedding a real AI API key in public client-side
   code would let anyone steal it and run up charges). This is
   the honest, genuinely-best alternative: instant, accurate,
   zero cost, and it can never invent facts about Sadman.
   Add more entries anytime — keywords are matched case-insensitively.
   ========================================================= */
const CHATBOT_KB = [
  {
    id: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'yo', 'salam', 'assalamualaikum', 'greetings'],
    response: "Hey! I'm Sadman's digital assistant. Ask me about his career, education, skills, or how to get in touch — or tap a suggestion below.",
    suggestions: ['Current job?', 'Education background', 'How to contact']
  },
  {
    id: 'job',
    keywords: ['job', 'work', 'recruit', 'recruiter', 'neural', 'semiconductor', 'employ', 'career', 'profession', 'occupation', 'do for a living'],
    response: "He's currently a Recruitment Specialist at Neural Semiconductor (Staff Augmentation), working onsite in Uttara, Dhaka — focused on the US market, mainly IT roles.",
    suggestions: ['Past experience?', 'Skills & certifications', 'Education background']
  },
  {
    id: 'past-experience',
    keywords: ['past', 'previous', 'before', 'steadfast', 'experience', 'history', 'metro', 'hospitality', 'patenga', 'internship'],
    response: "Before this, he worked as an HR & Operations Coordinator at Metro Hospitality, and as an Executive Recruiter at Steadfast International Services (covering the US, Canada, and Japan markets) — starting out as an HR Intern at Patenga Footwear.",
    suggestions: ['Current job?', 'Skills & certifications']
  },
  {
    id: 'education',
    keywords: ['education', 'study', 'studied', 'degree', 'university', 'school', 'college', 'bba', 'chemnitz', 'germany', 'masters', 'iiuc'],
    response: "BBA in Human Resource Management from International Islamic University Chittagong. He was also accepted into a fully-funded Master's at Chemnitz University of Technology in Germany, though a visa rejection paused those plans — he's regrouping to reapply.",
    suggestions: ['Certifications?', 'Languages spoken']
  },
  {
    id: 'certifications',
    keywords: ['certificate', 'certification', 'training', 'coursera', 'ensdi', 'goethe', 'credential', 'course'],
    response: "A few: Goethe-Zertifikat A1 in German, an Emotional Intelligence course (University of Michigan, via Coursera), HR Department Functions (ENSDI), and Digital Marketing training (Creative IT Institute, on a competitive scholarship).",
    suggestions: ['Languages spoken', 'Current job?']
  },
  {
    id: 'languages',
    keywords: ['language', 'languages', 'german', 'bangla', 'bengali', 'english', 'speak'],
    response: "English (professional fluency), Bangla (native), and German — currently at A2, building toward B1 for a future Master's application.",
    suggestions: ['Education background', 'Interests & hobbies']
  },
  {
    id: 'skills',
    keywords: ['skill', 'skills', 'toolkit', 'expertise', 'good at', 'strengths'],
    response: "Technical & staff-augmentation recruiting, HR operations, and a growing interest in digital marketing and AI/technology — the full breakdown is on the Career page.",
    suggestions: ['Current job?', 'Interests & hobbies']
  },
  {
    id: 'interests',
    keywords: ['interest', 'hobby', 'hobbies', 'fun', 'free time', 'crypto', 'tech', 'movies', 'film', 'entertainment'],
    response: "Football (a die-hard Bayern München fan), crypto & technical analysis, AI/technology, and movies. The Insights hub has a deep dive on each.",
    suggestions: ['Tell me about football', 'What about his faith?']
  },
  {
    id: 'football',
    keywords: ['football', 'bayern', 'soccer', 'kompany', 'guardiola', 'bundesliga', 'world cup'],
    response: "A Germany fan since the 2006 World Cup, and today he follows FC Bayern München closely — a big admirer of Vincent Kompany's Bayern and Pep Guardiola's football philosophy. There's a full page on this under Insights → Football.",
    suggestions: ['What about his faith?', 'How to contact']
  },
  {
    id: 'faith',
    keywords: ['faith', 'deen', 'muslim', 'islam', 'religion', 'god', 'tawhid', 'shahadah'],
    response: "Faith comes first for him. There's a dedicated Deen page walking through a full reasoned journey from the existence of God to Islam, plus a video library — worth exploring directly rather than a quick summary here.",
    suggestions: ['How to contact', 'Current job?']
  },
  {
    id: 'contact',
    keywords: ['contact', 'reach', 'email', 'connect', 'linkedin', 'whatsapp', 'hire', 'touch', 'message', 'phone', 'number'],
    response: "Best ways: email at sadmanshaharier96@gmail.com, LinkedIn, or WhatsApp — all linked on the Connect page, which also has a direct message form.",
    suggestions: ['Request resume', 'Current job?']
  },
  {
    id: 'resume',
    keywords: ['resume', 'cv', 'hire him', 'hiring'],
    response: 'His full resume isn\'t posted publicly, but there\'s a "Request My Resume" button on the Career page — fill it in and he\'ll respond directly.',
    suggestions: ['How to contact', 'Current job?']
  },
  {
    id: 'website',
    keywords: ['website', 'site', 'made this', 'built this', 'who built', 'portfolio'],
    response: "This site was built and iterated with Claude (Anthropic's AI) across many sessions — a hand-tuned static site, no page builder involved.",
    suggestions: ['Current job?', 'Interests & hobbies']
  }
  /* Add more entries above this line — each needs keywords (lowercase)
     and a response. Optional: a suggestions array of 2-3 follow-up chips. */
];

const UPDATES_DATA = [
  {
    date: "Aug 2026",
    tag: "Learning",
    title: "Continuing German A2 studies",
    description: "Daily spaced-repetition vocabulary and weekly speaking practice, working toward the B1 level required for the Chemnitz program."
  },
  {
    date: "Jul 2026",
    tag: "Career",
    title: "One year in HR & Operations Coordination",
    description: "Marked a year coordinating remote HR and operations support for hospitality clients — process documentation and reporting have gotten a lot sharper."
  },
  {
    date: "Jun 2026",
    tag: "Personal",
    title: "Rebuilt this website",
    description: "Restructured the site into one connected ecosystem — career, insights, and connect, without the repetition."
  }
  /* Add new updates above this line, newest first. This feed now lives
     entirely on the Home page — there's no separate Updates page. */
];
