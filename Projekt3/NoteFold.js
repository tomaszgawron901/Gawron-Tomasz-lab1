class NoteFold{
    constructor(parent)
    {
        this.parent = parent
        this.defaultTopPosition = this.parent.Node.clientHeight-30
        this.defaultLeftPosition = this.parent.Node.clientWidth-30
        this.top = this.defaultTopPosition
        this.left = this.defaultLeftPosition
    }

    createDivFold(color)
    {
        this.Node = document.createElement("DIV")
        this.Node.style.position = "absolute"
        this.Node.classList.add("fold")
        this.angle = this.calculateAngle()
        this.rotate(this.angle)
        this.cutCorner(this.angle)
        this.updateFold()
        this.updateColor(color)

        this.Node.addEventListener("mousedown",()=>{this.dragStart()})


        return this.Node
    }

    moveTop()
    {
        this.parent.moveTop();
    }

    calculateAngle()
    {
        let x = this.parent.Node.clientWidth - this.left
        let y = this.parent.Node.clientHeight - this.top
        let tan = y / x
        let angle = (Math.atan(tan) - Math.PI/4)
        return angle
    }

    rotate(angle)
    {
        this.Node.style.transform = `rotate(${angle*2}rad)`
    }

    cutCorner(angle)
    {
        angle = angle + Math.PI/4
        let centerX = (this.left+this.parent.Node.clientWidth)/2
        let centerY = (this.top+this.parent.Node.clientHeight)/2
        let plusX = Math.sin(angle)*10000
        let plusY = Math.cos(angle)*10000
        this.parent.Node.style.clipPath = `polygon(-10000px -10000px, 10000px -10000px, ${centerX+plusX}px ${centerY-plusY}px, ${centerX-plusX}px ${centerY+plusY}px, 10000px 10000px, -10000px 10000px)`
    }

    updateFold()
    {
        this.Node.style.height = this.parent.Node.clientWidth+"px"
        this.Node.style.width = this.parent.Node.clientHeight+"px"
        this.Node.style.top = this.top + "px"
        this.Node.style.left = this.left + "px"
    }

    moveFold(x, y)
    {
        this.top = y
        this.left = x;
        this.angle = this.calculateAngle()
        this.rotate(this.angle)
        this.cutCorner(this.angle)
        this.updateFold()
    }

    updateColor(color)
    {
        let red = color[0] +20
        let green = color[1] +20
        let blue = color[2] +20
        if(red>255) red = 255
        if(green>255) green = 255
        if(blue>255) blue = 255
        this.Node.style.backgroundColor = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
    }

    dragStart()
    {
        if(Board.dragging == null){
            Board.dragging = this
            this.moveTop()
        }
    }

    dragMove(x, y)
    {
        if(Board.dragging == this)
        {
            let left = this.parent.Node.style.left.replace("px", "")
            let top = this.parent.Node.style.top.replace("px", "")
            let outY, outX
            if (y - parseInt(top) > this.parent.Node.clientHeight){outY = this.parent.Node.clientHeight} 
            else{outY = y - parseInt(top)}

            if (x - parseInt(left) > this.parent.Node.clientWidth){outX = this.parent.Node.clientWidth} 
            else{outX = x - parseInt(left)}
                
            this.moveFold(outX, outY)
        }
    }

    dragEnd(board)
    {
        if(this.top < 0 || this.left < 0)
        {
            board.removeNote(this.parent)
            this.startFadingAway()
            board.saveNotes()
        }
        else{
            this.moveFold(this.defaultLeftPosition, this.defaultTopPosition)
            NoteFold.dragging = null            
        }

    }

    startFadingAway()
    {
        this.parent.Node.style.opacity = 1;
        this.parent.Node.setAttribute("pointer-events", "none")
        this.interval = setInterval(()=>{
            if(this.parent.Node.style.opacity <= 0)
            {
                clearInterval(this.interval)
                this.parent.Node.style.visibility = "hidden"
            }
            else
            {
                this.parent.Node.style.opacity -= 0.2
            } 
        }, 100);
    }
}