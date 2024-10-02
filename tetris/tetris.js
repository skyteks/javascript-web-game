class TetrisGame extends Game {
    constructor(width, height, debugStepping = false) {
        super(width, height, ["ArrowLeft", "ArrowRight", "a", "d", "s", "q", "e", " ", "r"], debugStepping);
        
    }
}