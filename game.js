class Game {
    constructor(width, height, possibleKeys, debugStepping = false) {
        this.gameScreen = document.getElementById("game-screen");
        this.debugStepping = debugStepping;
        this.size = new Vector2(width, height);
        this.gameIsOver = false;
        this.gameLoopFrecuency = 1000 / 60;
        this.gameIntervalId = null;
        this.possibleKeys = possibleKeys;
        this.keyInputs = {};

        this.possibleKeys.forEach((key) => {
            this.keyInputs[key] = false;
        });
    }

    handleKey(e, state) {
        //console.log("key " + e.key + " " + (state ? "down" : "up"));
        if (this.possibleKeys.includes(e.key)) {
            e.preventDefault();
            this.keyInputs[e.key] = state;
        }
    }
}