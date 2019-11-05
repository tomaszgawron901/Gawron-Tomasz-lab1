class PhotoShop
{
    constructor(canvasElement)
    {
        this.myCanvas = canvasElement
        this.ctx = this.myCanvas.getContext('2d')
        this.currentBrush = null
        this.currentModification = null
        this.newCanvas(600, 400)
    }

    copyCanvasData() {
        return this.ctx.getImageData(0,0,this.myCanvas.width, this.myCanvas.height)
    }

    cancelModification()
    {
        if(this.currentModification != null)
        {
            this.currentModification.reset()
            this.currentModification.rendo()
            this.currentModification = null
        }
    }

    applyModification()
    {
        if(this.currentModification != null)
        {
            this.currentModification.reset()
            this.currentModification = null
        }
    }

    openImage(e)
    {
        this.cancelModification()
        if(e.target.files.length != 0)
        {
            let selectedFile = e.target.files[0]
            let img = new Image(this.myCanvas.clientWidth, this.myCanvas.clientHeight)
            let reader = new FileReader()
            reader.onload = (e)=>{
                img.src = e.target.result
            }
            reader.readAsDataURL(selectedFile)
            img.addEventListener('load', () =>{
                this.ctx.drawImage(img, 0, 0, myCanvas.clientWidth, myCanvas.clientHeight)
            })
        }
    }

    newCanvas(width, height)
    {
        this.cancelModification()
        if(width < 1 || isNaN(width)){
            width = 600
        }
        if(height < 1 || isNaN(height)){
            height = 400
        }
        this.myCanvas = document.createElement("CANVAS")
        this.myCanvas.id = "myCanvas"
        this.myCanvas.setAttribute("width", width)
        this.myCanvas.setAttribute("height", height)
        this.myCanvas.setAttribute("style", "border:1px solid #000000;")
        this.ctx = this.myCanvas.getContext('2d')
        this.myCanvas.addEventListener("mousedown", (e)=>{
            this.cancelModification()
            if(currentPhotoShop.currentBrush != null)
            {
                Brush.painting = true
                let x = e.clientX - this.myCanvas.offsetLeft
                let y = e.clientY - this.myCanvas.offsetTop
                currentPhotoShop.currentBrush.start(currentPhotoShop.copyCanvasData())
                currentPhotoShop.currentBrush.addPoint({
                    x: x,
                    y: y
                })
                currentPhotoShop.currentBrush.paint()
            }
        })
        if(this.currentBrush != null)
            this.currentBrush.setCTX(this.ctx)
        workSpace.innerHTML = ""
        workSpace.appendChild(this.myCanvas)
        
    }

}



