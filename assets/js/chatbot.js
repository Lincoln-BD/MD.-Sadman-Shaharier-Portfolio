/* =========================================================
   SMART ASSISTANT — a local, keyword-matched FAQ chatbot.

   IMPORTANT — what this is and isn't:
   This is NOT a live AI/LLM-powered chatbot. A real generative-AI
   assistant needs a backend server to hold its API key privately —
   embedding that key directly in public client-side JavaScript
   (which is exactly what a static GitHub Pages site is) would let
   anyone open dev tools, copy the key, and run up charges against
   the account it belongs to. This site has no backend and was
   built with a "no paid services" constraint, so that path was
   ruled out on purpose, not by oversight.

   What's here instead is the most genuinely advanced version
   achievable within that constraint: instant responses, zero cost,
   zero API risk, smooth typing-indicator animation, clickable
   follow-up suggestions, and a conversation that persists across
   page navigation for the browsing session — and critically, it
   can never invent or hallucinate a fact about Sadman, because
   every answer comes from a fixed, human-written knowledge base
   (see CHATBOT_KB in data.js).
   ========================================================= */

(function () {
  const STORAGE_KEY = 'chatbotHistory';
  let isOpen = false;
  let messages = [];

  function normalize(str) {
    return str.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function scoreEntry(inputNorm, inputWords, entry) {
    let score = 0;
    entry.keywords.forEach((kw) => {
      if (kw.indexOf(' ') !== -1) {
        if (inputNorm.indexOf(kw) !== -1) score += 2;
      } else if (inputWords.indexOf(kw) !== -1) {
        score += 1;
      }
    });
    return score;
  }

  function findResponse(userText) {
    if (typeof CHATBOT_KB === 'undefined') return null;
    const norm = normalize(userText);
    const words = norm.split(' ');
    let best = null, bestScore = 0;
    CHATBOT_KB.forEach((entry) => {
      const score = scoreEntry(norm, words, entry);
      if (score > bestScore) { bestScore = score; best = entry; }
    });
    return bestScore > 0 ? best : null;
  }

  function saveHistory() {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); } catch (e) { /* private browsing, ignore */ }
  }
  function loadHistory() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  function scrollToBottom(container) {
    container.scrollTop = container.scrollHeight;
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function renderMessage(container, msg) {
    const div = document.createElement('div');
    div.className = 'chat-msg ' + msg.role;
    div.innerHTML = '<div class="chat-bubble">' + escapeHTML(msg.text) + '</div>';
    container.appendChild(div);
  }

  function renderSuggestions(container, suggestions, onPick) {
    const wrap = document.createElement('div');
    wrap.className = 'chat-suggestions';
    suggestions.forEach((s) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chat-chip';
      chip.textContent = s;
      chip.addEventListener('click', () => onPick(s));
      wrap.appendChild(chip);
    });
    container.appendChild(wrap);
  }

  function showTyping(container) {
    const div = document.createElement('div');
    div.className = 'chat-msg bot';
    div.innerHTML = '<div class="chat-bubble chat-typing"><span></span><span></span><span></span></div>';
    container.appendChild(div);
    scrollToBottom(container);
    return div;
  }

  function clearSuggestions(container) {
    container.querySelectorAll('.chat-suggestions').forEach((el) => el.remove());
  }

  function initChatbot() {
    if (document.getElementById('chatbotRoot')) return;

    const root = document.createElement('div');
    root.id = 'chatbotRoot';
    root.className = 'chatbot-root';
    root.innerHTML =
      '<button type="button" class="chatbot-bubble" id="chatbotToggle" aria-label="Open chat assistant" aria-expanded="false">' +
        '<i data-lucide="message-circle"></i>' +
      '</button>' +
      '<div class="chatbot-window" id="chatbotWindow" role="dialog" aria-label="Digital assistant" aria-hidden="true">' +
        '<div class="chatbot-header">' +
          '<div class="chatbot-header-info">' +
            '<span class="chatbot-avatar"><i data-lucide="sparkles"></i></span>' +
            '<div>' +
              '<div class="chatbot-name">Digital Assistant</div>' +
              '<div class="chatbot-status"><span class="status-dot"></span>Instant answers about Sadman</div>' +
            '</div>' +
          '</div>' +
          '<button type="button" class="chatbot-close" id="chatbotClose" aria-label="Close chat">&times;</button>' +
        '</div>' +
        '<div class="chatbot-body" id="chatbotBody"></div>' +
        '<form class="chatbot-input-row" id="chatbotForm">' +
          '<input type="text" id="chatbotInput" placeholder="Ask about career, faith, football..." autocomplete="off" aria-label="Type your question">' +
          '<button type="submit" aria-label="Send"><i data-lucide="send"></i></button>' +
        '</form>' +
      '</div>';
    document.body.appendChild(root);
    if (typeof lucide !== 'undefined') lucide.createIcons();

    const toggle = document.getElementById('chatbotToggle');
    const win = document.getElementById('chatbotWindow');
    const closeBtn = document.getElementById('chatbotClose');
    const body = document.getElementById('chatbotBody');
    const form = document.getElementById('chatbotForm');
    const input = document.getElementById('chatbotInput');

    function open() {
      isOpen = true;
      win.classList.add('open');
      win.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.classList.remove('pulse');
      toggle.innerHTML = '<i data-lucide="x"></i>';
      if (typeof lucide !== 'undefined') lucide.createIcons();
      setTimeout(() => input.focus(), 250);
      scrollToBottom(body);
    }
    function close() {
      isOpen = false;
      win.classList.remove('open');
      win.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '<i data-lucide="message-circle"></i>';
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    toggle.addEventListener('click', () => (isOpen ? close() : open()));
    closeBtn.addEventListener('click', close);

    function addMessage(role, text) {
      messages.push({ role: role, text: text });
      renderMessage(body, { role: role, text: text });
      saveHistory();
      scrollToBottom(body);
    }

    function handleSuggestionPick(text) {
      clearSuggestions(body);
      input.value = text;
      form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit', { cancelable: true }));
    }

    function respondTo(userText) {
      const typingEl = showTyping(body);
      const delay = 450 + Math.random() * 400;
      setTimeout(() => {
        typingEl.remove();
        const match = findResponse(userText);
        if (match) {
          addMessage('bot', match.response);
          if (match.suggestions && match.suggestions.length) {
            renderSuggestions(body, match.suggestions, handleSuggestionPick);
          }
        } else {
          addMessage('bot', "I don't have a canned answer for that yet \u2014 try asking about career, education, skills, faith, football, or how to get in touch. Or reach Sadman directly on the Connect page.");
          renderSuggestions(body, ['Current job?', 'How to contact', 'Interests & hobbies'], handleSuggestionPick);
        }
        scrollToBottom(body);
      }, delay);
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      clearSuggestions(body);
      addMessage('user', text);
      input.value = '';
      respondTo(text);
    });

    // Restore this session's conversation so far, or greet for the first time.
    const history = loadHistory();
    if (history.length) {
      messages = history;
      history.forEach((m) => renderMessage(body, m));
      scrollToBottom(body);
    } else if (typeof CHATBOT_KB !== 'undefined') {
      const greeting = CHATBOT_KB.filter((e) => e.id === 'greeting')[0];
      setTimeout(() => {
        addMessage('bot', greeting ? greeting.response : "Hi! Ask me anything about Sadman's career, education, or interests.");
        if (greeting && greeting.suggestions) renderSuggestions(body, greeting.suggestions, handleSuggestionPick);
      }, 350);
    }

    // A single gentle pulse to invite first-time visitors — never repeats
    // within the same browsing session, and never fires if already opened.
    if (!sessionStorage.getItem('chatbotInvited')) {
      setTimeout(() => { if (!isOpen) toggle.classList.add('pulse'); }, 3500);
      sessionStorage.setItem('chatbotInvited', 'true');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }
})();
