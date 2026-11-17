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
// ================= QUIZ DATA (25+ Questions Per Subject) =================
let quizData = [
  // --- MATHS (25 Questions) ---
  { subject: 'Maths', question: 'What is the value of 9 x 8?', options: ['72', '81', '64', '56'], answer: 0 },
  { subject: 'Maths', question: 'What is the square root of 144?', options: ['10', '11', '12', '14'], answer: 2 },
  { subject: 'Maths', question: 'What is the value of Pi (π) to 2 decimal places?', options: ['3.14', '3.16', '3.12', '3.18'], answer: 0 },
  { subject: 'Maths', question: 'Solve for x: 2x + 6 = 14', options: ['x = 2', 'x = 4', 'x = 6', 'x = 8'], answer: 1 },
  { subject: 'Maths', question: 'What is the sum of angles in a triangle?', options: ['90°', '180°', '270°', '360°'], answer: 1 },
  { subject: 'Maths', question: 'What is 15% of 200?', options: ['20', '25', '30', '35'], answer: 2 },
  { subject: 'Maths', question: 'What is the next prime number after 7?', options: ['9', '10', '11', '13'], answer: 2 },
  { subject: 'Maths', question: 'What is 7 cubed (7³)?', options: ['245', '343', '353', '443'], answer: 1 },
  { subject: 'Maths', question: 'What is the area of a rectangle with length 8 and width 5?', options: ['13', '26', '40', '45'], answer: 2 },
  { subject: 'Maths', question: 'What is the slope of the line y = 3x + 2?', options: ['2', '3', '5', '1'], answer: 1 },
  { subject: 'Maths', question: 'Simplify: 50 ÷ 5 + 3 × 2', options: ['16', '20', '22', '26'], answer: 0 },
  { subject: 'Maths', question: 'What is the perimeter of a square with side length 6?', options: ['12', '18', '24', '36'], answer: 2 },
  { subject: 'Maths', question: 'What is the value of 2⁵ (2 to the power of 5)?', options: ['16', '32', '64', '128'], answer: 1 },
  { subject: 'Maths', question: 'How many degrees are in a right angle?', options: ['45°', '90°', '180°', '360°'], answer: 1 },
  { subject: 'Maths', question: 'What is 99 + 101?', options: ['198', '200', '202', '210'], answer: 1 },
  { subject: 'Maths', question: 'What is the median of: 3, 7, 9, 12, 15?', options: ['7', '9', '10', '12'], answer: 1 },
  { subject: 'Maths', question: 'What is the formula for the area of a circle?', options: ['2πr', 'πr²', 'πd', '2πr²'], answer: 1 },
  { subject: 'Maths', question: 'What is 100 divided by 0.25?', options: ['25', '50', '200', '400'], answer: 3 },
  { subject: 'Maths', question: 'What is the LCM of 4 and 6?', options: ['12', '24', '10', '2'], answer: 0 },
  { subject: 'Maths', question: 'What is the HCF of 18 and 24?', options: ['3', '6', '9', '12'], answer: 1 },
  { subject: 'Maths', question: 'Convert 3/4 to a percentage.', options: ['25%', '50%', '75%', '80%'], answer: 2 },
  { subject: 'Maths', question: 'What is the value of x if 3x = 27?', options: ['7', '8', '9', '10'], answer: 2 },
  { subject: 'Maths', question: 'What is the square of 15?', options: ['125', '215', '225', '255'], answer: 2 },
  { subject: 'Maths', question: 'What is the probability of rolling a 6 on a standard die?', options: ['1/2', '1/3', '1/6', '1/4'], answer: 2 },
  { subject: 'Maths', question: 'What is the next number in the sequence: 2, 4, 8, 16, ?', options: ['24', '30', '32', '64'], answer: 2 },

  // --- CHEMISTRY (25 Questions) ---
  { subject: 'Chemistry', question: 'What is the chemical symbol for Gold?', options: ['Ag', 'Au', 'Gd', 'Go'], answer: 1 },
  { subject: 'Chemistry', question: 'What is the chemical formula for Water?', options: ['CO2', 'H2O', 'NaCl', 'O2'], answer: 1 },
  { subject: 'Chemistry', question: 'What is the pH of pure neutral water?', options: ['5', '7', '9', '14'], answer: 1 },
  { subject: 'Chemistry', question: 'Which gas is most abundant in Earth’s atmosphere?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'], answer: 2 },
  { subject: 'Chemistry', question: 'What is the chemical symbol for Table Salt?', options: ['KCl', 'NaCl', 'H2SO4', 'CaCO3'], answer: 1 },
  { subject: 'Chemistry', question: 'What element has the atomic number 1?', options: ['Helium', 'Hydrogen', 'Carbon', 'Oxygen'], answer: 1 },
  { subject: 'Chemistry', question: 'Which metal is liquid at room temperature?', options: ['Iron', 'Mercury', 'Copper', 'Zinc'], answer: 1 },
  { subject: 'Chemistry', question: 'What is the chemical formula for Carbon Dioxide?', options: ['CO', 'CO2', 'C2O', 'O2C'], answer: 1 },
  { subject: 'Chemistry', question: 'What gas do plants release during photosynthesis?', options: ['Carbon Dioxide', 'Nitrogen', 'Oxygen', 'Hydrogen'], answer: 2 },
  { subject: 'Chemistry', question: 'What is the hardest natural substance on Earth?', options: ['Gold', 'Iron', 'Diamond', 'Platinum'], answer: 2 },
  { subject: 'Chemistry', question: 'What is the chemical symbol for Iron?', options: ['Ir', 'In', 'Fe', 'Fi'], answer: 2 },
  { subject: 'Chemistry', question: 'What type of bond involves sharing electron pairs?', options: ['Ionic', 'Covalent', 'Hydrogen', 'Metallic'], answer: 1 },
  { subject: 'Chemistry', question: 'What is the chemical formula for Sulfuric Acid?', options: ['HCl', 'HNO3', 'H2SO4', 'NaOH'], answer: 2 },
  { subject: 'Chemistry', question: 'Which noble gas is commonly used in glowing signs?', options: ['Helium', 'Neon', 'Argon', 'Krypton'], answer: 1 },
  { subject: 'Chemistry', question: 'What is the charge of a proton?', options: ['Positive', 'Negative', 'Neutral', 'Variable'], answer: 0 },
  { subject: 'Chemistry', question: 'What is the main component of natural gas?', options: ['Propane', 'Butane', 'Methane', 'Ethane'], answer: 2 },
  { subject: 'Chemistry', question: 'Which element is known as the king of chemicals?', options: ['HCl', 'H2SO4', 'HNO3', 'NaCl'], answer: 1 },
  { subject: 'Chemistry', question: 'What is the chemical symbol for Silver?', options: ['Si', 'Ag', 'Sr', 'Sl'], answer: 1 },
  { subject: 'Chemistry', question: 'What is baking soda chemically known as?', options: ['Sodium carbonate', 'Sodium bicarbonate', 'Sodium chloride', 'Sodium hydroxide'], answer: 1 },
  { subject: 'Chemistry', question: 'How many valence electrons does Carbon have?', options: ['2', '3', '4', '6'], answer: 2 },
  { subject: 'Chemistry', question: 'What is the process of solid turning directly into gas called?', options: ['Melting', 'Evaporation', 'Sublimation', 'Condensation'], answer: 2 },
  { subject: 'Chemistry', question: 'What is the atomic number of Oxygen?', options: ['6', '7', '8', '9'], answer: 2 },
  { subject: 'Chemistry', question: 'Which acid is found in lemons?', options: ['Acetic acid', 'Citric acid', 'Lactic acid', 'Hydrochloric acid'], answer: 1 },
  { subject: 'Chemistry', question: 'What is the chemical symbol for Potassium?', options: ['P', 'Pt', 'K', 'Po'], answer: 2 },
  { subject: 'Chemistry', question: 'What is rust chemically classified as?', options: ['Iron sulfide', 'Iron oxide', 'Iron chloride', 'Iron carbonate'], answer: 1 },

  // --- PHYSICS (25 Questions) ---
  { subject: 'Physics', question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Saturn', 'Mars', 'Jupiter'], answer: 2 },
  { subject: 'Physics', question: 'What unit is used to measure electrical resistance?', options: ['Volt', 'Ampere', 'Ohm', 'Watt'], answer: 2 },
  { subject: 'Physics', question: 'What is the acceleration due to gravity on Earth?', options: ['8.9 m/s²', '9.8 m/s²', '10.5 m/s²', '11.2 m/s²'], answer: 1 },
  { subject: 'Physics', question: 'Who formulated the three laws of motion?', options: ['Albert Einstein', 'Isaac Newton', 'Galileo Galilei', 'Nikola Tesla'], answer: 1 },
  { subject: 'Physics', question: 'What is the speed of light in a vacuum approximately?', options: ['3 × 10⁶ m/s', '3 × 10⁸ m/s', '3 × 10¹⁰ m/s', '3 × 10¹² m/s'], answer: 1 },
  { subject: 'Physics', question: 'What instrument is used to measure atmospheric pressure?', options: ['Thermometer', 'Barometer', 'Hygrometer', 'Altimeter'], answer: 1 },
  { subject: 'Physics', question: 'What is the SI unit of force?', options: ['Joule', 'Watt', 'Newton', 'Pascal'], answer: 2 },
  { subject: 'Physics', question: 'Energy cannot be created or destroyed. This is the law of...', options: ['Conservation of Energy', 'Thermodynamics', 'Inertia', 'Gravity'], answer: 0 },
  { subject: 'Physics', question: 'What type of lens is used to correct myopia (nearsightedness)?', options: ['Convex', 'Concave', 'Plane', 'Cylindrical'], answer: 1 },
  { subject: 'Physics', question: 'What is the SI unit of power?', options: ['Joule', 'Volt', 'Watt', 'Ampere'], answer: 2 },
  { subject: 'Physics', question: 'Which color of light bends the most through a prism?', options: ['Red', 'Yellow', 'Green', 'Violet'], answer: 3 },
  { subject: 'Physics', question: 'What does Ohm’s Law relate?', options: ['Voltage, Current, Resistance', 'Force, Mass, Acceleration', 'Work, Power, Time', 'Speed, Distance, Time'], answer: 0 },
  { subject: 'Physics', question: 'What is the center of a lens called?', options: ['Focus', 'Pole', 'Optical Center', 'Curvature'], answer: 2 },
  { subject: 'Physics', question: 'What type of wave is sound waves?', options: ['Transverse', 'Longitudinal', 'Electromagnetic', 'Radio'], answer: 1 },
  { subject: 'Physics', question: 'What is the frequency unit of sound?', options: ['Decibel', 'Hertz', 'Ampere', 'Joule'], answer: 1 },
  { subject: 'Physics', question: 'What is the work done when a force moves an object in physics?', options: ['Force × Time', 'Force × Distance', 'Mass × Acceleration', 'Power / Time'], answer: 1 },
  { subject: 'Physics', question: 'Which subatomic particle has a negative charge?', options: ['Proton', 'Neutron', 'Electron', 'Positron'], answer: 2 },
  { subject: 'Physics', question: 'What is the boiling point of water in Fahrenheit?', options: ['100°F', '180°F', '212°F', '32°F'], answer: 2 },
  { subject: 'Physics', question: 'What device converts mechanical energy into electrical energy?', options: ['Motor', 'Generator', 'Transformer', 'Resistor'], answer: 1 },
  { subject: 'Physics', question: 'What is the nearest star to Earth?', options: ['Proxima Centauri', 'Sirius', 'The Sun', 'Betelgeuse'], answer: 2 },
  { subject: 'Physics', question: 'What is the resistance of an ideal voltmeter?', options: ['Zero', 'Very low', 'Infinite', 'Moderate'], answer: 2 },
  { subject: 'Physics', question: 'Which physical quantity is a vector quantity?', options: ['Speed', 'Distance', 'Velocity', 'Mass'], answer: 2 },
  { subject: 'Physics', question: 'What is the main source of energy for the sun?', options: ['Nuclear fission', 'Nuclear fusion', 'Chemical combustion', 'Gravitational pull'], answer: 1 },
  { subject: 'Physics', question: 'What is the SI unit of frequency?', options: ['Second', 'Meter', 'Hertz', 'Newton'], answer: 2 },
  { subject: 'Physics', question: 'What is the absolute zero temperature in Celsius?', options: ['0°C', '-100°C', '-273.15°C', '-373°C'], answer: 2 },

  // --- BIOLOGY (25 Questions) ---
  { subject: 'Biology', question: 'Which organelle is known as the powerhouse of the cell?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi Body'], answer: 2 },
  { subject: 'Biology', question: 'What blood type is considered the universal donor?', options: ['A positive', 'B positive', 'AB positive', 'O negative'], answer: 3 },
  { subject: 'Biology', question: 'What is the process by which plants make their food?', options: ['Respiration', 'Transpiration', 'Photosynthesis', 'Fermentation'], answer: 2 },
  { subject: 'Biology', question: 'Which human organ produces insulin?', options: ['Liver', 'Kidney', 'Pancreas', 'Stomach'], answer: 2 },
  { subject: 'Biology', question: 'What is the genetic material inside living organisms?', options: ['RNA', 'DNA', 'Protein', 'Lipid'], answer: 1 },
  { subject: 'Biology', question: 'How many chambers does the human heart have?', options: ['2', '3', '4', '5'], answer: 2 },
  { subject: 'Biology', question: 'What is the largest organ in the human body?', options: ['Liver', 'Brain', 'Skin', 'Lungs'], answer: 2 },
  { subject: 'Biology', question: 'Which cells carry oxygen in human blood?', options: ['White blood cells', 'Red blood cells', 'Platelets', 'Plasma'], answer: 1 },
  { subject: 'Biology', question: 'What vitamin do we get primarily from sunlight?', options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'], answer: 3 },
  { subject: 'Biology', question: 'What is the control center of a eukaryotic cell?', options: ['Cytoplasm', 'Nucleus', 'Cell Membrane', 'Ribosome'], answer: 1 },
  { subject: 'Biology', question: 'Which plant tissue transports water?', options: ['Xylem', 'Phloem', 'Cortex', 'Stomata'], answer: 0 },
  { subject: 'Biology', question: 'What is the process of cell division that results in identical daughter cells?', options: ['Meiosis', 'Mitosis', 'Osmosis', 'Diffusion'], answer: 1 },
  { subject: 'Biology', question: 'What gas do humans exhale during respiration?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], answer: 2 },
  { subject: 'Biology', question: 'Which part of the brain controls balance and coordination?', options: ['Cerebrum', 'Cerebellum', 'Medulla', 'Hypothalamus'], answer: 1 },
  { subject: 'Biology', question: 'What is the study of fungi called?', options: ['Botany', 'Zoology', 'Mycology', 'Ecology'], answer: 2 },
  { subject: 'Biology', question: 'Which blood cells fight infections in the body?', options: ['Red blood cells', 'White blood cells', 'Platelets', 'Neurons'], answer: 1 },
  { subject: 'Biology', question: 'What pigment gives green color to plants?', options: ['Carotene', 'Chlorophyll', 'Xanthophyll', 'Anthocyanin'], answer: 1 },
  { subject: 'Biology', question: 'What is the basic structural and functional unit of life?', options: ['Tissue', 'Organ', 'Cell', 'Organism'], answer: 2 },
  { subject: 'Biology', question: 'Which animal is known as the tallest mammal?', options: ['Elephant', 'Giraffe', 'Horse', 'Kangaroo'], answer: 1 },
  { subject: 'Biology', question: 'What is the human body’s normal temperature in Celsius?', options: ['35°C', '37°C', '39°C', '40°C'], answer: 1 },
  { subject: 'Biology', question: 'Which organ purifies blood in the human body?', options: ['Heart', 'Lungs', 'Kidneys', 'Liver'], answer: 2 },
  { subject: 'Biology', question: 'What is the protein responsible for hair and nail structure?', options: ['Collagen', 'Keratin', 'Insulin', 'Hemoglobin'], answer: 1 },
  { subject: 'Biology', question: 'What type of skeleton do insects have?', options: ['Endoskeleton', 'Exoskeleton', 'Hydrostatic skeleton', 'No skeleton'], answer: 1 },
  { subject: 'Biology', question: 'Which vitamin deficiency causes scurvy?', options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'], answer: 2 },
  { subject: 'Biology', question: 'What is the scientific name for human beings?', options: ['Homo erectus', 'Homo sapiens', 'Australopithecus', 'Pan troglodytes'], answer: 1 },

  // --- SOCIAL SCIENCE (25 Questions) ---
  { subject: 'Social Science', question: 'Who was the first President of the United States?', options: ['George Washington', 'Abraham Lincoln', 'Thomas Jefferson', 'John Adams'], answer: 0 },
  { subject: 'Social Science', question: 'In which year did World War II end?', options: ['1940', '1945', '1950', '1939'], answer: 1 },
  { subject: 'Social Science', question: 'Where did the Industrial Revolution begin?', options: ['France', 'United States', 'Great Britain', 'Germany'], answer: 2 },
  { subject: 'Social Science', question: 'What are the three branches of democratic government?', options: ['Monarchy, Dictatorship, Democracy', 'Legislative, Executive, Judiciary', 'Federal, State, Local', 'Senate, House, President'], answer: 1 },
  { subject: 'Social Science', question: 'Which ancient civilization built the pyramids of Giza?', options: ['Romans', 'Greeks', 'Egyptians', 'Mayans'], answer: 2 },
  { subject: 'Social Science', question: 'Who wrote the book "The Wealth of Nations"?', options: ['Karl Marx', 'Adam Smith', 'John Locke', 'Thomas Hobbes'], answer: 1 },
  { subject: 'Social Science', question: 'In which year did World War I begin?', options: ['1912', '1914', '1918', '1939'], answer: 1 },
  { subject: 'Social Science', question: 'What is the longest river in the world?', options: ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'], answer: 1 },
  { subject: 'Social Science', question: 'Which continent is known as the "Dark Continent" historically?', options: ['Asia', 'Africa', 'Australia', 'Antarctica'], answer: 1 },
  { subject: 'Social Science', question: 'Who was the leader of the Indian independence movement using non-violence?', options: ['Subhas Chandra Bose', 'Bhagat Singh', 'Mahatma Gandhi', 'Jawaharlal Nehru'], answer: 2 },
  { subject: 'Social Science', question: 'What is the supreme law of the land in the United States?', options: ['The Declaration of Independence', 'The Constitution', 'The Bill of Rights', 'The Emancipation Proclamation'], answer: 1 },
  { subject: 'Social Science', question: 'Which ocean is the largest by surface area?', options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'], answer: 3 },
  { subject: 'Social Science', question: 'What economic system features free markets and private property?', options: ['Socialism', 'Capitalism', 'Communism', 'Feudalism'], answer: 1 },
  { subject: 'Social Science', question: 'Who painted the Mona Lisa?', options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'], answer: 2 },
  { subject: 'Social Science', question: 'What empire was ruled by Julius Caesar?', options: ['Greek Empire', 'Roman Empire', 'Ottoman Empire', 'Persian Empire'], answer: 1 },
  { subject: 'Social Science', question: 'What is the capital city of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'], answer: 2 },
  { subject: 'Social Science', question: 'Which treaty ended World War I?', options: ['Treaty of Versailles', 'Treaty of Paris', 'Treaty of Ghent', 'Treaty of Vienna'], answer: 0 },
  { subject: 'Social Science', question: 'What is the process of people moving from rural areas to cities called?', options: ['Globalization', 'Urbanization', 'Industrialization', 'Migration'], answer: 1 },
  { subject: 'Social Science', question: 'Who discovered America in 1492?', options: ['Vasco da Gama', 'Ferdinand Magellan', 'Christopher Columbus', 'Marco Polo'], answer: 2 },
  { subject: 'Social Science', question: 'Which international organization was formed after WWII to maintain world peace?', options: ['League of Nations', 'United Nations', 'NATO', 'World Bank'], answer: 1 },
  { subject: 'Social Science', question: 'What is the study of population statistics called?', options: ['Geography', 'Demography', 'Anthropology', 'Sociology'], answer: 1 },
  { subject: 'Social Science', question: 'Which desert is the largest hot desert in the world?', options: ['Gobi Desert', 'Kalahari Desert', 'Sahara Desert', 'Mojave Desert'], answer: 2 },
  { subject: 'Social Science', question: 'What form of government is ruled by a king or queen?', options: ['Democracy', 'Oligarchy', 'Monarchy', 'Republic'], answer: 2 },
  { subject: 'Social Science', question: 'In which year did the French Revolution begin?', options: ['1776', '1789', '1804', '1815'], answer: 1 },
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
