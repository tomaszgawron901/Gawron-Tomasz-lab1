class Board{
    static dragging = null
    static windowsMouseMove(e){
        if (Board.dragging == null) return
        Board.dragging.dragMove(e.clientX, e.clientY)
    }
    static windowsMouseUp(e){
        if (Board.dragging == null) return
        Board.dragging.dragEnd()
        Board.dragging = null
    }


    constructor()
    {
        this.notesArray = []
        this.boardSpace = boardSpace

        window.addEventListener("mousemove", Board.windowsMouseMove)
        window.addEventListener("mouseup", Board.windowsMouseUp)
    }

    addNote(note)
    {
        this.notesArray.push(note)
    }

    display()
    {
        this.notesArray.forEach(note => {
            note.display(this.boardSpace)
        });
    }

    saveNotes()
    {
        localStorage.setItem('notes', JSON.stringify(this.notesArray))
    }

    loadNotes()
    {
        let notes = localStorage.getItem('notes')
        if(notes != null)
            notesArr = JSON.parse(notes)
    }


}