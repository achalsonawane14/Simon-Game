var buttonColors = ["green", "yellow", "red", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Detect when the start button is clicked
$("#start").click(function() {
  if (!started) {
    // Hide the start button
    $("#start").hide();
    // Change the h1 title to say "Level " + level
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Detect when any of the buttons are clicked
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  
  // Check the user's answer
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  // Reset the userClickedPattern to an empty array for the next level
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $(".btn").addClass("hidden"); // Hide the buttons
    $(".container").addClass("hidden"); // Hide the container

    setTimeout(function() {
      $("body").removeClass("game-over");
      $(".btn").removeClass("hidden"); // Show the buttons again
      $(".container").removeClass("hidden"); // Show the container again
      $("#level-title").text("Let's Start");
      $("#start").show(); // Show the start button again when the game is over
      startOver();
    }, 500); // Display the game-over background for 500 milliseconds
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
