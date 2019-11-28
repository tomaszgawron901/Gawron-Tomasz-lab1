class NoteFold{
    constructor(parent)
    {
        this.noteDiv = parent
        this.parent = this.noteDiv.noteContainer
        this.defaultTopPosition = this.parent.clientHeight-30
        this.defaultLeftPosition = this.parent.clientWidth-30
        this.top = this.defaultTopPosition
        this.left = this.defaultLeftPosition
    }

    createDivFold(color)
    {
        this.fold = document.createElement("DIV")
        this.fold.style.position = "absolute"
        this.fold.classList.add("fold")
        this.angle = this.calculateAngle()
        this.rotate(this.angle)
        this.cutCorner(this.angle)
        this.updateFold()
        this.updateColor(color)

        this.fold.addEventListener("mousedown",()=>{this.dragStart()})


        return this.fold
    }

    calculateAngle()
    {
        let x = this.parent.clientWidth - this.left
        let y = this.parent.clientHeight - this.top
        let tan = y / x
        let angle = (Math.atan(tan) - Math.PI/4)
        return angle
    }

    rotate(angle)
    {
        this.fold.style.transform = `rotate(${angle*2}rad)`
    }

    cutCorner(angle)
    {
        angle = angle + Math.PI/4
        let centerX = (this.left+this.parent.clientWidth)/2
        let centerY = (this.top+this.parent.clientHeight)/2
        let plusX = Math.sin(angle)*10000
        let plusY = Math.cos(angle)*10000
        this.parent.style.clipPath = `polygon(-10000px -10000px, 10000px -10000px, ${centerX+plusX}px ${centerY-plusY}px, ${centerX-plusX}px ${centerY+plusY}px, 10000px 10000px, -10000px 10000px)`
    }

    updateFold()
    {
        this.fold.style.height = this.parent.clientWidth+"px"
        this.fold.style.width = this.parent.clientHeight+"px"
        this.fold.style.top = this.top + "px"
        this.fold.style.left = this.left + "px"
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
        this.fold.style.backgroundColor = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
    }

    dragStart()
    {
        if(Board.dragging == null){
            Board.dragging = this
            this.parent.style.zIndex = "1"         
        }

    }

    dragMove(x, y)
    {
        if(Board.dragging == this)
        {
            let left = this.parent.style.left.replace("px", "")
            let top = this.parent.style.top.replace("px", "")
            let outY, outX
            if (y - parseInt(top) > this.parent.clientHeight){outY = this.parent.clientHeight} 
            else{outY = y - parseInt(top)}

            if (x - parseInt(left) > this.parent.clientWidth){outX = this.parent.clientWidth} 
            else{outX = x - parseInt(left)}
                
            this.moveFold(outX, outY)
        }
    }

    dragEnd(board)
    {
        if(this.top < 0 || this.left < 0)
        {
            board.removeNote(this.noteDiv.note)
            this.startFadingAway()
            board.saveNotes()
        }
        else{
            this.moveFold(this.defaultLeftPosition, this.defaultTopPosition)
            this.parent.style.zIndex = "0"
            NoteFold.dragging = null            
        }

    }

    startFadingAway()
    {
        this.parent.style.opacity = 1;
        this.parent.setAttribute("pointer-events", "none")
        this.interval = setInterval(()=>{
            if(this.parent.style.opacity <= 0)
            {
                clearInterval(this.interval)
                this.parent.style.visibility = "hidden"
            }
            else
            {
                this.parent.style.opacity -= 0.2
            } 
        }, 100);
    }
}