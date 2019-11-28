class Board{
    static dragging = null
    windowsMouseMove(e){
        if (Board.dragging == null) return
        Board.dragging.dragMove(e.clientX, e.clientY)
    }
    windowsMouseUp(e){
        if (Board.dragging == null) return
        Board.dragging.dragEnd(this)
        Board.dragging = null
    }


    constructor()
    {
        this.notesArray = []
        this.boardSpace = boardSpace

        window.addEventListener("mousemove", (e)=>{this.windowsMouseMove(e)})
        window.addEventListener("mouseup", (e)=>{this.windowsMouseUp(e)})
    }

    addNote(note)
    {
        this.notesArray.push(note)
    }

    removeNote(note)
    {
        let index = this.notesArray.indexOf(note)
        if(index >= 0)
        {
            this.notesArray.splice(index, 1)
        }
    }

    display()
    {
        this.notesArray.forEach(note => {
            note.display(this.boardSpace)
        });
    }

    clear()
    {
        this.boardSpace.innerHTML = ""
    }

    saveNotes()
    {
        let notes = []
        this.notesArray.forEach(note => {
            notes.push(Note.CloneNote(note))
        });
        localStorage.setItem('notes', JSON.stringify(notes))
    }

    loadNotes()
    {
        let notes = localStorage.getItem('notes')
        if(notes != null && notes.length!= 0)
        {
            notes = JSON.parse(notes)
            notes.forEach(note => {
                this.addNote(Note.CloneNote(note))
            });
        }

    }


}