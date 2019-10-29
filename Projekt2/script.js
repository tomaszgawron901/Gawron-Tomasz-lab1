const fileBTN = document.getElementById("fileBTN")
const colorBTN = document.getElementById("colorBTN")
const brushBTN = document.getElementById("brushBTN")
const modificationsBTN = document.getElementById("modificationsBTN")
fileBTN.addEventListener('click', function(){open_close(document.getElementById("file"))})
colorBTN.addEventListener('click', function(){open_close(document.getElementById("color"))})
brushBTN.addEventListener('click', function(){open_close(document.getElementById("brush"))})
modificationsBTN.addEventListener('click', function(){open_close(document.getElementById("modifications"))})

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