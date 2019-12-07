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
    }

    createDiv()
    {
        this.Node = document.createElement("DIV")
        this.Node.classList.add("noteContainer")
        this.Node.style.backgroundColor = `rgb(${this.note.style.color[0]}, ${this.note.style.color[1]}, ${this.note.style.color[2]})`
        this.Node.style.zIndex = this.note.style.zIndex
        this.updatePosition()
        this.addHeader()
        this.Node.addEventListener("dblclick", (e)=>{this.onDoubleClick(); console.log(e);
        })
        this.Node.appendChild(this.createMain())
        this.Node.appendChild(this.createFooter())
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

    createMain()
    {
        this.main = document.createElement("DIV")
        this.main.classList.add("noteMain")
        this.main.classList.add("insideNote")
        return this.main
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
        this.main.innerHTML = this.note.description
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


    onDoubleClick()
    {
        if(board.editing == null)
        {
            board.editing = new NoteEditor(this, board)
            board.editing.display()
        }
        else
        {
            board.editing.exitEdition()
            board.editing = null
        }
    }
}