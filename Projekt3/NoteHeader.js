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
        this.Node = document.createElement("INPUT")
        this.Node.setAttribute("type", "text")
        this.Node.readOnly = true
        this.Node.classList.add("noteHeader")
        this.Node.classList.add("insideNote")
        this.Node.addEventListener("mousedown",(e)=>{this.dragStart(e)})
        this.Node.addEventListener("change", ()=>{this.onchange()})
        return this.Node
    }

    enable()
    {
        this.Node.readOnly = false
    }

    disable()
    {
        this.Node.readOnly = true
    }

    onchange()
    {
        this.parent.note.title = this.Node.value
    }

    update(value)
    {
        this.Node.value = value
    }

    dragStart(e)
    {
        if(board.editing != null) return
        if(board.dragging == null){
            board.dragging = this
            this.moveTop()
            this.draggingStart = {x: e.layerX, y: e.layerY}
            this.Node.style.cursor = "grabbing"
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

    dragEnd()
    {
        this.dragingCancel()
    }

    dragingCancel()
    {
        board.saveNotes()
        board.dragging = null
        this.Node.style.cursor = "grab"
    }
}