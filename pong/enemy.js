class Enemy extends GameObject {
    constructor(position, size, color) {
        super(position, size, 0, color);
    }

    hit() {
        return true;
    }
}