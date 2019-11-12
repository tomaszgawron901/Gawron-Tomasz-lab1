const currentPhotoShop = new PhotoShop(myCanvas)
const modificationsList = [document.getElementById("saturation"), document.getElementById("brightness"), document.getElementById("blur"), document.getElementById("contrast")]
const modificationsBTNS = [saturationBTN, brightnessBTN, blurBTN, contrastBTN]

const blurList = [document.getElementById("gaussianBlur"), document.getElementById("channelBlur")]



function open_closeOther(obj, list, clas)
{
    currentPhotoShop.cancelModification()
    if(!obj.classList.contains(clas))
    {
        obj.classList.add(clas)

    }else{
        list.forEach(mod => {
            mod.classList.add(clas)
        });
        obj.classList.remove(clas)
    }

}

function open_close(obj, objBTN)
{
    if(obj.classList.contains("divClosed"))
    {
        obj.classList.remove("divClosed")
        objBTN.classList.remove("toolBarBTNClosed")
    }else
    {
        obj.classList.add("divClosed")
        objBTN.classList.add("toolBarBTNClosed")
    }
}

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

//currentPhotoShop.currentModification = new ChannelBlurHorizontally(currentPhotoShop.ctx)
// currentPhotoShop.currentModification.start(currentPhotoShop.copyCanvasData())
//currentPhotoShop.currentModification.lenghts = [6,1,1,1]
// currentPhotoShop.currentModification.demo()