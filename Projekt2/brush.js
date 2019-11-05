class Brush{
    static painting = false
    static brushColor = [0, 0, 0, 1]
    static brushSize = 1

    constructor(size, color=[0, 0, 0, 1], ctx){
        this.size = size
        this.color = color
        this.points = []
        this.ctx = ctx
    }

    setCTX(ctx)
    {
        this.ctx = ctx
    }

    addPoint(position)
    {
        this.points.push(position)
    }

    start(copy)
    {
        this.copy = copy
    }

    stop()
    {
        this.points = []
    }
    paint(){}
}

class Inker extends Brush
{
    constructor(size, color=[0, 0, 0, 1], PS)
    {
        super(size, color, PS)
    }


    paint()
    {
        this.ctx.lineCap = "round";
        this.ctx.lineWidth = this.size
        this.ctx.strokeStyle = RGB_toString(this.color)
        this.ctx.putImageData(this.copy, 0, 0)
        let x = this.points[0].x
        let y = this.points[0].y
        this.ctx.beginPath()
        this.ctx.moveTo(x,y)
        for(let i =1; i < this.points.length-1; i+=2)
        {
            x = (this.points[i].x + this.points[i+1].x)/2
            y = (this.points[i].y + this.points[i+1].y)/2
            this.ctx.lineTo(x,y)
        }
        this.ctx.stroke();
        this.ctx.closePath()
    }
}


class QuillPen extends Brush
{
    constructor(size, color=[0, 0, 0, 1])
    {
        super(size, color)
    }

}

function distance(p1, p2) {
    return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2))
}

