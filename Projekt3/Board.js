class board{
    constructor()
    {
        this.notesArray = []
        this.boardSpace = boardSpace
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