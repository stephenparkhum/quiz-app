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

function startPage(num) {
  $(".question p:first").text(
    `Test your music knowledge with this interactive quiz!`
  );
  newQuiz(num);
}

/* 
newQuiz() will show a dialog that asks if the user wants to start a new quiz
Once clicked, it'll show the question + answer. 
Ultimately this will 'hide; the new quiz button, as well as 'show' the questions
*/

function pgLayout() {
  $("main").append(
    '<div class="question"><p></p><p class="question-count"></p></div>'
  );
  $("main").append(`<div class="new-quiz">
  <button>Start Quiz</button>
</div>`);

  nextBtn();
}

function newQuiz(num) {
  $(".new-quiz button").on("click", () => {
    question(num);
    formInit();
    optionsInit(num, questions);
    $(".new-quiz button").remove();
  });
}

/* 
optionForm() will display the set of options the user has to pick from
*/
function formInit() {
  let initialForm = `<div class="options">
  <form action="" class="option-form">
  </form>
</div>
<button class="next-btn">Next</button></a>`;
  $("main").append(initialForm);
}

function optionsInit(num) {
  let optionList = ["option_1", "option_2", "option_3", "option_4"];
  num = questionNum;
  for (let i = 0; i < 4; i++) {
  let currentOption = optionList[i];
  $('form').append('<input />');
  $('input').attr('type', 'radio');
  $('input').attr('name', 'option');
  $('input').attr('id', `${'option' + i+1}`);
  $('input').attr('value', `${questions[num].options[i].option}`);
  $('form').append(`<span>${$('input').attr('value')}</span>`);
  }
  
};

function newOptions(num) {
    $('form').find('input').attr('id', `${'option' + num+1}`);
    $('input').attr('value', `${questions[0].options[0].option_1}`);
    $('form').append(`<span>${$('input').attr('value')}</span>`);
}

// function formOptions(num) {
//   
//   let optionCount = 0;
//   num = questionNum;
//   let qNum = 0;

//   // questions[0].options[0][`${optionList[0]}`]

//   for (let i = 0; i < questions[0].options.length; i++) {
//     $('form').html(inputOptions(i, optionList, optionCount));
//     console.log(questions[num].options[num][`${optionList[0]}`]);
//   }
    
  // let formHtml = `
  //   <input
  //     type="radio"
  //     name="option"
  //     id="option1"
  //     value="${questions[num].options[qNum].option_1}"
  //   />${questions[num].options[qNum].option_1}<br />
  //   <input type="radio" name="option" id="option2" value="${questions[num].options[qNum + 1].option_2}" />${questions[num].options[qNum + 1].option_2}<br />
  //   <input type="radio" name="option" id="option3" value="${questions[num].options[qNum + 2].option_3}" />${questions[num].options[qNum + 2].option_3}<br />
  //   <input
  //     type="radio"
  //     name="option"
  //     id="option4"
  //     value="${questions[num].options[qNum + 3].option_4}"/>${questions[num].options[qNum + 3].option_4}<br />
  //   <button class="submit-button">Submit</button>`;
  // $(".option-form").html(formHtml);

/* 
question() will display each question, as well as the options
Within each question there will be a display of which question (out of 10) it is.
*/
function question(num) {
  $(".question p:first").text(`${questions[num].question}`);
  questionCount(num);
  $("form").html(optionsInit());
}

/* 
questionCount() will display which question (out of 10) it is.
*/
function questionCount(int) {
  $(".question-count").text(`Question ${int + 1} of 10`);
}

// BUTTONS

function nextBtn(num) {
  num = questionNum;
  $(document).on("click", ".next-btn", () => {
    num += 1;
    question(num);
    $('.option-form').append(newOptions(num));
  });
}

function submitBtn() {
  $(".submit-button").on("click", function(event) {
    event.preventDefault();
  });
}

// /*
// questionOptions() displays the answer 'form/options' for each question - as well as the 'submit' button
// */
// function questionOptions() {
//   // console.log(questions[0].options[0].option_1);
// }

/* 
results() displays the completed scores of how many questions were right and how many were wrong.
This will be stored in an array, and display in the question box after the quiz has been completed.
-- Storing the points will be counted as 'correct' or 'incorrect'
*/
function results(result) {
  return userScore.push(result);
}

/* 
runQuiz() will include all of the other needed functions to run
*/
function runQuiz() {
  pgLayout();
  startPage(questionNum);
  results();
}

runQuiz();
