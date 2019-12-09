class EditorTools
{
    constructor(parent){
        this.parent = parent
        this.createDiv()
    }

    createDiv()
    {
        this.Node = document.createElement("DIV")
        this.Node.classList.add("editTools")
        this.addImportandCheckBox()
        return this.Node
    }

    addImportandCheckBox()
    {
        this.importantCheckBox = document.createElement("INPUT")
        this.importantCheckBox.setAttribute("type", "checkbox")
        this.importantCheckBox.innerHTML = "IMPORTANT!"
        this.Node.appendChild(this.importantCheckBox)
    }

}