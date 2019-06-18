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

class Quiz {
  constructor(questions) {
    this.userScore = [];
    this.questionNum = 1;
    this.questions = questionsList;
  }

  // Questions
  question() {
    if (this.questionNum <= 10) {
      $("p[class='question-text']").text(`${this.questions[this.questionNum - 1].question}`);
      this.questionCount();
    }
  }

  questionCount() {
    $(".question-count").text(`Question ${this.questionNum} of 10`);
  }

  questionIncrement() {
    this.question();
    this.removeOptions();
    this.newOptions();
    console.log('question inc. is working');
  }

  // OPTIONS
  formInit() {
    let initialForm = `<div class="options">
    <form action="" id="option-form">
    </form>
  </div>
  <button class="next-btn">Next</button>`;
    $("main").append(initialForm);
    $('.next-btn').hide();
    this.newOptions();
  }

  newOptions() {
    let num = this.questionNum - 1;
    let labelsAndInputs;
    if (num <= 10) {
      for (let i = 0; i < 4; i++) {
        labelsAndInputs = `<input type="button" name="option" id="${i + 1}" value="${this.questions[num].options[i].option}" class="option-empty" required/>`;
        $('form').append(labelsAndInputs);
      }
    }
  }

  removeOptions() {
    let optionCount = 4;
    for (let i = 0; i < optionCount; i++) {
      $('form').find('input').remove();
      $('form').find('label').remove();
      $('form').find(".submit-button").remove();
    }
  }

  testFunc() {
    console.log(this.userScore);
  }

  // BUTTONS
  
  
  correctScore() {
    this.userScore.push(true);
  }
  
  wrongScore() {
    this.userScore.push(false);
  }

}


// RESULTS
/* 
results() displays the completed scores of how many questions were right and how many were wrong.
This will be stored in an array, and display in the question box after the quiz has been completed.
-- Storing the points will be counted as 'correct' or 'incorrect'
*/

// HTML FUNCTIONS
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

function nextBtn(num) {
  $(document).on("click", ".next-btn", () => {
    if (num.questionNum <= 10) {
      num.questionIncrement();
      $('.next-btn').hide();
      console.log(num.questionNum);
    } else {
      resultsPage();
    }
  });
}

function optionValidate(num) {
  $(document).on('click', 'input', function (event) {
    let selection = event.target.getAttribute('value');
    if (selection == num.questions[num.questionNum - 1].answer) {
      $(event.target).removeClass('option-empty');
      $(event.target).addClass('correct');
      num.correctScore();
      if (num.questionNum < 10) {
        $('.next-btn').show();
        num.questionNum++;
      } else {
        $('.next-btn').show();
        $('form .next-btn').removeClass('next-btn');
        $('main button').text('Complete Quiz').addClass('complete-quiz');
      }
    } else {
      num.wrongScore();
      $(event.target).removeClass('option-empty');
      $(event.target).addClass('incorrect');
      num.questionNum++;
      $('.next-btn').show();
    }

  });
}

function resultsPage(results) {
  $(document).on('click', '.complete-quiz', () => {
    let userResults = calcResults(results);
    if (userResults <= 10 && userResults >= 6) {
      $('p .question-text').text('Congratulations!');
      $('.question').append(`<h4>Your score is <span>${calcResults(results)}</span> out of 10! Great job!</h4>`);
    } else if (userResults == 10) {
      $('.question-text').text('Magnificent! You got a perfect score!');
      $('.question').append(`<h4>You got a perfect score! <span>${calcResults(results)}</span> out of 10!</h4>`);
    } else {
      $('.question-text').text('Bummer! Better luck next time!');
      $('.question').append(`<h4>Your score is <span>${calcResults(results)}</span> out of 10. Better luck next time!</h4>`);
    }
    $('.options').remove();
    $('.question-count').remove();
    $('.next-btn').remove();
    $('.new-quiz').append('<button class="js-try-again">Try Again</button>');
  });
}

function calcResults(results) {
  let userRightCount = 0;
  for (let i = 0; i < results.length; i++) {
    if (results[i] === true) {
      userRightCount++;
    } 
  }
  return userRightCount;
}

// RUN APP
/* 
runQuiz() will include all of the other needed functions to run
*/
function newQuiz(quiz) {
  $(document).on("click", ".new-quiz", () => {
    quiz.question();
    quiz.formInit();
    optionValidate(quiz);
    nextBtn(quiz);
    $(".new-quiz button").remove();
  });
}

function quizRestart(quiz) {
  $(document).on("click", ".js-try-again", () => {
    newQuiz(quiz);
  });
}


function runQuiz() {
  startPage();
  const quizInitiate = new Quiz();
  newQuiz(quizInitiate);
  resultsPage(quizInitiate.userScore);
  quizRestart(quizInitiate);
}

runQuiz();