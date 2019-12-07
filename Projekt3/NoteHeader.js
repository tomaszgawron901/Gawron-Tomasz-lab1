class NoteHeader{
    constructor(parent)
    {
        this.parent = parent
    }

    moveTop()
    {
        this.parent.moveTop()
    }

    createDivHeader()
    {
        this.Node = document.createElement("DIV")
        this.Node.classList.add("noteHeader")
        this.Node.classList.add("insideNote")
        this.Node.addEventListener("mousedown",(e)=>{this.dragStart(e)})
        return this.Node
    }

    update(value)
    {
        this.Node.innerHTML = value
    }

    dragStart(e)
    {
        if(board.editing != null) return
        if(board.dragging == null){
            board.dragging = this
            this.moveTop()
            this.draggingStart = {x: e.layerX, y: e.layerY}            
        }
    }

    dragMove(x, y)
    {
        if(board.dragging == this)
        {
            this.parent.note.style.position.x = x-this.draggingStart.x
            this.parent.note.style.position.y = y-this.draggingStart.y
            this.parent.updatePosition()
        }
    }

    dragEnd(board)
    {
        board.saveNotes()
        board.dragging = null            

    }
}