class GameObject {
    constructor(position, size, color) {
        this.position = position;
        this.size = size;
        this.element = document.createElement("div");
        const gameScreen = document.getElementById("game-screen");
        gameScreen.appendChild(this.element);
        this.element.style.position = "absolute";
        this.element.style.left = this.position.x + "px";
        this.element.style.top = this.position.y + "px";
        this.element.style.width = this.size.x + "px";
        this.element.style.height = this.size.y + "px";
        this.element.style.backgroundColor = color;
        this.element.style.borderRadius = 2 + "px";
    }

    updatePosition() {
        this.element.style.left = this.position.x + "px";
        this.element.style.top = this.position.y + "px";
    }
}