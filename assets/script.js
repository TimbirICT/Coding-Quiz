var elements = {
  questions: document.getElementById("questions"),
  answerButton: document.getElementById("answers"),
  nextButton: document.getElementById("next-button"),
  restartButton: document.getElementById("restart-button"),
  startButton: document.getElementById("start-button"),
  score: document.getElementById("score"),
  message: document.getElementById("message"),
  endingScreen: document.getElementById("ending-screen"),
  highScoresList: document.getElementById("high-scores"),
};

var answers = [
  "An array is a container object that holds a fixed number of values of a single type",
  "A function that is called when an event occurs",
  "A function is a block of code that can be used repeatedly",
  "A variable is a value that can be changed",
  "Stringify is a function that returns a string representation of an object",
  "A programming construct that allows you to store and reuse a block of code in JavaScript",
];

var questions = [
  {
    question: "What is an array?",
    answers: [
      { text: answers[0], correct: true },
      { text: "An array is a function that is called when an event occurs.", correct: false },
      { text: "An array is a block of code that can be used repeatedly.", correct: false },
      { text: "An array is a value that can be changed.", correct: false },
    ],
  },
  {
    question: "What is an event listener?",
    answers: [
      { text: "A function that listens for errors in JS code.", correct: false },
      { text: "A method used to find data from an external API", correct: false },
      { text: answers[1], correct: true },
      { text: "A string of values that can be changed.", correct: false },
    ],
  },
  {
    question: "What is a function in JS?",
    answers: [
      { text: "A data type for storing text in JavaScript.", correct: false },
      { text: "A method used to find data from an external API.", correct: false },
      { text: "A method used for sorting arrays.", correct: false },
      { text: answers[2], correct: true },
    ],
  },
  {
    question: "What is a variable in JS?",
    answers: [
      { text: "A construct used to manipulate classes in JavaScript.", correct: false },
      { text: answers[3], correct: true },
      { text: "A function for performing calculations on numerical data.", correct: false },
      { text: "A string of values that cannot be changed.", correct: false },
    ],
  },
  {
    question: "What does the stringify function do?",
    answers: [
      { text: "Converts a JSON string into a JavaScript object.", correct: false },
      { text: "Converts a number to a string data type.", correct: false },
      { text: answers[4], correct: true },
      { text: "Creates a new function in JavaScript.", correct: false },
    ],
  },
  {
    question: "What is an event in JS?",
    answers: [
      { text: answers[5], correct: true },
      { text: "An event is a type of variable used to store data in JavaScript.", correct: false },
      { text: "A type of function that calls a variable.", correct: false },
      { text: "A method in JavaScript used for sorting arrays.", correct: false },
    ],
  },
];

var currentQ = 0;
var score = 0;
var quizStarted = false;
var answered = false;

elements.startButton.addEventListener("click", function () {
  startQuiz();
  showQuestion();
  startTimer();
});

elements.nextButton.addEventListener("click", function () {
  if (answered) {
    currentQ++;
    answered = false;
    showQuestion();
    elements.nextButton.style.display = "none";
  }
});

elements.restartButton.addEventListener("click", restartQuiz);

function restartQuiz() {
  startQuiz();
}

function updateScoreDisplay(isCorrect) {
  elements.message.textContent = isCorrect ? "Correct!" : "Incorrect!";
  elements.score.textContent = "Score: " + score;
}

function checkAnswer(isCorrect) {
  if (!answered) {
    var buttons = elements.answerButton.querySelectorAll("button.btn");

    buttons.forEach(function (button) {
      button.disabled = true;
      button.style.backgroundColor = button.getAttribute("data-correct") === "true" ? "green" : "red";
    });

    if (isCorrect) score += 10;
    answered = true;
    updateScoreDisplay(isCorrect);

    if (currentQ >= questions.length - 1) showEndingScreen();

     if (isCorrect !== true) timeLeft--;
    else elements.nextButton.style.display = "block";
  }
}

function startQuiz() {
  currentQ = 0;
  score = 0;
  quizStarted = true;
  elements.startButton.style.display = "none";
  elements.nextButton.style.display = elements.restartButton.style.display = "none";
  elements.score.textContent = "Score: 0";
  elements.endingScreen.style.display = "none";
  showQuestion();
}

const timerElement = document.getElementById("timer");
let timeLeft = 10;
let timerInterval;

function startTimer() {
  timerElement.textContent = `Time: ${timeLeft} seconds`;
  timerInterval = setInterval(function () {
    timerElement.style.display = "block";
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      // Handle when time runs out (e.g., show correct answer or move to the next question)
      showEndingScreen(); // For now, move to the next question
    } else {
      timerElement.textContent = `Time: ${timeLeft} seconds`;

    }
  }, 1000);
}

function showQuestion() {
  if (currentQ < questions.length) {
    const currentQuestion = questions[currentQ];
    elements.questions.textContent = currentQuestion.question;
    elements.answerButton.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("btn");

      button.addEventListener("click", () => {
        if (!answered) {
          checkAnswer(answer.correct);
          stopTimer(); // Stop the timer when an answer is clicked
        }
      });

      elements.answerButton.appendChild(button);

      if (answer.correct) {
        button.setAttribute("data-correct", "true");
      }
    });


  

  } else {
    // If there are no more questions, hide the timer
    const timerElement = document.getElementById("timer");
    timerElement.style.display = "none";
  }
  }



function showEndingScreen() {
  elements.endingScreen.style.display = "block";
  elements.questions.style.display = elements.answerButton.style.display = "none";
  elements.restartButton.style.display = "block";
  updateHighScores();
}

function updateHighScores() {
  elements.highScoresList.innerHTML = "";
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.sort((a, b) => b - a).slice(0, 5).forEach(function (score) {
    var li = document.createElement("li");
    li.textContent = "Score: " + score;
    elements.highScoresList.appendChild(li);
  });
}

function saveScore(score) {
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.push(score);
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

function beginQuiz() {
  quizStarted = false;
  elements.startButton.style.display = "block";
  elements.nextButton.style.display = elements.restartButton.style.display = "none";
  elements.endingScreen.style.display = "none";
  elements.questions.textContent = "Press 'Start' to begin the quiz.";
  elements.answerButton.innerHTML = "";
  elements.message.textContent = "";
  elements.highScoresList.innerHTML = "";
}

beginQuiz();
