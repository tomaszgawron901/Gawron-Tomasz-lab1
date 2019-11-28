class Note {
  static CloneNote(note)
  {
    let noteCp = new Note(note.title, note.description, note.position, note.color)
    noteCp.pinned = note.pinned
    noteCp.created = note.created
    return noteCp
  }


    constructor(title = '', description = '', position={x: 0, y: 0}, color = [200, 200, 200]) {
      this.title = title
      this.description = description
      this.color = color
      this.created = new Date().toISOString()
      this.pinned = false
      this.position = position
    }

    display(boardSpace)
    {
      if(this.div == null) this.createDivNote()
      boardSpace.appendChild(this.div.noteContainer)
      this.div.update()
      this.div.addFold(this.color)
        //this.div.noteContainer.appendChild(this.div.createFold())
    }

    createDivNote()
    {
      this.div = new DivNote(this)
    }
}