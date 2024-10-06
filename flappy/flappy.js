class FlappyGame extends Game {
    constructor(size, level, endCallback) {
        super(size, ["ArrowUp", "w", " "], level, endCallback);
        this.pillars = [];

        this.bird = new Bird(
            new Vector2(this.size.x * 0.1, this.size.y * 0.5 - 40 * 0.5),
            new Vector2(50, 40), "yellow", 8);
        this.addPillars();
    }

    addPillars() {
        const gap = this.bird.size.y * 3;
        const space = this.size.x * 0.5;
        for (let i = 0; i < 30; i++) {
            let pos = new Vector2(this.size.x * 0.9 + space * i, 0);
            const rnd = Math.random() * (this.size.y - (gap + this.bird.size.y * 2));
            let size = new Vector2(50, rnd);
            const pillar1 = new Pillar(pos, size, "green");
            pos = Vector2.add(pos, new Vector2(0, rnd + gap));
            size = new Vector2(size.x, this.size.y - pos.y);
            const pillar2 = new Pillar(pos, size, "green");
            this.pillars.push(pillar1);
            this.pillars.push(pillar2);
        }
    }

    update() {
        this.bird.move();
        this.pillars.forEach((pillar) => {
            pillar.move(this.bird.speed);
        });
        this.checkCollisionsWorld();
        this.checkCollisionsEntities();
    }

    stop() {
        this.bird.destroy();
        this.bird = null;
        this.pillars.forEach((pillar) => {
            pillar.destroy();
        });
        this.pillars = [];
        super.stop();
    }

    checkCollisionsEntities() {
        for (let i = this.pillars.length - 1; i >= 0; i--) {
            let hit = this.checkCollisionWith(this.pillars[i], i);
            if (hit) {
                this.gameState = "defeat";
                this.playSFX("18787.mp3");
                return;
            }
        }
    }

    checkCollisionWith(entity, index = null) {
        const collidingX = this.bird.position.x < entity.position.x + entity.size.x &&
            this.bird.position.x + this.bird.size.x > entity.position.x;

        const collidingY = this.bird.position.y < entity.position.y + entity.size.y &&
            this.bird.position.y + this.bird.size.y > entity.position.y;

        if (collidingX && collidingY) {
            return true;
        }
        return false;
    }

    checkCollisionsWorld() {
        if (this.bird.position.y < 0) {
            this.bird.velocity.y = 0;
            this.bird.position.y *= -1;
        }
        else if (this.bird.position.y + this.bird.size.y > this.size.y) {
            this.bird.velocity.y = 0;
            this.gameState = "defeat";
            this.playSFX("18787.mp3");
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