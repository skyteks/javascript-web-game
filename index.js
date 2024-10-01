//document.addEventListener("DOMContentLoaded", onPageLoaded);
window.addEventListener("load", (event) => onPageLoaded());

function onPageLoaded() {
    console.log("page loaded");
    startGame();
}

function startGame() {
    const gameScreen = document.getElementById("game-screen");
    const game = new PongGame(800, 600);
    window.addEventListener("keydown", (e) => game.handleKey(e, true));
    window.addEventListener("keyup", (e) => game.handleKey(e, false));
    game.start();
}

function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}
const deg2rad = (Math.PI / 180);
