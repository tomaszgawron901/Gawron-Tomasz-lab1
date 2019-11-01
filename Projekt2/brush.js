myCanvas.addEventListener("mousedown", (e)=>{
    if(currentBrush != null)
    {
        painting = true
        let x = e.clientX - myCanvas.offsetLeft
        let y = e.clientY - myCanvas.offsetTop
        currentBrush.start(x,y)
        
    }
})
window.addEventListener('mouseup', ()=>{
    
    if(currentBrush != null)
    {
        painting = false
        currentBrush.lastPosition = null
    }
})
window.addEventListener('mousemove', (e)=>{

    
    if(currentBrush != null && painting)
    {
        let x = e.clientX - myCanvas.offsetLeft
        let y = e.clientY - myCanvas.offsetTop
        currentBrush.paint([x,y])
    }
})


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
        ctx.lineCap = "round"
        ctx.strokeStyle = RGB_toString(brushColor)
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