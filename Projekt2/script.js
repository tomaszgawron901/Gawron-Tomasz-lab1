const workSpace = document.getElementById("workSpace")
let myCanvas = document.getElementById("myCanvas")
let ctx = myCanvas.getContext('2d')

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
const brushBTN = document.getElementById("brushBTN")
const modificationsBTN = document.getElementById("modificationsBTN")
fileBTN.addEventListener('click', function(){open_close(document.getElementById("file"))})
colorBTN.addEventListener('click', function(){open_close(document.getElementById("color"))})
brushBTN.addEventListener('click', function(){open_close(document.getElementById("brush"))})
modificationsBTN.addEventListener('click', function(){open_close(document.getElementById("modifications"))})

myCanvas.clientWidth

function openImage(e)
{
    selectedFile = e.target.files[0]
    if(e.target.files.length != 0)
    {
        let img = new Image(myCanvas.clientWidth, myCanvas.clientHeight)
        let reader = new FileReader()
        reader.onload = (e)=>{
            img.src = e.target.result
        }
        reader.readAsDataURL(selectedFile)
        img.addEventListener('load', () =>{
            ctx.drawImage(img, 0, 0, myCanvas.clientWidth, myCanvas.clientHeight)
        })
    }
}

function open_close(obj)
{
    if(obj.classList.contains("divClosed"))
    {
        obj.classList.remove("divClosed")
    }else
    {
        obj.classList.add("divClosed")
    }
}

function newCanvas(width, height)
{
    if(width < 1 || isNaN(width)){
        width = 600
    }
    if(height < 1 || isNaN(height)){
        height = 400
    }
    myCanvas = document.createElement("CANVAS")
    myCanvas.id = "myCanvas"
    ctx = myCanvas.getContext('2d')
    myCanvas.setAttribute("width", width)
    myCanvas.setAttribute("height", height)
    myCanvas.setAttribute("style", "border:1px solid #000000;")
    workSpace.innerHTML = ""
    workSpace.appendChild(myCanvas)

}