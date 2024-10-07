class Rock extends GameObject {
    constructor(position, size, color) {
        super(position, size, 0, color);
        const rnd1 = Math.random() * 60 + 10;
        const rnd2 = Math.random() * 60 + 10;
        this.element.style.borderTopLeftRadius = rnd1 + "%";
        this.element.style.borderTopRightRadius = rnd2 + "%";
        this.element.style.borderBottomRightRadius = rnd1 + "%";
        this.element.style.borderBottomLeftRadius = rnd2 + "%";
        this.velocity = new Vector2();
        this.rotation = Math.random() * 360;
        const spin = 3;
        this.rotationSpeed = Math.random() * spin * 2 - spin;
    }

    move(speed) {
        this.position.y += speed;
        this.rotation += this.rotationSpeed;
        this.rotation %= 360;
        this.updatePosition();
    }

    updatePosition() {
        super.updatePosition();
        this.element.style.transform = "rotate(" + this.rotation + "deg)";
    }
}