class Ball extends GameObject{
    constructor(position, size, color, speed) {
        super(position, size, color);
        this.element.style.borderRadius = 50 + "%";
        this.speed = speed;
        this.velocity = new Vector2();
    }

    setRandomUpVelocity() {
        const rnd = Math.random() * 90 - (90 + 45);
        this.velocity.x = Math.cos(rnd * deg2rad);
        this.velocity.y = Math.sin(rnd * deg2rad);
    }

    move() {
        this.position.x += this.velocity.x * this.speed;
        this.position.y += this.velocity.y * this.speed;
        this.updatePosition();
    }
}