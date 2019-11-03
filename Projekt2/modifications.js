class Modifications
{

    using = null
    copy = null
    constructor(){throw Error('Cannot create this object.')}
    static Saturation=
    {
        red: 0,
        green: 0,
        blue:0,
        
        start: ()=>
        {
            this.copy = copyCanvasData()
        },
    
        demo: ()=>
        {
            ctx.putImageData(this.copy, 0, 0)
    
    
        },
    
    
    }
}

console.log(Modifications.Saturation.red);
