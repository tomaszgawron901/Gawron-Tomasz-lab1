// File section
newCanvasBTN.addEventListener('click', ()=>{currentPhotoShop.newCanvas(parseInt(widthInput.value), parseInt(heightInput.value))})
fileBTN.addEventListener('click', function(){open_close(document.getElementById("file"), fileBTN)})
openImageBTN.addEventListener('click', ()=>{
    openImageInput.value = ""
    openImageInput.click()})
openImageInput.addEventListener('change', (e)=>{currentPhotoShop.openImage(e)})
clearCanvasBTN.addEventListener('click', ()=>{currentPhotoShop.newCanvas(currentPhotoShop.myCanvas.clientWidth, currentPhotoShop.myCanvas.clientHeight)})


// Brush section
brushBTN.addEventListener('click', function(){open_close(document.getElementById("brush"), brushBTN)})
    // Color section
    colorBTN.addEventListener('click', function(){open_close(document.getElementById("color"), colorBTN)})
    colorInput.addEventListener("change", ()=>{
        Brush.brushColor = HEX_to_RGB(colorInput.value, opacityInput.value)
        opacityInput.style.background = "linear-gradient(0.25turn, rgba(0, 0, 0, 0),"+ 
        "rgb("+ Brush.brushColor[0] +", " +Brush.brushColor[1]+", "+Brush.brushColor[2]+"))";
        if(currentPhotoShop.currentBrush != null)
            currentPhotoShop.currentBrush.color = Brush.brushColor
        })
    opacityInput.addEventListener("change", ()=>{Brush.brushColor = HEX_to_RGB(colorInput.value, opacityInput.value)
        if(currentPhotoShop.currentBrush != null)
            currentPhotoShop.currentBrush.color = Brush.brushColor
        })
    // Shape section
    shapeBTN.addEventListener('click', ()=>{open_close(document.getElementById("shape"), shapeBTN)})
    sizeSlider.addEventListener('input', (e)=>{
        let maxValue = parseInt(e.target.max)
        let currentValue = parseInt(e.target.value)  
        sizeInput.value = currentValue
        if(currentValue >= maxValue)
        {
            newMax = sizeSlider.max*1.01
            if(newMax>1000)
            {
                newMax=1000
            }
            sizeSlider.max = newMax
        }else
        {
            newMax = sizeSlider.max*0.9
            if(newMax<100)
            {
                newMax =100
            }
            sizeSlider.max = newMax
        }
        Brush.brushSize = parseInt(sizeInput.value)
        if(currentPhotoShop.currentBrush != null)
        {
            currentPhotoShop.currentBrush.size = Brush.brushSize
        }
    })
    sizeInput.addEventListener('input', (e)=>{
        let currentValue = parseInt(e.target.value)
        if(currentValue <1 || isNaN(currentValue))
        {
            currentValue = 1
            sizeInput.value = 1
        }
        sizeSlider.value = currentValue
        Brush.brushSize = parseInt(sizeInput.value)
        if(currentPhotoShop.currentBrush != null)
        {
            currentPhotoShop.currentBrush.size = Brush.brushSize
        }
    })
    selectBrush.addEventListener('change', (e)=>{
        switch(e.target.value)
        {
            case "null":
                currentPhotoShop.currentBrush = null
                break
            case "inker":
                currentPhotoShop.currentBrush = new Inker(Brush.brushSize, Brush.brushColor, currentPhotoShop.ctx)
                break
        }
    })


