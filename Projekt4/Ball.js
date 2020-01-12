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


    moveTo(x, y)
    {
        
        let deltaX = (x-this.position.x)%(2*Math.PI*this.size)
        let deltaY = (y-this.position.y)%(2*Math.PI*this.size)


        let deltaBeta = 180*deltaY/(Math.PI*this.size)
        let deltaGamma = 180*deltaX/(Math.PI*this.size)
        
        this.setPosition(x, y)
        this.setOrientation(this.orientation.alpha, this.orientation.beta+deltaBeta, this.orientation.gamma+deltaGamma)
    }


    setOrientation(alpha, beta, gamma)
    {
        this.orientation = {alpha: alpha%360, beta: beta%360, gamma: gamma%360}
        if(this.label == null)
            return
        let x = Math.sin(Math.PI*this.orientation.gamma/180)*this.size

        let y = Math.sin(Math.PI*this.orientation.beta/180)*this.size
        this.label.transform(x, y, 0, 0, 0)
        
    }

    setSize(size)
    {
        this.size = size
        this.div.style.width = this.size*2+"px"
        this.div.style.height = this.size*2+"px"
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
        this.label = new Label(text, this.size, this.size)
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

    transform(x, y, alpha, beta, gamma)
    {
        this.div.style.transform = `matrix(${Math.cos(Math.PI*gamma/360)+0.3}, 0, ${-Math.sin(Math.PI*gamma/90)*Math.sin(Math.PI*beta/90)*0.35}, ${Math.cos(Math.PI*beta/360)+0.3}, ${x}, ${y})`
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
