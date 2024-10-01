class PongGame {
    constructor(width, height) {
        this.gameScreen = document.getElementById("game-screen");
        this.size = new Vector2(width, height);
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
        console.log("start pong game");

        this.possibleKeys.forEach((key) => {
            this.keyInputs[key] = false;
        });

        this.board = new Board(new Vector2(this.size.x * 0.5 - 100 * 0.5, this.size.y - 60), new Vector2(100, 20), "white", 7);
        this.ball = new Ball(new Vector2(this.size.x * 0.5 - 15 * 0.5, this.size.y * 0.5 - 15 * 0.5), new Vector2(15, 15), "white", 6);
        this.addEnemies();

        this.ball.setRandomUpVelocity();

        this.gameIntervalId = setInterval(this.gameLoop.bind(this), this.gameLoopFrecuency);
        this.gameScreen.style.display = "block";
    }

    addEnemies() {
        const curr = new Vector2(45, 20);
        const space = new Vector2(10, 10);
        const count = new Vector2(Math.floor((this.size.x - space.x) / (curr.x + space.x)), 5);
        const rest = (this.size.x - space.x) % (curr.x + space.x);
        for (let j = 0; j < count.y; j++) {
            for (let i = 0; i < count.x; i++) {
                const pos = new Vector2(
                    Math.floor(space.x + (rest * 0.5) + i * (curr.x + space.x)),
                    Math.floor(space.y + j * (curr.y + space.y))
                );
                const enemy = new Enemy(pos, curr, "white");
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
                        this.board.velocity.x = -1;
                    }
                    break;
                case "ArrowRight":
                case "d":
                    if (this.keyInputs[key] && !this.gameIsOver) {
                        this.board.velocity.x = 1;
                    }
                    break;
                case " ":
                    if (this.keyInputs[key] && !this.gameIsOver) {
                        //console.log(this.ball.position.x + "/" + this.ball.position.y);
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
        this.board.move();
        this.ball.move();

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
        const collidingX = this.ball.position.x < entity.position.x + entity.size.x &&
            this.ball.position.x + this.ball.size.x > entity.position.x;

        const collidingY = this.ball.position.y < entity.position.y + entity.size.y &&
            this.ball.position.y + this.ball.size.y > entity.position.y;

        if (collidingX && collidingY) {
            const overlapX = Math.min(
                (this.ball.position.x + this.ball.size.x) - entity.position.x,
                (entity.position.x + entity.size.x) - this.ball.position.x
            );
            const overlapY = Math.min(
                (this.ball.position.y + this.ball.size.y) - entity.position.y,
                (entity.position.y + entity.size.y) - this.ball.position.y
            );

            if (overlapX < overlapY) {
                this.ball.velocity.x *= -1;
            } else {
                this.ball.velocity.y *= -1;
            }

            entity.hit(this);
        }
    }

    checkCollisionsWorld() {
        if (this.ball.position.x < 0) {
            this.ball.velocity.x *= -1;
            this.ball.position.x *= -1;
        }
        else if (this.ball.position.x + this.ball.size.x > this.size.x) {
            this.ball.velocity.x *= -1;
            const max = this.size.x - this.ball.size.x;
            this.ball.position.x -= this.ball.position.x - max;
        }
        if (this.ball.position.y < 0) {
            this.ball.velocity.y *= -1;
            this.ball.position.y *= -1;
        }
        else if (this.ball.position.y + this.ball.size.y > this.size.y) {
            this.ball.velocity.x = 0;
            this.ball.velocity.y = 0
            this.gameIsOver = true;
        }
    }

    handleKey(e, state) {
        console.log("key " + e.key + " " + (state ? "down" : "up"));
        if (this.possibleKeys.includes(e.key)) {
            e.preventDefault();
            this.keyInputs[e.key] = state;
        }
    }
}