class NoteHeader{
    constructor(parent)
    {
        this.noteDiv = parent
        this.parent = this.noteDiv.noteContainer
    }

    onDoubleClick()
    {
        this.parent.style.transform = "scale(2)"
    }

    createDivHeader()
    {
        this.div = document.createElement("DIV")
        this.div.classList.add("noteHeader")
        this.div.classList.add("insideNote")
        this.div.addEventListener("mousedown",(e)=>{this.dragStart(e)})
        this.div.addEventListener("dblclick", ()=>{this.onDoubleClick()})
        return this.div
    }

    update(value)
    {
        this.div.innerHTML = value
    }

    dragStart(e)
    {
        if(Board.dragging == null){
            Board.dragging = this
            Board.moveTop(this.parent)
            this.draggingStart = {x: e.layerX, y: e.layerY}            
        }
    }

    dragMove(x, y)
    {
        if(Board.dragging == this)
        {
            this.noteDiv.note.style.position.x = x-this.draggingStart.x
            this.noteDiv.note.style.position.y = y-this.draggingStart.y
            this.noteDiv.updatePosition()
        }
    }

    dragEnd(board)
    {
        board.saveNotes()
        NoteFold.dragging = null            

    }
}