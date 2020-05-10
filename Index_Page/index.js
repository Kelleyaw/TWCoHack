  // Click handler for the Learning Mode button
  $('#learning_mode).on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    displayNext();
    $('#learning_mode').hide();
  });

 // Click handler for the Challenge Mode button
  $('#challenge_mode').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    displayNext();
    ('#challenge_mode').hide();
  });

  function displayNext(){
    // Changes the page to test options
  }

  function choose(){
    var selObj = document.getElementById('singleSelectTextDDJS');
    var selValue = selObj.options[selObj.selectedIndex].text;

    // Setting the value
    document.getElementById('textFieldTextJS').value = selValue
  }
