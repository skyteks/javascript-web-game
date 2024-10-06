class TetrisGame extends Game {
    constructor(size, level, endCallback) {
        super(size, ["ArrowLeft", "ArrowRight", "a", "d", "s", "q", "e", " ", "r"], level, endCallback);
        
    }
}