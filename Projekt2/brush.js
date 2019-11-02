class pencil
{
    constructor(size, color=[0, 0, 0, 1])
    {
        this.size = size
        this.color = color
        this.lastPosition = null
    }

    start(x,y)
    {
        this.copy = copyCanvasData()        
        ctx.moveTo(x,y)
        ctx.beginPath()
        ctx.lineCap = "round";
        ctx.lineWidth = this.size
        ctx.strokeStyle = RGB_toString(this.color)
        this.lastPosition = [x, y]
    }

    stop()
    {
        ctx.closePath()
    }

    paint(position)
    {
        ctx.putImageData(this.copy, 0, 0)
        ctx.lineTo(position[0], position[1]);
        ctx.stroke();
    }
}


const pencilBrush = new pencil()
let currentBrush = null
let painting = false
let brushColor = [0, 0, 0, 1]
let brushSize = 1