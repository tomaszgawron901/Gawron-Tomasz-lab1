class Note {
    constructor(title = '', description = '', color = "white") {
      this.title = title
      this.description = description
      this.color = color
      this.created = Date().toISOString()
      this.pinned = false
      this.div = new DivNote(this)
    }

    display(boardSpace)
    {
        boardSpace.appendChild(this.div.noteContainer)
    }
}