// The Question List
(function() {
  var questions = [{
  question: "Pick \"The correct choice\"",
  choices:["The correct choice", "The incorrect Choice1", "The incorrect Choice2", "The incorrect Choice3", "The incorrect Choice4",],
  correctAnswer: "The correct choice"
}, {
  question: "What is 10 * 10?",
  choices: [1, 10, 100, 1000, 10000],
  correctAnswer: 100
}, {
  question: "What is the square root of pi?",
  choices: [3.14, 9001, 1.77, 0, 2.718],
  correctAnswer: 1.77
}];

var questionCounter = 0; // This tracks the current question number
var selections = []; // This is where user choices are stored
var quiz = $('#quiz'); // Our Quiz div element

displayNext();

// Various Click Handelers


// Small Animations (QoL pieces)


// Creates and returns the div that contains the questions and
// the answer selections
function createQuestion(index) {
  var qE = $('div', { // qE is the question element
    id: 'question'
  });

  // Creates type 2 header
  var header = $('<h2>Question ' + (index + 1) + ':</h2>');
  qE.append(header);

  // creates paragraph w/ question inside
  var question = $(<'p'>).append(questions[index].question);
  qE.append(question)

  // Creates radio buttons
  var radioButtons = createButtons(index);
  qE.append(radioButtons);

  // return the question element with all variables appended on
  return qE;
}

// Creates a list of the answer choices (as radio inputs)
function createButtons(index) {

}

// Reads the user selection and pushes the value to an array
function choose() {

}

// Displays next requested element
function displayNext() {
  quiz.fadeOut(function(){
    %('#question').remove(); // Remove the question div element

    if(questionCounter < questions.length){
      var nextQuestion = createQuestion(questionCounter);
      quiz.append(nextQuestion).fadeIn(); // Attach the next question and show
      if(!(isNaN(selections[questionCounter]))){
        $('input[value='+selections[questionCounter]+']').prop('checked', true);
      }

    }
  })
}

// Computes score and returns element to be displayed
// (probably paragraph element)
function displayScore() {

}


})();
