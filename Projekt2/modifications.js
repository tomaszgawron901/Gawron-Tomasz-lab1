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
        gausianBlurInput.value = 1
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

class Channel_Blur extends Blur
{
    constructor(ctx)
    {
        super(ctx)
        this.lenghts = [1,1,1,1]
        this.angle = 0
    }

    reset()
    {
        redChannelInput.value = 1
        greenChannelInput.value = 1
        blueChannelInput.value = 1
        opacityChannelInput.value = 1
        blurAngleInput.value = 0
        this.lenghts = [1,1,1,1]
        this.angle = 0
    }

    calculateDirection()
    {
        if(this.angle==Math.PI || this.angle==0)
        {
            this.directionX = 1
            this.directionY = 0
            this.angle = 0
        }else if(this.angle==Math.PI/2)
        {
            this.directionX = 0
            this.directionY = 1
        }
        else if(this.angle>0 && this.angle<=Math.PI/4)
        {
            this.directionX = 1
            this.directionY = Math.tan(this.angle)
        }else if(this.angle>=Math.PI/4 && this.angle<Math.PI/2)
        {
            this.directionX = 1/Math.tan(this.angle)
            this.directionY = 1
        }else if(this.angle>Math.PI/2 && this.angle<=3*Math.PI/4)
        {
            this.directionX = 1/Math.tan(this.angle)
            this.directionY = 1
        }else if(this.angle>=3*Math.PI/4 && this.angle<Math.PI)
        {
            this.directionX = -1
            this.directionY = -1*Math.tan(this.angle)
        }
    }

    demo()
    {
        const canvasData = new ImageData(new Uint8ClampedArray(this.copy.data), this.copy.width, this.copy.height)
        this.calculateDirection()

        if(this.angle!=Math.PI/2)
        {
            if(this.angle<Math.PI/2)
            {
                for(let y =0; y<canvasData.height; y++)
                {
                    let rgboc = this.blurPixel(canvasData, 0, y)
                    this.blurNextPixel(canvasData, rgboc, 0, y)
                }
            }
            else
            {
                for(let y =0; y<canvasData.height; y++)
                {
                    let rgboc = this.blurPixel(canvasData, canvasData.width-1, y)
                    this.blurNextPixel(canvasData, rgboc, canvasData.width-1, y)
                }
            }

            if(this.angle!=0 || this.angle!=Math.PI)
            {
                for(let x =0; x <canvasData.width; x++)
                {
                    let rgboc = this.blurPixel(canvasData, x, 0)
                    this.blurNextPixel(canvasData, rgboc, x, 0)
                }
            }
        }else{
            for(let x =0; x <canvasData.width; x++)
            {
                let rgboc = this.blurPixel(canvasData, x, 0)
                this.blurNextPixel(canvasData, rgboc, x, 0)
            }
        }
        this.ctx.putImageData(canvasData, 0, 0)
    }


    blurPixel(canvasData, x, y)
    {
        let rgboc = [{value:0, count:0}, {value:0, count:0}, {value:0, count:0}, {value:0, count:0}]
        let max = Math.max(...this.lenghts)
        for(let col=0; col<max; col++)
        {
            let currentX = parseInt(col*this.directionX+x)
            let currentY = parseInt(col*this.directionY+y)
            if(currentX>=0 && currentX<this.copy.width && currentY>=0 && currentY<this.copy.height)
            {
                let i = (currentY)*this.copy.width*4+(currentX)*4
                for(let j=0;j<4;j++)
                {
                    if(col<this.lenghts[j])
                    {
                        rgboc[j].value += this.copy.data[i+j]
                        rgboc[j].count += 1
                    }

                }
            }
            currentX = parseInt(-(col+1)*this.directionX+x)
            currentY = parseInt(-(col+1)*this.directionY+y)
            if(currentX>=0 && currentX<this.copy.width && currentY>=0 && currentY<this.copy.height)
            {
                let i = (currentY)*this.copy.width*4+(currentX)*4
                for(let j=0;j<4;j++)
                {
                    if(col+1<this.lenghts[j])
                    {
                        rgboc[j].value += this.copy.data[i+j]
                        rgboc[j].count += 1
                    }

                }
            }
        }
        let i = (y)*this.copy.width*4+(x)*4        
        for(let j=0;j<4;j++)
        {
            canvasData.data[i+j] = (parseInt)(rgboc[j].value/rgboc[j].count)
        }
        return rgboc
    }

