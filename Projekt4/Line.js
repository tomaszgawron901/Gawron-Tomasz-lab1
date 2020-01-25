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
        let newC = -((this.a+this.b)*point.x + (this.b-this.a)*point.y + this.c)
        return new Line(this.b, -this.a, newC)
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
                return this.getPointforX(x)
            }

        }else{
            let y = ( (this.a*c)/a - this.c )/( -(this.a*b)/a + this.b)
            return this.getPointforY(y)
        }
    }



}

let nl1 = new Line(2, -1, 0)
let nl2 = new Line(-3, -3, 4)
let p = new Line(2, -1, 0).containsPoint({x: 2, y: 4})