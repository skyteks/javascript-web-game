class AsteroidsGame extends Game {
    constructor(size, level, endCallback) {
        super(size, ["ArrowLeft", "ArrowRight", "a", "d", " "], level, endCallback);
        this.rocks = [];
        this.projectiles = [];

        const fighterSize = new Vector2(30, 50);
        this.fighter = new Fighter(
            new Vector2(this.size.x * 0.5 - fighterSize.x * 0.5, this.size.y - 60),
            fighterSize, "white", 6);
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
            const rnd = Math.random() * (this.size.x - (this.fighter.size.x * 2));
            let pos = new Vector2(this.fighter.size.x + rnd, start - offset);
            let size = new Vector2(minSize + Math.random() * wobble, minSize + Math.random() * wobble);
            const rock = new Rock(pos, size, "brown");
            this.rocks.push(rock);
        }
    }

    figherShoot() {
        const size = new Vector2(8, 16);
        const projectile = new Projectile(
            new Vector2(this.fighter.position.x + this.fighter.size.x * 0.5 - size.x * 0.5, this.fighter.position.y - size.y),
            size, "red", 10);
        this.projectiles.push(projectile);
    }

    update() {
        this.fighter.move();

        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];
            projectile.move();
            if (projectile.position.y < 0) {
                projectile.destroy();
                this.projectiles.splice(i, 1);
            }
        }

        for (let i = this.rocks.length - 1; i >= 0; i--) {
            const rock = this.rocks[i];
            rock.move(3);
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
        this.projectiles.forEach((projectile) => {
            projectile.destroy();
        });
        this.projectiles = [];
        this.rocks.forEach((rock) => {
            rock.destroy();
        });
        this.rocks = [];
        super.stop();
    }

    checkCollisionsEntities() {
        for (let i = this.rocks.length - 1; i >= 0; i--) {
            const rock = this.rocks[i];
            if (this.checkCollisionWith(rock, this.fighter)) {
                this.fighter.destroy();
                rock.destroy();
                this.rocks.splice(i, 1);
                this.gameState = "defeat";
                this.playSound("gameOver");
            }
        }
        for (let j = this.projectiles.length - 1; j >= 0; j--) {
            const projectile = this.projectiles[j];
            for (let i = this.rocks.length - 1; i >= 0; i--) {
                const rock = this.rocks[i];
                if (this.checkCollisionWith(rock, projectile)) {
                    projectile.destroy();
                    this.projectiles.splice(j, 1);
                    rock.destroy();
                    this.rocks.splice(i, 1);
                    this.playSound("hit");
                    break;
                }
            }
        }
    }

    checkCollisionWith(a, b) {
        const magnitude = b.size.magnitude();

        const collidingX = a.position.x < b.position.x + b.size.x &&
            a.position.x + this.fighter.size.x > b.position.x;

        const collidingY = a.position.y < b.position.y + b.size.y &&
            a.position.y + a.size.y > b.position.y;

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
                        this.keyInputs[key] = false;
                        this.figherShoot();
                        this.playSound("shoot");
                    }
                    break;
            }
        });
    }

    playSound(key) {
        switch (key) {
            case "shoot":
                this.playSFX("pongblipd3.wav");
                break;
            case "hit":
                this.playSFX("pongblipc4_2.wav");
                break;
            case "gameOver":
                this.playSFX("18787.mp3");
                break;
        }
    }
}