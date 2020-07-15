const views = {important: 0, all: 1}


class Board{


    constructor(boardSpace, editSpace)
    {
        this.dragging = null;
        this.editing = null;
        this.view = views.all
        this.viewColor = "all"

        this.notesArray = []
        this.boardSpace = boardSpace
        this.editSpace = editSpace
        this.viewSelector = viewSelector
        this.viewSelector.onchange = ()=>{
            switch(this.viewSelector.value)
            {
                case "important":
                    this.view = views.important
                    break
                case "all":
                    this.view = views.all
                    break
                default:
                    throw new Error("Unexpected view.")
            }
            this.display()
        }

        this.viewColorSelector = viewColorSelector
        this.viewColorSelector.onchange = ()=>
        {
            this.viewColor = this.viewColorSelector.value
            this.display()
        }

        this.dragging = null
        this.highestIndexZ = 0
        window.addEventListener("mousemove", (e)=>{this.windowsMouseMove(e)})
        window.addEventListener("mouseup", (e)=>{this.windowsMouseUp(e)})
        document.body.ondblclick = (e)=>{
            if(e.target == document.body)
            {
                this.addNote(this.createDefaultNote(e.clientX, e.clientY))
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

    createDefaultNote(clientX, clientY)
    {
        let nn = new Note('Title','',{position: {x: clientX, y: clientY}, color: [0, 0, 0], zIndex: this.highestIndexZ, width: 200, height: 200}) 
        if(this.viewColor == "all")
            nn.style.color = [200, 200, 200]
        else
            nn.style.color = changeStringToColor(this.viewColor)
        nn.created = new Date().toISOString()
        nn.reminder = null
        if(this.view == views.important)
            nn.pinned = true
        else
            nn.pinned = false
        return nn
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
        this.clear()
        this.notesArray.forEach(note => {
            if(this.view == views.important && !note.note.pinned)
                return;
            if(this.viewColor!="all" && changeToColorString(note.note.style.color)!= this.viewColor)
                return;
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
        if(notes != null)
        {
            notes = JSON.parse(notes)
            if(notes.length!= 0)
            {
                notes.forEach(note => {
                    this.addNote(Note.CloneNote(note))
                });
            }else{
                let info = "- To add new note double-click the background.\n- To move note grab header of the note and move it to chosen position.\n- To edit a note double-click it. In edit view you can change title, text, color of the note. You can aslo set reminder and mark note as 'Important'.\n- To delete note grab a note fold and move it outside of the note.\n- You can sort notes using drop-down lists in upper-left corner.";
                let style = {position: {x:0, y:20}, color: [255, 200, 200], zIndex: 0, width: 300, height: 200}
                let infoNote = new Note("Usage", info, style);
                this.addNote(infoNote);
            }
        }
        this.notesArray.forEach( divNote =>{
            new NoteReminder(divNote).manageNotifications()
        })

    }




}