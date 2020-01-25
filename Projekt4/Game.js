const score = document.getElementById("score")
const hp = document.getElementById("hp")
const newGameBTN = document.getElementById("newGameBTN")


class Game{
    static defaultBallSize = 10

    constructor()
    {
        this.deviceOrientation = {beta: 0, gamma: 0}
        window.addEventListener("deviceorientation", (e)=>{
            this.deviceOrientation = {beta: Math.PI*e.beta/180, gamma: Math.PI*e.gamma/180}
        })
        this.createBoard(window.innerWidth-20, innerHeight-70)
        this.board.addBall(Game.defaultBallSize, "red", this.board.size.width/2, this.board.size.height/2)
        this.board.addBall(Game.defaultBallSize, "black", 500, this.board.size.height/2)
        this.gameTickInterval = 20
        this.start(this.gameTickInterval)
        this.score = {current:0, add: function(value)
        {
            this.current += value
            score.innerHTML = `SCORE: ${Number((this.current).toFixed(1))}`
        }}
        this.hp = {current: 10, maximum: 20, add: function(value){
            this.current += value
            if(this.current> this.maximum)
                this.current = this.maximum
            hp.innerHTML= `HEALTH: ${this.current}`
        }}

        this.score.add(0)
        this.hp.add(0)
        

        this.aimSpawnFrequency = {
            minimum:1000,
            current: 3000,
            decres: function(value){
                this.current -= value
                if(this.current<this.minimum)
                {
                    this.current = this.minimum
                }
        }}

        this.timer = {value: 0, add: (time)=>{
            if(this.timer.value < this.aimSpawnFrequency.minimum && this.timer.value + time >= this.aimSpawnFrequency.minimum)
            {
                this.addRandomAim()
                this.aimSpawnFrequency.decres(80)
            }
                
            this.timer.value  = (time+this.timer.value )%this.aimSpawnFrequency.current
        }}

    }

    addRandomAim()
    {   
        let border = 50

        let randomX = Math.random() * (this.board.size.width-border*2-Aim.initialSize*2) + border
        let randomY = Math.random() * (this.board.size.height-border*2-Aim.initialSize*2) + border
        this.board.addAim(randomX, randomY)
    }


    createBoard(width, height)
    {
        this.board = new Board(width, height)
        document.getElementById("board").appendChild(this.board.div)
    }

    update()
    {
        if(this.hp.current<= 0)
            this.stop()
        
        this.timer.add(this.gameTickInterval)

        this.board.update(this.deviceOrientation, this.gameTickInterval/1000)


        this.shrinkAims(0.15)
    }

    ballColidesWith(aim)
    {
        this.score.add(aim.size/Aim.initialSize)
        aim.remove()
        this.hp.add(1)
    }

    aimDisappeared(aim)
    {
        aim.remove()
        this.hp.add(-2)
    }

    start(interval)
    {
        this.gameInterval = setInterval(()=>{
            this.update()
        }, interval)
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


let game = new Game()
newGameBTN.addEventListener("click", newGame)
function newGame()
{
    if(game != null)
        game.stop()
        document.getElementById("board").innerHTML = ""
    game = new Game()
}
