function distanceBetween(point1, point2) {
    return Math.sqrt( Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2) )
}

function isBetween(obj, objStart, objEnd) {
    if(objStart > objEnd)
    {
        let tmp = objStart
        objStart = objEnd
        objEnd = tmp
    }
    return obj >= objStart && obj <= objEnd
}


class Board
{
    constructor(width, height)
    {
        this.size = {width: width, height: height}
        this.Orientation = {beta: 0, gamma: 0}
        this.aims = new Set([])
        this.ballsManager = new BallsManager()
        this.obstacles = new Array()
        this.obstacles.push(new verticalWall(200, -100, 1000))//----------------
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


    addBall(size, color, x, y)
    {
        let ball = new Ball(size, color, x, y, this)
        this.ballsManager.add(ball)
        this.div.appendChild(ball.div)
    }

    addAim(x, y)
    {
        let newAim = new Aim(x, y, this)
        this.aims.add(newAim)
        this.div.appendChild(newAim.div)
    }

    removeAim(aim)
    {
        if(!this.aims.delete(aim))
            return
        this.div.removeChild(aim.div)
    }

    update(Orientation, timePeriod)
    {
        this.Orientation = Orientation
        this.ballsManager.updateSpeed(this.Orientation, timePeriod)
        this.ballsManager.updatePosition(this ,timePeriod)
    }

}


class BallsManager{
    constructor()
    {
        this.balls = new Set([])
    }

    add(ball)
    {
        this.balls.add(ball)
    }

    
    updateSpeed(boardOrientation, timePeriod)//timePeriod in seconds.
    {
        let additionalSpeedX = Math.sin(boardOrientation.gamma)*1000*timePeriod
        let additionalSpeedY = Math.sin(boardOrientation.beta)*1000*timePeriod
        this.balls.forEach(ball => {
            ball.speed.x += additionalSpeedX - ball.speed.x*timePeriod
            ball.speed.y += additionalSpeedY - ball.speed.y*timePeriod
        });
    }

    updatePosition(board, timePeriod)//timePeriod in seconds.
    {
        this.balls.forEach(ball => {
            let destinationPosition = {x: ball.position.x + ball.speed.x*timePeriod, y: ball.position.y + ball.speed.y*timePeriod}
            new BallMove(ball, destinationPosition, board.obstacles).execute()
            ball.moveBy(ball.speed.x*timePeriod, ball.speed.y*timePeriod)
            this.baunceBallIfOutsideBoard(ball,board.size.width, board.size.height)
        });
    }

    baunceBallIfOutsideBoard(ball, boardWidth, boardHeight)
    {
        let desPositionX = ball.position.x
        let desPositionY = ball.position.y

        let output = false

        if(ball.position.x<0)
        {
            desPositionX = 0
            ball.translateSpeed(-0.3, 1)
            output = true
        }
        else if(ball.position.x>boardWidth-ball.size*2)
        {
            desPositionX = boardWidth - ball.size*2
            ball.translateSpeed(-0.3, 1)
            output = true
        }


        if(ball.position.y<0)
        {
            desPositionY = 0
            ball.translateSpeed(1, -0.3)
            output = true
        }else if(ball.position.y>boardHeight-ball.size*2)
        {
            desPositionY = boardHeight - ball.size*2
            ball.translateSpeed(1, -0.3)
            output = true
        }

        ball.moveTo(desPositionX, desPositionY)
        return output
    }


    
}


class horizontalWall{
    constructor(y, xStart, xEnd){
        this.y = y
        if(xStart > xEnd)
        {
            this.xStart = xEnd
            this.xEnd = xStart
        }
        else{
            this.xStart = xStart
            this.xEnd = xEnd
        }
        this.line = new Line(0, 1, -y)
    }

    contains(point)
    {
        return point.y == this.y && isBetween(point.x, this.xStart, this.xEnd)
    }

    getWallMovedHorizontaly(distance)
    {
        return new horizontalWall(this.y, this.xStart+distance, this.xEnd+distance)
    }

    getWallMovedVerticaly(distance)
    {
        return new horizontalWall(this.y+distance, this.xStart, this.yStart)
    }

}

class verticalWall{
    constructor(x, yStart, yEnd){
        this.x = x
        if(yStart > yEnd){
            this.yStart = yEnd
            this.yEnd = yStart
        }
        else{
            this.yStart = yStart
            this.yEnd = yEnd
        }
        this.line = new Line(1, 0, -x)
    }

    contains(point)
    {
        return point.x == this.x && isBetween(point.y, this.yStart, this.yEnd)
    }

    getWallMovedHorizontaly(distance)
    {
        return new verticalWall(this.x+distance, this.yStart, this.yEnd)
    }

