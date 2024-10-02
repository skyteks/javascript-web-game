class Enemy extends GameObject {
    constructor(position, size, color) {
        super(position, size, color);
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
            throw new Error("ERROR: element has been removed already.");
        }
    }
}