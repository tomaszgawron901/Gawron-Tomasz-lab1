let isRecording = null

class Channel
{
    constructor(){
        this.soundPath = []
        this.isPlaying = []

        this.recordBtn = document.createElement("BUTTON")
        this.recordBtn.prot = this
        this.recordBtn.innerHTML="record"
        this.recordBtn.onclick = function(){this.prot.record()}

        this.playBtn = document.createElement("BUTTON")
        this.playBtn.prot = this
        this.playBtn.innerHTML="play"
        this.playBtn.onclick = function(){this.prot.play()}

        this.repeatBtn = document.createElement("BUTTON")
        this.repeatBtn.prot = this
        this.repeatBtn.innerHTML = "repeat"

        this.deleteBtn = document.createElement("BUTTON")
        this.deleteBtn.prot = this
        this.deleteBtn.innerHTML = "delete"

        //<input type="range" min="0" max="100" value="0" class="slider" id="myRange" style="width: 100%;">
        this.slider = document.createElement("INPUT")
        this.slider.prot = this
        this.slider.setAttribute("type", "range")
        this.slider.setAttribute("min", "0")
        this.slider.setAttribute("max", "100")
        this.slider.setAttribute("value", "0")
        this.slider.setAttribute("style", "width: 100%;")
        this.slider.setAttribute("disabled", "disabled")
        

        this.chnl = document.createElement("DIV")
        this.chnl.classList = 'channel'
        this.chnl.appendChild(this.recordBtn)
        this.chnl.appendChild(this.playBtn)
        this.chnl.appendChild(this.slider)
        this.chnl.appendChild(this.repeatBtn)
        this.chnl.appendChild(this.deleteBtn)
    }

    record(){
        if(isRecording == null)
        {
            isRecording = this
            this.recordBtn.innerHTML = "recording!!!!"
            isRecording.time0 = Date.now()
            isRecording.soundPath = []
        }
        else if(this == isRecording) {
            isRecording.soundPath.push({
                code: '',
                time: Date.now()-isRecording.time0
            })
            this.recordBtn.innerHTML = "record"
            isRecording = null
        }
    }

    play(){
        if(this.soundPath.length != 0)
        {
            if(this.isPlaying.length == 0)
            {
                this.soundPath.forEach(element => {
                    this.isPlaying.push(setTimeout(playS, element.time, element.code))
                });
                const t = this.soundPath[this.soundPath.length-1].time
                this.sliderInterval = setInterval(function(a){
                    a.slider.value = parseInt(a.slider.value)+1
                    if(parseInt(a.slider.value)>=parseInt(a.slider.max))
                    {
                        a.slider.value = 0
                        clearInterval(a.sliderInterval)
                    }
                }, t/100, this)

                this.endOfPlaying = setTimeout(function(a){a.isPlaying = []}, t, this)
            }
            else{
                this.stopPlaying()
            }            
        }
    }

    stopPlaying(){
        this.isPlaying.forEach(element => {
            clearTimeout(element)
        });
        clearTimeout(this.endOfPlaying)
        this.isPlaying = []
        clearInterval(this.sliderInterval)
        this.slider.value = 0
    }

    stickTo(){
        document.getElementById("container").appendChild(this.chnl)
    }

}

new Channel().stickTo()
new Channel().stickTo()
new Channel().stickTo()
const boomSound = document.querySelector('#boom')
const clapSound = document.querySelector('#clap')
const kickSound = document.querySelector('#kick')
document.body.addEventListener('keypress', playRecord)
document.getElementById('playAll').addEventListener('click', playAll)

function playS(code)
{
    switch (code){
            case 'KeyC':
                clapSound.currentTime = 0
                clapSound.play()
                break
            case 'KeyK':
                kickSound.currentTime = 0
                kickSound.play()
                break
            case 'KeyB':
                boomSound.currentTime = 0
                boomSound.play()
                break
    }
}



function playRecord(e){
    playS(e.code)
    if (isRecording != null){
        switch (e.code){
            case 'KeyC':
                isRecording.soundPath.push({
                    code: e.code,
                    time: Date.now()-isRecording.time0
                })
                break
            case 'KeyK':
                isRecording.soundPath.push({
                    code: e.code,
                    time: Date.now()-isRecording.time0
                })
                break
            case 'KeyB':
                isRecording.soundPath.push({
                    code: e.code,
                    time: Date.now()-isRecording.time0
                })
                break
        }            
    }
}

