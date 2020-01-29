class BallMove{
    constructor(ball, destinationPosition, obstacles)
    {
        this.ball = ball
        this.destinationPosition = destinationPosition
        this.botLeft = this.getBottomLeftPosition()
        this.topRight = this.getTopRightPosition()
        this.obstacles = this.getAcceptableObstacles(obstacles)
    }

    updateLine()
    {
        this.line = Line.create(this.ball.position, this.destinationPosition)
        this.botLeft = this.getBottomLeftPosition()
        this.topRight = this.getTopRightPosition()
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

    contains(point)
    {

        return point.x >= this.botLeft.x && point.x <= this.topRight.x && point.y >= this.botLeft.y && point.y <= this.topRight.y
    }

    execute()
    {
        if(!this.isMoving()) return
        this.updateLine()
        if(this.obstacles.length == 0) return

        this.bounceOfTheWall()

        this.ball.moveTo(this.destinationPosition.x, this.destinationPosition.y)
    }

    bounceOfTheWall()
    {
        let bounceHorizontaly = false
        let bounceVerticaly = false
        this.obstacles.forEach(obstacle => {
            if( !( (this.line.isVertical() && obstacle.line.isVertical()) || (this.line.isHorizontal() && obstacle.line.isHorizontal())) )
            {
                let dummyWals = new Array(2)
                if(obstacle instanceof horizontalWall)
                {
                    dummyWals[0] = obstacle.getWallMovedVerticaly(this.ball.size)
                    dummyWals[1] = obstacle.getWallMovedVerticaly(-this.ball.size)

                    dummyWals.forEach(dummyWal => {
                        bounceHorizontaly = true
                        let commonPoint = dummyWal.line.getCommonPoint(this.line)
                        if(dummyWal.contains(commonPoint) && this.contains(commonPoint))
                        {
                            this.destinationPosition.y = dummyWal.y
                            this.updateLine()
                        }
                    });

                }else if(obstacle instanceof verticalWall)
                {
                    dummyWals[0] = obstacle.getWallMovedHorizontaly(this.ball.size)
                    dummyWals[1] = obstacle.getWallMovedHorizontaly(-this.ball.size)

                    dummyWals.forEach(dummyWal => {
                        bounceVerticaly = true
                        let commonPoint = dummyWal.line.getCommonPoint(this.line)
                        if(dummyWal.contains(commonPoint) && this.contains(commonPoint))
                        {
                            this.destinationPosition.x = dummyWal.x
                            this.updateLine()
                        }
                    });
                }


            }
            // obstacle.getEndPoints().forEach(endPoint => {

            //     let commonPoint = this.line.getPerpendicularLineInPoint(endPoint).getCommonPoint(this.line)
            //     let distanceFromBallToCommonPoint = distanceBetween(commonPoint, this.ball.position)
            //     let distanceFromEndPointToCommonPoint = distanceBetween(commonPoint, endPoint)
            //     if(distanceFromEndPointToCommonPoint <= this.ball.size)
            //     {
            //         let distanceFromColisionPointToCommonPoint = Math.sqrt( Math.pow(this.ball.size, 2) - Math.pow(distanceFromEndPointToCommonPoint, 2) )
            //         let proportion = distanceFromBallToCommonPoint/distanceFromColisionPointToCommonPoint
            //         let xDistanceFromBallToCommonPoint = this.ball.position.x - commonPoint.x
            //         let yDistanceFromBallToCommonPoint = this.ball.position.y - commonPoint.y
            //         let colisionPoint = {x: commonPoint.x-xDistanceFromBallToCommonPoint*proportion, y: commonPoint.y-yDistanceFromBallToCommonPoint*proportion}
            //         if(this.contains(colisionPoint))
            //         {
            //             let distanceToBall = distanceBetween(this.ball.position, colisionPoint)
            //             if(nearestObstacle == null || distanceToBall < nearestObstacle.distance)
            //             {
            //                 nearestObstacle = {position: colisionPoint, distance: distanceToBall, obstacle: "point"}
            //             }
            //         }
            //     }
            // });
            
        });

        if(bounceVerticaly) this.ball.translateSpeed(-0.3, 1)
        if(bounceHorizontaly) this.ball.translateSpeed(1, -0.3)
    }

    getAcceptableObstacles(obstacles)
    {
        let acceptableObstacles = new Array()

        obstacles.forEach(obstacle => {
            if(obstacle instanceof horizontalWall)
            {
                if(
                    (obstacle.y <= this.topRight.y + this.ball.size && obstacle.y >= this.botLeft.y - this.ball.size) 
                    && !( 
                            (obstacle.xStart < this.botLeft.x && obstacle.xEnd < this.botLeft.x) 
                            || ( obstacle.xStart > this.topRight.x && obstacle.xEnd > this.topRight.x )
                        )
                ) 
                { 
                    acceptableObstacles.push(obstacle) 
                }

            }else if(obstacle instanceof verticalWall)
            {
                if(
                    (obstacle.x <= this.topRight.x + this.ball.size && obstacle.x >= this.botLeft.x - this.ball.size) 
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

    collisionPointBaunce(colisionPoint)
    {
        if(pointsAreTheSame(this.ball.point, colisionPoint)) return;
        if(this.line == null) this.line = Line.create(this.ball.position, this.destinationPosition)

        let bounceLine = this.line.getPerpendicularLineInPoint(colisionPoint)
        if(bounceLine.isVertical())
        {
            this.ball.translateSpeed(-0.3, 1)
        }else if(bounceLine.isHorizontal())
        {
            this.ball.translateSpeed(1, -0.3)
        }else{
            var rad = Line.getAngleBetween(this.line, bounceLine)
            if(bounceLine.getPointForX(this.ball.position.x).y > this.ball.position.y)
            {
                this.ball.rotateSpeed(-2*(Math.PI/4 - rad))
            }
            else{
                this.ball.rotateSpeed(2*(Math.PI/4 - rad))
            }
            this.ball.translateSpeed(0.5, 0.5)
        }
        

    }
}