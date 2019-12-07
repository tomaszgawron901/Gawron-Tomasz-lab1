class NoteEditor
{
    constructor(divNote, parent){
        this.parent = parent
        this.divNote = divNote
        this.createDiv()
    }

    moveTop()
    {
        this.parent.moveTop(this.parent.editSpace)
    }

    createDiv()
    {
        this.Node = document.createElement("DIV")
        this.Node.classList.add("editContainer")
        this.Node.appendChild(this.divNote.Node)
    }

    display()
    {
        this.parent.editSpace.innerHTML = "";
        this.parent.editSpace.appendChild(this.Node)
        this.Node.style.transform = "scale(2)"
        this.parent.editSpace.style.visibility = "visible"
        this.divNote.Node.style.position = "static"
        this.moveTop()
    }

    exitEdition()
    {
        this.parent.editSpace.innerHTML = "";
        this.divNote.Node.style.transform = "scale(1)"
        this.parent.editSpace.style.visibility = "hidden"
        this.divNote.Node.style.position = "absolute"
        this.divNote.display(boardSpace)
    }

    center()
    {
        this.div.style.marginLeft = ""
    }
}