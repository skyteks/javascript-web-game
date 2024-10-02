class Game {
    constructor(width, height, possibleKeys, debugStepping = false) {
        this.gameScreen = document.getElementById("game-screen");
        this.debugStepping = debugStepping;
        this.size = new Vector2(width, height);
        this.gameIsOver = false;
        this.gameLoopFrecuency = 1000 / 60;
        this.gameIntervalId = null;
        this.possibleKeys = ["r", ...possibleKeys];
        this.keyInputs = {};

        this.possibleKeys.forEach((key) => {
            this.keyInputs[key] = false;
        });
    }

    start() {
        window.addEventListener("keydown", (e) => game.handleKey(e, true));
        window.addEventListener("keyup", (e) => game.handleKey(e, false));

        this.gameIntervalId = setInterval(() => this.gameLoop(), this.gameLoopFrecuency);
        this.gameScreen.style.display = "block";
    }

    gameLoop() {
        this.readInputs();

        if (!this.debugStepping ? true : this.keyInputs[" "]) {
            this.update();
            if (this.debugStepping) {
                this.keyInputs[" "] = false;
            }
        }

        if (this.gameIsOver) {
            //clearInterval(this.gameIntervalId);
        }
    }

    update() {
    }

    readInputs() {
        this.possibleKeys.forEach((key) => {
            switch (key) {
                case "r":
                    if (this.keyInputs[key]) {
                        location.reload();
                    }
            }
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