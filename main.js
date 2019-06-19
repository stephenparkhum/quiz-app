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
    this.questionNum++;
    this.question();
    this.removeOptions();
    this.newOptions();
  }

  scoreboardInit() {
    $('div.progress-score').append('<h3></h3>');
    $('div.progress-score h3').text(`Scoreboard`);
    $('div.progress-score').append(`<p>Correct: <span class="right-count">0</span></p>`);
    $('div.progress-score').append(`<p>Incorrect: <span class="wrong-count">0</span></p>`);
  }

  progressScore() {
    let wrongCount = 0;
    let rightCount = 0;
    let userScore = this.userScore;
    for (let i = 0; i < userScore.length; i++) {
      if (this.userScore[i] == true) {
        rightCount++;
        $('span.right-count').text(`${rightCount}`);
      } else {
        wrongCount++;
        $('span.wrong-count').text(`${wrongCount}`);
      }
    }   
  }

  // OPTIONS
  formInit() {
    let initialForm = `<div class="options">
    <form action="" id="option-form">
    </form>
    <div class="next">
    <button class="next-btn">Next</button></div>
  </div>
  <div class="progress-score"></div>
  `;
    $("main").append(initialForm);
    $('.next-btn').hide();
    this.newOptions();
    this.scoreboardInit();
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
  
  correctScore() {
    this.userScore.push(true);
  }
  
  wrongScore() {
    this.userScore.push(false);
  }

}

// HTML FUNCTIONS
function startPage() {
  $("main").append(
    '<div class="question"></div>'
  );
  $('.question').append('<p class="question-text"></p><p class="question-count"></p>');
  $("main").append(`<div class="buttons">
  <button class="new-quiz">Start Quiz</button>
</div>`);
  $(".question p:first").text(
    `Test your music knowledge with this interactive quiz!`
  );
}

function nextBtn(num) {
  $(document).on("click", ".next-btn", () => {
    if (num.questionNum <= 10) {
      num.questionIncrement();
      num.progressScore();
      $('.next-btn').hide();
    } else {
      resultsPage();
    }
  });
}

function selectOne() {
    $('input').off('click');
    console.log('selectOne is running');
};


/* 
Make it so the NEXT button increments the quesitonNum

*/ 

function optionValidate(num) {
    $(document).on('click', 'input', function (event) {
      let selection = event.target.getAttribute('value');
      if (selection == num.questions[num.questionNum - 1].answer && num.questionNum == num.userScore.length + 1) {
        $(event.target).removeClass('option-empty');
        $(event.target).addClass('correct');
        $(event.target).attr("checked", 'true');
        if (num.questionNum < 10) {
          $('.next-btn').show();
          num.correctScore();
        } else {
          num.questionNum++;
          $('.next-btn').show();
          $('form .next-btn').removeClass('next-btn');
          $('main button').text('Complete Quiz').addClass('complete-quiz');
        }
      } else if (selection != num.questions[num.questionNum - 1].answer && num.questionNum == num.userScore.length + 1){
        $(event.target).removeClass('option-empty');
        $(event.target).addClass('incorrect');
        num.wrongScore();
        $('.next-btn').show();
      } else {
        return;
      }
  
    });
}

function resultsPage(results, quiz) {
  $(document).on('click', '.complete-quiz', () => {
    $('button.new-quiz').show();
    $('.options').remove();
    $('.question-count').remove();
    $('.next-btn').remove();
    $('button.new-quiz').addClass('js-try-again');
    $('button.js-try-again').removeClass('complete-quiz');
    $('button.js-try-again').removeClass('new-quiz');
    $('button.js-try-again').text('TRY AGAIN');
    let userResults = calcResults(results);
    if (userResults < 10 && userResults > 6) {
      $('.question-text').text('Congratulations!');
      $('.question').append(`<h4>Your score is <span>${calcResults(results)}</span> out of 10! Great job!</h4>`);
    } else if (userResults == 10) {
      quiz.progressScore();
      $('.question-text').text('Magnificent! You got a perfect score!');
      $('.question').append(`<h4>You got a perfect score! <span>${calcResults(results)}</span> out of 10!</h4>`);
    } else {
      $('.question-text').text('Bummer! Better luck next time!');
      $('.question').append(`<h4>Your score is <span>${calcResults(results)}</span> out of 10. Better luck next time!</h4>`);
    }
    
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
function newQuiz() {
  const quizInitiate = new Quiz();
  $(document).on("click", ".new-quiz", () => {
    quizInitiate.question();
    quizInitiate.formInit();
    $('div .buttons').hide();
    optionValidate(quizInitiate);
    nextBtn(quizInitiate);
    $(".new-quiz").hide();
    resultsPage(quizInitiate.userScore, quizInitiate);
    quizRestart();
  });
}

function quizRestart() {
  $(document).on("click", ".js-try-again", () => {
    location.reload(true);
  });
}


function runQuiz() {
  startPage();
  newQuiz();
  quizRestart();
}

runQuiz();