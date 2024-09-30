class PongGame {
    constructor(width, height) {
        this.gameScreen = document.getElementById("game-screen");
        this.width = width;
        this.height = height;
        this.gameIsOver = false;
        this.gameLoopFrecuency = 1000 / 60;
        this.gameIntervalId = null;
        this.possibleKeys = ["ArrowLeft", "ArrowRight", "a", "d",];
        this.keyInputs = {};
        this.board = null;
        this.ball = null;
        this.enemies = [];
    }

    start() {
        console.log("start game");

        this.possibleKeys.forEach((key) => {
            this.keyInputs[key] = false;
        });

        this.gameScreen.style.display = "block";
        this.gameIntervalId = setInterval(this.gameLoop.bind(this), this.gameLoopFrecuency);

        this.board = new Board(this, "white", 5);
        this.ball = new Ball(this, "white", 3);
        this.addEnemies();

        this.ball.startRandom();
    }

    addEnemies() {
        const size = 45;
        const space = 10;
        let count = (this.width - space) / (size + space);
        const rest = (this.width - space) % (size + space);
        count = Math.floor(count);
        console.log("count: " + count);
        for (let i = 0; i < count; i++) {
            const x = Math.floor(space + (rest * 0.5) + i * (size + space));
            const y = 100;
            const enemy = new Enemy(this.gameScreen, "white", x, y, size, size);
            this.enemies.push(enemy);
        }
    }

    gameLoop() {
        this.update();
        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId);
        }
    }

    update() {
        this.possibleKeys.forEach((key) => {
            switch (key) {
                case "ArrowLeft":
                case "a":
                    if (this.keyInputs[key]) {
                        this.board.dirX = -1;
                    }
                    break;
                case "ArrowRight":
                case "d":
                    if (this.keyInputs[key]) {
                        this.board.dirX = 1;
                    }
                    break;
            }
        });

        this.board.move(this);
        this.ball.move(this);
    }

    handleKey(e, state) {
        if (this.gameIsOver) {
            return;
        }

        if (this.possibleKeys.includes(e.key)) {
            e.preventDefault();

            this.keyInputs[e.key] = state;
        }
    }
}