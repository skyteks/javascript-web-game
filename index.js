//document.addEventListener("DOMContentLoaded", onPageLoaded);
window.addEventListener("load", () => onPageLoaded());

function onPageLoaded() {
    console.log("page loaded");
    startGame();
}

var game;
function startGame() {
    game = new PongGame(800, 600);
    window.addEventListener("keydown", (e) => game.handleKey(e, true));
    window.addEventListener("keyup", (e) => game.handleKey(e, false));
    game.start();
}

function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}
const deg2rad = (Math.PI / 180);
const rad2deg = (180 / Math.PI);