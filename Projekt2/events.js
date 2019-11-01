// File section
newCanvasBTN.addEventListener('click', ()=>{newCanvas(parseInt(widthInput.value), parseInt(heightInput.value))})
fileBTN.addEventListener('click', function(){open_close(document.getElementById("file"))})
openImageBTN.addEventListener('click', ()=>{openImageInput.click()})
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


// Modifications section
modificationsBTN.addEventListener('click', function(){open_close(document.getElementById("modifications"))})


// Mouse section
myCanvas.addEventListener("mousedown", (e)=>{
    if(currentBrush != null)
    {
        painting = true
        let x = e.clientX - myCanvas.offsetLeft
        let y = e.clientY - myCanvas.offsetTop
        currentBrush.start(x,y)
        
    }
})
window.addEventListener('mouseup', ()=>{
    
    if(currentBrush != null)
    {
        painting = false
        currentBrush.lastPosition = null
    }
})
window.addEventListener('mousemove', (e)=>{

    
    if(currentBrush != null && painting)
    {
        let x = e.clientX - myCanvas.offsetLeft
        let y = e.clientY - myCanvas.offsetTop
        currentBrush.paint([x,y])
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

