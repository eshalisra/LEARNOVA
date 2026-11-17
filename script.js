// ==================== INITIAL DATA & STATE ====================
let currentUser = JSON.parse(localStorage.getItem("learnova_user")) || null;
let userXP = parseInt(localStorage.getItem("learnova_xp")) || 0;
let cardsMasteredCount = parseInt(localStorage.getItem("learnova_cards")) || 0;
let focusSessionsCount = parseInt(localStorage.getItem("learnova_sessions")) || 0;

// Default Subjects & Syllabus Data
let subjectsData = JSON.parse(localStorage.getItem("learnova_subjects")) || [
  { name: "Maths", icon: "📐", topics: ["Algebra Basics", "Linear Equations"] },
  { name: "Chemistry", icon: "⚗️", topics: ["Atomic Structure", "Periodic Table"] },
  { name: "Physics", icon: "⚡", topics: ["Motion & Force", "Work & Energy"] },
  { name: "Biology", icon: "🧬", topics: ["Cell Structure", "Photosynthesis"] },
  { name: "Social Science", icon: "🌍", topics: ["World History", "Civics"] }
];

// Default Flashcards
let flashcardsData = JSON.parse(localStorage.getItem("learnova_flashcards")) || [
  { subject: "Maths", q: "What is the formula for the area of a circle?", a: "A = πr²" },
  { subject: "Maths", q: "What is the value of Pi (π) to 2 decimal places?", a: "3.14" },
  { subject: "Chemistry", q: "What is the chemical symbol for Water?", a: "H₂O" },
  { subject: "Chemistry", q: "What gas do plants absorb from the atmosphere?", a: "Carbon Dioxide (CO₂)" },
  { subject: "Physics", q: "What is the acceleration due to gravity on Earth?", a: "9.8 m/s²" },
  { subject: "Physics", q: "What law states that every action has an equal and opposite reaction?", a: "Newton's Third Law of Motion" },
  { subject: "Biology", q: "What is known as the powerhouse of the cell?", a: "Mitochondria" },
  { subject: "Social Science", q: "Who was the first President of the United States?", a: "George Washington" }
];

// Default Quiz Questions Bank
let quizData = JSON.parse(localStorage.getItem("learnova_quiz")) || [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink and Text Management", "Home Tool Markup Language"],
    answer: 0,
    subject: "Maths"
  },
  {
    question: "Which organelle is known as the powerhouse of the cell?",
    options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Body"],
    answer: 2,
    subject: "Biology"
  },
  {
    question: "What is the chemical symbol for Gold?",
    options: ["Ag", "Au", "Gd", "Go"],
    answer: 1,
    subject: "Chemistry"
  },
  {
    question: "What is the value of 9 x 8?",
    options: ["72", "81", "64", "56"],
    answer: 0,
    subject: "Maths"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Saturn", "Mars", "Jupiter"],
    answer: 2,
    subject: "Physics"
  }
];

let currentCardIndex = 0;
let filteredCards = [...flashcardsData];

// Quiz State
let currentQuizIndex = 0;
let quizScore = 0;
let selectedQuizFilter = "All";

// Timer Variables
let timerInterval = null;
let timeLeft = 25 * 60; // 25 minutes default
let totalSeconds = 25 * 60;

// Active Subject Modal tracker
let activeSubjectForSyllabus = "";

// ==================== APP INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", () => {
  injectQuizSection(); // Injects Quiz section into main content dynamically
  injectQuizNavButton(); // Injects Quiz button into sidebar navigation
  
  if (currentUser) {
    showAppContainer();
  } else {
    showAuthOverlay();
  }
  updateStatsUI();
  renderSubjects();
  loadCurrentCard();
  loadQuizQuestion();
});

