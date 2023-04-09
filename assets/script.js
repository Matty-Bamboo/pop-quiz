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


var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");

var score;
var initials;
var answer;
var isWin = false;
var timer;
var timerCount;


// The init function is called when the page loads 
function init() {
  getscore();
  getinitals;
}

// array of questions/answers
var questions = [
  {"question" : "What does HTML stand for?" , "options" : ["cascading style sheet","hypertext Markup Language","Hypocratic Marker Language","Non of the above"], "answer" : "hypertext Markup Language"},
  {"question" : "String values must be enclosed within _____ when being assinged to variables" , "options" : ["commas","curly brackets","paranthasis","quotes"], "answer" : "quotes"},
  {"question" : "Arrays in JavaScript can be used to store" , "options" : ["numbers and strings","other arrays","booleans","all of the above"], "answer" : "all of the above"},
  {"question" : "which is NOT a data type?" , "options" : ["strings","booleans","numbers","alerts"], "answer" : "alerts"},
  {"question" : "Which of the following methods is used to access HTML elements using Javascript" , "options" : ["getElementbyId()","getElementsByClassName()","Both 1 & 2","Non of the above"], "answer" : "Both 1 & 2"},
];

// The startGame function is called when the start button is clicked
function startquiz() {
  isWin = false;
  timerCount = 90;
// Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  startTimer()
}
