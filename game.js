class Game {
    constructor(size, possibleKeys, level, endCallback) {
        this.endCallback = endCallback;
        this.gameScreen = document.getElementById("game-screen");
        this.size = size;
        this.gameState = "paused";
        this.gameLoopFrecuency = 1000 / 60;
        this.gameIntervalId = null;
        this.possibleKeys = ["tab", "r", " ", "End", ...possibleKeys];
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

        this.mainMenu = this.createMenu("game-main-menu", true);
        this.defeatMenu = this.createMenu("game-over-screen-menu", false);
        this.winMenu = this.createMenu("game-win-screen-menu", false);

        (document.getElementsByClassName("game-name")[0]).textContent = this.__proto__.constructor.name.replace("Game", "");
        (document.getElementsByClassName("level-number")[0]).textContent = "LEVEL " + level.toString().padStart(2, 0);
    }

    createMenu(id, visibility) {
        const scalar = 0.1;
        const offset = Vector2.scale(this.size, scalar);
        const menuSize = Vector2.subtract(this.size, Vector2.scale(this.size, scalar * 2));
        return new Menu(offset, menuSize, 1, id, visibility);
    }

    gameLoop() {
        this.readInputs();

        if (this.gameState == "running") {
            this.update();
        }
        else {
            this.showMenu();
        }
    }

    update() {
    }

    showMenu() {
        switch (this.gameState) {
            case "victory":
                this.winMenu.toggleVisibility(true);
                this.stop();
                break;
            case "defeat":
                this.defeatMenu.toggleVisibility(true);
                break;
            case "paused":
                this.mainMenu.toggleVisibility(true);
                return;
            case "running":
                this.winMenu.toggleVisibility(false);
                this.defeatMenu.toggleVisibility(false);
                this.mainMenu.toggleVisibility(false);
                break;
        }
    }

    stop() {
        clearInterval(this.gameIntervalId);
        setTimeout(this.endCallback, 3000);
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
                    if (this.keyInputs[key] && this.gameState == "paused") {
                        this.keyInputs[key] = false;
                        this.gameState = "running";
                        this.showMenu();
                    }
                case "End":
                    if (this.keyInputs[key] && this.gameState != "running") {
                        this.keyInputs[key] = false;
                        this.gameState = "victory";
                        this.showMenu();
                    }
                    break;
                default:
                    break;
            }
        });
    }

    handleKey(e, state) {
        console.log("key \"" + e.key + "\" " + (state ? "down" : "up"));
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