// File section
newCanvasBTN.addEventListener('click', ()=>{newCanvas(parseInt(widthInput.value), parseInt(heightInput.value))})
fileBTN.addEventListener('click', function(){open_close(document.getElementById("file"))})
openImageBTN.addEventListener('click', ()=>{
    openImageInput.value = ""
    openImageInput.click()})
openImageInput.addEventListener('change', openImage)
clearCanvasBTN.addEventListener('click', ()=>{newCanvas(myCanvas.clientWidth, myCanvas.clientHeight)})


// Brush section
brushBTN.addEventListener('click', function(){open_close(document.getElementById("brush"))})
    // Color section
colorBTN.addEventListener('click', function(){open_close(document.getElementById("color"))})
colorInput.addEventListener("change", ()=>{
    brushColor = HEX_to_RGB(colorInput.value, opacityInput.value)
    opacityInput.style.background = "linear-gradient(0.25turn, rgba(0, 0, 0, 0),"+ 
    "rgb("+ brushColor[0] +", " +brushColor[1]+", "+brushColor[2]+"))";
    if(currentBrush != null)
        currentBrush.color = brushColor
    })
opacityInput.addEventListener("change", ()=>{brushColor = HEX_to_RGB(colorInput.value, opacityInput.value)
    if(currentBrush != null)
        currentBrush.color = brushColor
    })
    // Shape section
shapeBTN.addEventListener('click', ()=>{{open_close(document.getElementById("shape"))}})
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
    brushSize = parseInt(sizeInput.value)
    if(currentBrush != null)
    {
        currentBrush.size = brushSize
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
    brushSize = parseInt(sizeInput.value)
    if(currentBrush != null)
    {
        currentBrush.size = brushSize
    }
})
selectBrush.addEventListener('change', (e)=>{
    switch(e.target.value)
    {
        case "null":
            currentBrush = null
            break
        case "inker":
            currentBrush = inkerBrush
            currentBrush.color = brushColor
            currentBrush.size = brushSize
            break
    }
})


// Modifications section
modificationsBTN.addEventListener('click', function(){open_close(document.getElementById("modifications"))})
saturationBTN.addEventListener('click', function(){open_close(document.getElementById("saturation"))})
    //Saturation section
redSaturationInput.addEventListener('input', (e)=>{
    if(Modifications.current == null)
    {
        Modifications.current = new Saturation()
        Modifications.current.start()
    }
    Modifications.current.red = parseFloat(e.target.value)
    console.log(Modifications.current);
    
})
greenSaturationInput.addEventListener('input', (e)=>{
    if(Modifications.current == null)
    {
        Modifications.current = new Saturation()
        Modifications.current.start()
    }
    Modifications.current.green = parseFloat(e.target.value)
    console.log(Modifications.current);
})
blueSaturationInput.addEventListener('input', (e)=>{
    if(Modifications.current == null)
    {
        Modifications.current = new Saturation()
        Modifications.current.start()
    }
    Modifications.current.blue = parseFloat(e.target.value)
    console.log(Modifications.current);
})
cancelModificationsBTN.addEventListener('click', ()=>{
    if(Modifications.current!=null)
    {
        Modifications.current.cancel()
    }
    console.log(Modifications.current);
    
})



// Mouse section
myCanvas.addEventListener("mousedown", (e)=>{
    if(currentBrush != null)
    {
        painting = true
        let x = e.clientX - myCanvas.offsetLeft
        let y = e.clientY - myCanvas.offsetTop
        currentBrush.start()
        currentBrush.addPoint({
            x: x,
            y: y
        })
        currentBrush.paint()
    }
})
window.addEventListener('mouseup', ()=>{
    
    if(currentBrush != null)
    {
        painting = false
        currentBrush.stop()
    }
})
window.addEventListener('mousemove', (e)=>{

    
    if(currentBrush != null && painting)
    {
        let x = e.clientX - myCanvas.offsetLeft
        let y = e.clientY - myCanvas.offsetTop
        currentBrush.addPoint({
            x: x,
            y: y
        })
        currentBrush.paint()
    }
})


// RGB functions
function HEX_to_RGB(hex, opacity)
{
    let red = parseInt(hex.substring(1,3), 16)
    let green = parseInt(hex.substring(3,5), 16)
    let blue = parseInt(hex.substring(5,7), 16)
    return  [red, green, blue, parseFloat(opacity)]
}

function RGB_toString(RGB)
{
    return "rgba("+RGB[0]+", "+RGB[1]+", "+RGB[2]+", "+RGB[3]+")"
}

