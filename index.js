var game;
const gameScreenSize = new Vector2(800, 600);

//document.addEventListener("DOMContentLoaded", onPageLoaded);
window.addEventListener("load", () => onPageLoaded());

function onPageLoaded() {
    console.log("page loaded");
    startGame(1);
}

function startGame(level) {
    switch (level) {
        case 1:
            game = new PongGame(gameScreenSize, () => startGame(++level));
            break;
        case 2:
            game = new FlappyGame(gameScreenSize, () => startGame(++level));
            break;
        default:
            throw new Error(`Level ${level} not yet implemented`);
    }
}

function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}
const deg2rad = (Math.PI / 180);
const rad2deg = (180 / Math.PI);

function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}