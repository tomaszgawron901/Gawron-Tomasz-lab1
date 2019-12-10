class Board{


    constructor(boardSpace, editSpace)
    {
        this.dragging = null;
        this.editing = null;

        this.notesArray = []
        this.boardSpace = boardSpace
        this.editSpace = editSpace
        this.dragging = null
        this.highestIndexZ = 0
        window.addEventListener("mousemove", (e)=>{this.windowsMouseMove(e)})
        window.addEventListener("mouseup", (e)=>{this.windowsMouseUp(e)})
        document.body.ondblclick = (e)=>{
            if(e.target == document.body)
            {
                this.addNote(new Note('New Note', '', {position: {x: e.clientX, y:e.clientY }, color: [200, 200, 200], zIndex: 0, width: 256, height: 200}))
                this.saveNotes()
                this.display()                
            }

        }
        
    }

    moveTop(element)
    {
        this.highestIndexZ += parseInt(1)
        element.style.zIndex = this.highestIndexZ
    }

    windowsMouseMove(e){
        if (this.dragging == null) return
        this.dragging.dragMove(e.clientX, e.clientY)
    }
    windowsMouseUp(e){
        if (this.dragging == null) return
        this.dragging.dragEnd()
        this.dragging = null
        document.body.style.cursor = "auto"
    }

    addNote(note)
    {
        if(note.style.zIndex > this.highestIndexZ)
        {
            this.highestIndexZ = parseInt(note.style.zIndex)
        }
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
        this.notesArray.forEach( divNote =>{
            new NoteReminder(divNote).manageNotifications()
        })

    }




}