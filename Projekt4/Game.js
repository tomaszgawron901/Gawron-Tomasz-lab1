class Game{
    constructor()
    {
        this.deviceOrientation = {beta: 0, gamma: 0}
        window.addEventListener("deviceorientation", (e)=>{
            this.deviceOrientation = {beta: Math.PI*e.beta/180, gamma: Math.PI*e.gamma/180}
        })
        this.createBoard()
        this.board.addBall(new Ball(10, "blue", 100, 100))
        this.start()

    }


    createBoard()
    {
        this.board = new Board(800, 800)
        document.body.appendChild(this.board.div)
    }

    update()
    {
        this.board.update(this.deviceOrientation)
    }

    start()
    {
        this.gameInterval = setInterval(()=>{
            this.update()
        }, 30)
    }

    stop()
    {
        if(this.gameInterval != null)
            clearInterval(this.gameInterval)
    }


}

new Game()