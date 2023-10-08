const questionsElement = document.getElementById("questions");
const answerButton = document.getElementById("answers");
const nextButton = document.getElementById("next-button");
const finishButton = document.getElementById("finish-button");
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

  // Remove duplicate scores
  const uniqueHighScores = [...new Set(highScores)];

  const top5Scores = uniqueHighScores.slice(0, 5);
  for (let i = 0; i < top5Scores.length; i++) {
    const li = document.createElement("li");
    li.textContent = `Score: ${top5Scores[i]}`;
    highScoresList.appendChild(li);
  }
}

function showEndingScreen() {
  endingScreen.style.display = "block";
  questionsElement.style.display = "none";
  answerButton.style.display = "none";
  restartButton.style.display = "block";
  finishButton.style.display = "none"; // Hide the Finish button
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
    nextButton.style.display = "none";

    if (currentQ === questions.length - 1) {
      // If it's the last question, show the Finish button only when an answer is selected
      finishButton.style.display = answered ? "block" : "none";
    }
  }
});

finishButton.addEventListener("click", () => {
  if (currentQ === questions.length - 1 && answered) {
    // Proceed to the end screen when Finish button is clicked after answering the last question
    saveScore(score); // Save the score
    showEndingScreen();
  }
});

restartButton.addEventListener("click", restartQuiz);

function restartQuiz() {
  // Refresh the page to restart the quiz
  window.location.reload();
}

function updateScoreDisplay(isCorrect) {
  messageElement.textContent = isCorrect ? "Correct!" : "Incorrect!";
  scoreElement.textContent = "Score: " + score;
}

function checkAnswer(isCorrect) {
  if (!answered) {
    const buttons = answerButton.querySelectorAll(".btn");

    buttons.forEach((button) => {
      button.disabled = true;
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

    if (currentQ < questions.length - 1) {
      nextButton.style.display = "block";
      finishButton.style.display = "none"; // Hide the Finish button
    } else {
      // If it's the last question, show the Finish button only when an answer is selected
      finishButton.style.display = answered ? "block" : "none";
      nextButton.style.display = "none"; // Hide the Next button
    }
  }
}

function startQuiz() {
  currentQ = 0;
  score = 0;
  quizStarted = true;
  startButton.style.display = "none";
  restartButton.style.display = "none";
  scoreElement.textContent = "Score: 0";
  endingScreen.style.display = "none";
}

function beginQuiz() {
  quizStarted = false;
  questionsElement.textContent = "Press 'Start' to begin the quiz.";
  answerButton.innerHTML = "";
  messageElement.textContent = "";
  currentQ = 0;
  score = 0;
  const buttons = answerButton.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.style.backgroundColor = "";
    button.disabled = false;
  });
  nextButton.style.display = "none";
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

    // Reset the background color of the button to its default state
    button.style.backgroundColor = "";

    // Add a data-correct attribute to the correct answer button
    if (answer.correct) {
      button.setAttribute("data-correct", "true");
    }
  });

  if (currentQ === questions.length - 1) {
    // If it's the last question, show the finish button only if an answer is selected
    finishButton.style.display = answered ? "block" : "none";
  } else {
    finishButton.style.display = "none";
  }
}

beginQuiz();