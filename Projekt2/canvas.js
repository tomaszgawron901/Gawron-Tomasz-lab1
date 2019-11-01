let myCanvas = document.getElementById("myCanvas")
let ctx = myCanvas.getContext('2d')


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
    myCanvas.setAttribute("width", width)
    myCanvas.setAttribute("height", height)
    myCanvas.setAttribute("style", "border:1px solid #000000;")
    ctx = myCanvas.getContext('2d')
    myCanvas.addEventListener("mousedown", (e)=>{
        painting = true
        console.log(e);
        
        if(currentBrush != null)
        {
            
            let x = e.clientX - myCanvas.offsetLeft
            let y = e.clientY - myCanvas.offsetTop
            currentBrush.start(x,y)
            
        }
    })
    workSpace.innerHTML = ""
    workSpace.appendChild(myCanvas)

}