    getWallMovedVerticaly(distance)
    {
        return new verticalWall(this.x, this.yStart+distance, this.yEnd+distance)
    }
}


class BallMove{
    constructor(ball, destinationPosition, obstacles)
    {
        this.ball = ball
        this.destinationPosition = destinationPosition
        this.botLeft = this.getBottomLeftPosition()
        this.topRight = this.getTopRightPosition()
        this.obstacles = this.getAcceptableObstacles(obstacles)
    }

    getBottomLeftPosition()
    {
        let x
        if(this.ball.position.x > this.destinationPosition.x)
            x = this.destinationPosition.x
        else
            x = this.ball.position.x
        
        let y
        if(this.ball.position.y > this.destinationPosition.y)
            y = this.destinationPosition.y
        else
            y = this.ball.position.y
        return {x: x, y: y}
    }

    getTopRightPosition()
    {
        let x
        if(this.ball.position.x < this.destinationPosition.x)
            x = this.destinationPosition.x
        else
            x = this.ball.position.x
        
        let y
        if(this.ball.position.y < this.destinationPosition.y)
            y = this.destinationPosition.y
        else
            y = this.ball.position.y
        return {x: x, y: y}
    }

    isMoving()
    {
        return !(this.ball.position.x == this.destinationPosition.x && this.ball.position.y == this.destinationPosition.y)
    }

    execute()
    {
        if(!this.isMoving()) return
        this.line = Line.create(this.ball.position, this.destinationPosition)
        if(this.obstacles.length == 0) return

        let nearestObstacle = this.findNearestObstackle()
        if(nearestObstacle == null) return

        this.ball.moveTo(nearestObstacle.position.x, nearestObstacle.position.y)
        if(nearestObstacle.obstacle instanceof verticalWall)
        {
            this.ball.translateSpeed(-0.3, 1)
        }
        else if(nearestObstacle.obstacle instanceof horizontalWall)
        {
            this.ball.translateSpeed(1, -0.3)
        }
    }

    findNearestObstackle()
    {
        let nearestObstacle = null
        this.obstacles.forEach(obstacle => {
            if(this.line.isVertical() && obstacle.line.isVertical())
            {
                console.log("vv");
                
            }else if(this.line.isHorizontal() && obstacle.line.isHorizontal())
            {
                console.log("hh");
                
            }else{
                let dummyWals = new Array(2)
                if(obstacle instanceof horizontalWall)
                {
                    dummyWals[0] = obstacle.getWallMovedVerticaly(this.ball.size)
                    dummyWals[1] = obstacle.getWallMovedVerticaly(-this.ball.size)

                }else if(obstacle instanceof verticalWall)
                {
                    dummyWals[0] = obstacle.getWallMovedHorizontaly(this.ball.size)
                    dummyWals[1] = obstacle.getWallMovedHorizontaly(-this.ball.size)
                }

                dummyWals.forEach(dummyWal => {
                    let commonPoint = dummyWal.line.getCommonPoint(this.line)
                    if(dummyWal.contains(commonPoint) )
                    {
                        if(commonPoint.x >= this.botLeft.x && commonPoint.x <= this.topRight.x 
                            && commonPoint.y >= this.botLeft.y && commonPoint.y <= this.topRight.y)
                        {
                            let distanceToBall = distanceBetween(this.ball.position, commonPoint)
                            if(nearestObstacle == null || distanceToBall < nearestObstacle.distance)
                            {
                                nearestObstacle = {position: commonPoint, distance: distanceToBall, obstacle: obstacle}
                            }
                        }
                    }
                });
            }
        });
        return nearestObstacle
    }

    getAcceptableObstacles(obstacles)
    {
        let acceptableObstacles = new Array()

        obstacles.forEach(obstacle => {
            if(obstacle instanceof horizontalWall)
            {
                if(
                    (obstacle.y <= this.topRight.y + this.size && obstacle.y >= this.botLeft.y - 30) 
                    && !( 
                            (obstacle.xStart < this.botLeft.x && obstacle.xEnd < this.botLeft.x) 
                            || ( obstacle.xStart > this.topRight.x && obstacle.xEnd > this.topRight.x )
                        )
                ) 
                { 
                    acceptableObstacles.add(obstacle) 
                }

            }else if(obstacle instanceof verticalWall)
            {
                if(
                    (obstacle.x <= this.topRight.x + 30 && obstacle.x >= this.botLeft.x - 30) 
                    && !( 
                            (obstacle.yStart < this.botLeft.y && obstacle.yEnd < this.botLeft.y) 
                            || ( obstacle.yStart > this.topRight.y && obstacle.yEnd > this.topRight.y )
                        )
                ) 
                { 
                    acceptableObstacles.push(obstacle) 
                }
            }
        });
        return acceptableObstacles
    }


}

