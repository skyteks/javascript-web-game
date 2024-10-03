var game;

//document.addEventListener("DOMContentLoaded", onPageLoaded);
window.addEventListener("load", () => onPageLoaded());

function onPageLoaded() {
    console.log("page loaded");
    startGame();
}

function startGame() {
    const size = new Vector2(800, 600);
    game = new PongGame(size);
    //game = new FlappyGame(size);
}

function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}
const deg2rad = (Math.PI / 180);
const rad2deg = (180 / Math.PI);

function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}