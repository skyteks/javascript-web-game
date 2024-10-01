class PongGame {
    constructor(width, height) {
        this.gameScreen = document.getElementById("game-screen");
        this.width = width;
        this.height = height;
        this.gameIsOver = false;
        this.gameLoopFrecuency = 1000 / 60;
        this.gameIntervalId = null;
        this.possibleKeys = ["ArrowLeft", "ArrowRight", "a", "d", " ", "r"];
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

        this.board = new Board(this, "white", 7);
        this.ball = new Ball(this, "white", 6);
        this.addEnemies();

        this.ball.startRandom();
    }

    addEnemies() {
        const sizeX = 45;
        const sizeY = 20;
        const spaceX = 10;
        const spaceY = spaceX;
        const countX = Math.floor((this.width - spaceX) / (sizeX + spaceX));
        const countY = 5;
        const rest = (this.width - spaceX) % (sizeX + spaceX);
        for (let j = 0; j < countY; j++) {
            for (let i = 0; i < countX; i++) {
                const x = Math.floor(spaceX + (rest * 0.5) + i * (sizeX + spaceX));
                const y = Math.floor(spaceY + j * (sizeY + spaceY));
                const enemy = new Enemy(this, "white", x, y, sizeX, sizeY);
                this.enemies.push(enemy);
            }
        }
    }

    gameLoop() {
        this.possibleKeys.forEach((key) => {
            switch (key) {
                case "ArrowLeft":
                case "a":
                    if (this.keyInputs[key] && !this.gameIsOver) {
                        this.board.dirX = -1;
                    }
                    break;
                case "ArrowRight":
                case "d":
                    if (this.keyInputs[key] && !this.gameIsOver) {
                        this.board.dirX = 1;
                    }
                    break;
                case " ":
                    if (this.keyInputs[key] && !this.gameIsOver) {
                        //console.log(this.ball.x + "/" + this.ball.y);
                    }
                    break;
                case "r":
                    if (this.keyInputs[key]) {
                        location.reload();
                    }
            }
        });

        this.update();
        if (this.gameIsOver) {
            //clearInterval(this.gameIntervalId);
        }
    }

    update() {
        this.board.move(this);
        this.ball.move(this);

        this.checkCollisionsWorld();
        this.checkCollisionsEntities();
    }

    checkCollisionsEntities() {
        this.checkCollisionWith(this.board);
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            this.checkCollisionWith(this.enemies[i]);
        }
    }

    checkCollisionWith(entity) {
        const collidingX = this.ball.x < entity.x + entity.width &&
            this.ball.x + this.ball.width > entity.x;

        const collidingY = this.ball.y < entity.y + entity.height &&
            this.ball.y + this.ball.height > entity.y;

        if (collidingX && collidingY) {
            const overlapX = Math.min(
                (this.ball.x + this.ball.width) - entity.x,
                (entity.x + entity.width) - this.ball.x
            );
            const overlapY = Math.min(
                (this.ball.y + this.ball.height) - entity.y,
                (entity.y + entity.height) - this.ball.y
            );

            if (overlapX < overlapY) {
                this.ball.dirX *= -1;
            } else {
                this.ball.dirY *= -1;
            }

            entity.hit(this);
        }
    }

    checkCollisionsWorld() {
        if (this.ball.x < 0) {
            this.ball.dirX *= -1;
            this.ball.x *= -1;
        }
        else if (this.ball.x + this.ball.width > this.width) {
            this.ball.dirX *= -1;
            const max = this.width - this.ball.width;
            this.ball.x -= this.ball.x - max;
        }
        if (this.ball.y < 0) {
            this.ball.dirY *= -1;
            this.ball.y *= -1;
        }
        else if (this.ball.y + this.ball.height > this.height) {
            this.ball.dirX = 0;
            this.ball.dirY = 0;
            this.gameIsOver = true;
        }
    }

    handleKey(e, state) {
        if (this.possibleKeys.includes(e.key)) {
            e.preventDefault();
            this.keyInputs[e.key] = state;
        }
    }
}