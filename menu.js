class Menu extends GameObject {
    constructor(position, size, layer, color, childElements) {
        super(position, size, layer, color);
        this.childElements = childElements;
        this.element.innerHTML = childElements;
    }
}