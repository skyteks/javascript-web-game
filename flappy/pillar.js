class Pillar extends GameObject {
    constructor(position, size, color) {
        super(position, size, 0, color);
    }

    move(speed) {
        this.position.x -= speed;
        this.updatePosition();
    }
}