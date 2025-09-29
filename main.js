// Starting the game
const gameScreen = document.getElementById("cellar_game_div");
const playButton = document.getElementById("start_game");

playButton.addEventListener("click", startTest);

function startTest() {
    gameScreen.style.display = "block";
    playButton.style.display = "none";
}