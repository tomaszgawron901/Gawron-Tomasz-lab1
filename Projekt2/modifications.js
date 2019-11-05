class Modifications
{
    constructor(ctx){
        this.copy = null
        this.ctx = ctx
    }
    start(copy)
    {
        this.copy = copy
    }
    cancel(){}
    demo(){}
}

class Saturation extends Modifications
{
    constructor(ctx)
    {
        super(ctx)
        this.red = 1
        this.green = 1
        this.blue = 1
    }


    reset()
    {

        this.red = 1
        this.green = 1
        this.blue = 1
        redSaturationInput.value = 1
        greenSaturationInput.value = 1
        blueSaturationInput.value = 1
    }

    rendo()
    {
        this.ctx.putImageData(this.copy, 0, 0)
    }

    demo()
    {
        const canvasData = new ImageData(new Uint8ClampedArray(this.copy.data), this.copy.width, this.copy.height)
        for(let i =0; i< canvasData.data.length; i+=4)
        {
            canvasData.data[i] = this.red*canvasData.data[i]
            canvasData.data[i+1] = this.green*canvasData.data[i+1]
            canvasData.data[i+2] = this.blue*canvasData.data[i+2]
        }
        this.ctx.putImageData(canvasData, 0, 0)
    }
}

