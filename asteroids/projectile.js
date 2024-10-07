class Projectile extends GameObject {
    constructor(position, size, color, speed) {
        super(position, size, 0, color);
        this.element.style.borderRadius = 50 + "%";
        this.speed = speed;
    }

    move() {
        this.position.y -= this.speed;
        this.updatePosition();
    }
}