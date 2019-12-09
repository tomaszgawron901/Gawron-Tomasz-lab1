class NoteEditor
{
    constructor(divNote, parent){
        this.parent = parent
        this.divNote = divNote
        this.createDiv()
        board.editing = this
    }

    moveTop()
    {
        this.parent.moveTop(this.parent.editSpace)
    }

    createDiv()
    {
        this.Node = document.createElement("DIV")
        this.Node.classList.add("editContainer")
        this.Node.appendChild(this.divNote.Node)
        this.parent.editSpace.onmousemove = ()=>{
            if(this.isSizeChanged())
            {
                this.center()
                this.divNote.note.style.width = this.divNote.main.Node.clientWidth
                this.divNote.note.style.height = this.divNote.main.Node.clientHeight
            }}
        this.Node.appendChild(new EditorTools(this).createDiv())
    }

    isSizeChanged()
    {
        let out = null
        if(this.cw == null || this.ch == null)
            out = false
        else
        {
            if(this.cw != this.Node.clientWidth || this.ch != this.Node.clientHeight)
            {
                out = true
            }
            else
            {
                out = false
            }
        }
        this.cw = this.Node.clientWidth
        this.ch = this.Node.clientHeight
        return out
    }

    display()
    {
        this.parent.editSpace.innerHTML = "";
        this.parent.editSpace.appendChild(this.Node)
        this.Node.style.transform = "scale(1.25)"
        this.parent.editSpace.style.visibility = "visible"
        this.divNote.Node.style.position = "static"
        this.moveTop()
        this.center()
        this.divNote.fold.disable()
        this.divNote.header.enable()
        this.divNote.main.enable()
    }

    exitEdition()
    {
        this.parent.editSpace.innerHTML = "";
        this.divNote.Node.style.transform = "scale(1)"
        this.parent.editSpace.style.visibility = "hidden"
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
        this.Node.style.marginLeft = "-"+this.Node.offsetWidth/2+"px"
        this.Node.style.marginTop = "-"+this.Node.offsetHeight/2+"px"
    }

}