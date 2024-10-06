class Bird extends GameObject {
    constructor(position, size, color, speed) {
        super(position, size, 0, color);
        this.element.style.borderRadius = 50 + "%";
        this.speed = speed;
        this.velocity = new Vector2();
        this.gravity = 0.005;
    }

    move() {
        this.velocity.y += this.gravity * game.gameLoopFrecuency;
        this.position.y += this.velocity.y * this.speed;
        this.updatePosition();
    }
}