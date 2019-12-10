class DivNote{
    constructor(note, parent)
    {
        this.note = note
        this.parent = parent
        this.createDiv()
    }

    moveTop()
    {
        this.parent.moveTop(this.Node)
        this.note.style.zIndex = this.Node.style.zIndex
    }

    createDiv()
    {
        this.Node = document.createElement("DIV")
        this.Node.classList.add("noteContainer")
        this.updateColor()
        this.Node.style.zIndex = this.note.style.zIndex
        this.updatePosition()
        this.addHeader()
        this.addMain()
        this.Node.addEventListener("dblclick", (e)=>{this.edit()})
        this.Node.appendChild(this.createFooter())
    }

    updateColor()
    {
        this.Node.style.backgroundColor = `rgb(${this.note.style.color[0]}, ${this.note.style.color[1]}, ${this.note.style.color[2]})`
        if(this.fold != null) this.fold.updateColor(this.note.style.color)
    }

    display(boardSpace)
    {
      if(this.Node == null) this.createDiv()
      boardSpace.appendChild(this.Node)
      this.update()
      this.addFold(this.note.style.color)
    }


    addFold(color)
    {
        if(this.fold != null) return

        this.fold = new NoteFold(this)
        this.Node.appendChild(this.fold.createDivFold(color))
    }

    addHeader()
    {
        this.header = new NoteHeader(this)
        this.Node.appendChild(this.header.createDivHeader())
    }

    addMain()
    {
        this.main = new NoteMain(this)
        this.Node.appendChild(this.main.createDivMain(this.note.style.width, this.note.style.height))
    }

    createFooter()
    {
        this.footer = document.createElement("DIV")
        this.footer.classList.add("noteFooter")
        this.footer.classList.add("insideNote")
        return this.footer
    }

    update()
    {
        this.updateHeader()
        this.updateMain()
        this.updateFooter()
    }

    updateHeader()
    {
        this.header.update(this.note.title)
    }

    updateMain()
    {
        this.main.update(this.note.description)
    }

    updateFooter()
    {
        this.footer.innerHTML = new Date(this.note.created).toLocaleDateString()
    }

    updatePosition()
    {
        this.Node.style.left = this.note.style.position.x+"px"
        this.Node.style.top = this.note.style.position.y+"px"
    }


    edit()
    {
        if(board.editing == null)
        {
            new NoteEditor(this)
            board.editing.display()
        }
    }

}