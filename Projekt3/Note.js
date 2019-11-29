class Note {
  static CloneNote(note)
  {
    let noteCp = new Note(note.title, note.description,note.style)
    noteCp.pinned = note.pinned
    noteCp.created = note.created
    return noteCp
  }


    constructor(title = '', description = '', style = {position: {x:0, y:0}, color: [200, 200, 200], zIndex: 0}) {
      this.title = title
      this.description = description
      this.created = new Date().toISOString()
      this.pinned = false
      this.style = style
    }

    display(boardSpace)
    {
      if(this.div == null) this.createDivNote()
      boardSpace.appendChild(this.div.noteContainer)
      this.div.update()
      this.div.addFold(this.style.color)
        //this.div.noteContainer.appendChild(this.div.createFold())
    }

    createDivNote()
    {
      this.div = new DivNote(this)
    }
}