//Title, instructions, and start button visible on load
//start button reveals question and begins timer
//user can only select 1 answer, confirm to submit or immediate on selection
//after each question, pause and show answer, reveal next question, reset timer
//if time runs out, add to unanswered counter
//if incorrect answer, add to incorrect counter
//if correct, add to correct counter

var correct = 0;
var incorrect = 0;
var unanswered = 0;
var qNum = 0;
var state;

var questions = [
  {
    q: "Why does this look like crap?",
    a1: "Because a bootcamp while working OT was a dumb idea",
    a2: "Because I should have chosen the easier assignment",
    a3: "Because I wear too many hats",
    a4: "All of the above"
  },
  {
    q: "Why can't you submit an answer?",
    a1: "Because I spent all my time making sure the timers worked",
    a2: "Because I couldn't figure out how to tag them in-/correct",
    a3: "42",
    a4: "I'm all out of clever non-answers"
  }
];
var answers = [
  "Trick question because you can't submit a choice anyway!!",
  "Seriously, I should have just done the easier one, and I would have been golden."
]

//timer code
var time = 20;
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
    if (state === "question") {
      unanswered++;
      showCorrect();
    } else {
      nextQuestion();
    }
  }
};

//function to create answer radio buttons
function addAnswers(a) {
  var answer = $("<div class='radio'>")
  .append("<label>")
  .append("<input type='radio' name='optradio'>" + " " + a);
  $("#choices").append(answer);
}

//function to clear panel and add next question
function nextQuestion() {
  if (qNum < questions.length) {
    state= "question";
    time = 20;
    $("#startQA").empty();
    $("#startQA").append("<h2>" + questions[qNum].q + "</h2>");
    $("#startQA").append("<form id='choices'>");
    addAnswers(questions[qNum].a1);
    addAnswers(questions[qNum].a2);
    addAnswers(questions[qNum].a3);
    addAnswers(questions[qNum].a4);
    //begin timer
    run();
  } else {
    finalScore();
  }
}

function showCorrect() {
  state = "answer";
  time = 5;
  $("#startQA").empty();
  $("#startQA").append(answers[qNum]);
  run();
  qNum++;
}

function finalScore() {
  $("#startQA").append("<p>Correct: " + correct + "</p>");
  $("#startQA").append("<p>Incorrect: " + incorrect + "</p>");
  $("#startQA").append("<p>Unanswered: " + unanswered + "</p>");
}

$("#start-game").on("click", function() {
  nextQuestion();
});