class Circle{

    constructor(size, color ,x, y, board)
    {
        if (size < 0)
            throw Error("To create circle use nonnegative value.")
        this.board = board
        this.createDiv()
        this.setSize(size)
        this.setColor(color)
        this.setPosition(x, y)
    }

    setSize(size)
    {
        this.size = size
        this.div.style.width = this.size*2+"px"
        this.div.style.height = this.size*2+"px"
    }

    setPosition(x, y)
    {
        this.position = {x: x, y: y}
        this.div.style.top = y+this.size+"px"
        this.div.style.left = x+this.size+"px"
    }

    setColor(color)
    {
        this.color = color
        this.div.style.background = this.color
    }

    createDiv()
    {
        this.div = document.createElement("DIV")
    }

}


class Ball extends Circle{
    constructor(size, color ,x, y, board)
    {
        super(size, color, x, y, board)
        this.speed = {x: 0, y: 0}
    }


    moveTo(x, y)
    {
        this.setPosition(x, y)
    }

    moveBy(x, y)
    {
        this.moveTo(this.position.x+x, this.position.y+y)
    }

    translateSpeed(x, y)
    {
        this.speed.x *= x
        this.speed.y *= y
    }

    distanceTo(x, y)
    {
        let deltaX = x - this.position.x - this.size
        let deltaY = y - this.position.y - this.size
        return Math.sqrt(Math.pow(deltaX , 2) + Math.pow(deltaY , 2)) - this.size
    }

    createDiv()
    {
        this.div = document.createElement("DIV")
        this.div.setAttribute("class", "ball")
    }
}


