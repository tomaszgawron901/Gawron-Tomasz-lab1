class NoteMain
{
    constructor(parent)
    {
        this.parent = parent
    }

    moveTop()
    {
        this.parent.moveTop()
    }

    createDivMain()
    {
        this.Node = document.createElement("textarea")
        this.Node.classList.add("noteMain")
        this.Node.classList.add("insideNote")
        this.Node.disabled = true
        this.Node.addEventListener("input", ()=>{this.onchange()})
        this.disable()
        return this.Node
    }

    enable()
    {
        this.Node.disabled = false
        this.Node.style.resize = "both"
    }

    disable()
    {
        this.Node.disabled = true
        this.Node.style.resize = "none"
    }

    onchange()
    {
        this.parent.note.description = this.Node.value
    }

    update(value)
    {
        this.Node.value = value
    }
}