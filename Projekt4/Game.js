class Game{
    constructor()
    {
        this.deviceOrientation = {beta: 0, gamma: 0}
        window.addEventListener("deviceorientation", (e)=>{
            this.deviceOrientation = {beta: Math.PI*e.beta/180, gamma: Math.PI*e.gamma/180}
        })
        this.createBoard()
        this.board.addBall(10, "blue", 100, 100)
        this.board.addAim(200, 200)
        this.start()
        this.score = 0
        this.hp = 5

    }


    createBoard()
    {
        this.board = new Board(800, 800)
        document.body.appendChild(this.board.div)
    }

    update()
    {
        if(this.hp<= 0)
            this.stop()

        this.board.update(this.deviceOrientation)

        this.board.aims.forEach(aim => {
            if(this.board.ball.distanceTo(aim.position.x, aim.position.y)<= aim.size)
            {
                this.ballColidesWith(aim)
                return
            }
        });

        this.shrinkAims(0.2)
    }

    ballColidesWith(aim)
    {
        this.score += aim.size/Aim.initialSize
        aim.remove()
        this.hp += 1
    }

    aimDisappeared(aim)
    {
        aim.remove()
        this.hp -= 2
    }

    start()
    {
        this.gameInterval = setInterval(()=>{
            this.update()
        }, 20)
    }

    stop()
    {
        if(this.gameInterval != null)
            clearInterval(this.gameInterval)
    }

    shrinkAims(shrink)
    {
        this.board.aims.forEach(aim => {
            aim.setSize(aim.size-shrink)
            aim.setPosition(aim.position.x+shrink, aim.position.y+shrink)
            if(aim.size <= 2)
                this.aimDisappeared(aim)
        });

    }


}

new Game()