//window.alert("Hello world!");
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var started = false;
var level = 0;
function newSequence(){
    userClickedPattern = [];
    randomNumber = Math.floor(Math.random()*4);//0 1 2 3
    randomChosenColour = buttonColours[randomNumber]
    //console.log(randomNumber + " " + randomChosenColour);
    gamePattern.push(randomChosenColour);
    //var selectedButton = $("#" + randomChosenColour);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);

}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

  });
function playSound(name){
    var crash = new Audio ('sounds/' + name + '.mp3'); 
    crash.play();
}
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
$(document).keydown(function () {
    if (!started) {
        newSequence();
        started = true;
        $("#level-title").text("Level " + level);
    }
});
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            newSequence();
          }, 1000);
        }
    }
    else {
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}