// ==================== AUTHENTICATION LOGIC ====================
function switchAuthTab(tab) {
  const loginBtn = document.getElementById("tab-login");
  const signupBtn = document.getElementById("tab-signup");
  const nameField = document.getElementById("name-field");
  const submitBtn = document.getElementById("auth-submit-btn");

  if (tab === "login") {
    loginBtn.classList.add("active");
    signupBtn.classList.remove("active");
    nameField.classList.add("hidden");
    submitBtn.innerText = "Login to Dashboard";
    document.getElementById("auth-form").dataset.mode = "login";
  } else {
    signupBtn.classList.add("active");
    loginBtn.classList.remove("active");
    nameField.classList.remove("hidden");
    submitBtn.innerText = "Create Account & Start";
    document.getElementById("auth-form").dataset.mode = "signup";
  }
}

function handleAuth(event) {
  event.preventDefault();
  const mode = document.getElementById("auth-form").dataset.mode || "login";
  const email = document.getElementById("email").value;
  const nameInput = document.getElementById("username").value;

  let userName = "Scholar";
  if (mode === "signup" && nameInput.trim() !== "") {
    userName = nameInput.trim();
  } else if (currentUser) {
    userName = currentUser;
  } else {
    userName = email.split("@")[0];
    userName = userName.charAt(0).toUpperCase() + userName.slice(1);
  }

  currentUser = userName;
  localStorage.setItem("learnova_user", JSON.stringify(currentUser));
  showAppContainer();
}

function logout() {
  localStorage.removeItem("learnova_user");
  currentUser = null;
  showAuthOverlay();
}

function showAuthOverlay() {
  document.getElementById("auth-overlay").classList.remove("hidden");
  document.getElementById("app-container").classList.add("hidden");
}

function showAppContainer() {
  document.getElementById("auth-overlay").classList.add("hidden");
  document.getElementById("app-container").classList.remove("hidden");
  document.getElementById("display-user-name").innerText = currentUser;
  document.getElementById("welcome-heading").innerText = `Welcome back, ${currentUser}!`;
}

// ==================== NAVIGATION LOGIC ====================
function showSection(sectionId, btnElement) {
  document.querySelectorAll(".content-section").forEach(sec => {
    sec.classList.add("hidden");
  });
  document.getElementById(`sec-${sectionId}`).classList.remove("hidden");

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  if (btnElement) btnElement.classList.add("active");
}

// ==================== DYNAMICALLY INJECT QUIZ FEATURES ====================
function injectQuizNavButton() {
  const navLinks = document.querySelector(".nav-links");
  if (!document.getElementById("nav-quiz-btn")) {
    const quizNavBtn = document.createElement("button");
    quizNavBtn.id = "nav-quiz-btn";
    quizNavBtn.className = "nav-btn";
    quizNavBtn.innerHTML = "🧠 Practice Quiz";
    quizNavBtn.onclick = function() { showSection('quiz', this); };
    navLinks.appendChild(quizNavBtn);
  }
}

function injectQuizSection() {
  const mainContent = document.querySelector(".main-content");
  if (!document.getElementById("sec-quiz")) {
    const quizSection = document.createElement("section");
    quizSection.id = "sec-quiz";
    quizSection.className = "content-section hidden";
    quizSection.innerHTML = `
      <div class="section-header-row">
        <h2 class="section-title">🧠 Interactive Subject Practice Quiz</h2>
        <select id="quiz-subject-filter" onchange="filterQuiz()" class="styled-select">
          <option value="All">All Subjects</option>
          <option value="Maths">Maths</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Physics">Physics</option>
          <option value="Biology">Biology</option>
          <option value="Social Science">Social Science</option>
        </select>
      </div>

      <div class="quiz-container" style="max-width: 100%; margin: 20px 0;">
        <div id="quiz-box">
          <p id="quiz-question-text" style="font-size: 1.2rem; font-weight: bold; margin-bottom: 15px;">Loading question...</p>
          <div id="quiz-options-container"></div>
          <button id="quiz-next-btn" onclick="nextQuizQuestion()" class="primary-btn" style="display: none; margin-top: 15px;">Next Question</button>
        </div>
        <div id="quiz-result-box" style="display: none; text-align: center; padding: 20px;">
          <h3>🎉 Quiz Completed!</h3>
          <p id="quiz-score-text" style="font-size: 1.2rem; margin: 15px 0;"></p>
          <button onclick="restartQuiz()" class="primary-btn">Try Again (+15 XP)</button>
        </div>
      </div>
    `;
    mainContent.appendChild(quizSection);
  }
}

