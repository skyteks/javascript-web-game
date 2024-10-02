class Board extends GameObject {
    constructor(position, size, color, speed) {
        super(position, size, color);
        this.speed = speed;
        this.velocity = new Vector2();
    }

    move() {
        this.position.x += this.velocity.x * this.speed;
        this.position.x = clamp(this.position.x, 1, game.gameScreen.offsetWidth - this.size.x - 1);
        this.updatePosition();
        this.velocity.x = 0;
    }

    hit() {
    }
}