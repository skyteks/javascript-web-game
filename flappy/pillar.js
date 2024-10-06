class Pillar extends GameObject {
    constructor(position, size, color) {
        super(position, size, 0, color);
        this.velocity = new Vector2();
        this.gravity = 0.005;
    }

    move(speed) {
        this.position.x -= speed;
        this.updatePosition();
    }
}