// ==================== QUIZ LOGIC ====================
function filterQuiz() {
  selectedQuizFilter = document.getElementById("quiz-subject-filter").value;
  currentQuizIndex = 0;
  quizScore = 0;
  loadQuizQuestion();
}

function getFilteredQuizData() {
  if (selectedQuizFilter === "All") return quizData;
  return quizData.filter(q => q.subject === selectedQuizFilter);
}

function loadQuizQuestion() {
  const filtered = getFilteredQuizData();
  const quizBox = document.getElementById("quiz-box");
  const resultBox = document.getElementById("quiz-result-box");
  
  if (filtered.length === 0) {
    document.getElementById("quiz-question-text").innerText = "No quiz questions available for this subject yet.";
    document.getElementById("quiz-options-container").innerHTML = "";
    document.getElementById("quiz-next-btn").style.display = "none";
    return;
  }

  quizBox.style.display = "block";
  resultBox.style.display = "none";

  if (currentQuizIndex >= filtered.length) {
    quizBox.style.display = "none";
    resultBox.style.display = "block";
    document.getElementById("quiz-score-text").innerText = `You scored ${quizScore} out of ${filtered.length}!`;
    
    // Award XP for completing quiz
    addXP(15);
    return;
  }

  const q = filtered[currentQuizIndex];
  document.getElementById("quiz-question-text").innerText = `Q${currentQuizIndex + 1}: ${q.question}`;
  
  const optionsContainer = document.getElementById("quiz-options-container");
  optionsContainer.innerHTML = "";
  document.getElementById("quiz-next-btn").style.display = "none";

  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.className = "option-btn";
    button.style.cssText = "display: block; width: 100%; padding: 12px; margin: 8px 0; text-align: left; background: #f3f4f6; border: 2px solid transparent; border-radius: 8px; cursor: pointer; font-size: 1rem;";
    button.onclick = () => selectQuizAnswer(button, index, q.answer);
    optionsContainer.appendChild(button);
  });
}

function selectQuizAnswer(selectedBtn, selectedIndex, correctIndex) {
  const allButtons = document.querySelectorAll("#quiz-options-container .option-btn");

  allButtons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIndex) {
      btn.style.background = "#d1fae5";
      btn.style.borderColor = "#10b981";
    }
  });

  if (selectedIndex === correctIndex) {
    quizScore++;
  } else {
    selectedBtn.style.background = "#fee2e2";
    selectedBtn.style.borderColor = "#ef4444";
  }

  document.getElementById("quiz-next-btn").style.display = "inline-block";
}

function nextQuizQuestion() {
  currentQuizIndex++;
  loadQuizQuestion();
}

function restartQuiz() {
  currentQuizIndex = 0;
  quizScore = 0;
  loadQuizQuestion();
}

// ==================== STATS & XP SYSTEM ====================
function addXP(amount) {
  userXP += amount;
  localStorage.setItem("learnova_xp", userXP);
  updateStatsUI();
}

function updateStatsUI() {
  document.getElementById("stat-xp").innerText = `${userXP} XP`;
  document.getElementById("stat-cards").innerText = cardsMasteredCount;
  document.getElementById("stat-sessions").innerText = focusSessionsCount;
  
  let totalTopics = subjectsData.reduce((acc, sub) => acc + sub.topics.length, 0);
  document.getElementById("stat-syllabus").innerText = totalTopics;

  // Calculate Rank & Level
  let level = Math.floor(userXP / 100) + 1;
  let rankName = "Rising Learner";
  if (level >= 3) rankName = "Focused Scholar";
  if (level >= 6) rankName = "Exam Master";
  if (level >= 10) rankName = "Grand Academic Prodigy";

  document.getElementById("rank-label").innerText = `Current Rank: ${rankName} (Level ${level})`;
  
  let progressPercent = Math.min((userXP % 100), 100);
  document.getElementById("mastery-bar").style.width = `${progressPercent}%`;
}

