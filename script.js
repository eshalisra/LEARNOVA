// ================= STATE & DATA =================
let authMode = 'login';
let currentUser = { name: 'Scholar', email: '' };
let stats = { xp: 0, cardsMastered: 0, sessions: 0 };

const subjectsData = [
  { name: 'Maths', icon: '📐', syllabus: ['Quadratic Equations', 'Trigonometry Basics'] },
  { name: 'Chemistry', icon: '🧪', syllabus: ['Periodic Table Trends', 'Chemical Bonding'] },
  { name: 'Physics', icon: '⚡', syllabus: ["Newton's Laws of Motion", 'Optics & Light'] },
  { name: 'Biology', icon: '🧬', syllabus: ['Cell Structure', 'Photosynthesis'] },
  { name: 'Social Science', icon: '🌍', syllabus: ['Industrial Revolution', 'Constitutional Rights'] }
];

let flashcards = [
  { subject: 'Maths', q: 'What is the Pythagorean theorem?', a: 'a² + b² = c² (in a right-angled triangle).' },
  { subject: 'Maths', q: 'What is the quadratic formula?', a: 'x = (-b ± √(b² - 4ac)) / 2a' },
  { subject: 'Chemistry', q: 'What is the pH of pure water?', a: '7 (Neutral on the pH scale).' },
  { subject: 'Chemistry', q: 'What is a covalent bond?', a: 'A chemical bond formed by sharing electron pairs between atoms.' },
  { subject: 'Physics', q: "State Newton's Second Law of Motion.", a: 'Force equals mass times acceleration (F = ma).' },
  { subject: 'Physics', q: 'What is the speed of light in a vacuum?', a: 'Approximately 3 × 10⁸ meters per second.' },
  { subject: 'Biology', q: 'Which organelle is the powerhouse of the cell?', a: 'Mitochondria (produces ATP energy).' },
  { subject: 'Biology', q: 'What gas do plants absorb during photosynthesis?', a: 'Carbon Dioxide (CO₂).' },
  { subject: 'Social Science', q: 'What are the three branches of democratic government?', a: 'Legislative, Executive, and Judiciary.' },
  { subject: 'Social Science', q: 'Where did the Industrial Revolution begin?', a: 'Great Britain in the late 18th century.' }
];

let filteredCards = [...flashcards];
let currentCardIndex = 0;
let activeSubjectForModal = null;

// ================= AUTHENTICATION =================
function switchAuthTab(mode) {
  authMode = mode;
  document.getElementById('tab-login').classList.toggle('active', mode === 'login');
  document.getElementById('tab-signup').classList.toggle('active', mode === 'signup');
  document.getElementById('name-field').classList.toggle('hidden', mode === 'login');
  document.getElementById('auth-submit-btn').textContent =
    mode === 'login' ? 'Login to Dashboard' : 'Create Account & Start';
}

function handleAuth(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const nameInput = document.getElementById('username').value.trim();

  if (authMode === 'signup' && nameInput) {
    currentUser.name = nameInput;
  } else {
    currentUser.name = email.split('@')[0];
  }
  currentUser.email = email;

  document.getElementById('display-user-name').textContent = currentUser.name;
  document.getElementById('welcome-heading').textContent = `Welcome back, ${currentUser.name}!`;
  document.getElementById('auth-overlay').classList.add('hidden');
  document.getElementById('app-container').classList.remove('hidden');

  renderSubjects();
  renderFlashcard();
  updateScoreboard();
}

function logout() {
  document.getElementById('app-container').classList.add('hidden');
  document.getElementById('auth-overlay').classList.remove('hidden');
}

