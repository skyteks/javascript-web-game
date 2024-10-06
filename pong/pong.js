class PongGame extends Game {
    constructor(size, endCallback) {
        super(size, ["ArrowLeft", "ArrowRight", "a", "d"], endCallback);
        this.enemies = [];

        this.board = new Board(
            new Vector2(this.size.x * 0.5 - 100 * 0.5, this.size.y - 60),
            new Vector2(100, 20), "white", 7);
        this.ball = new Ball(
            new Vector2(this.size.x * 0.5 - 15 * 0.5, this.size.y * 0.5 - 15 * 0.5),
            new Vector2(15, 15), "white", 6);
        this.addEnemies();

        this.ball.velocity = new Vector2(0, -1);
        this.ball.randomizeVelocityAngle();
    }

    addEnemies() {
        const curr = new Vector2(45, 20);
        const space = new Vector2(10, 10);
        const count = new Vector2(Math.floor((this.size.x - space.x) / (curr.x + space.x)), 4);
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

    update() {
        this.board.move();
        this.ball.move();

        this.checkCollisionsWorld();
        this.checkCollisionsEntities();

        if (this.enemies.length == 0) {
            this.gameState = "victory";
        }
    }

    stop() {
        this.board.destroy();
        this.board = null;
        this.ball.destroy();
        this.ball = null;
        this.enemies.forEach((enemy) => {
            enemy.destroy();
        });
        this.enemies = [];
        super.stop();
    }

    checkCollisionsEntities() {
        let hit = this.checkCollisionWith(this.board);
        if (hit) {
        }
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const hit2 = this.checkCollisionWith(this.enemies[i], i);
            if (hit2) {
            }
            hit = hit || hit2;
        }
        if (hit) {
            this.ball.randomizeVelocityAngle();
            this.playSFX("pongblipf4_2.wav");
        }
    }

    checkCollisionWith(entity, index = null) {
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

            if (entity.hit() && index != null) {
                this.enemies.splice(index, 1);
            }
            return true;
        }
        return false;
    }

    checkCollisionsWorld() {
        let hitWall = false;
        if (this.ball.position.x < 0) {
            this.ball.velocity.x *= -1;
            this.ball.position.x *= -1;
            hitWall = true;
        }
        else if (this.ball.position.x + this.ball.size.x > this.size.x) {
            this.ball.velocity.x *= -1;
            const max = this.size.x - this.ball.size.x;
            this.ball.position.x -= this.ball.position.x - max;
            hitWall = true;
        }
        if (this.ball.position.y < 0) {
            this.ball.velocity.y *= -1;
            this.ball.position.y *= -1;
            hitWall = true;
        }
        else if (this.ball.position.y + this.ball.size.y > this.size.y) {
            this.ball.velocity.x = 0;
            this.ball.velocity.y = 0
            this.gameState = "defeat";
            this.playSFX("18787.mp3");
            return;
        }

        if (hitWall) {
            this.playSFX("pongblipf5_2.wav");
        }
    }

    readInputs() {
        super.readInputs();
        this.possibleKeys.forEach((key) => {
            switch (key) {
                case "ArrowLeft":
                case "a":
                    if (this.keyInputs[key] && !this.gameOver) {
                        this.board.velocity.x = -1;
                    }
                    break;
                case "ArrowRight":
                case "d":
                    if (this.keyInputs[key] && !this.gameOver) {
                        this.board.velocity.x = 1;
                    }
                    break;
                default:
                    break;
            }
        });
    }
}