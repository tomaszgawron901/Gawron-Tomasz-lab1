class Board
{
    constructor(width, height)
    {
        this.size = {width: width, height: height}
        this.Orientation = {beta: 0, gamma: 0}
        this.aims = new Set([])
        this.createDiv()
    }

    createDiv()
    {
        if(this.div != null)
            return
        
        this.div = document.createElement("DIV")
        this.div.classList = "board"
        this.div.style.width = `${this.size.width}px`
        this.div.style.height = `${this.size.height}px`
    }


    addBall(size, color, x, y)
    {
        this.ball = new Ball(size, color, x, y, this)
        this.div.appendChild(this.ball.div)
    }

    addAim(x, y)
    {
        let newAim = new Aim(x, y, this)
        this.aims.add(newAim)
        this.div.appendChild(newAim.div)
    }

    removeAim(aim)
    {
        if(!this.aims.delete(aim))
            return
        this.div.removeChild(aim.div)
    }

    update(Orientation)
    {
        this.Orientation = Orientation
        this.ball.update()
    }

}