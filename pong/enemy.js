class Enemy {
    constructor(gameScreen, color, x, y, width, height) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.element = document.createElement("div");
        gameScreen.appendChild(this.element);
        this.element.style.position = "absolute";
        this.element.style.width = this.width + "px";
        this.element.style.height = this.height + "px";
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
        this.element.style.backgroundColor = color;
        this.element.style.borderRadius = 5 + "%";
    }
}