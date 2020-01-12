class Board
{
    constructor(width, height)
    {
        this.size = {width: width, height: height}
        this.balls = new Set([])
        this.verticalWalls = new Array(13)
        this.horizontalWalls = new Array(13)
        this.Orientation = {beta: 0, gamma: 0}
        this.createDiv()
    }

    createDiv()
    {
        if(this.div != null)
            return
        
        this.div = document.createElement("DIV")
        this.div.classList = "board"
        this.div.style.width = `${this.size.width}px`
        this.div.style.height = `${this.size.height}px`
    }



    addVerticalWall(x, startY, EndY)
    {
        this.verticalWalls[x] = {start: startY, end: EndY}
    }

    addHorizontalWall(y, startX, EndX)
    {
        this.verticalWalls[y] = {start: startX, end: EndX}
    }

    addBall(ball)
    {
        this.balls.add(new BallManager(ball, this))
        this.div.appendChild(ball.div)
    }

    update(Orientation)
    {
        this.Orientation = Orientation
        this.balls.forEach(ball => {
            ball.update()
        });
    }

}

class BallManager{
    constructor(ball, board)
    {        
        if(!(ball instanceof Ball))
            throw Error(`Cannot create BallManager of ${typeof(ball)}.`)
        this.ball = ball


        this.board = board
    }

    translateSpeed(x, y)
    {
        this.ball.speed.x *= x
        this.ball.speed.y *= y
    }

    moveBy(x, y)
    {
        let destinationPositionX = this.ball.position.x+x
        let destinationPositionY = this.ball.position.y+y
        if(destinationPositionX-this.ball.size<0)
        {
            destinationPositionX = this.ball.size
            this.translateSpeed(-0.3, 1)
        }
            
        if(destinationPositionX+this.ball.size>this.board.size.width)
        {
            destinationPositionX = this.board.size.width - this.ball.size
            this.translateSpeed(-0.3, 1)
        }

        if(destinationPositionY-this.ball.size<0)
        {
            destinationPositionY = this.ball.size
            this.translateSpeed(1, -0.3)
        }
            
        if(destinationPositionY+this.ball.size>this.board.size.height)
        {
            destinationPositionY = this.board.size.height - this.ball.size
            this.translateSpeed(1, -0.3)
        }
            
        this.ball.moveTo(destinationPositionX, destinationPositionY)
    }

    update()
    {
        this.ball.speed.x += Math.sin(this.board.Orientation.gamma) - this.ball.speed.x/30
        this.ball.speed.y += Math.sin(this.board.Orientation.beta) - this.ball.speed.y/30
        this.moveBy(this.ball.speed.x, this.ball.speed.y)
    }


}