class Line{
    constructor(a, b, c)// ax + by + c = 0
    {
        if(a == b && a == 0) throw Error("Both 'a' and 'b' cannot be equal to 0.")
        this.a = a
        this.b = b
        this.c = c
    }

    static create(point1, point2)
    {
        if(point1.x == point2.x || point1.y == point2.y)
        {
            if(point1.x != point2.x)
            {
                return new Line(1, 0, -point1.y)
            }
            else if(point1.y != point2.y){
                return new Line(0, 1, -point1.x)
            }
            else{
                throw Error("Points are at the same position.")
            }
        }
        let c = point1.y - point1.x*(point1.y - point2.y)/(point1.x - point2.x)
        let a;
        if(point1.x != 0)
            a = (point1.y - c)/point1.x
        else
            a = (point2.y - c)/point2.x

        return new Line(a, -1, c)
    }

    static getAngleBetween(line1, line2)
    {
        return Math.atan(Math.abs( (line1.a - line2.a)/(1 + line1.a*line2.a) ))
    }

    getAngle()
    {
        Math.atan(-this.a/this.b)
    }

    isVertical()
    {
        return this.b == 0
    }

    isHorizontal()
    {
        return this.a == 0
    }

    moveVerticaly(distance)
    {
        return new Line(this.a, this.b, this.c-distance*this.b)
    }

    moveHorizontaly(distance)
    {
        return new Line(this.a, this.b, this.c-distance*this.a)
    }

    containsPoint(point)
    {
        if(this.a == 0)
        {
            return point.y == (-this.c/this.b)
        }else if(this.b == 0)
        {
            return point.x == (-this.c/this.a)
        }
        else{
            return point.y == this.getPointForX(point.x).y
        }
    }

    getPerpendicularLineInPoint(point)// TOCHECK
    {
        return new Line(this.b, -this.a, this.a*point.y-this.b*point.x)
    }

    getPointForX(x)// May throw an Exception.
    {
        return {x: x, y: -(this.a*x + this.c)/this.b}
    }

    getPointforY(y)// May throw an Exception.
    {
        return {x: -(this.b*y + this.c)/this.a, y: y}
    }

    getCommonPoint(otherLine)
    {
        let a = this.a + otherLine.a
        let b = this.b + otherLine.b
        let c = this.c + otherLine.c

        if(a == 0 || b == 0)
        {
            if(a == 0)
            {
                let y = -c/b
                return this.getPointforY(y)

            }else{
                let x = -c/a
                return this.getPointForX(x)
            }

        }else{
            let y = ( (this.a*c)/a - this.c )/( -(this.a*b)/a + this.b)
            return this.getPointforY(y)
        }
    }

    distanceTo(point)
    {
        return distanceBetween(point, this.getCommonPoint(this.getPerpendicularLineInPoint(point)))
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
        return new horizontalWall(this.y+distance, this.xStart, this.xEnd)
    }

    getEndPoints()
    {
        let endPoints = new Array()
        endPoints.push({x: this.xStart, y: this.y})
        endPoints.push({x: this.xEnd, y: this.y})
        return endPoints
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

    getEndPoints()
    {
        let endPoints = new Array()
        endPoints.push({x: this.x, y: this.yStart})
        endPoints.push({x: this.x, y: this.yEnd})
        return endPoints
    }
}