class Menu {
    constructor(position, size, layer, id, visibility) {
        this.position = position;
        this.size = size;
        this.element = document.getElementById(id);
        this.element.style.position = "absolute";
        this.element.style.left = this.position.x + "px";
        this.element.style.top = this.position.y + "px";
        this.element.style.width = this.size.x + "px";
        this.element.style.height = this.size.y + "px";
        this.element.style.zIndex = layer + 100;
        this.toggleVisibility(visibility);
    }

    toggleVisibility(state) {
        this.element.style.display = state ? "block" : "none";
    }
}