class Enemy {
    constructor(game, color, x, y, width, height) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.element = document.createElement("div");
        game.gameScreen.appendChild(this.element);
        this.element.style.position = "absolute";
        this.element.style.width = this.width + "px";
        this.element.style.height = this.height + "px";
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
        this.element.style.backgroundColor = color;
        this.element.style.borderRadius = 5 + "%";
    }

    hit(game) {
        this.destroy(game);
    }

    destroy(game) {
        this.element.remove();
        var index = game.enemies.indexOf(this);
        if (index !== -1) {
            game.enemies.splice(index, 1);
        }
        else {
            console.log("ERROR: element has been removed already.");
        }
    }
}