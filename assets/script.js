//user clicks Start Quiz Button
  // then timer starts 
  // User is presented with first question
    //if correct alert: Correct!
    //10 points added to score
    //if incorrect alert: Wrong!
    //10 seconds subtracted from time
  // User is presented with second question... 
  // When all 5 questions are answered OR the timer reaches zero
    //then game is over
 //User can then enter & save intials and score.
 //optional user can "clear" scores

 // Define the quiz questions

 let currentQuestionIndex = 0;
 let score = 0;

 const quizQuestions = [
 {
 question: "What does HTML stand for?",
 options: ["cascading style sheet", "hypertext markup language", "hypocratic marker language", "none of the above"],
 answer: "hypertext markup language"
 },
 {
 question: "String values must be enclosed within _____ when being assinged to variables",
 options: ["commas", "curly brackets", "paranthasis", "quotes"],
 answer: "quotes"
 },
 {
 question: "Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
 options: ["last()", "put()", "push()", "none of the above"],
 answer: "push()"
 },
 {
 question: "Arrays in JavaScript can be used to store;",
 options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
 answer: "all of the above"
 },
 {
 question: "Which of the following is not a JavaScript data type?",
 options: ["undefined", "number", "string", "float"],
 answer: "float"
 }
 ];
  
// Define a function to update the timer element and change its color to red when time is running out
function updateTimer() {
// Get the timer element
 const timerEl = document.getElementById("timer");
// Get the remaining time in seconds
 let timeLeft = parseInt(timerEl.textContent);
// Decrement the time left by 1 second
 timeLeft--;
// Update the timer element with the new time left
 timerEl.textContent = timeLeft;
 // If time left is less than 20 seconds, change the color of the timer element to red
 if (timeLeft < 20) {
  timerEl.style.color = "red";
 }

 // If time is up, end the quiz

 if (timeLeft <= 0) {
  clearInterval(timerInterval);
  timerEl.textContent = "TIME'S UP!";
  document.getElementById("questionBox").textContent = "Time's up!";
  document.querySelector(".quiz-container").classList.replace("quiz-container", "quiz-container-hidden");
  document.querySelector(".endQuiz-hidden").classList.replace("endQuiz-hidden", "endQuiz");
 }
}
  
// Start the timer checker

let timerInterval = setInterval(updateTimer, 1000);
  
// Set the timer and score variables
let timeLeft = 60;
  
// Define the functions for starting, displaying, and progressing through the quiz

function startQuiz() {
  localStorage.clear()
  document.getElementById("start-button").classList.add("hide");
  document.getElementById("rules").style.display = "none";
  document.querySelector('.quiz-container-hidden').classList.replace('quiz-container-hidden', 'quiz-container');

  // Change its class to "quiz-container"
  
  next();
  setTimer();
}
  
function displayQuestion(currentQuestionIndex) {
  const currentQuestion = quizQuestions[currentQuestionIndex];
    document.getElementById("questionBox").textContent = currentQuestion.question;
    for (let i = 0; i < currentQuestion.options.length; i++) {
      document.getElementById("opt" + (i + 1)).textContent = currentQuestion.options[i];
    }
    document.getElementById("btn-next").classList.add("hide");
}
  
function next() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
 if (currentQuestionIndex === quizQuestions.length-1) {
  document.querySelector(".quiz-container").classList.add("quiz-container-hidden");
  document.querySelector(".endquiz-hidden").classList.add("endQuiz");
  document.querySelector(".endQuiz-hidden").classList.remove("endQuiz-hidden");
  consult.log("endQuiz");
  localStorage.setItem("score", score);
 }
 else {
  document.getElementById("options").classList.remove("no-click");
  document.getElementById("quiz-result").classList.add("hide");

  displayQuestion(currentQuestionIndex);

  currentQuestionIndex++;
 }
}

function evaluateSubmission() {
  const selectedOption = document.querySelector("selected");
  // minus one from current question index since it was incrementd by next function
  const currentQuestion = quizQuestions[currentQuestionIndex-1];

  if (selectedOption) {
    const answer = selectedOption.textContent;
    document.getElementById("quiz-result").classList.remove("hide");
    if (answer === currentQuestion.answer) {
      score++;
      const quizResult = document.getElementById("quiz-result");
      quizResult.textContent = "Correct!";

      document.getElementById("quiz-result").classList.add("theme-success");
      }
    else {
      timeLeft -= 10;
      const quizResult = document.getElementById("quiz-result");
      quizResult.textContent = "Incorrect!";

      document.getElementById("quiz-result").classList.add("theme-failure");
    }

    document.getElementById("btn-next").classList.remove("hide");
    document.getElementById("btn-submit").classList.add("hide");
    document.getElementById("options").classList.add("no-click");
  }
}
  
function displayFinalScore() {
  let score = localStorage.getItem("score");
  const intials = document.getElementById("initials").value;
  document.querySelector(".endQuiz").classList.replace("endQuiz", "hide");
  document.querySelector("final-hidden").classList.replace("final-hidden", "endQuiz");

  const finalScoreSpan = document.getElementById("finalScore");
  finalScoreSpan.textContent = score*10;

  const userInitials = document.getElementById("userInitials");
  userInitials.textContent = initials;
}

function setTimer() {
  timeLeft--;
  document.getElementById("timer").textContent = timeLeft;  
  timerInterval = setInterval(function() {
  
 if (timeLeft <= 0) {
  document.getElementById("btn-next").disabled = true;
  }}, 1000);
}



// add event listener to the answer options and start button
const answerOptions = document.querySelectorAll(".options li");
for (let i = 0; i < answerOptions.length; i++) {
  answerOptions[i].addEventListener("click", function() {
    const selected = document.querySelector("selected");
    if (selected) selected.classList.remove("selected");
    this.classList.add("selected");
    document.getElementById("btn-next").classList.remove("hide");
  });
}

function button(elem) {
  const previouslySelected = document.querySelector(".selected");
  if (previouslySelected) {
    previouslySelected.classList.remove("selected");
  }
  elem.classList.add("selected");

  const nextButton = document.getElementById("btn-next");
  nextButton.addEventListener("click", () => {
    elem.classList.remove("selected");
  });
}

document.getElementById("start-button").addEventListener("click", startQuiz);