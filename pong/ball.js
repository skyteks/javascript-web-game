class Ball extends GameObject {
    constructor(position, size, color, speed) {
        super(position, size, 0, color);
        this.element.style.borderRadius = 50 + "%";
        this.element.style.zIndex = 1;
        this.speed = speed;
        this.velocity = new Vector2();
    }

    randomizeVelocityAngle(cone) {
        let angle = Math.atan2(this.velocity.y, this.velocity.x) * rad2deg;
        const random = Math.random() * cone - cone * 0.5;
        angle -= random;
        this.velocity.x = Math.cos(angle * deg2rad);
        this.velocity.y = Math.sin(angle * deg2rad);
    }

    move() {
        this.position.x += this.velocity.x * this.speed;
        this.position.y += this.velocity.y * this.speed;
        this.updatePosition();
    }
}