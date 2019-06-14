"use strict";

// :MUSIC QUERY: NOTES
/*

******* USER STORES ******* 
1. User can start a new quiz 
2. Question is displayed, with options
3. User Submits answer
4. If answer correct/incorrect, the correct answer will display green, and the incorrect will display red
5. New Quiz button, which will restart the quiz
*/


// USERS SCORES
let userScore = [];
let questionNum = userScore.length;

function startPage() {
  $("main").append(
    '<div class="question"></div>'
  );
  $('.question').append('<p class="question-text"></p><p class="question-count"></p>');
  $("main").append(`<div class="new-quiz">
  <button>Start Quiz</button>
</div>`);
  $(".question p:first").text(
    `Test your music knowledge with this interactive quiz!`
  );
}

function quizInit() {
  startPage();
}

/* 
newQuiz() will show a dialog that asks if the user wants to start a new quiz
Once clicked, it'll show the question + answer. 
Ultimately this will 'hide; the new quiz button, as well as 'show' the questions
*/

function newQuiz(num) {
  $(document).on("click", ".new-quiz", () => {
    question(num);
    formInit(num);
    $(".new-quiz button").remove();
  });
}

/* 
question() will display each question, as well as the options
Within each question there will be a display of which question (out of 10) it is.
*/
function question(num) {
  $("p[class='question-text']").text(`${questions[num].question}`);
  questionCount(num);
  $('main').append('<div id="myBar"></div>');
  move();
  console.log('question() is running');
}

/* 
questionCount() will display which question (out of 10) it is.
*/
function questionCount(num) {
  $(".question-count").text(`Question ${num + 1} of 10`);
}

/* 
optionForm() will display the set of options the user has to pick from
*/
function formInit(num) {
  let initialForm = `<div class="options">
  <form action="" id="option-form">
  </form>
</div>
<button class="next-btn">Next</button>`;
  $("main").append(initialForm);
  $('.next-btn').hide();
  newOptions(num);
}

function newOptions(num) {
  let labelsAndInputs;
    for (let i = 0; i < 4; i++) {
      labelsAndInputs = `<input type="button" name="option" id="${i + 1}" value="${questions[num].options[i].option}" class="option-empty" required/>`;
      $('form').append(labelsAndInputs);
  }
  // $('form').append(`<button class="submit-button">Submit</button>`); 
}

function optionValidate(num) {
  $(document).on('click', 'input', function(event) {
    let selection = event.target.getAttribute('value');
    if (selection === questions[num].answer && $('#myBar').attr('width') != 0) {
      console.log('this is correct');
      $(event.target).removeClass('option-empty');
      $(event.target).addClass('correct');
      $('#myBar').remove();
      correctScore();
    } else if (selection != questions[num].answer){
      $('#myBar').remove();
      wrongScore();
      $(event.target).removeClass('option-empty');
      $(event.target).addClass('incorrect');
      console.log('this is wrong');
    }
    $('.next-btn').show();
  });
}

function correctScore(num) {
  userScore.push(1);
}
function wrongScore(num) {
  userScore.push(0);
}

function removeOptions() {
  let optionCount = 4;
  for (let i = 0; i < optionCount; i++) {
    $('form').find('input').remove();
    $('form').find('label').remove();
    $('form').find(".submit-button").remove();
  }
}

function questionIncrement(num) {
      question(num);
      removeOptions(num);
      newOptions(num);
      console.log('question inc. is working');
}


// STATUS / TIMER BAR
function move() {
  var elem = document.getElementById("myBar"); 
  var width = 100;
  var id = setInterval(frame, 100);
  function frame() {
    if (width <= 0) {
      clearInterval(id);
    } else {
      width--; 
      elem.style.width = width + '%'; 
    }
  }
}

function addTimer() {
  $('main').append('<div id="myBar"></div>');
}

// BUTTONS
const buttonsMaster = (num) => {
  nextBtn(num);
  // submitBtn();
  tryAgain(num);
};

function nextBtn(num) { 
  $(document).on("click", ".next-btn", () => {
    if (num != 10) {
      questionIncrement(num);
      num++;
      $('.next-btn').hide();
      $('#myBar').remove();
      $('main').append('<div id="myBar"></div>');
      move();
      console.log(num);
    } else {
      $('form .next-btn').removeClass('next-btn');
      $('button').text('Complete Quiz').addClass('complete-quiz');
      num = 0;
      resultsPage(userScore);
    }
  });
}

// function submitBtn() {
//   $(document).on("click", ".submit-button", function(event) {
//     event.preventDefault();
//     console.log($('form input').attr('value'));
//     console.log('submitBtn() is running');
//   });
  
// }


function tryAgain(num) {
  $(document).on('click', '.js-try-again', () => {
    $('.question').find('h4').remove();
    num = 0;
    resetQuiz(num);
  });
}

function resetQuiz(num) {
    newQuiz(num);
    optionValidate(num);
}


// FORM VALIDATION




// RESULTS
/* 
results() displays the completed scores of how many questions were right and how many were wrong.
This will be stored in an array, and display in the question box after the quiz has been completed.
-- Storing the points will be counted as 'correct' or 'incorrect'
*/

function calcResults(results) {
  let userRightCount = 0;
  for (let i = 0; i < results.length; i++) {
    if (results[i] === 1) {
      userRightCount++;
    }
  }
  return userRightCount;
}

function resultsPage(results) {
  $(document).on('click', '.complete-quiz', () => {
    let userResults = calcResults(results);
    
    if (userResults <= 9 && userResults >=6 ) {
      $('.question p:first').text('Congratulations!');
      $('.question').append(`<h4>Your score is <span>${calcResults(results)}</span> out of 10! Great job!</h4>`);
    } else if (userResults == 10) {
      $('.question p:first').text('Magnificent! You have finished the quiz!');
      $('.question').append(`<h4>You got a perfect score! <span>${calcResults(results)}</span> out of 10!</h4>`);
    } else {
      $('.question p:first').text('Bummer! Better luck next time!');
      $('.question').append(`<h4>Your score is <span>${calcResults(results)}</span> out of 10. Better luck next time!</h4>`);
    }
    $('.options').remove();
    $('.question-count').remove();
    $('.next-btn').remove();
    $('.new-quiz').append('<button class="js-try-again">Try Again</button>');
  });
}



// RUN APP
/* 
runQuiz() will include all of the other needed functions to run
*/
function runQuiz() {
  quizInit();
  resetQuiz(questionNum);
  buttonsMaster(questionNum);
}

runQuiz(questionNum);
