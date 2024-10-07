class AsteroidsGame extends Game {
    constructor(size, level, endCallback) {
        super(size, ["ArrowLeft", "ArrowRight", "a", "d", " "], level, endCallback);
        this.rocks = [];

        const fighterSize = new Vector2(30, 50);
        this.fighter = new Fighter(
            new Vector2(this.size.x * 0.5 - fighterSize.x * 0.5, this.size.y - 60),
            fighterSize, "white", 4);
        this.addRocks();
    }

    addRocks() {
        const count = 20;
        const start = this.size.y * 0.1;
        const minSize = 40;
        const wobble = 30;
        let offset = 0;
        for (let i = 0; i < count; i++) {
            const space = this.size.y * Math.random();
            offset += space;
            const rnd = Math.random() * (this.size.x - (this.fighter.size.x * 1));
            let pos = new Vector2((this.fighter.size.x * 1) + rnd, start - offset);
            let size = new Vector2(minSize + Math.random() * wobble, minSize + Math.random() * wobble);
            const rock = new Rock(pos, size, "brown");
            this.rocks.push(rock);
        }
    }

    update() {
        this.fighter.move();

        for (let i = this.rocks.length - 1; i >= 0; i--) {
            const rock = this.rocks[i];
            rock.move(this.fighter.speed);
            if (rock.position.y > this.size.y) {
                rock.destroy();
                this.rocks.splice(i, 1);
            }
        }

        this.checkCollisionsWorld();
        this.checkCollisionsEntities();

        if (this.rocks.length == 0) {
            this.gameState = "victory";
        }
    }

    stop() {
        if (this.fighter) {
            this.fighter.destroy();
            this.fighter = null;
        }
        this.rocks.forEach((rock) => {
            rock.destroy();
        });
        this.rocks = [];
        super.stop();
    }

    checkCollisionsEntities() {
        let hit = this.checkCollisionWith(this.fighter);
        if (hit) {
            this.playSound("hitBoard");
        }
        for (let i = this.rocks.length - 1; i >= 0; i--) {
            const hit2 = this.checkCollisionWith(this.rocks[i], i);
            hit = hit || hit2;
            if (hit2) {
                this.playSound("hitBrick");
            }
        }
    }

    checkCollisionWith(entity, index = null) {
        const collidingX = this.fighter.position.x < entity.position.x + entity.size.x &&
            this.fighter.position.x + this.fighter.size.x > entity.position.x;

        const collidingY = this.fighter.position.y < entity.position.y + entity.size.y &&
            this.fighter.position.y + this.fighter.size.y > entity.position.y;

        if (collidingX && collidingY) {
            return true;
        }
        return false;
    }

    checkCollisionsWorld() {

    }

    readInputs() {
        super.readInputs();
        this.possibleKeys.forEach((key) => {
            switch (key) {
                case "ArrowLeft":
                case "a":
                    if (this.keyInputs[key] && this.gameState == "running") {
                        this.fighter.velocity.x = -1;
                    }
                    break;
                case "ArrowRight":
                case "d":
                    if (this.keyInputs[key] && this.gameState == "running") {
                        this.fighter.velocity.x = 1;
                    }
                    break;
                case " ":
                    if (this.keyInputs[key] && this.gameState == "running") {
                    }
                    break;
            }
        });
    }

    playSound(key) {
        switch (key) {
            case "flap":
                this.playSFX("pongblipd3.wav");
                break;
            case "gameOver":
                this.playSFX("18787.mp3");
                break;
        }
    }
}