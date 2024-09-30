class Board {
    constructor(game, color, speed) {
        this.width = 100;
        this.height = 20;
        this.x = game.width * 0.5 - this.width * 0.5;
        this.y = 530;
        this.speed = speed;
        this.dirX = 0;
        this.element = document.createElement("div", )
        game.gameScreen.appendChild(this.element);
        this.element.style.position = "absolute";
        this.element.style.width = this.width + "px";
        this.element.style.height = this.height + "px";
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
        this.element.style.backgroundColor = color;
    }

    move(game) {
        this.x += this.dirX * this.speed;
        this.x = clamp(this.x, 1, game.gameScreen.offsetWidth - this.width - 1);
        this.updatePosition();
        this.dirX = 0;
    }

    updatePosition() {
        this.element.style.left = this.x + "px";
    }
}