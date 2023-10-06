const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answers");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const startButton = document.getElementById("start-button");
var answer1 = "An array is a container object that holds a fixed number of values of a single type"
var answer2 = "A function that is called when an event occurs"
var answer3 = "A function is a block of code that can be used repeatedly"
var answer4 = "A variable is a value that can be changed"
var answer5 = "Stringify is a function that returns a string representation of an object"
var answer6 = "A programming construct that allows you to store and reuse a block of code in JavaScript"



var questions = [
    {   
   question: "What is an array?",
   answers: [
    {text: answer1, correct: true},
    {text: "An array is a function that is called when an event occurs.", correct: false},
    {text: "An array is a block of code that can be used repeatedly.", correct: false},
    {text: "An array is a value that can be changed.", correct: false},
   ]
   
},   
{   
    question: "What is an event listener?",
    answers: [
     {text: "A function that listens for errors in JS code.", correct: false},
     {text: "A method used to find data from an external API", correct: false},
     {text: answer2, correct: true},
     {text: "A string of values that can be changed.", correct: false},
    ]
    
 }, 
 {   
    question: "What is a function in JS?",
    answers: [
     {text: " A data type for storing text in JavaScript.", correct: false},
     {text: "A method used to find data from an external API.", correct: false},
     {text: "A method used for sorting arrays.", correct: false},
     {text: answer3, correct: true},
    ]
    
 },

 {   
    question: "What is a variable in JS?",
    answers: [
     {text: "A construct used to manipulate classes in JavaScript.", correct: false},
     {text: answer4, correct: true},
     {text: "A function for performing calculations on numerical data.", correct: false},
     {text: "A string of values that cannot be changed.", correct: false},
    ]
    
 }, 
 {   
    question: "What does the stringify function do?",
    answers: [
     {text: "Converts a JSON string into a JavaScript object.", correct: false},
     {text: "Converts a number to a string data type.", correct: false},
     {text: answer5, correct: true},
     {text: "Creates a new function in JavaScript.", correct: false},
    ]
    
 }, 
 {   
    question: "What is an event in JS?",
    answers: [
     {text: answer6, correct: true},
     {text: "An event is a type of variable used to store data in JavaScript.", correct: false},
     {text: "A type of function that calls a variable.", correct: false},
     {text: "A method in JavaScript used for sorting arrays.", correct: false},
    ]
    
 } 
  
];

let currentQuestion = 0;
let score = 0;
let time = 15;

startButton.addEventListener("click", beginQuiz); 
nextButton.addEventListener("click", showQuestion); 
restartButton.addEventListener("click", beginQuiz);

function beginQuiz() {
    currentQ = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    

}
function startTimer() {
}

function showQuestion() {
    currentQ = questions[currentQ];
    questionNo = currentQ + 1;
    questionElement.innerText = questionNo + ". " + currentQ.question;
    answerButton.innerHTML = "";
    
    currentQ.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => checkAnswer(answer.correct));
        answerButton.appendChild(button);
        
    });
}

beginQuiz();