// ==================== SUBJECTS & SYLLABUS MANAGER ====================
function renderSubjects() {
  const grid = document.getElementById("subjects-grid");
  if (!grid) return;
  grid.innerHTML = "";

  subjectsData.forEach((sub) => {
    let card = document.createElement("div");
    card.className = "stat-card subject-card";
    card.style.cssText = "background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: left;";
    
    let topicsListHtml = sub.topics.map(t => `<li style="margin: 4px 0; color: #4b5563;">• ${t}</li>`).join("");
    if (sub.topics.length === 0) {
      topicsListHtml = `<p style="color: #9ca3af; font-style: italic;">No syllabus topics added yet.</p>`;
    }

    card.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
        <h3 style="font-size: 1.2rem; color: #1f2937;">${sub.icon} ${sub.name}</h3>
        <button onclick="openSyllabusModal('${sub.name}')" class="primary-btn" style="padding: 6px 12px; font-size: 0.85rem;">+ Add Syllabus</button>
      </div>
      <ul style="list-style: none; padding: 0; margin: 10px 0;">
        ${topicsListHtml}
      </ul>
    `;
    grid.appendChild(card);
  });
  localStorage.setItem("learnova_subjects", JSON.stringify(subjectsData));
}

function openSyllabusModal(subjectName) {
  activeSubjectForSyllabus = subjectName;
  document.getElementById("modal-subject-title").innerText = `Add Syllabus for ${subjectName}`;
  document.getElementById("syllabus-input").value = "";
  document.getElementById("syllabus-modal").classList.remove("hidden");
}

function closeSyllabusModal() {
  document.getElementById("syllabus-modal").classList.add("hidden");
}

function saveSyllabus() {
  const inputVal = document.getElementById("syllabus-input").value;
  if (!inputVal.trim()) {
    closeSyllabusModal();
    return;
  }

  const newTopics = inputVal.split(/[\n,]+/).map(t => t.trim()).filter(t => t.length > 0);
  
  let subObj = subjectsData.find(s => s.name === activeSubjectForSyllabus);
  if (subObj) {
    subObj.topics.push(...newTopics);
  }

  renderSubjects();
  updateStatsUI();
  closeSyllabusModal();
  addXP(20); // +20 XP reward for adding syllabus
}

// ==================== FLASHCARDS LOGIC ====================
function filterFlashcards() {
  const filterVal = document.getElementById("flashcard-subject-filter").value;
  if (filterVal === "All") {
    filteredCards = [...flashcardsData];
  } else {
    filteredCards = flashcardsData.filter(c => c.subject === filterVal);
  }
  currentCardIndex = 0;
  loadCurrentCard();
}

function loadCurrentCard() {
  const qEl = document.getElementById("card-question");
  const aEl = document.getElementById("card-answer");
  const tagEl = document.getElementById("card-tag");
  const counterEl = document.getElementById("card-counter");
  const innerEl = document.getElementById("flashcard-inner");

  // Reset flip state
  innerEl.style.transform = "rotateY(0deg)";

  if (filteredCards.length === 0) {
    qEl.innerText = "No flashcards found for this filter.";
    aEl.innerText = "Add a card below!";
    tagEl.innerText = "Empty";
    counterEl.innerText = "Card 0 of 0";
    return;
  }

  if (currentCardIndex >= filteredCards.length) currentCardIndex = 0;
  if (currentCardIndex < 0) currentCardIndex = filteredCards.length - 1;

  const card = filteredCards[currentCardIndex];
  qEl.innerText = card.q;
  aEl.innerText = card.a;
  tagEl.innerText = card.subject;
  counterEl.innerText = `Card ${currentCardIndex + 1} of ${filteredCards.length}`;
}

function flipCard() {
  const inner = document.getElementById("flashcard-inner");
  if (inner.style.transform === "rotateY(180deg)") {
    inner.style.transform = "rotateY(0deg)";
  } else {
    inner.style.transform = "rotateY(180deg)";
  }
}

function nextCard() {
  currentCardIndex++;
  loadCurrentCard();
}

function prevCard() {
  currentCardIndex--;
  loadCurrentCard();
}

function markMastered() {
  cardsMasteredCount++;
  localStorage.setItem("learnova_cards", cardsMasteredCount);
  addXP(10);
  nextCard();
}

function addFlashcard() {
  const subject = document.getElementById("new-card-subject").value;
  const q = document.getElementById("new-card-q").value.trim();
  const a = document.getElementById("new-card-a").value.trim();

  if (!q || !a) {
    alert("Please fill in both question and answer fields.");
    return;
  }

  flashcardsData.push({ subject, q, a });
  localStorage.setItem("learnova_flashcards", JSON.stringify(flashcardsData));
  
  document.getElementById("new-card-q").value = "";
  document.getElementById("new-card-a").value = "";
  
  filterFlashcards();
  alert("Flashcard added successfully!");
}

// ==================== POMODORO FOCUS TIMER ====================
function setTimerMode(minutes, btn) {
  pauseTimer();
  totalSeconds = minutes * 60;
  timeLeft = totalSeconds;
  updateTimerDisplay();

  document.querySelectorAll(".timer-modes .mode-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

function updateTimerDisplay() {
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  document.getElementById("timer-display").innerText = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      pauseTimer();
      alert("Focus session completed! Great job.");
      focusSessionsCount++;
      localStorage.setItem("learnova_sessions", focusSessionsCount);
      addXP(50);
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  pauseTimer();
  timeLeft = totalSeconds;
  updateTimerDisplay();
}

function completeSessionEarly() {
  pauseTimer();
  focusSessionsCount++;
  localStorage.setItem("learnova_sessions", focusSessionsCount);
  addXP(50);
  alert("Focus session claimed early! +50 XP added.");
  timeLeft = totalSeconds;
  updateTimerDisplay();
}

// ==================== AI STUDY ASSISTANT ====================
function sendChatMessage(event) {
  event.preventDefault();
  const inputEl = document.getElementById("chat-input");
  const query = inputEl.value.trim();
  if (!query) return;

  const chatMessages = document.getElementById("chat-messages");

  // Append User message
  const userMsgDiv = document.createElement("div");
  userMsgDiv.className = "msg user-msg";
  userMsgDiv.style.cssText = "background: #e0e7ff; padding: 10px 14px; border-radius: 8px; margin: 8px 0; text-align: right;";
  userMsgDiv.innerText = query;
  chatMessages.appendChild(userMsgDiv);

  inputEl.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Simulate Smart AI Tutor Response
  setTimeout(() => {
    const aiMsgDiv = document.createElement("div");
    aiMsgDiv.className = "msg ai-msg";
    aiMsgDiv.style.cssText = "background: #f3f4f6; padding: 10px 14px; border-radius: 8px; margin: 8px 0;";
    aiMsgDiv.innerHTML = generateAIResponse(query);
    chatMessages.appendChild(aiMsgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 600);
}

function generateAIResponse(query) {
  const qLower = query.toLowerCase();
  if (qLower.includes("photosynthesis")) {
    return "🌱 <strong>Photosynthesis</strong> is the process used by plants to convert light energy into chemical energy. Equation: 6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂.";
  } else if (qLower.includes("pythagoras") || qLower.includes("triangle")) {
    return "📐 <strong>Pythagoras Theorem</strong> applies to right-angled triangles: <em>a² + b² = c²</em>, where <em>c</em> is the hypotenuse.";
  } else if (qLower.includes("stress") || qLower.includes("tired")) {
    return "💡 Study tip: Try using our <strong>Focus Timer</strong> for 25-minute blocks followed by a 5-minute break (Pomodoro Technique) to avoid burnout!";
  } else {
    return `🤖 That's a great question about <strong>"${query}"</strong>! Make sure to add this term to your Subject Syllabus or create a custom Flashcard so you can master it for your exams!`;
  }
}
