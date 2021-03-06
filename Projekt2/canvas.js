class PhotoShop
{
    constructor(canvasElement)
    {
        this.myCanvas = canvasElement
        this.ctx = this.myCanvas.getContext('2d')
        this.currentBrush = null
        this.currentModification = null
        this.newCanvas(900, 600)
        this.openImageBySrc("testIMG.jpg");
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
            let reader = new FileReader()
            reader.onload = (e)=>{
                this.openImageBySrc(e.target.result);
            }
            reader.readAsDataURL(selectedFile)
        }
    }

    openImageBySrc(src){
        this.cancelModification();
        let img = new Image(this.myCanvas.clientWidth, this.myCanvas.clientHeight);
        img.src = src;
        img.addEventListener('load', () =>{
            this.ctx.drawImage(img, 0, 0, myCanvas.clientWidth, myCanvas.clientHeight)
        })
    }

    newCanvas(width, height)
    {
        this.cancelModification()
        if(width < 1 || isNaN(width)){
            width = 900
        }
        if(height < 1 || isNaN(height)){
            height = 600
        }
        this.myCanvas = document.createElement("CANVAS")
        this.myCanvas.id = "myCanvas"
        this.myCanvas.setAttribute("width", width)
        this.myCanvas.setAttribute("height", height)
        this.ctx = this.myCanvas.getContext('2d')
        if(this.currentBrush != null)
            this.currentBrush.setCTX(this.ctx)
        workSpace.innerHTML = ""
        workSpace.appendChild(this.myCanvas)
        this.myCanvas.scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        });
        
    }

}



