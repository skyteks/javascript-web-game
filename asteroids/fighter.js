class Fighter extends GameObject {
    constructor(position, size, color, speed) {
        super(position, size, 1, color);
        this.element.style.borderRadius = 40 + "%";
        this.speed = speed;
        this.velocity = new Vector2();
    }

    move() {
        this.position.x += this.velocity.x * this.speed;
        this.position.x = clamp(this.position.x, 1, game.gameScreen.offsetWidth - this.size.x - 1);
        this.velocity.x = 0;
        this.updatePosition();
    }

    hit() {
    }
}