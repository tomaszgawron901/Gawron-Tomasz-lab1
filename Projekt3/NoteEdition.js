class NoteEditor
{
    constructor(divNote){
        this.divNote = divNote
        board.editing = this

        this.editSpace = document.getElementById("editSpace")
        this.editSpace.onclick = (e)=>{
            if(e.target == this.editSpace || e.target == this.editContainer)
                this.exitEdition()
        }

        this.editContainer = document.getElementById("editContainer")

        this.placeForNoteDiv = document.getElementById("placeForNoteDiv")

        this.editTools = document.getElementById("editTools")
        this.importantCheckBox= document.getElementById("inportantCheckBox")
        this.importantCheckBox.onchange = (e)=>{
            this.divNote.note.pinned = e.target.checked}

        this.colorSelector = document.getElementById("colorSelector")
        this.colorSelector.onchange = (e)=>{this.changeColor(e.target.value)}


        this.dataReminder = document.getElementById("dataReminder")
        this.setReminder(this.divNote.note.reminder)
        this.dataReminder.oninput = (e)=>{this.ChangeReminder(e.target.value)}



        this.editSpace.onmousemove = ()=>{
            if(this.isSizeChanged())
            {
                this.center()
                this.divNote.note.style.width = this.divNote.main.Node.clientWidth
                this.divNote.note.style.height = this.divNote.main.Node.clientHeight
            }}
    }

    setReminder(date)
    {
        if(date == null)
        {
            this.dataReminder.value = ""
        }
        else{
            date = new Date(date)      
            let out = date.toLocaleDateString().split(".")
            if(parseInt(out[0])<10) out[0] = "0"+out[0]
            out = out[2]+"-"+out[1]+"-"+out[0]
            this.dataReminder.value = out
        }
    }

    ChangeReminder(dateString)
    {
        if(dateString=="")
        {
            this.divNote.note.reminder = null
        }
        else
        {
            this.divNote.note.reminder = new Date(Date.parse(dateString)).toISOString()
        }
    }

    changeColor(colorString)
    {
        switch(colorString)
        {
            case "Light Red":
                this.divNote.note.style.color = [255, 200, 200]
                break
            case "Light Green":
                this.divNote.note.style.color = [200, 255, 200]
                break
            case "Light Blue":
                this.divNote.note.style.color = [200, 200, 255]
                break
            case "Light Gray":
                this.divNote.note.style.color = [200, 200, 200]
                break
            case "Purple":
                this.divNote.note.style.color = [255, 0, 255]
                break 
            case "Orange":
                this.divNote.note.style.color = [255, 165, 0]
                break      
            case "Red":
                this.divNote.note.style.color = [255, 50, 50]
                break           
            case "Cyan":
                this.divNote.note.style.color = [30, 255, 255]
                break                                          
        }
        this.divNote.updateColor()
    }

    changeToColorString(color)
    {
        if(this.colorsAreEqual(color, [255, 200, 200]))
        {
            return"Light Red"
        }else if(this.colorsAreEqual(color, [200, 255, 200]))
        {
            return "Light Green"
        }else if(this.colorsAreEqual(color, [200, 200, 255]))
        {
            return "Light Blue"
        }else if(this.colorsAreEqual(color, [200, 200, 200]))
        {
            return "Light Gray"
        } else if(this.colorsAreEqual(color, [255, 0, 255]))
        {
            return "Purple"
        } else if(this.colorsAreEqual(color, [255, 165, 0]))
        {
            return "Orange"
        } else if(this.colorsAreEqual(color, [255, 50, 50]))
        {
            return "Red" 
        } else if(this.colorsAreEqual(color, [30, 255, 255]))
        {
            return "Cyan"
        } else
        {
            throw new Error("Cannot change given color");
        }
    }

    colorsAreEqual(color1, color2)
    {
        if(color1[0]==color2[0] && color1[1]==color2[1] && color1[2]==color2[2])
            return true
        return false
    }

    moveTop()
    {
        board.moveTop(this.editSpace)
    }

    isSizeChanged()
    {
        let out = null
        if(this.cw == null || this.ch == null)
            out = false
        else
        {
            if(this.cw != this.editContainer.clientWidth || this.ch != this.editContainer.clientHeight)
            {
                out = true
            }
            else
            {
                out = false
            }
        }
        this.cw = this.editContainer.clientWidth
        this.ch = this.editContainer.clientHeight
        return out
    }

    display()
    {
        this.placeForNoteDiv.appendChild(this.divNote.Node)
        this.editContainer.style.transform = "scale(1.25)"
        this.editSpace.style.visibility = "visible"
        this.divNote.Node.style.position = "static"
        this.moveTop()
        this.center()
        this.divNote.fold.disable()
        this.divNote.header.enable()
        this.divNote.main.enable()
        this.importantCheckBox.checked = this.divNote.note.pinned
        this.colorSelector.value = this.changeToColorString(this.divNote.note.style.color)
    }

    exitEdition()
    {
        this.placeForNoteDiv.innerHTML = ""
        this.editContainer.style.transform = "scale(1)"
        this.editSpace.style.visibility = "hidden"
        this.divNote.Node.style.position = "absolute"
        this.divNote.display(boardSpace)
        this.divNote.fold.enable()
        this.divNote.header.disable()
        this.divNote.main.disable()
        this.divNote.fold.reset()
        board.saveNotes()
        board.editing = null
    }

    center()
    {
        this.editContainer.style.marginLeft = "-"+this.editContainer.offsetWidth/2+"px"
        this.editContainer.style.marginTop = "-"+this.editContainer.offsetHeight/2+"px"
    }

}