class FlappyGame extends Game {
    constructor(width, height, debugStepping = false) {
        super(width, height, ["ArrowUp", "w", " "], debugStepping);
        this.pillars = [];

        this.bird = new Bird(
            new Vector2(this.size.x * 0.1, this.size.y * 0.5 - 40 * 0.5),
            new Vector2(50, 40), "yellow", 8);
    }

    update() {
        this.bird.move();
        this.checkCollisionsWorld();
    }

    checkCollisionsWorld() {
        if (this.bird.position.y < 0) {
            this.bird.velocity.y = 0;
            this.bird.position.y *= -1;
        }
        else if (this.bird.position.y + this.bird.size.y > this.size.y) {
            this.bird.velocity.y = 0
            this.gameOver = true;
        }
    }

    readInputs() {
        super.readInputs();
        this.possibleKeys.forEach((key) => {
            switch (key) {
                case "ArrowUp":
                case "w":
                case " ":
                    if (this.keyInputs[key] && !this.gameOver) {
                        this.bird.velocity.y = -1;
                        this.keyInputs[key] = false;
                    }
                    break;
            }
        });
    }
}