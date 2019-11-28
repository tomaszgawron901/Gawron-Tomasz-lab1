class DivNote{
    constructor(note)
    {
        this.note = note
        this.createDiv()
    }

    createDiv()
    {
        this.noteContainer = document.createElement("DIV")
        this.noteContainer.classList.add("noteContainer")
        this.noteContainer.style.backgroundColor = `rgb(${this.note.color[0]}, ${this.note.color[1]}, ${this.note.color[2]})`
        this.noteContainer.style.left = this.note.position.x+"px"
        this.noteContainer.style.top = this.note.position.y+"px"
        this.noteContainer.appendChild(this.createHeader())
        this.noteContainer.appendChild(this.createMain())
        this.noteContainer.appendChild(this.createFooter())
    }

    addFold(color)
    {
        if(this.fold != null) return

        this.fold = new NoteFold(this)
        this.noteContainer.appendChild(this.fold.createDivFold(color))
    }

    createHeader()
    {
        this.header = document.createElement("DIV")
        this.header.classList.add("noteHeader")
        this.header.classList.add("insideNote")
        return this.header
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
        this.header.innerHTML = this.note.title
    }

    updateMain()
    {
        this.main.innerHTML = this.note.description
    }

    updateFooter()
    {
        this.footer.innerHTML = new Date(this.note.created).toLocaleDateString()
    }
}