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
        this.div.style.top = y+"px"
        this.div.style.left = x+"px"
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
        let destinationPositionX = this.position.x+x
        let destinationPositionY = this.position.y+y

        if(destinationPositionX-this.size<0)
        {
            destinationPositionX = this.size
            this.translateSpeed(-0.3, 1)
        }
            
        if(destinationPositionX+this.size>this.board.size.width)
        {
            destinationPositionX = this.board.size.width - this.size
            this.translateSpeed(-0.3, 1)
        }

        if(destinationPositionY-this.size<0)
        {
            destinationPositionY = this.size
            this.translateSpeed(1, -0.3)
        }
            
        if(destinationPositionY+this.size>this.board.size.height)
        {
            destinationPositionY = this.board.size.height - this.size
            this.translateSpeed(1, -0.3)
        }
            
        this.moveTo(destinationPositionX, destinationPositionY)
    }

    translateSpeed(x, y)
    {
        this.speed.x *= x
        this.speed.y *= y
    }


    update()
    {
        this.speed.x += Math.sin(this.board.Orientation.gamma) - this.speed.x/30
        this.speed.y += Math.sin(this.board.Orientation.beta) - this.speed.y/30
        this.moveBy(this.speed.x, this.speed.y)
    }

    distanceTo(x, y)
    {
        let deltaX = x - this.position.x
        let deltaY = y - this.position.y
        return Math.sqrt(Math.pow(deltaX , 2) + Math.pow(deltaY , 2)) - this.size
    }


    update()
    {
        this.speed.x += Math.sin(this.board.Orientation.gamma) - this.speed.x/30
        this.speed.y += Math.sin(this.board.Orientation.beta) - this.speed.y/30
        this.moveBy(this.speed.x, this.speed.y)
    }

    createDiv()
    {
        this.div = document.createElement("DIV")
        this.div.setAttribute("class", "ball")
    }
}


