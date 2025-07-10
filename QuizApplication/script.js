const questions = [
  {
    question: "What does HTML stand for?",
    options: ["HyperText Markup Language", "HighText Machine Language", "HyperText and Links Markup", "None"],
    answer: 0
  },
  {
    question: "What is the correct syntax for referring to an external script?",
    options: ["<script src='script.js'>", "<script href='script.js'>", "<script ref='script.js'>", "<script name='script.js'>"],
    answer: 0
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "/*", "<!--", "#"],
    answer: 0
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<script>", "<style>", "<css>", "<link>"],
    answer: 1
  },
  {
    question: "How do you create a function in JavaScript?",
    options: ["function myFunc()", "function:myFunc()", "create myFunc()", "def myFunc()"],
    answer: 0
  }
];

let currentQuestion = 0;
let score = 0;
let selected = false;
let summary = [];

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const questionCounter = document.getElementById("question-counter");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreText = document.getElementById("score");
const summaryBox = document.getElementById("summary");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
  selected = false;
  const q = questions[currentQuestion];
  questionCounter.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  questionText.textContent = q.question;
  optionsContainer.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("div");
    btn.classList.add("option");
    btn.textContent = option;
    btn.addEventListener("click", () => selectAnswer(btn, index));
    optionsContainer.appendChild(btn);
  });

  nextBtn.disabled = true;
}

function selectAnswer(btn, index) {
  if (selected) return;
  selected = true;

  const correctIndex = questions[currentQuestion].answer;
  const options = document.querySelectorAll(".option");

  options.forEach((option, i) => {
    if (i === correctIndex) {
      option.classList.add("correct");
    } else if (option === btn) {
      option.classList.add("incorrect");
    }
  });

  if (index === correctIndex) {
    score++;
    summary.push(`✅ Q${currentQuestion + 1}: Correct`);
  } else {
    summary.push(`❌ Q${currentQuestion + 1}: Incorrect (Correct: ${questions[correctIndex].options || questions[correctIndex].answer})`);
  }

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  summary = [];
  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  loadQuestion();
});

function showResults() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreText.textContent = `Your Score: ${score} out of ${questions.length}`;
  summaryBox.innerHTML = summary.map(item => `<p>${item}</p>`).join("");
}

loadQuestion();
