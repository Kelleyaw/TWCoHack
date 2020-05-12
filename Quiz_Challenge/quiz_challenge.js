(function() {
  var questions = [{
  question: "If Peter, who is from the Monroe country in Indiana, were given a more flexible Stay at Home order by the state but a much stricter Stay at Home order by the local government where he is not allowed to go out freely, who should he follow?",
  choices: ["Local Government",
            "State",
            "CDC",
            "The President"],
    correctAnswer: "Local Government"
    },
    {
    question: "John is currently having symptoms of other chronic diseases such as difficulty breathing or high fever, what should he do after knowing vital information from local resources such as Indiana Government Department of Health and WHYHOSPITALS?",
    choices: ["Go directly to the hospital without consulting or calling 911",
              "Call and consult with 911 or health provider but DO NOT to go to the nearest hospital because of the fear getting or spreading coronavirus",
              "Try solving the problem with his loved ones by taking home remedies or medication",
              "Call and consult with 911 or health provider and depends on the severity of the symptoms, decide on whether he should go to the hospital or not,"],
    correctAnswer: "Indiana State Department of Health"
    },
    {
      question: "You found out that you might be infected with the virus but then you are staying with your grandparents who are over 80 located in a rural area. Which of the following is improper?",
      choices: ["Call and consult with 911 or health provider",
                "Isolate yourself completely from your grandparents",
                "Get yourself tested",
                "Do not get tested because you are sure that you isolated yourself well"],
      correctAnswer: "Do not get tested because you are sure that you isolated yourself well"
    },
    {
      question: "Your utility service was disconnected by the service provider because you were laid off and cannot pay your rent and utility fee during this COVID-19 pandemic. Is your utility service provider’s behavior legal? Where could you find resources to help yourself and get utility service reconnected?",
      choices: ["No; Indiana State Department of Health",
      "No; Indiana211",
      "Yes; FindHelp",
      "Yes; Resource Roundup"],
      correctAnswer: "No; Indiana211"
    }
  ];

  var questionCounter = 0; // This tracks the current question number
  var selections = []; // This is where user choices are stored
  var quiz = $('#quiz'); // Our Quiz div element

  displayNext();

  // Handler for the next button
  $('#next').on('click', function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Small Animations (QoL pieces)

  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestion(index) {
    var qE = $('<div>', {
      id: 'question'
    });

    // Creates type 2 header
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qE.append(header);

    // creates paragraph w/ question inside
    var question = $('<p>').append(questions[index].question);
    qE.append(question);

    // Creates radio buttons
    var radioButtons = createButtons(index);
    qE.append(radioButtons);

    // return the question element with all variables appended on
    return qE;
  }

  // Creates a list of the answer choices (as radio inputs)
  function createButtons(index) {
    var buttonList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      buttonList.append(item);
    }
    return buttonList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestion(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }

        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          $('#next').show();
        }
      }else {
        var scoreE = displayScore();
        quiz.append(scoreE).fadeIn();
        $('#next').hide();
      }
    });
  }


  // Computes score and returns element to be displayed
  // (probably paragraph element)
  function displayScore() {
    var score = $('<p>',{id: 'question'});

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    score.append('You got ' + '5' + ' questions out of ' +
                 questions.length + ' right');
    return score;
  }
})();
