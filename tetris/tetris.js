class TetrisGame extends Game {
    constructor(size, endCallback) {
        super(size, ["ArrowLeft", "ArrowRight", "a", "d", "s", "q", "e", " ", "r"], endCallback);
        
    }
}