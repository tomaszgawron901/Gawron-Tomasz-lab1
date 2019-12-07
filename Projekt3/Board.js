class Board{
    static dragging = null;
    static editing = null;



    moveTop(element)
    {
        this.highestIndexZ += 1
        element.style.zIndex = this.highestIndexZ
    }

    windowsMouseMove(e){
        if (Board.dragging == null) return
        Board.dragging.dragMove(e.clientX, e.clientY)
        document.body.style.cursor = "grabbing"
    }
    windowsMouseUp(e){
        if (Board.dragging == null) return
        Board.dragging.dragEnd(this)
        Board.dragging = null
        document.body.style.cursor = "auto"
    }


    constructor(boardSpace, editSpace)
    {
        this.notesArray = []
        this.boardSpace = boardSpace
        this.editSpace = editSpace
        this.dragging = null
        this.highestIndexZ = 0
        window.addEventListener("mousemove", (e)=>{this.windowsMouseMove(e)})
        window.addEventListener("mouseup", (e)=>{this.windowsMouseUp(e)})
        
    }

    addNote(note)
    {
        this.notesArray.push(new DivNote(note, this))
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
        this.notesArray.forEach(divNote => {
            notes.push(divNote.note)
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