class PongGame extends Game {
    constructor(size, level, endCallback) {
        super(size, ["ArrowLeft", "ArrowRight", "a", "d"], level, endCallback);
        this.enemies = [];

        const boardSize = new Vector2(100, 20);
        this.board = new Board(
            new Vector2(this.size.x * 0.5 - boardSize.x * 0.5, this.size.y - 60),
            boardSize, "white", 7);
        let ballSize = new Vector2(12, 12);
        this.ball = new Ball(
            new Vector2(this.size.x * 0.5 - ballSize.x * 0.5, this.size.y - 75 - ballSize.y * 0.5),
            ballSize, "cyan", 8);
        this.addEnemies();

        this.ball.velocity = new Vector2(0, -1);
        this.ball.randomizeVelocityAngle(90);
    }

    addEnemies() {
        const count = 8;
        const space = 90;
        const size = new Vector2(space, space * 0.45);
        const rest = this.size.x - size.x * count;
        const gap = rest / (count + 1);
        const rows = 7;
        for (let j = 0; j < rows; j++) {
            for (let i = 0; i < count; i++) {
                const pos = new Vector2(gap + i * (size.x + gap), gap + j * (size.y + gap));
                const enemy = new Enemy(pos, size, "white");
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
        if (this.board) {
            this.board.destroy();
            this.board = null;
        }
        if (this.ball) {
            this.ball.destroy();
            this.ball = null;
        }
        this.enemies.forEach((enemy) => {
            enemy.destroy();
        });
        this.enemies = [];
        super.stop();
    }

    checkCollisionsEntities() {
        let hit = this.checkCollisionWith(this.board);
        if (hit) {
            this.playSound("hitBoard");
        }
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const hit2 = this.checkCollisionWith(this.enemies[i], i);
            hit = hit || hit2;
            if (hit2) {
                this.playSound("hitBrick");
                this.ball.randomizeVelocityAngle(45);
            }
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
            ) * Math.sign(this.ball.position.x - entity.position.x);
            const overlapY = Math.min(
                (this.ball.position.y + this.ball.size.y) - entity.position.y,
                (entity.position.y + entity.size.y) - this.ball.position.y
            ) * Math.sign(this.ball.position.y - entity.position.y);;

            if (Math.abs(overlapX) < Math.abs(overlapY)) {
                this.ball.velocity.x *= -1;
                this.ball.position.x += overlapX;
            } else {
                this.ball.velocity.y *= -1;
                this.ball.position.y += overlapY;
            }
            this.ball.updatePosition();

            if (entity.hit() && index != null) {
                entity.destroy();
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
            if (false) {
                this.ball.velocity.y *= -1;
                const max = this.size.y - this.ball.size.y;
                this.ball.position.y -= this.ball.position.y - max;
                hitWall = true;
            }
            else {
                this.ball.velocity.x = 0;
                this.ball.velocity.y = 0
                this.gameState = "defeat";
                this.playSound("gameOver");
                return;
            }
        }

        if (hitWall) {
            this.playSound("hitWall");
        }
    }

    readInputs() {
        super.readInputs();
        this.possibleKeys.forEach((key) => {
            switch (key) {
                case "ArrowLeft":
                case "a":
                    if (this.keyInputs[key] && this.gameState == "running") {
                        this.board.velocity.x = -1;
                    }
                    break;
                case "ArrowRight":
                case "d":
                    if (this.keyInputs[key] && this.gameState == "running") {
                        this.board.velocity.x = 1;
                    }
                    break;
            }
        });
    }

    playSound(key) {
        switch (key) {
            case "hitWall":
                this.playSFX("pongblipf4_2.wav");
                break;
            case "hitBrick":
            case "hitBoard":
                this.playSFX("pongblipf5_2.wav");
                break;
            case "gameOver":
                this.playSFX("18787.mp3");
                break;
        }
    }
}