    blurNextPixel(canvasData, rgboc, x, y)
    {
        let blurpixelX = this.directionX+x
        let blurpixelY = this.directionY+y
        if(x+this.directionX>=0 && x+this.directionX<this.copy.width && y+this.directionY>=0 && y+this.directionY<this.copy.height )
        {

            
            for(let j=0;j<4;j++)
            {
                let currentX = parseInt((-this.lenghts[j]+1)*this.directionX+x)
                let currentY = parseInt((-this.lenghts[j]+1)*this.directionY+y)
                if(currentX>=0 && currentX<this.copy.width && currentY>=0 && currentY<this.copy.height)
                {
                    let i = (currentY)*this.copy.width*4+(currentX)*4
                    rgboc[j].value -= this.copy.data[i+j]
                    rgboc[j].count -= 1
                }


                currentX = parseInt((this.lenghts[j]-1)*this.directionX+blurpixelX)
                currentY = parseInt((this.lenghts[j]-1)*this.directionY+blurpixelY)
                if(currentX>=0 && currentX<this.copy.width && currentY>=0 && currentY<this.copy.height)
                {
                    let i = (currentY)*this.copy.width*4+(currentX)*4
                    rgboc[j].value += this.copy.data[i+j]
                    rgboc[j].count += 1
                }
                let i = parseInt(blurpixelY)*this.copy.width*4+parseInt(blurpixelX)*4
                canvasData.data[i+j] = (parseInt)(rgboc[j].value/rgboc[j].count)
            }
            
            this.blurNextPixel(canvasData, rgboc, blurpixelX, blurpixelY)
        }

    }
}

class Contrast extends Modifications
{
    constructor(ctx)
    {
        super(ctx)
        this.value = 1
    }

    reset()
    {
        this.value = 1
        contrastInput.value = 1
    }

    demo()
    {
        const canvasData = new ImageData(new Uint8ClampedArray(this.copy.data), this.copy.width, this.copy.height)
        for(let i =0; i< canvasData.data.length; i+=4)
        {
            for(let l =0; l<3; l++)
            {
                canvasData.data[i+l] = parseInt(this.value*(canvasData.data[i+l]-128)+128)
            }
        }
        this.ctx.putImageData(canvasData, 0, 0)
    }
}

class Sepia extends Modifications{
    constructor(ctx)
    {
        super(ctx)
        this.value = 0
    }

    reset()
    {
        this.value = 0
        sepiaInput.value = 0
    }

    demo()
    {
        const canvasData = new ImageData(new Uint8ClampedArray(this.copy.data), this.copy.width, this.copy.height)
        for(let i =0; i< canvasData.data.length; i+=4)
        {
            let red = (1-0.607*this.value)*canvasData.data[i] + 0.769*this.value*canvasData.data[i+1] + 0.189*this.value*canvasData.data[i+2]
            let green = 0.349*this.value*canvasData.data[i] + (1-0.314*this.value)*canvasData.data[i+1] + 0.168*this.value*canvasData.data[i+2]
            let blue = 0.272*this.value*canvasData.data[i] + 0.534*this.value*canvasData.data[i+1]+ (1-0.869*this.value)*canvasData.data[i+2]
            canvasData.data[i] = parseInt(red)
            canvasData.data[i+1] = parseInt(green)
            canvasData.data[i+2] = parseInt(blue)
        }
        this.ctx.putImageData(canvasData, 0, 0)
    }

}