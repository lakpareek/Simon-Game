var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var maxLevel = 0;

function checkSequence() {
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] !== gamePattern[i]) {
      return false;
    }
  }
  return true;
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").html("Level " + level);
  if(level > maxLevel){
    maxLevel++;
  }

  $(".score").html("High Score:" + maxLevel);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  animatePress(randomChosenColor);
  playSound(randomChosenColor);
}

function playSound(color) {
  var audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}

$(".red, .blue, .yellow, .green").click(function() {
  if(started){
      var color = $(this).attr("id");
      animatePress(color);
      playSound(color);
      userClickedPattern.push(color);
      if (!checkSequence()) {
        $("h1").html("Game Over, Press any key to restart");
        $("body").addClass("game-over");
        setTimeout(function(){
          $("body").removeClass("game-over");
        }, 1000);
        let a = "wrong";
        playSound(a);
        startOver();
      } else {
        if (userClickedPattern.length === gamePattern.length) {
          setTimeout(function() {
            nextSequence();
          }, 1000);
        }
      }
    }
});

$(document).keydown(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});
