class Note {
    constructor(title = '', description = '', position={x: 0, y: 0}, color = [200, 200, 200]) {
      this.title = title
      this.description = description
      this.color = color
      this.created = new Date().toISOString()
      this.pinned = false
      this.position = position
      this.div = new DivNote(this)
    }

    display(boardSpace)
    {
        boardSpace.appendChild(this.div.noteContainer)
        this.div.update()
        this.div.addFold(this.color)
        //this.div.noteContainer.appendChild(this.div.createFold())
    }
}