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

// elements by ID

var ul = document.getElementById('ul')
var nextButton = document.getElementById('btnNext');
var quizbox = document.getElementById('questionBox')
var opt1 = document.getElementById('opt1')
var opt2 = document.getElementById('opt2')
var opt3 = document.getElementById('opt3')
var opt4 = document.getElementById('opt4')
var startButton = document.querySelector("#start-button");
var timerElement = document.querySelector(".timer-count");
var restartButton = document.querySelector("#reset-button");
var timer;
var timerCount;
var isWin = false;

// array of questions/answers
var app = {
  questions: [
  {
    question: "What does HTML stand for?",
     options: ["cascading style sheet", "hypertext markup language", "hypocratic marker language", "none of the above"],
     answer: "2"
  },
  {
    question: "String values must be enclosed within _____ when being assinged to variables",
     options: ["commas", "curly brackets", "paranthasis", "quotes"],
     answer: "4"
  },
  {
    question: "Arrays in JavaScript can be used to store",
      options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
      answer: "4"
  },
  {
    question: "which is NOT a data type?",
      options: ["strings", "booleans", "numbers", "alerts"],
      answer: "4"
  },
  {
    question: "Which of the following methods is used to access HTML elements using Javascript",
      options: ["getElementbyId()", "getElementsByClassName()", "both 1 & 2", "none of the above"],
      answer: "3"
  },
],

index:0,
 //Load a question using the index
 load:function(){
  if(this.index<=this.questions.length-1){
    quizbox.innerHTML=this.index+1 + ". " +this.questions[this.index].question;
    opt1.innerHTML=this.questions[this.index].options[0];
    opt2.innerHTML=this.questions[this.index].options[1];
    opt3.innerHTML=this.questions[this.index].options[2];
    opt4.innerHTML=this.questions[this.index].options[3];
  }
   else {
 //Show the end screen
    quizbox.innerHTML="Quiz Completed!";
    ul.style.display="none";
    nextButton.style.display="none";
  }
 },
 next: function(){
  this.index++;
  this.load();
 },
//Check if answer is correct or not
 check: function(ele){
  var id=ele.id.split('');
  if(id[id.length-1]==this.questions[this.index].answer){
    this.score++;
    ele.className="correct";
    this.scoreCard();
  }
  else{
   ele.className="wrong";
  }
},
//disable options once user selects on option
preventClick:function(){
  for(let i=0; i<ul.children.length; i++){
  ul.children[i].style.pointerEvents="none";
  }
},
allowClick:function(){
  for(let i=0; i<ul.children.length; i++){
    ul.children[i].style.pointerEvents="auto";
    ul.children[i].className=''
  }
},
  score:0,
  scoreCard:function(){
  scoreCard.innerHTML=this.questions.length + "/" + this.score;
}
}

window.load=app.load();

function button(ele){
    app.check(ele);
    app.preventClick();
}

function next(){
    app.next();
    app.allowClick();
}

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", function() {
  document.querySelector("#main-quiz") .setAttribute("class", "show");
  document.querySelector("#start-page") .setAttribute("class", "hide");
});

function resetQuiz() {
  scoreCounter = 0;
  setScore();
}

restartButton.addEventListener("click", restartQuiz);

// The startQuiz function is called when the start button is clicked
function startQuiz() {
  isWin = false;
  timerCount = 10;
  // Prevents start button from being clicked when round is in progress
  //startButton.disabled = true;
  startTimer()
}


timer = setInterval(function() {
  timerCount--;
  timerElement.textContent = timerCount;
  if (timerCount >= 0) {
    // Tests if win condition is met
    if (isWin && timerCount > 0) {
      // Clears interval and stops timer
      clearInterval(timer);
      winGame();
    }
  }
  // Tests if time has run out
  if (timerCount === 0) {
    // Clears interval
    clearInterval(timer);
    loseGame();
  }
}, 1000);
