//Title, instructions, and start button visible on load
//start button reveals question and begins timer
//user can only select 1 answer, confirm to submit or immediate on selection
//after each question, pause and show answer, reveal next question, reset timer
//if time runs out, add to unanswered counter
//if incorrect answer, add to incorrect counter
//if correct, add to correct counter

var correct;
var incorrect;
var unanswered;
var qNum = 0;

var questions = [
  {
    q: "What is my question?",
    a1: "answer1",
    a2: "answer2",
    a3: "answer3",
    a4: "answer4"
  },
  {
    q: "What is my next question?",
    a1: "answer1b",
    a2: "answer2b",
    a3: "answer3b",
    a4: "answer4b"
  }
];

//timer code
var time = 30;
var intervalId;

function run() {
  intervalId = setInterval(decrement, 1000);
}

function stop() {
  clearInterval(intervalId);
}

function decrement() {
  time--;
  $("#clock").html("<h1>" + time + "</h1>");
  if (time === 0) {
    $("#clock").html("<h1>0</h1>");
    stop();
    unanswered++;
    showCorrect();
  }
};

//function to create answer radio buttons
function addAnswers(a) {
  var answer = $("<form>")
  .append("<div class='radio'>")
  .append("<label>")
  .append("<input type='radio' name='optradio'>" + " " + a);
  $("#startQA").append(answer);
}

//function to clear panel and add next question
function nextQuestion() {
  time = 30;
  $("#startQA").empty();
  $("#startQA").append(questions[qNum].q);
  addAnswers(questions[qNum].a1);
  addAnswers(questions[qNum].a2);
  addAnswers(questions[qNum].a3);
  addAnswers(questions[qNum].a4);
  //begin timer
  run();
  //iterate question number
  qNum++;
}

function showCorrect() {
  time = 10;
  $("#startQA").empty();
  $("#startQA").append("Here is the correct answer!!");
  nextQuestion();
}

$("#start-game").on("click", function() {
  nextQuestion();
});