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

// ================= QUIZ DATA (25 Questions Per Subject) =================
let quizData = [
  // --- MATHS ---
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

  // --- CHEMISTRY ---
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

  // --- PHYSICS ---
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

  // --- BIOLOGY ---
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

  // --- SOCIAL SCIENCE ---
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
  { subject: 'Social Science', question: 'What is the currency used in Japan?', options: ['Yuan', 'Won', 'Yen', 'Dollar'], answer: 2 }
];

let filteredCards = [...flashcards];
let currentCardIndex = 0;
let activeSubjectForModal = null;

// Quiz State
let currentQuizIndex = 0;
let quizScore = 0;
let selectedQuizFilter = 'All';

// ================= APP INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
  injectQuizNavButton();
  injectQuizSection();
});

// ================= DYNAMICALLY INJECT QUIZ UI =================
function injectQuizNavButton() {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks && !document.getElementById('nav-quiz-btn')) {
    const btn = document.createElement('button');
    btn.id = 'nav-quiz-btn';
    btn.className = 'nav-btn';
    btn.innerHTML = '🧠 Practice Quiz';
    btn.onclick = function() { showSection('quiz', this); };
    navLinks.appendChild(btn);
  }
}

function injectQuizSection() {
  const mainContent = document.querySelector('.main-content');
  if (mainContent && !document.getElementById('sec-quiz')) {
    const section = document.createElement('section');
    section.id = 'sec-quiz';
    section.className = 'content-section hidden';
    section.innerHTML = `
      <div class="section-header-row">
        <h2 class="section-title">🧠 Interactive Subject Practice Quiz</h2>
        <select id="quiz-subject-filter" onchange="filterQuiz()" class="styled-select" style="padding: 8px; border-radius: 6px; border: 1px solid #d1d5db;">
          <option value="All">All Subjects</option>
          <option value="Maths">Maths</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Physics">Physics</option>
          <option value="Biology">Biology</option>
          <option value="Social Science">Social Science</option>
        </select>
      </div>

      <div class="quiz-container" style="background: #fff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-top: 20px;">
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
    mainContent.appendChild(section);
    loadQuizQuestion();
  }
}

// ================= AUTHENTICATION =================
function switchAuthTab(mode) {
  authMode = mode;
  const loginBtn = document.getElementById('tab-login');
  const signupBtn = document.getElementById('tab-signup');
  const nameField = document.getElementById('name-field');
  const submitBtn = document.getElementById('auth-submit-btn');

  if (loginBtn) loginBtn.classList.toggle('active', mode === 'login');
  if (signupBtn) signupBtn.classList.toggle('active', mode === 'signup');
  if (nameField) nameField.classList.toggle('hidden', mode === 'login');
  if (submitBtn) submitBtn.textContent = mode === 'login' ? 'Login to Dashboard' : 'Create Account & Start';
}

function handleAuth(e) {
  e.preventDefault();
  const emailInput = document.getElementById('email');
  const nameInput = document.getElementById('username');
  
  const email = emailInput ? emailInput.value.trim() : 'scholar@learnova.com';
  const nameVal = nameInput ? nameInput.value.trim() : '';

  if (authMode === 'signup' && nameVal) {
    currentUser.name = nameVal;
  } else {
    currentUser.name = email.split('@')[0] || 'Scholar';
    currentUser.name = currentUser.name.charAt(0).toUpperCase() + currentUser.name.slice(1);
  }
  currentUser.email = email;

  const displayName = document.getElementById('display-user-name');
  const welcomeHeading = document.getElementById('welcome-heading');
  const authOverlay = document.getElementById('auth-overlay');
  const appContainer = document.getElementById('app-container');

  if (displayName) displayName.textContent = currentUser.name;
  if (welcomeHeading) welcomeHeading.textContent = `Welcome back, ${currentUser.name}!`;
  if (authOverlay) authOverlay.classList.add('hidden');
  if (appContainer) appContainer.classList.remove('hidden');

  renderSubjects();
  renderFlashcard();
  updateScoreboard();
}

function logout() {
  const authOverlay = document.getElementById('auth-overlay');
  const appContainer = document.getElementById('app-container');
  if (appContainer) appContainer.classList.add('hidden');
  if (authOverlay) authOverlay.classList.remove('hidden');
}

// ================= NAVIGATION =================
function showSection(sectionId, btn) {
  document.querySelectorAll('.content-section').forEach(sec => sec.classList.add('hidden'));
  const target = document.getElementById(`sec-${sectionId}`);
  if (target) target.classList.remove('hidden');

  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

// ================= CUSTOM IMAGE UPLOAD =================
function previewCustomImage(event, imgElementId) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.getElementById(imgElementId);
      if (img) img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// ================= SUBJECTS & SYLLABUS =================
function renderSubjects() {
  const grid = document.getElementById('subjects-grid');
  if (!grid) return;
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
  const title = document.getElementById('modal-subject-title');
  const input = document.getElementById('syllabus-input');
  const modal = document.getElementById('syllabus-modal');

  if (title) title.textContent = `Add Syllabus: ${subjectsData[index].name}`;
  if (input) input.value = '';
  if (modal) modal.classList.remove('hidden');
}

function closeSyllabusModal() {
  const modal = document.getElementById('syllabus-modal');
  if (modal) modal.classList.add('hidden');
}

function saveSyllabus() {
  const input = document.getElementById('syllabus-input');
  if (!input) return;
  const rawText = input.value.trim();
  if (!rawText) return;

  const topics = rawText.split(/[\n,]+/).map(t => t.trim()).filter(Boolean);
  const subjectObj = subjectsData[activeSubjectForModal];

  topics.forEach(topic => {
    subjectObj.syllabus.push(topic);
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
  const select = document.getElementById('flashcard-subject-filter');
  const selected = select ? select.value : 'All';
  filteredCards = selected === 'All'
    ? [...flashcards]
    : flashcards.filter(c => c.subject === selected);

  currentCardIndex = 0;
  renderFlashcard();
}

function renderFlashcard() {
  const cardBox = document.getElementById('flashcard-box');
  if (!cardBox) return;
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
  const cardBox = document.getElementById('flashcard-box');
  if (cardBox) cardBox.classList.toggle('flipped');
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
  const subjectEl = document.getElementById('new-card-subject');
  const qEl = document.getElementById('new-card-q');
  const aEl = document.getElementById('new-card-a');

  if (!subjectEl || !qEl || !aEl) return;

  const subject = subjectEl.value;
  const q = qEl.value.trim();
  const a = aEl.value.trim();

  if (!q || !a) return;

  flashcards.push({ subject, q, a });
  qEl.value = '';
  aEl.value = '';
  filterFlashcards();
}

function markMastered() {
  stats.cardsMastered += 1;
  stats.xp += 10;
  updateScoreboard();
  nextCard();
}

// ================= QUIZ LOGIC =================
function filterQuiz() {
  const filterEl = document.getElementById('quiz-subject-filter');
  selectedQuizFilter = filterEl ? filterEl.value : 'All';
  currentQuizIndex = 0;
  quizScore = 0;
  loadQuizQuestion();
}

function getFilteredQuizData() {
  if (selectedQuizFilter === 'All') return quizData;
  return quizData.filter(q => q.subject === selectedQuizFilter);
}

function loadQuizQuestion() {
  const filtered = getFilteredQuizData();
  const quizBox = document.getElementById('quiz-box');
  const resultBox = document.getElementById('quiz-result-box');
  
  if (!quizBox || !resultBox) return;

  if (filtered.length === 0) {
    document.getElementById('quiz-question-text').textContent = 'No quiz questions available for this subject yet.';
    document.getElementById('quiz-options-container').innerHTML = '';
    const nextBtn = document.getElementById('quiz-next-btn');
    if (nextBtn) nextBtn.style.display = 'none';
    return;
  }

  quizBox.style.display = 'block';
  resultBox.style.display = 'none';

  if (currentQuizIndex >= filtered.length) {
    quizBox.style.display = 'none';
    resultBox.style.display = 'block';
    const scoreText = document.getElementById('quiz-score-text');
    if (scoreText) scoreText.textContent = `You scored ${quizScore} out of ${filtered.length}!`;
    stats.xp += 15;
    updateScoreboard();
    return;
  }

  const q = filtered[currentQuizIndex];
  const qText = document.getElementById('quiz-question-text');
  if (qText) qText.textContent = `Q${currentQuizIndex + 1}: ${q.question}`;
  
  const optionsContainer = document.getElementById('quiz-options-container');
  if (!optionsContainer) return;
  optionsContainer.innerHTML = '';
  
  const nextBtn = document.getElementById('quiz-next-btn');
  if (nextBtn) nextBtn.style.display = 'none';

  q.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.className = 'option-btn';
    button.style.cssText = 'display: block; width: 100%; padding: 12px; margin: 8px 0; text-align: left; background: #f3f4f6; border: 2px solid transparent; border-radius: 8px; cursor: pointer; font-size: 1rem;';
    button.onclick = () => selectQuizAnswer(button, index, q.answer);
    optionsContainer.appendChild(button);
  });
}

function selectQuizAnswer(selectedBtn, selectedIndex, correctIndex) {
  const allButtons = document.querySelectorAll('#quiz-options-container .option-btn');

  allButtons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIndex) {
      btn.style.background = '#d1fae5';
      btn.style.borderColor = '#10b981';
    }
  });

  if (selectedIndex === correctIndex) {
    quizScore++;
  } else {
    selectedBtn.style.background = '#fee2e2';
    selectedBtn.style.borderColor = '#ef4444';
  }

  const nextBtn = document.getElementById('quiz-next-btn');
  if (nextBtn) nextBtn.style.display = 'inline-block';
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

// ================= SCOREBOARD =================
function updateScoreboard() {
  const totalSyllabus = subjectsData.reduce((sum, s) => sum + s.syllabus.length, 0);
  const xpEl = document.getElementById('stat-xp');
  const cardsEl = document.getElementById('stat-cards');
  const sessEl = document.getElementById('stat-sessions');
  const sylEl = document.getElementById('stat-syllabus');

  if (xpEl) xpEl.textContent = `${stats.xp} XP`;
  if (cardsEl) cardsEl.textContent = stats.cardsMastered;
  if (sessEl) sessEl.textContent = stats.sessions;
  if (sylEl) sylEl.textContent = totalSyllabus;

  const progressPct = Math.min(100, 10 + Math.floor(stats.xp / 5));
  const bar = document.getElementById('mastery-bar');
  if (bar) bar.style.width = `${progressPct}%`;

  let rank = 'Rising Learner (Level 1)';
  if (stats.xp >= 200) rank = 'Master Scholar (Level 3)';
  else if (stats.xp >= 80) rank = 'Focused Achiever (Level 2)';
  
  const rankLabel = document.getElementById('rank-label');
  if (rankLabel) rankLabel.textContent = `Current Rank: ${rank} — "Learn big, earn big"`;
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
  if (btn) btn.classList.add('active');
}

function updateTimerDisplay() {
  const m = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
  const s = String(timerSeconds % 60).padStart(2, '0');
  const disp = document.getElementById('timer-display');
  if (disp) disp.textContent = `${m}:${s}`;
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

// ================= AI STUDY ASSISTANT =================
async function sendChatMessage(e) {
  e.preventDefault();
  const input = document.getElementById('chat-input');
  if (!input) return;
  const question = input.value.trim();
  if (!question) return;

  appendMessage(question, 'user-msg');
  input.value = '';

  const typingId = 'typing-' + Date.now();
  appendMessage('<em>Learnova AI is thinking...</em>', 'ai-msg', typingId);

  const reply = await generateSmartAIResponse(question);

  const typingBubble = document.getElementById(typingId);
  if (typingBubble) {
    typingBubble.innerHTML = reply;
  } else {
    appendMessage(reply, 'ai-msg');
  }
}

function appendMessage(text, className, id = '') {
  const box = document.getElementById('chat-messages');
  if (!box) return;
  const div = document.createElement('div');
  div.className = `msg ${className}`;
  if (id) div.id = id;
  div.innerHTML = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

async function generateSmartAIResponse(q) {
  const lower = q.toLowerCase().trim();

  const mathMatch = lower.replace(/^(what is|calculate|solve|=|\?)/g, '').trim();
  if (/^[0-9+\-*/().\s^%]+$/.test(mathMatch) && /[0-9]/.test(mathMatch)) {
    try {
      const sanitized = mathMatch.replace(/\^/g, '**');
      const result = Function(`"use strict"; return (${sanitized})`)();
      if (typeof result === 'number' && !isNaN(result)) {
        return `📐 <strong>Math Solution:</strong><br>${mathMatch} = <strong>${result}</strong>`;
      }
    } catch (err) {}
  }

  if (lower.includes('focus') || lower.includes('struggle') || lower.includes('tired') || lower.includes('motivat')) {
    return `💡 <strong>Learnova Coach:</strong> Remember: <em>"Learn big, earn big!"</em><br>Try this 3-step reset:<br>1. Start one <strong>25-minute Focus Timer</strong>.<br>2. Pick just ONE topic from your Syllabus.<br>3. Flip 5 flashcards to build momentum.`;
  }

  const cleanTopic = lower
    .replace(/^(what is|what are|who is|who was|explain|define|tell me about|how does|why does|what does)\s+/i, '')
    .replace(/[?.!]+$/g, '')
    .trim();

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
  } catch (error) {}

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
