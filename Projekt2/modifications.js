class Modifications
{
    constructor(){}
    static current = null
    static copy = null
    start()
    {
        Modifications.copy = copyCanvasData()
    }
    cancel(){}
    demo(){}
}

class Saturation extends Modifications
{
    constructor()
    {
        super()
        this.red = 1
        this.green = 1
        this.blue = 1
    }


    cancel()
    {
        if(Modifications.current == this)
        {
            Modifications.current = null
            ctx.putImageData(Modifications.copy, 0, 0)
            Modifications.copy = null
        }
        this.red = 1
        this.green = 1
        this.blue = 1
        redSaturationInput.value = 1
        greenSaturationInput.value = 1
        blueSaturationInput.value = 1
    }

    demo()
    {
        ctx.putImageData(Modifications.copy, 0, 0)
    }
}

