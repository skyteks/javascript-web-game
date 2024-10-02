class Game {
    constructor(width, height, possibleKeys, debugStepping = false) {
        this.gameScreen = document.getElementById("game-screen");
        this.debugStepping = debugStepping;
        this.size = new Vector2(width, height);
        this.gamePaused = true;
        this.gameOver = false;
        this.gameLoopFrecuency = 1000 / 60;
        this.gameIntervalId = null;
        this.possibleKeys = ["tab", "r", " ", ...possibleKeys];
        this.possibleKeys = this.possibleKeys.filter((v, i) => this.possibleKeys.indexOf(v) == i);
        this.keyInputs = {};

        this.sounds = [];

        this.possibleKeys.forEach((key) => {
            this.keyInputs[key] = false;
        });

        window.addEventListener("keydown", (e) => game.handleKey(e, true));
        window.addEventListener("keyup", (e) => game.handleKey(e, false));

        this.gameScreen.style.display = "block";
        this.gameIntervalId = setInterval(() => this.gameLoop(), this.gameLoopFrecuency);
    }

    gameLoop() {
        this.readInputs();

        if (!this.gamePaused && !this.gameOver) {
            if (!this.debugStepping ? true : this.keyInputs["tab"]) {
                this.update();
                if (this.debugStepping) {
                    this.keyInputs["tab"] = false;
                }
            }
        }
    }

    stop() {
        clearInterval(this.gameIntervalId);
    }

    update() {
    }

    readInputs() {
        this.possibleKeys.forEach((key) => {
            switch (key) {
                case "r":
                    if (this.keyInputs[key]) {
                        this.keyInputs[key] = false;
                        location.reload();
                    }
                    break;
                case " ":
                    if (this.keyInputs[key]) {
                        this.keyInputs[key] = false;
                        this.gamePaused = !this.gamePaused;
                    }
                    break;
                default:
                    break;
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

    playSFX(fileName) {
        //const audio = [...document.getElementsByTagName("audio")].filter((element) => element.src.includes(fileName));

        fileName = "./" + this.__proto__.constructor.name.replace("Game", "").toLowerCase() + "/sfx/" + fileName;
        const audio = new Audio(fileName);

        audio.play();
    }
}