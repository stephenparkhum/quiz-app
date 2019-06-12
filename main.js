"use strict";

// :MUSIC QUERY: NOTES
/*

******* STEPS ******* 
1. Line out user stories 
2. Create Function Stubs
3. Add questions to 'questions.js'
3. Implement functions


******* USER STORES ******* 
1. User can start a new quiz 
2. Question is displayed, with options
3. User Submits answer
4. If answer correct/incorrect, the correct answer will display green, and the incorrect will display red
5. New Quiz button, which will restart the quiz
*/


// USERS SCORES
let userScore = [];
let questionNum = 0;

function startPage() {
  $("main").append(
    '<div class="question"><p class="question-text"></p><p class="question-count"></p></div>'
  );
  $("main").append(`<div class="new-quiz">
  <button>Start Quiz</button>
</div>`);
  $(".question p:first").text(
    `Test your music knowledge with this interactive quiz!`
  );
}

/* 
newQuiz() will show a dialog that asks if the user wants to start a new quiz
Once clicked, it'll show the question + answer. 
Ultimately this will 'hide; the new quiz button, as well as 'show' the questions
*/

function newQuiz(num) {
  $(document).on("click", ".new-quiz", () => {
    question(num);
    formInit();
    // optionsInit(num);
    $(".new-quiz button").remove();
  });
}

/* 
question() will display each question, as well as the options
Within each question there will be a display of which question (out of 10) it is.
*/
function question(num) {
  $(".question-text").text(`${questions[num].question}`);
  questionCount(num);
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
  <form action="" class="option-form">
  </form>
</div>
<button class="next-btn">Next</button></a>`;
  $("main").append(initialForm);
  num = 0;
  for (let i = 0; i < 4; i++) {
      $('form').append('<input />');
      $('form').addClass('<input />');
      $('input').attr('type', 'radio');
      $('input').attr('name', 'option');
      $('input').attr('id', `${'option_' + i}`);
      $('input').attr('value', `${questions[num].options[i].option}`);
      $('form').append(`<label for=${questions[num].options[i]['option']}>${questions[num].options[i].option}</label>`);
  }
  $('form').append(`<button class="submit-button">Submit</button>`); 
}

// function optionsInit(num) {
//   let optionList = ["option_1", "option_2", "option_3", "option_4"];
//   newOptions(num);
// }

function newOptions(num) {
    for (let i = 0; i < 4; i++) {
      $('form').append('<input />');
      $('input').attr('type', 'radio');
      $('input').attr('name', 'option');
      $('input').attr('id', `${'option_' + i}`);
      $('input').attr('value', `${questions[num].options[i].option}`);
      $('form').append(`<label for=${questions[num].options[i]['option']}>${questions[num].options[i].option}</label>`);
  }
  $('form').append(`<button class="submit-button">Submit</button>`); 
}

function removeOptions() {
  let optionCount = 4;
  for (let i = 0; i < optionCount; i++) {
    $('form').find('input').remove();
    $('form').find('label').remove();
    $('form').find(".submit-button").remove();
  }
  
}

// BUTTONS

function nextBtn() { 
  let questionState = 0;
  $(document).on("click", ".next-btn", () => {
    console.log(questionState);
    console.log(questions[questionState].options[questionState].option);
    if (questionState < 9) {
      questionState++;
      question(questionState);
      removeOptions(questionState);
      newOptions(questionState);

    } else {
      $('.next-btn').text('Complete Quiz').addClass('complete-quiz ');
      resultsPage();

    }
    
  });
}

function submitBtn() {
  $(document).on("click", ".submit-button", function(event) {
    event.preventDefault();
    console.log('submitBtn() is running');
  });
}

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
    $('.question p:first').text('Congratulations! You have finished the quiz!');
    $('.question').append(`<h4>Your score is <span>${calcResults(results)}</span> out of 10! Better luck next time!</h4>`);
    $('.options').remove();
    $('.question-count').remove();
    $('.next-btn').remove();
    $('.new-quiz').html('<button>Try Again</button>');
  });
}



// RUN APP
/* 
runQuiz() will include all of the other needed functions to run
*/
function runQuiz(num) {
  // pgLayout();
  startPage();
  newQuiz(num);
  nextBtn();
  submitBtn();
  // resultsPage();
}

runQuiz(questionNum);
