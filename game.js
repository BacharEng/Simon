var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var currentLevel = 0;
  var i = 0;

function newSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut("fast").fadeIn("fast");
  playSound(randomChosenColor);
  $("h1").text("level " + currentLevel);
  currentLevel++;
  i=0;
}

$(".btn").click(function() {
  if (gamePattern.length !== 0) {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(i);
  }
})


$(document).keydown(function() {
  if (gamePattern.length === 0) {
    newSequence();
  }
})

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Sucess!")
    i++;
  } else {
    $("body").addClass("game-over");
    playSound("wrong");
    $("h1").text("Game over, Press any key to restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
  if (userClickedPattern.length === gamePattern.length  && gamePattern.length > 0) {
    setTimeout(newSequence, 1000);
    userClickedPattern = [];
  }
}

function startOver(){
  currentLevel = 0;
  gamePattern = [];
  userClickedPattern= [];
}
function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");

  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}
