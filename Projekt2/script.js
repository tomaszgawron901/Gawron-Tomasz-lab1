const currentPhotoShop = new PhotoShop(myCanvas)

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
