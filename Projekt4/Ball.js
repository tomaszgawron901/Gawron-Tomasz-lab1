class Ball{
    constructor(size, color ,x, y)
    {
        if (size < 0)
            throw Error("To create Ball use nonnegative value.")
        this.createDiv()
        this.setSize(size)
        this.setColor(color)
        this.setPosition(x, y)
        this.setOrientation(0, 0, 0)
        this.speed = {x: 0, y: 0}
    }

    setOrientation(alpha, beta, gamma)
    {
        this.orientation = {alpha: alpha%180, beta: beta%180, gamma: gamma%180}
        if(this.label == null)
            return
        let cx = parseInt(this.orientation.gamma/90)
        let rx = this.orientation.gamma%90
        let x = (cx+Math.sin(Math.PI/2*rx/180))*this.size


        let cy = parseInt(this.orientation.beta/90)
        let ry = this.orientation.beta%90
        let y = (cy+Math.sin(Math.PI/2*ry/180))*this.size
        this.label.transform(x, y, this.orientation.beta , this.orientation.gamma)
        
    }

    setSize(size)
    {
        this.size = size
        this.div.style.width = this.size+"px"
        this.div.style.height = this.size+"px"
    }

    setPosition(x, y)
    {
        this.position = {x: x, y: y}
        this.div.style.top = y+"px"
        this.div.style.left = x+"px"
    }

    setColor(color)
    {
        this.color = color
        this.div.style.background = this.color
    }

    createDiv()
    {
        this.div = document.createElement("DIV")
        this.div.setAttribute("class", "ball")
    }



    addLabel(text="")
    {
        if(this.div == null)
            throw Error("Unable to add label. this.div is not defined.")
        this.label = new Label(text, this.size/2, this.size/2)
        this.div.innerHTML = ""
        this.div.appendChild(this.label.div)
    }

}

class Label{
    constructor(text, size, position)
    {
        this.createDiv()
        this.setText(text)
        this.setSize(size)
        this.setPosition(position, position)
    }

    transform(x, y, beta, gamma)
    {
        this.div.style.transform = `matrix(${Math.cos(Math.PI*gamma/180)}, 0, ${-Math.sin(Math.PI*gamma/90)*Math.sin(Math.PI*beta/90)*0.5}, ${Math.cos(Math.PI*beta/180)}, ${x}, ${y})`
    }

    setPosition(x, y)
    {
        this.div.style.top = y-this.size/2+"px"
        this.div.style.left = x-this.size/2+"px"
    }


    setText(text)
    {
        this.text = text
        this.div.textContent = text
    }

    setSize(size)
    {
        this.size = size
        this.div.style.width = size+"px"
        this.div.style.height = size+"px"
        this.div.style.fontSize = size/2+"px"
    }

    createDiv(text, size)
    {
        this.div = document.createElement("DIV")
        this.div.setAttribute("class", "label")
    }



}



b = new Ball(100, "red", 100, 100)
b.addLabel("8")
document.body.appendChild(b.div)
window.addEventListener("deviceorientation", (e)=>{b.setOrientation(e.alpha, e.beta, e.gamma)
})