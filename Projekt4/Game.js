class Game{
    constructor()
    {
        this.deviceOrientation = {beta: 0, gamma: 0}
        window.addEventListener("deviceorientation", (e)=>{
            this.deviceOrientation = {beta: Math.PI*e.beta/180, gamma: Math.PI*e.gamma/180}
        })
        this.createBoard()
        this.board.addBall(10, "blue", this.board.size.width/2, this.board.size.height/2)
        this.gameTickInterval = 20
        this.start(this.gameTickInterval)
        this.score = 0
        this.hp = {current: 10, maximum: 20, add: function(value){
            this.current += value
            if(this.current> 20)
                this.current = 20
        }}
        

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

        let randomX = Math.random() * (this.board.size.width-border*2) + border
        let randomY = Math.random() * (this.board.size.height-border*2) + border
        this.board.addAim(randomX, randomY)
    }


    createBoard()
    {
        this.board = new Board(800, 800)
        document.body.appendChild(this.board.div)
    }

    update()
    {
        if(this.hp.current<= 0)
            this.stop()
        
        this.timer.add(this.gameTickInterval)

        this.board.update(this.deviceOrientation)

        this.board.aims.forEach(aim => {
            if(this.board.ball.distanceTo(aim.position.x, aim.position.y)<= aim.size)
            {
                this.ballColidesWith(aim)
                return
            }
        });

        this.shrinkAims(0.15)
    }

    ballColidesWith(aim)
    {
        this.score += aim.size/Aim.initialSize
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

new Game()