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
    rendo()
    {
        this.ctx.putImageData(this.copy, 0, 0)
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

class Brightness extends Modifications
{
    constructor(ctx)
    {
        super(ctx)
        this.brightness = 0
    }

    reset()
    {
        this.brightness = 0
        brightnessInput.value = 0
    }


    demo()
    {
        const canvasData = new ImageData(new Uint8ClampedArray(this.copy.data), this.copy.width, this.copy.height)
        for(let i =0; i< canvasData.data.length; i+=4)
        {
            canvasData.data[i] = canvasData.data[i]+this.brightness
            canvasData.data[i+1] = canvasData.data[i+1]+this.brightness
            canvasData.data[i+2] = canvasData.data[i+2]+this.brightness
        }
        this.ctx.putImageData(canvasData, 0, 0)
    }

}

class Blur extends Modifications
{
    constructor(ctx)
    {
        super(ctx)
    }
}

class Gaussian_Blur extends Blur
{
    constructor(ctx)
    {
        super(ctx)
        this.raiant = 1
        this.range = [
            {
                Y: 0,
                startX: 0,
                endX: 0
            }
        ]
    }

    reset()
    {
        this.raiant = 1
        blurInput.value = 1
        this.range = [
            {
                Y: 0,
                startX: 0,
                endX: 0
            }
        ]
    }

    calculateRange()
    {
        let quarter = new Array(this.raiant)
        for(let i=0; i<this.raiant; i++)
        {
            let x = (parseInt)(Math.sqrt(Math.pow(this.raiant,2)-Math.pow(i,2))-1)
            quarter[i] = x
        }
        let range = []
        for(let i =this.raiant-1; i>=0;i--)
        {
            range.push({
                Y: -i,
                startX: -quarter[i],
                endX: quarter[i]
            })
        }

        for(let i =1; i<this.raiant;i++)
        {
            range.push({
                Y: i,
                startX: -quarter[i],
                endX: quarter[i]
            })
        }
        this.range = range
    }

    demo()
    {
        const canvasData = new ImageData(new Uint8ClampedArray(this.copy.data), this.copy.width, this.copy.height)
        this.calculateRange()
        for(let y =0; y< canvasData.height; y++)
        {
            let rgboc = this.blurPixel(canvasData, 0, y)
            this.blurNextPixel(canvasData, rgboc, 0, y)
        }
        this.ctx.putImageData(canvasData, 0, 0)
    }

    blurPixel(canvasData, x, y)
    {
        let rgboc = {r: 0, g:0, b:0, o: 0, count: 0}
        this.range.forEach(row => {
            if(row.Y+y>=0 && row.Y+y<this.copy.height)
            {
                for(let col=row.startX; col<=row.endX; col++)
                {
                    if(col+x>=0 && col+x<this.copy.width)
                    {
                        let i = (row.Y+y)*this.copy.width*4+(col+x)*4
                        rgboc.r += this.copy.data[i]
                        rgboc.g += this.copy.data[i+1]
                        rgboc.b += this.copy.data[i+2]
                        rgboc.o += this.copy.data[i+3]
                        rgboc.count += 1
                    }
                }
            }
        });
        let i = (y)*this.copy.width*4+(x)*4
        canvasData.data[i] = (parseInt)(rgboc.r/rgboc.count)
        canvasData.data[i+1] = (parseInt)(rgboc.g/rgboc.count)
        canvasData.data[i+2] = (parseInt)(rgboc.b/rgboc.count)
        canvasData.data[i+3] = (parseInt)(rgboc.o/rgboc.count)
        return rgboc
    }

    blurNextPixel(canvasData, rgboc, x, y)
    {
        if(x+1>=0 && x+1<this.copy.width)
        {
            this.range.forEach(row => {
                if(row.Y+y>=0 && row.Y+y<this.copy.height)
                {
                    if(row.startX+x>=0 && row.startX+x<this.copy.width)
                    {
                        let i = (row.Y+y)*this.copy.width*4+(row.startX+x)*4
                        rgboc.r -= this.copy.data[i]
                        rgboc.g -= this.copy.data[i+1]
                        rgboc.b -= this.copy.data[i+2]
                        rgboc.o -= this.copy.data[i+3]
                        rgboc.count -= 1
                    }
                }
            })
            x = x+1
            this.range.forEach(row => {
                if(row.Y+y>=0 && row.Y+y<this.copy.height)
                {
                    if(row.endX+x>=0 && row.endX+x<this.copy.width)
                    {
                        let i = (row.Y+y)*this.copy.width*4+(row.endX+x)*4
                        rgboc.r += this.copy.data[i]
                        rgboc.g += this.copy.data[i+1]
                        rgboc.b += this.copy.data[i+2]
                        rgboc.o += this.copy.data[i+3]
                        rgboc.count += 1
                    }
                }
            })
            let i = (y)*this.copy.width*4+(x)*4
            canvasData.data[i] = (parseInt)(rgboc.r/rgboc.count)
            canvasData.data[i+1] = (parseInt)(rgboc.g/rgboc.count)
            canvasData.data[i+2] = (parseInt)(rgboc.b/rgboc.count)
            canvasData.data[i+3] = (parseInt)(rgboc.o/rgboc.count)
            this.blurNextPixel(canvasData, rgboc, x, y)
        }
    }
}