// Modifications section
modificationsBTN.addEventListener('click', function(){open_close(document.getElementById("modifications"), modificationsBTN)})
    //Saturation section
    saturationBTN.addEventListener('click', function(){
        open_closeOther(document.getElementById("saturation"), modificationsList, "divClosed")
        open_closeOther(saturationBTN, modificationsBTNS, "toolBarBTNClosed")
    })
    redSaturationInput.addEventListener('input', (e)=>{
        if(currentPhotoShop.currentModification == null)
        {
            currentPhotoShop.currentModification = new Saturation(currentPhotoShop.ctx)
            currentPhotoShop.currentModification.start(currentPhotoShop.copyCanvasData())
        }
        currentPhotoShop.currentModification.red = parseFloat(e.target.value)
        currentPhotoShop.currentModification.demo()
        
    })
    greenSaturationInput.addEventListener('input', (e)=>{
        if(currentPhotoShop.currentModification == null)
        {
            currentPhotoShop.currentModification = new Saturation(currentPhotoShop.ctx)
            currentPhotoShop.currentModification.start(currentPhotoShop.copyCanvasData())
        }
        currentPhotoShop.currentModification.green = parseFloat(e.target.value)
        currentPhotoShop.currentModification.demo()
    })
    blueSaturationInput.addEventListener('input', (e)=>{
        if(currentPhotoShop.currentModification == null)
        {
            currentPhotoShop.currentModification = new Saturation(currentPhotoShop.ctx)
            currentPhotoShop.currentModification.start(currentPhotoShop.copyCanvasData())
        }
        currentPhotoShop.currentModification.blue = parseFloat(e.target.value)
        currentPhotoShop.currentModification.demo()
    })
    cancelModificationsBTN.addEventListener('click', ()=>{
        currentPhotoShop.cancelModification()
    })
    applyModificationsBTN.addEventListener('click', ()=>{
        currentPhotoShop.applyModification()
    })
    // Brightness section
    brightnessBTN.addEventListener('click',()=>{
        open_closeOther(document.getElementById("brightness"), modificationsList, "divClosed")
        open_closeOther(brightnessBTN, modificationsBTNS, "toolBarBTNClosed")
    })
    brightnessInput.addEventListener('input', (e)=>{
        if(currentPhotoShop.currentModification == null)
        {
            currentPhotoShop.currentModification = new Brightness(currentPhotoShop.ctx)
            currentPhotoShop.currentModification.start(currentPhotoShop.copyCanvasData())
        }
        currentPhotoShop.currentModification.brightness = parseInt(e.target.value)
        currentPhotoShop.currentModification.demo()
    })
    // Blur section
    blurBTN.addEventListener('click', ()=>{
        open_closeOther(document.getElementById("blur"), modificationsList, "divClosed")
        open_closeOther(blurBTN, modificationsBTNS, "toolBarBTNClosed")
    })
        // Gaussian section
        gausianBlurInput.addEventListener('input', (e)=>{
            if(currentPhotoShop.currentModification == null)
            {
                currentPhotoShop.currentModification = new Gaussian_Blur(currentPhotoShop.ctx)
                currentPhotoShop.currentModification.start(currentPhotoShop.copyCanvasData())
            }
            currentPhotoShop.currentModification.raiant = parseInt(e.target.value)
            currentPhotoShop.currentModification.demo()
        })
        selectBlurType.addEventListener('change', ()=>{
            switch(selectBlurType.value)
            {
                case "Gaussian_Blur":
                    open_closeOther(document.getElementById("gaussianBlur"), blurList,  "divClosed")
                    break
                case "Channel_Blur":
                    open_closeOther(document.getElementById("channelBlur"), blurList,  "divClosed")
                    break
            }
        })
        // Channel section
        blurAngleInput.addEventListener('input', (e)=>{
            if(currentPhotoShop.currentModification == null)
            {
                currentPhotoShop.currentModification = new Channel_Blur(currentPhotoShop.ctx)
                currentPhotoShop.currentModification.start(currentPhotoShop.copyCanvasData())
            }
            currentPhotoShop.currentModification.angle = parseInt(e.target.value)/180*Math.PI
            currentPhotoShop.currentModification.demo()
        })
        redChannelInput.addEventListener('input', (e)=>{
            if(currentPhotoShop.currentModification == null)
            {
                currentPhotoShop.currentModification = new Channel_Blur(currentPhotoShop.ctx)
                currentPhotoShop.currentModification.start(currentPhotoShop.copyCanvasData())
            }
            currentPhotoShop.currentModification.lenghts[0] = parseInt(e.target.value)
            currentPhotoShop.currentModification.demo()
        })
        greenChannelInput.addEventListener('input', (e)=>{
            if(currentPhotoShop.currentModification == null)
            {
                currentPhotoShop.currentModification = new Channel_Blur(currentPhotoShop.ctx)
                currentPhotoShop.currentModification.start(currentPhotoShop.copyCanvasData())
            }
            currentPhotoShop.currentModification.lenghts[1] = parseInt(e.target.value)
            currentPhotoShop.currentModification.demo()
        })
        blueChannelInput.addEventListener('input', (e)=>{
            if(currentPhotoShop.currentModification == null)
            {
                currentPhotoShop.currentModification = new Channel_Blur(currentPhotoShop.ctx)
                currentPhotoShop.currentModification.start(currentPhotoShop.copyCanvasData())
            }
            currentPhotoShop.currentModification.lenghts[2] = parseInt(e.target.value)
            currentPhotoShop.currentModification.demo()
        })

// Mouse section

workSpace.addEventListener("mousedown", (e)=>{
    currentPhotoShop.cancelModification()
    if(currentPhotoShop.currentBrush != null)
    {
        
        Brush.painting = true
        currentPhotoShop.currentBrush.start(currentPhotoShop.copyCanvasData())
    }
})

window.addEventListener('mouseup', ()=>{
    
    if(currentPhotoShop.currentBrush != null)
    {
        Brush.painting = false
        currentPhotoShop.currentBrush.stop()
    }
})
workSpace.addEventListener('mousemove', (e)=>{
    
    if(currentPhotoShop.currentBrush != null && Brush.painting)
    {

        let x = e.target.offsetLeft-currentPhotoShop.myCanvas.offsetLeft+e.offsetX+e.target.scrollLeft
        let y = e.target.offsetTop-currentPhotoShop.myCanvas.offsetTop+e.offsetY+e.target.scrollTop
        currentPhotoShop.currentBrush.addPoint({
            x: x,
            y: y
        })
        currentPhotoShop.currentBrush.paint()
    }
})