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
    formInit(num);
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
  newOptions(num);
}

function newOptions(num) {
  let labelsAndInputs;
    for (let i = 0; i < 4; i++) {
      labelsAndInputs = `<label><input type="radio" name="option" id="${questions[num].q_id}" value="${questions[num].options[i].option}"/>${questions[num].options[i].option}</label>`;
      $('form').append(labelsAndInputs);
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

function questionIncrement(num) {
      question(num);
      removeOptions(num);
      newOptions(num);
      console.log('question inc. is working');
}

// BUTTONS

function nextBtn() { 
  let questionState = 1;
  $(document).on("click", ".next-btn", () => {
    if (questionState != 9) {
      questionIncrement(questionState);
      console.log(questionState);
    } else {
      questionIncrement(questionState);
      $('.next-btn').text('Complete Quiz').addClass('complete-quiz ');
      resultsPage(userScore);

    }
    questionState++;
    
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
    let userResults = calcResults(results);
    $('.question p:first').text('Congratulations! You have finished the quiz!');
    if (userResults <= 9 && userResults >=6 ) {
      $('.question').append(`<h4>Your score is <span>${calcResults(results)}</span> out of 10! Great job!</h4>`);
    } else if (userResults == 10) {
      $('.question').append(`<h4>You got a perfect score! <span>${calcResults(results)}</span> out of 10! Magnificent!</h4>`);
    } else {
      $('.question').append(`<h4>Your score is <span>${calcResults(results)}</span> out of 10. Better luck next time!</h4>`);
    }
    
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