// ================= NAVIGATION =================
function showSection(sectionId, btn) {
  document.querySelectorAll('.content-section').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(`sec-${sectionId}`).classList.remove('hidden');

  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

// ================= CUSTOM IMAGE UPLOAD =================
function previewCustomImage(event, imgElementId) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById(imgElementId).src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// ================= SUBJECTS & SYLLABUS =================
function renderSubjects() {
  const grid = document.getElementById('subjects-grid');
  grid.innerHTML = '';

  subjectsData.forEach((subj, idx) => {
    const card = document.createElement('div');
    card.className = 'subject-card';
    const listItems = subj.syllabus.map(topic => `<li>${topic}</li>`).join('');

    card.innerHTML = `
      <div>
        <div class="subject-header">
          <h3>${subj.icon} ${subj.name}</h3>
          <span class="card-badge">${subj.syllabus.length} Topics</span>
        </div>
        <ul class="syllabus-list">${listItems}</ul>
      </div>
      <button class="primary-btn full-width" onclick="openSyllabusModal(${idx})">+ Add Syllabus</button>
    `;
    grid.appendChild(card);
  });
}

function openSyllabusModal(index) {
  activeSubjectForModal = index;
  document.getElementById('modal-subject-title').textContent = `Add Syllabus: ${subjectsData[index].name}`;
  document.getElementById('syllabus-input').value = '';
  document.getElementById('syllabus-modal').classList.remove('hidden');
}

function closeSyllabusModal() {
  document.getElementById('syllabus-modal').classList.add('hidden');
}

function saveSyllabus() {
  const rawText = document.getElementById('syllabus-input').value.trim();
  if (!rawText) return;

  const topics = rawText.split(/[\n,]+/).map(t => t.trim()).filter(Boolean);
  const subjectObj = subjectsData[activeSubjectForModal];

  topics.forEach(topic => {
    subjectObj.syllabus.push(topic);
    // Automatically generate a starter flashcard from the added syllabus topic
    flashcards.push({
      subject: subjectObj.name,
      q: `Syllabus Key Topic (${subjectObj.name}): Explain "${topic}"`,
      a: `Review core definitions, formulas, and key examples for ${topic}.`
    });
  });

  stats.xp += 20;
  closeSyllabusModal();
  renderSubjects();
  filterFlashcards();
  updateScoreboard();
}

// ================= FLASHCARDS =================
function filterFlashcards() {
  const selected = document.getElementById('flashcard-subject-filter').value;
  filteredCards = selected === 'All'
    ? [...flashcards]
    : flashcards.filter(c => c.subject === selected);

  currentCardIndex = 0;
  renderFlashcard();
}

function renderFlashcard() {
  const cardBox = document.getElementById('flashcard-box');
  cardBox.classList.remove('flipped');

  if (filteredCards.length === 0) {
    document.getElementById('card-tag').textContent = 'Empty';
    document.getElementById('card-question').textContent = 'No cards in this subject yet. Add one above!';
    document.getElementById('card-answer').textContent = 'Add a card to start studying.';
    document.getElementById('card-counter').textContent = 'Card 0 of 0';
    return;
  }

  const card = filteredCards[currentCardIndex];
  document.getElementById('card-tag').textContent = card.subject;
  document.getElementById('card-question').textContent = card.q;
  document.getElementById('card-answer').textContent = card.a;
  document.getElementById('card-counter').textContent = `Card ${currentCardIndex + 1} of ${filteredCards.length}`;
}

function flipCard() {
  document.getElementById('flashcard-box').classList.toggle('flipped');
}

function nextCard() {
  if (filteredCards.length === 0) return;
  currentCardIndex = (currentCardIndex + 1) % filteredCards.length;
  renderFlashcard();
}

function prevCard() {
  if (filteredCards.length === 0) return;
  currentCardIndex = (currentCardIndex - 1 + filteredCards.length) % filteredCards.length;
  renderFlashcard();
}

function addFlashcard() {
  const subject = document.getElementById('new-card-subject').value;
  const q = document.getElementById('new-card-q').value.trim();
  const a = document.getElementById('new-card-a').value.trim();

  if (!q || !a) return;

  flashcards.push({ subject, q, a });
  document.getElementById('new-card-q').value = '';
  document.getElementById('new-card-a').value = '';
  filterFlashcards();
}

function markMastered() {
  stats.cardsMastered += 1;
  stats.xp += 10;
  updateScoreboard();
  nextCard();
}

// ================= SCOREBOARD =================
function updateScoreboard() {
  const totalSyllabus = subjectsData.reduce((sum, s) => sum + s.syllabus.length, 0);
  document.getElementById('stat-xp').textContent = `${stats.xp} XP`;
  document.getElementById('stat-cards').textContent = stats.cardsMastered;
  document.getElementById('stat-sessions').textContent = stats.sessions;
  document.getElementById('stat-syllabus').textContent = totalSyllabus;

  const progressPct = Math.min(100, 10 + Math.floor(stats.xp / 5));
  document.getElementById('mastery-bar').style.width = `${progressPct}%`;

  let rank = 'Rising Learner (Level 1)';
  if (stats.xp >= 200) rank = 'Master Scholar (Level 3)';
  else if (stats.xp >= 80) rank = 'Focused Achiever (Level 2)';
  document.getElementById('rank-label').textContent = `Current Rank: ${rank} — "Learn big, earn big"`;
}

// ================= FOCUS TIMER =================
let timerSeconds = 25 * 60;
let timerInterval = null;
let selectedMinutes = 25;

function setTimerMode(mins, btn) {
  pauseTimer();
  selectedMinutes = mins;
  timerSeconds = mins * 60;
  updateTimerDisplay();
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function updateTimerDisplay() {
  const m = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
  const s = String(timerSeconds % 60).padStart(2, '0');
  document.getElementById('timer-display').textContent = `${m}:${s}`;
}

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    if (timerSeconds > 0) {
      timerSeconds--;
      updateTimerDisplay();
    } else {
      completeSessionEarly();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  pauseTimer();
  timerSeconds = selectedMinutes * 60;
  updateTimerDisplay();
}

function completeSessionEarly() {
  pauseTimer();
  stats.sessions += 1;
  stats.xp += 50;
  updateScoreboard();
  resetTimer();
}

// ================= UPGRADED AI STUDY ASSISTANT =================
async function sendChatMessage(e) {
  e.preventDefault();
  const input = document.getElementById('chat-input');
  const question = input.value.trim();
  if (!question) return;

  appendMessage(question, 'user-msg');
  input.value = '';

  // Show typing indicator
  const typingId = 'typing-' + Date.now();
  appendMessage('<em>Learnova AI is thinking...</em>', 'ai-msg', typingId);

  const reply = await generateSmartAIResponse(question);

  // Replace typing indicator with real answer
  const typingBubble = document.getElementById(typingId);
  if (typingBubble) {
    typingBubble.innerHTML = reply;
  } else {
    appendMessage(reply, 'ai-msg');
  }
}

function appendMessage(text, className, id = '') {
  const box = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = `msg ${className}`;
  if (id) div.id = id;
  div.innerHTML = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

async function generateSmartAIResponse(q) {
  const lower = q.toLowerCase().trim();

  // 1. Check if the user typed a math calculation (e.g., "solve 12 * 8 + 4")
  const mathMatch = lower.replace(/^(what is|calculate|solve|=|\?)/g, '').trim();
  if (/^[0-9+\-*/().\s^%]+$/.test(mathMatch) && /[0-9]/.test(mathMatch)) {
    try {
      const sanitized = mathMatch.replace(/\^/g, '**');
      const result = Function(`"use strict"; return (${sanitized})`)();
      if (typeof result === 'number' && !isNaN(result)) {
        return `📐 <strong>Math Solution:</strong><br>${mathMatch} = <strong>${result}</strong>`;
      }
    } catch (err) {
      // If not a valid expression, continue to knowledge search
    }
  }

  // 2. Check Study Motivation & Stress Help
  if (lower.includes('focus') || lower.includes('struggle') || lower.includes('tired') || lower.includes('motivat')) {
    return `💡 <strong>Learnova Coach:</strong> Remember: <em>"Learn big, earn big!"</em><br>Try this 3-step reset:<br>1. Start one <strong>25-minute Focus Timer</strong>.<br>2. Pick just ONE topic from your Syllabus.<br>3. Flip 5 flashcards to build momentum.`;
  }

  // 3. Extract core topic from question ("What is photosynthesis?" -> "photosynthesis")
  const cleanTopic = lower
    .replace(/^(what is|what are|who is|who was|explain|define|tell me about|how does|why does|what does)\s+/i, '')
    .replace(/[?.!]+$/g, '')
    .trim();

  // 4. Fetch real answer from Wikipedia REST API (Free, No API Key needed)
  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cleanTopic)}&format=json&origin=*`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    if (searchData.query && searchData.query.search.length > 0) {
      const bestTitle = searchData.query.search[0].title;
      const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(bestTitle)}`;
      const summaryRes = await fetch(summaryUrl);
      const summaryData = await summaryRes.json();

      if (summaryData.extract) {
        return `🤖 <strong>${summaryData.title}:</strong><br>${summaryData.extract}<br><br><small><em>Tip: Add "${summaryData.title}" to your Subject Syllabus to earn +20 XP!</em></small>`;
      }
    }
  } catch (error) {
    // Fallback if offline
  }

  // 5. Offline Built-in Subject Knowledge Base Fallback
  const offlineKnowledge = {
    photosynthesis: '<strong>Biology:</strong> Photosynthesis is the process plants use to convert sunlight, water, and CO₂ into glucose and oxygen (6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂).',
    pythagoras: '<strong>Maths:</strong> The Pythagorean theorem states that in a right triangle, a² + b² = c², where c is the hypotenuse.',
    newton: '<strong>Physics:</strong> Newton’s three laws describe motion: (1) Inertia, (2) F = ma, and (3) Every action has an equal and opposite reaction.',
    atom: '<strong>Chemistry:</strong> An atom is the smallest unit of matter, made of a central nucleus (protons & neutrons) surrounded by orbiting electrons.',
    democracy: '<strong>Social Science:</strong> Democracy is a system of government where power is vested in the people, who rule either directly or through freely elected representatives.'
  };

  for (const key in offlineKnowledge) {
    if (lower.includes(key)) {
      return offlineKnowledge[key];
    }
  }

  return `🤖 I searched for <strong>"${cleanTopic}"</strong>! Make sure you are connected to the internet so I can pull live explanations, or try asking about a specific concept like <em>"What is mitosis?"</em>, <em>"Explain gravity"</em>, or <em>"Solve 45 * 12"</em>.`;
    }

