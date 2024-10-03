class Game {
    constructor(size, possibleKeys, debugStepping = false) {
        this.gameScreen = document.getElementById("game-screen");
        this.debugStepping = debugStepping;
        this.size = size;
        this.gamePaused = true;
        this.gameOver = false;
        this.gameLoopFrecuency = 1000 / 60;
        this.gameIntervalId = null;
        this.possibleKeys = ["tab", "r", " ", ...possibleKeys];
        this.possibleKeys = this.possibleKeys.filter((v, i) => this.possibleKeys.indexOf(v) == i);
        this.keyInputs = {};
        this.mainMenu = null;

        this.sounds = [];

        this.possibleKeys.forEach((key) => {
            this.keyInputs[key] = false;
        });

        window.addEventListener("keydown", (e) => this.handleKey(e, true));
        window.addEventListener("keyup", (e) => this.handleKey(e, false));

        this.gameScreen.style.display = "block";
        this.gameIntervalId = setInterval(() => this.gameLoop(), this.gameLoopFrecuency);

        this.showStartMenu();
    }

    showStartMenu() {
        const scalar = 0.1;
        const offset = Vector2.scale(this.size, scalar);
        const menuSize = Vector2.subtract(this.size, Vector2.scale(this.size, scalar * 2));
        this.mainMenu = new Menu(offset, menuSize, 1, "game-main-menu");
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

        this.mainMenu.toggleVisibility(!this.gamePaused);
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