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
        this.noteContainer.style.backgroundColor = this.note.color
        this.noteContainer.appendChild(this.createHeader)
        this.noteContainer.appendChild(this.createMain)
        this.noteContainer.appendChild(this.createFooter)
    }

    createHeader()
    {
        this.header = document.createElement("DIV")
        this.header.classList.add(noteHeader)
        this.header.innerHTML = this.note.title
        return this.header
    }

    createMain()
    {
        this.main = document.createElement("DIV")
        this.main.classList.add(noteMain)
        this.main.innerHTML = this.note.description
        return this.main
    }

    createFooter()
    {
        this.footer = document.createElement("DIV")
        this.footer.classList.add(noteFooter)
        this.footer.innerHTML = this.note.created
        return this.footer
    }
}