// The Question List
(function () {
  var questions = [
    {
      question: "Pick \"The correct choice\"",
      choices: [
        "The correct choice",
        "The incorrect Choice 1",
        "The incorrect Choice 2",
        "The incorrect Choice 3",
        "The incorrect Choice 4"
      ],
      correctAnswer: "The correct choice"
    },
    {
      question: "What is 10 * 10?",
      choices: [1, 10, 100, 1000, 10000],
      correctAnswer: 100
    },
    {
      question: "What is the square root of pi?",
      choices: [3.14, 9001, 1.77, 0, 2.718],
      correctAnswer: 1.77
    },
    {
      question: "What is 3*6?",
      choices: [3, 6, 9, 12, 18],
      correctAnswer: 4
    },
    {
      question: "What is 8*9?",
      choices: [72, 99, 108, 134, 156],
      correctAnswer: 0
    }
  ];

  var questionCounter = 0; // This tracks the current question number
  var selections = []; // This is where user choices are stored
  var quiz = $("#quiz"); // Our Quiz div element

  displayNext();

  // Handler for the next button
  $("#next").on("click", function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if (quiz.is(":animated")) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert("Please make a selection");
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'prev' button
  $("#prev").on("click", function (e) {
    e.preventDefault();

    // Diable durin animations
    if (quiz.is(":animated")) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the previous button
  $("#prev").on("click", function (e) {
    e.preventDefault();

    // Disable during animations
    if (quiz.is(":animated")) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the Start Over button
  $("#start").on("click", function (e) {
    e.preventDefault();

    if (quiz.is(":animated")) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $("#start").hide();
  });

  // Small Animations (QoL pieces)
  // Animates buttons on hover
  $(".button").on("mouseenter", function () {
    $(this).addClass("active");
  });
  $(".button").on("mouseleave", function () {
    $(this).removeClass("active");
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestion(index) {
    var qE = $("<div>", {
      // qE is the question element
      id: "question"
    });

    // Creates type 2 header
    var header = $("<h2>Question " + (index + 1) + ":</h2>");
    qE.append(header);

    // creates paragraph w/ question inside
    var question = $("<p>").append(questions[index].question);
    qE.append(question);

    // Creates radio buttons
    var radioButtons = createButtons(index);
    qE.append(radioButtons);

    // return the question element with all variables appended on
    return qE;
  }

  // Creates a list of the answer choices (as radio inputs)
  function createButtons(index) {
    var buttonList = $("<ul>");
    var item;
    var input = "";
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $("<li>");
      input = '<input type="radio" name="answer" value=' + i + "/>";
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
    quiz.fadeOut(function () {
      $("#question").remove(); // Remove the question div element

      if (questionCounter < questions.length) {
        var nextQuestion = createQuestion(questionCounter);
        quiz.append(nextQuestion).fadeIn(); // Attach the next question and show
        if (!isNaN(selections[questionCounter])) {
          $("input[value=" + selections[questionCounter] + "]").prop(
            "checked",
            true
          );
        }

        // Controls for previous button
        if (questionCounter === 1) {
          $("#prev").show();
        } else if (questionCounter === 0) {
          $("#prev").hide();
          $("#next").show();
        } else {
          var scoreE = displayScore();
          quiz.append(scoreE).fadeIn();
          $("#next").hide();
          $("#previous").hide();
          $("#start").show();
        }
      }
    });
  }

  // Computes score and returns element to be displayed
  // (probably paragraph element)
  function displayScore() {
    var score = $("<p>", { id: "question" });

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    score.append(
      "You got " +
        numCorrect +
        "questions out of " +
        questions.length +
        "correct!"
    );
    return score;
  }
})();
