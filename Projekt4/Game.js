class Game{
    constructor()
    {
        this.deviceOrientation = {beta: 0, gamma: 0}
        window.addEventListener("deviceorientation", (e)=>{
            this.deviceOrientation = {beta: Math.PI*e.beta/180, gamma: Math.PI*e.gamma/180}
        })
        this.createBoard()
        this.ball = new Ball(10, "red", 100, 100)
        this.board.appendChild(this.ball.div)
        this.start()

    }


    createBoard()
    {
        this.board = document.createElement("DIV")
        this.board.classList = "board"
        this.board.style.width = "800px"
        this.board.style.height = "800px"
        document.body.appendChild(this.board)
    }

    update()
    {
        
        this.ball.speed.x += Math.sin(this.deviceOrientation.gamma)/3 - this.ball.speed.x/50
        this.ball.speed.y += Math.sin(this.deviceOrientation.beta)/3 - this.ball.speed.y/50
        this.ball.moveTo(this.ball.position.x + this.ball.speed.x, this.ball.position.y + this.ball.speed.y)
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