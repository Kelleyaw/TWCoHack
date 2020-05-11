(function() {
  var questions = [{
  question: "Approximately 18% of Hoosiers were tested positive and 5.75% out of the 18% resulted in death. What do these facts tell us in regards to Indiana State testing capacity?",
  choices: ["Sufficient testing kits",
            "Insufficient testing kits"],
    correctAnswer: "Insufficient testing kits"
    },
    {
    question: "What age group has the highest risk of getting infected?",
    choices: ["People above 65",
              "HIV patients",
              "Homeless people",
              "Patients with underlying health conditions,",
              "Pregnant women"],
    correctAnswer: "People above 65"
    },
    {
      question: "During the COVID-19 pandemic, doctors and nurses are working long hours to keep more Hoosiers healthy. Which of the following resources could best help you find out how to support your local hospital?",
      choices: ["WHYHOSPITALS",
                "A Facebook group created by your neighbor whose friend works in a hospital",
                "Local churches",
                "County Health Departments"],
      correctAnswer: "WHYHOSPITALS"
    },
    {
      question: "During a state of emergency, could you be evicted, or have the utility service disconnected from not paying your rent/bill?",
      choices: ["Yes",
                "No"],
      correctAnswer: "No"
    },
    {
        question: "There are 4 guiding principles that will determine if the stages to reopen Indiana will continue. Which of the following IS NOT part of the principles?",
        choices: ["The number of hospitalized COVID-19 patients statewide has decreased for 14 days",
                  "The state retains its surge capacity for critical care beds and ventilators",
                  "The state retains the ability to test all Hoosiers who are COVID-19 symptomatic, as well as healthcare workers, essential workers, first responders, and others as delineated on the ISDH website",
                  "Health officials have systems in place to contact all individuals who test positive for COVID-19 and complete contact tracing",
                  "0 new deaths have been reported for 14 days"],
        correctAnswer: "0 new deaths have been reported for 14 days"
    }
  ];

  var questionCounter = 0; // This tracks the current question number
  var selections = []; // This is where user choices are stored
  var quiz = $('#quiz'); // Our Quiz div element

  displayNext();


  //Handler for explanation button
  $('#explaination').on('click', function (e){
    e.preventDefault();

    // Suspend click listener during fade Animations
    if(quiz.is(':animated')) {
      return false;
    }

    if(isNan(selections[questionCounter])){
      alert('Please make a selection before veiwing the explanation')
    } else {
      displayExpl();
    }
  });


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

  // Click handler for the previous button
  $('#prev').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the Start Over button
  $('#start').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
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
          $('#prev').hide();
          $('#next').show();
          $('#explanation').show();
        }
      }else {
        var scoreE = displayScore();
        quiz.append(scoreE).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#explanation').hide();
        $('#start').show();
      }
    });
  }


function displayExpl() {
  // Get the modal
  var modal = document.getElementById("expModal");

  // Get the button that opens the modal
  var btn = document.getElementById("expBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  if(questionCounter == 0){
    $("#expModal .modal-content").html(
      '<span class=\"close\">&times;</span> <p>According to the Harvard Global Health Institute, if there are less than 10% or fewer positives among the tests conducted, it means that there is enough testing. This is known as the 10% positive benchmark. Indiana currently has around 4,100 tests per day, which is far fewer than the estimated needed by May 15 - 28,000+ tests. Knowing the estimates will guide on knowing how the state is coping with the virus which could affect your decision making process. </p>');
  } else if(questionCounter == 1){
    $("#expModal .modal-content").html('<span class=\"close\">&times;</span> <p>According to the CDC, 8 out of 10 deaths reported in the U.S. have been in adults 65 years old and older. It is also important to know the other risky groups through Indiana (Q2) as it would get you prepared. You should also visit How to Protect Yourself by CDC or even the CDC for Precautionary Measures for more information!</p>');
  } else if (questionCounter == 2){
    $("#expModal .modal-content").html('<span class=\"close\">&times;</span> <p>Knowing central and trusted sources could not only save your time on researching, but also provide needed help to our front line heroes.</p>');
  } else if(questionCounter == 3){
    $("#expModal .modal-content").html('<span class=\"close\">&times;</span> <p>Governor Eric Holcomb issued an executive order on March 19, stating that no residential eviction proceedings or foreclosure actions may be initiated from 3/19 until the state of emergency has terminated. </p>');
  } else if(questionCounter == 4){
    $("#expModal .modal-content").html('<span class=\"close\">&times;</span> <p>In the file Our Principles To Get Back On Track, the state government said that if Indiana cannot meet these 4 guiding principles, all or portions of the state may need to pause on moving forward, or Hoosiers may return to an earlier stage of the governor’s stay-at-home order.</p>');
  }

  // When the user clicks on the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
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
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right');
    return score;
  }
})();
