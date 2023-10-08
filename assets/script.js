const questionsElement = document.getElementById("questions");
const answerButton = document.getElementById("answers");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const startButton = document.getElementById("start-button");
const scoreElement = document.getElementById("score");
const messageElement = document.getElementById("message");
const endingScreen = document.getElementById("ending-screen");
const highScoresList = document.getElementById("high-scores");

var answer1 = "An array is a container object that holds a fixed number of values of a single type";
var answer2 = "A function that is called when an event occurs";
var answer3 = "A function is a block of code that can be used repeatedly";
var answer4 = "A variable is a value that can be changed";
var answer5 = "Stringify is a function that returns a string representation of an object";
var answer6 = "A programming construct that allows you to store and reuse a block of code in JavaScript";

var questions = [
  {
    question: "What is an array?",
    answers: [
      {
        text: answer1,
        correct: true,
      },
      {
        text: "An array is a function that is called when an event occurs.",
        correct: false,
      },
      {
        text: "An array is a block of code that can be used repeatedly.",
        correct: false,
      },
      {
        text: "An array is a value that can be changed.",
        correct: false,
      },
    ],
  },
  {
    question: "What is an event listener?",
    answers: [
      {
        text: "A function that listens for errors in JS code.",
        correct: false,
      },
      {
        text: "A method used to find data from an external API",
        correct: false,
      },
      {
        text: answer2,
        correct: true,
      },
      {
        text: "A string of values that can be changed.",
        correct: false,
      },
    ],
  },
  {
    question: "What is a function in JS?",
    answers: [
      {
        text: " A data type for storing text in JavaScript.",
        correct: false,
      },
      {
        text: "A method used to find data from an external API.",
        correct: false,
      },
      {
        text: "A method used for sorting arrays.",
        correct: false,
      },
      {
        text: answer3,
        correct: true,
      },
    ],
  },
  {
    question: "What is a variable in JS?",
    answers: [
      {
        text: "A construct used to manipulate classes in JavaScript.",
        correct: false,
      },
      {
        text: answer4,
        correct: true,
      },
      {
        text: "A function for performing calculations on numerical data.",
        correct: false,
      },
      {
        text: "A string of values that cannot be changed.",
        correct: false,
      },
    ],
  },
  {
    question: "What does the stringify function do?",
    answers: [
      {
        text: "Converts a JSON string into a JavaScript object.",
        correct: false,
      },
      {
        text: "Converts a number to a string data type.",
        correct: false,
      },
      {
        text: answer5,
        correct: true,
      },
      {
        text: "Creates a new function in JavaScript.",
        correct: false,
      },
    ],
  },
  {
    question: "What is an event in JS?",
    answers: [
      {
        text: answer6,
        correct: true,
      },
      {
        text: "An event is a type of variable used to store data in JavaScript.",
        correct: false,
      },
      {
        text: "A type of function that calls a variable.",
        correct: false,
      },
      {
        text: "A method in JavaScript used for sorting arrays.",
        correct: false,
      },
    ],
  },
];

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

function updateHighScores() {
  highScoresList.innerHTML = "";
  highScores.sort((a, b) => b - a);
  for (let i = 0; i < Math.min(5, highScores.length); i++) {
    const li = document.createElement("li");
    li.textContent = `Score: ${highScores[i]}`;
    highScoresList.appendChild(li);
  }
}

function showEndingScreen() {
  endingScreen.style.display = "block";
  questionsElement.style.display = "none";
  answerButton.style.display = "none";
  restartButton.style.display = "block"; // Show restart button
  updateHighScores();
}

function saveScore(score) {
  highScores.push(score);
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

let currentQ = 0;
let score = 0;
let quizStarted = false;
let answered = false;

startButton.addEventListener("click", () => {
  startQuiz();
  showQuestion();
});

nextButton.addEventListener("click", () => {
  if (answered) {
    currentQ++;
    answered = false;
    showQuestion();
    nextButton.style.display = "none"; // Hide the "Next" button after clicking it
  }
});

restartButton.addEventListener("click", restartQuiz);

function restartQuiz() {
  beginQuiz();
  startQuiz(); // Added to immediately start the quiz after restart
}

function updateScoreDisplay(isCorrect) {
  messageElement.textContent = isCorrect ? "Correct!" : "Incorrect!";
  scoreElement.textContent = "Score: " + score;
}

function checkAnswer(isCorrect) {
  if (!answered) {
    const buttons = answerButton.querySelectorAll(".btn");

    buttons.forEach((button) => {
      button.disabled = true; // Disable all buttons after answering
      if (button.getAttribute("data-correct") === "true") {
        button.style.backgroundColor = "green";
      } else {
        button.style.backgroundColor = "red";
      }
    });

    if (isCorrect) {
      score += 10;
    }

    answered = true;
    updateScoreDisplay(isCorrect);

    if (currentQ >= questions.length - 1) {
      // If it's the last question, show the ending screen
      showEndingScreen();
    } else {
      // Show the "Next" button to proceed to the next question
      nextButton.style.display = "block";
    }
  }
}

function startQuiz() {
  currentQ = 0;
  score = 0;
  quizStarted = true;
  startButton.style.display = "none";
  nextButton.style.display = "none";
  restartButton.style.display = "none";
  scoreElement.textContent = "Score: 0";
  endingScreen.style.display = "none"; // Hide the ending screen
}

function beginQuiz() {
  quizStarted = false;
  startButton.style.display = "block";
  nextButton.style.display = "none";
  restartButton.style.display = "none";
  endingScreen.style.display = "none"; // Hide the ending screen
  questionsElement.textContent = "Press 'Start' to begin the quiz.";
  answerButton.innerHTML = "";
  messageElement.textContent = "";

  // Clear the previous high scores
  highScores.length = 0;
}

function showQuestion() {
  if (!quizStarted) {
    beginQuiz();
    return;
  }

  const currentQuestion = questions[currentQ];
  questionsElement.textContent = currentQuestion.question;
  answerButton.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => checkAnswer(answer.correct));
    answerButton.appendChild(button);

    // Add a data-correct attribute to the correct answer button
    if (answer.correct) {
      button.setAttribute("data-correct", "true");
    }
  });
}

beginQuiz();