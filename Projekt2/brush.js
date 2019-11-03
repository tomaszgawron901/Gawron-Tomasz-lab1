class Brush{
    constructor(size, color=[0, 0, 0, 1]){
        this.size = size
        this.color = color
        this.points = []
    }

    addPoint(position)
    {
        this.points.push(position)
    }

    start()
    {
        this.copy = copyCanvasData()
    }

    stop()
    {
        this.points = []
    }
    paint(){}
}

class Inker extends Brush
{
    constructor(size, color=[0, 0, 0, 1])
    {
        super(size, color)
    }

    start()
    {
        this.copy = copyCanvasData()
    }


    paint()
    {
        ctx.lineCap = "round";
        ctx.lineWidth = this.size
        ctx.strokeStyle = RGB_toString(this.color)
        ctx.putImageData(this.copy, 0, 0)
        let x = this.points[0].x
        let y = this.points[0].y
        ctx.beginPath()
        ctx.moveTo(x,y)
        for(let i =1; i < this.points.length-1; i+=2)
        {
            x = (this.points[i].x + this.points[i+1].x)/2
            y = (this.points[i].y + this.points[i+1].y)/2
            ctx.lineTo(x,y)
        }
        ctx.stroke();
        ctx.closePath()
    }
}


class QuillPen extends Brush
{
    constructor(size, color=[0, 0, 0, 1])
    {
        super(size, color)
    }

    start()
    {
        this.copy = copyCanvasData()
    }



    paint()
    {


    }

}

function distance(p1, p2) {
    return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2))
}

const inkerBrush = new Inker()
let currentBrush = null
let painting = false
let brushColor = [0, 0, 0, 1]
let brushSize = 1