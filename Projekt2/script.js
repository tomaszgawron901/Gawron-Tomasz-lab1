const workSpace = document.getElementById("workSpace")


const newCanvasBTN = document.getElementById("newCanvasBtn")
const widthInput = document.getElementById("widthInput")
const heightInput = document.getElementById("heightInput")
newCanvasBTN.addEventListener('click', ()=>{newCanvas(parseInt(widthInput.value), parseInt(heightInput.value))})

const openImageBTN = document.getElementById("openImageBtn")
const openImageInput = document.getElementById("openImageInput")
openImageBTN.addEventListener('click', ()=>{openImageInput.click()})
openImageInput.addEventListener('change', openImage)

const clearCanvasBTN = document.getElementById("clearCanvas")
clearCanvasBTN.addEventListener('click', ()=>{newCanvas(myCanvas.clientWidth, myCanvas.clientHeight)})

const fileBTN = document.getElementById("fileBTN")
const colorBTN = document.getElementById("colorBTN")
const shapeBTN = document.getElementById("shapeBTN")
const brushBTN = document.getElementById("brushBTN")
const modificationsBTN = document.getElementById("modificationsBTN")
fileBTN.addEventListener('click', function(){open_close(document.getElementById("file"))})
colorBTN.addEventListener('click', function(){open_close(document.getElementById("color"))})
shapeBTN.addEventListener('click', ()=>{{open_close(document.getElementById("shape"))}})
brushBTN.addEventListener('click', function(){open_close(document.getElementById("brush"))})
modificationsBTN.addEventListener('click', function(){open_close(document.getElementById("modifications"))})


let brushColor = [0, 0, 0, 1]
const colorInput = document.getElementById("colorInput")
const opacityInput = document.getElementById("opacityInput")
colorInput.addEventListener("change", ()=>{
    brushColor = HEX_to_RGB(colorInput.value, opacityInput.value)
    opacityInput.style.background = "linear-gradient(0.25turn, rgba(0, 0, 0, 0),"+ 
    "rgb("+ brushColor[0] +", " +brushColor[1]+", "+brushColor[2]+"))"
    })
opacityInput.addEventListener("change", ()=>{brushColor = HEX_to_RGB(colorInput.value, opacityInput.value)})



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

