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
// let userScore = [];
// let questionNum = userScore.length;

class Quiz {
  constructor(questions) {
    this.userScore = [];
    this.questionNum = 1;
    this.questions = questions;
  }

  // Questions
  question() {
    if (this.questionNum <= 9) {
      $("p[class='question-text']").text(`${questions[this.questionNum].question}`);
      console.log(questionCount(this.questionNum));
    }
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
    let num = this.questionNum;
    let labelsAndInputs;
    if (num <= 9) {
      for (let i = 0; i < 4; i++) {
        labelsAndInputs = `<input type="button" name="option" id="${i + 1}" value="${questions[num].options[i].option}" class="option-empty" required/>`;
        $('form').append(labelsAndInputs);
      }
    }
  }

  optionValidate() {
    let num = this.questionNum;
    $(document).on('click', 'input', function (event) {
      let selection = event.target.getAttribute('value');
      let answer = questions[num]['answer'];
      if (selection == answer) {
        $(event.target).removeClass('option-empty');
        $(event.target).addClass('correct');
        $(event.target).attr('checked', "checked");
        correctScore();
        if (num <= 8) {
          $('.next-btn').show();
          num++;
        } else {
          $('.next-btn').show();
          $('form .next-btn').removeClass('next-btn');
          $('main button').text('Complete Quiz').addClass('complete-quiz');
        }
      } else {
        wrongScore();
        $(event.target).removeClass('option-empty');
        $(event.target).addClass('incorrect');
        num++;
        $('.next-btn').show();
      }
  
    });
  }

  removeOptions() {
    let optionCount = 4;
    for (let i = 0; i < optionCount; i++) {
      $('form').find('input').remove();
      $('form').find('label').remove();
      $('form').find(".submit-button").remove();
    }
  }


  newQuiz() {
    $(document).on("click", ".new-quiz", () => {
      this.question();
      this.formInit();
      $(".new-quiz button").remove();
    });
  }

  testFunc() {
    console.log(this.userScore);
  }

  // BUTTONS
  nextBtn(num) {
    $(document).on("click", ".next-btn", () => {
      if (num <= 9) {
        questionIncrement(num);
        num++;
        $('.next-btn').hide();
        console.log(num);
      } else {
        resultsPage();
      }
    });
  }

  buttonsMaster(num) {
    nextBtn(num);
  }

  // QUIZ RESULTS
  calcResults(results) {
    let userRightCount = 0;
    for (let i = 0; i < results.length; i++) {
      if (results[i] === true) {
        userRightCount++;
      }
    }
    return userRightCount;
  }

  correctScore() {
    this.userScore.push(true);
  }
  
  wrongScore() {
    this.userScore.push(false);
  }

}



function quizInit() {
  startPage();
}

/* 
newQuiz() will show a dialog that asks if the user wants to start a new quiz
Once clicked, it'll show the question + answer. 
Ultimately this will 'hide; the new quiz button, as well as 'show' the questions
*/



/* 
question() will display each question, as well as the options
Within each question there will be a display of which question (out of 10) it is.
*/

/* 
questionCount() will display which question (out of 10) it is.
*/

/* 
optionForm() will display the set of options the user has to pick from
*/

/* 
The User's Score will be stored as a '1' for correct, and '0' for incorrect. 
*/







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


function resultsPage(results) {
  $(document).on('click', '.complete-quiz', () => {
    let userResults = calcResults(results);

    if (userResults <= 9 && userResults >= 6) {
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
  startPage();
  const quizInitiate = new Quiz();
  quizInitiate.newQuiz();
  quizInitiate.testFunc();
  quizInitiate.question();
  resultsPage();
}

runQuiz();