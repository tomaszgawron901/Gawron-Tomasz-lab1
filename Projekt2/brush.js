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
        ctx.moveTo(x,y)
        ctx.beginPath()
        ctx.lineWidth = this.size
        ctx.strokeStyle = RGB_toString(this.color)
        this.lastPosition = [x, y]
    }

    paint(position)
    {
        console.log(position);
        ctx.lineTo(position[0], position[1]);
        ctx.stroke();
        ctx.beginPath()
        ctx.moveTo(position[0], position[1])
        this.lastPosition = position

    }
}

let currentBrush = new pencil(4)
let painting = false
let brushColor = [0, 0, 0, 1]