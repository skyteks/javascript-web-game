class Ball {
    constructor(game, color, speed) {
        this.width = 15;
        this.height = this.width;
        this.x = 400 - this.width * 0.5;
        this.y = 300 - this.height * 0.5;
        this.speed = speed;
        this.dirX = 0;
        this.dirY = 0;
        this.element = document.createElement("div");
        game.gameScreen.appendChild(this.element);
        this.element.style.position = "absolute";
        this.element.style.width = this.width + "px";
        this.element.style.height = this.height + "px";
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
        this.element.style.backgroundColor = color;
        this.element.style.borderRadius = 50 + "%";
    }

    startRandom() {
        const rnd = Math.random() * 90 - (90 + 45);
        this.dirX = Math.cos(rnd * deg2rad);
        this.dirY = Math.sin(rnd * deg2rad);
    }

    move(game) {
        this.x += this.dirX * this.speed;
        this.y += this.dirY * this.speed;
        //this.x = clamp(this.x, 0, game.gameScreen.offsetWidth - this.width);
        //this.y = clamp(this.y, 0, game.gameScreen.offsetHeight - this.height);
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
    }
}