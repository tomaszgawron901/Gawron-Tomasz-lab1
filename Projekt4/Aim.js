class Aim extends Circle {
    static initialSize = 40

    constructor(x, y, board)
    {
        super(Aim.initialSize, "gray", x, y, board)
    }

    remove()
    {
        this.board.removeAim(this)
    }

    createDiv()
    {
        this.div = document.createElement("DIV")
        this.div.setAttribute("class", "aim")
    }
}