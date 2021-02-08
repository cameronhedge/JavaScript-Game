// -------------------------------------- VARIABLES -------------------------------------------------------
// Empty array to store the players pattern
  var playerPattern = []
// Tracks if game is in play
  var gameInPlay = false
// Colors to be selected from
  var buttonColors = ["red", "blue", "green", "yellow"]
  var gameOver = new Audio("sounds/wrong.mp3")

// -------------------------------------- KEYPRESS EVENTS -------------------------------------------------------
// Starts the game when any key is pressed
$(document).on("keydown", startGame)
// Register Player Response
$(".btn").on("click", function(event) {
  var btn = $(this)
  // Pressed animation
  btn.addClass("pressed")
  setTimeout(function () {btn.removeClass("pressed")}, 100)
  // Add to Player pattern
  playerPattern.push(this.id)
  // Check answers
  checkAnswer()
})

// -------------------------------------- FUNCTIONS -------------------------------------------------------
// Checks answers up to the current length of the players selection
function checkAnswer() {
  for (var i = 0; i <= playerPattern.length - 1; i++) {
      // If no match. Game resets
      if (playerPattern[i] !== gamePattern[i]) {
        playerPattern = []
        gameOver.play()
        $("body").addClass("game-over")
        setTimeout(function() {$("body").removeClass("game-over")}, 200)
        $("h1").text("Game Over, Press Any Key to Restart")
        gameInPlay = false
      return;
      }
  }
  // If there is a match and the level is finished then move to next level
  if (playerPattern.length === level) {
    playerPattern = []
    level++
    $("h1").text("Level " + level)
    setTimeout(function () {nextSequence()}, 500)
  }
}
// Function to add the next color to the existing sequence
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColor = buttonColors[randomNumber]
  gamePattern.push(randomChosenColor)
  playSound(randomChosenColor)
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
}
// Function to start game, will be called when player presses a key and only called when the game is not already in play.
function startGame() {
    setTimeout(function () {
      if (gameInPlay === false) {
        gameInPlay = true
        level = 1
        gamePattern = []
        nextSequence()
        $("h1").text("Level " + level)
      }
    }, 500)
}
// Function to play sounds.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play()
}
