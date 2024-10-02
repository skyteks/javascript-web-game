var game;

//document.addEventListener("DOMContentLoaded", onPageLoaded);
window.addEventListener("load", () => onPageLoaded());

function onPageLoaded() {
    console.log("page loaded");
    startGame();
}

function startGame() {
    game = new PongGame(800, 600);
    //game = new FlappyGame(800, 600);
}

function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}
const deg2rad = (Math.PI / 180);
const rad2deg = (180 / Math.PI);