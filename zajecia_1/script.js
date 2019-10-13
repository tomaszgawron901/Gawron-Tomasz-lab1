let isRecording = null

class Channel
{
    constructor(){
        this.soundPath = []

        this.recordBtn = document.createElement("BUTTON")
        this.recordBtn.innerHTML="record"

        this.playBtn = document.createElement("BUTTON")
        this.playBtn.innerHTML="play"
        this.playBtn.addEventListener('click', playAll)

        this.repeatBtn = document.createElement("BUTTON")
        this.repeatBtn.innerHTML = "repeat"

        this.deleteBtn = document.createElement("BUTTON")
        this.deleteBtn.innerHTML = "delete"

        //<input type="range" min="0" max="100" value="0" class="slider" id="myRange" style="width: 100%;">
        this.slider = document.createElement("INPUT")
        this.slider.setAttribute("type", "range")
        this.slider.setAttribute("min", "0")
        this.slider.setAttribute("max", "100")
        this.slider.setAttribute("value", "0")
        this.slider.setAttribute("style", "width: 100%;")
        

        this.chnl = document.createElement("DIV")
        this.chnl.classList = 'channel'
        this.chnl.appendChild(this.recordBtn)
        this.chnl.appendChild(this.playBtn)
        this.chnl.appendChild(this.slider)
        this.chnl.appendChild(this.repeatBtn)
        this.chnl.appendChild(this.deleteBtn)
    }

    record(){
        if(this == null)
        {
            isRecording = this
            this.time0 = Data.now()
            this.soundPath = []
        }
        else if(this == isRecording) {
            this.soundPath.push.push({
                code: '',
                time: Date.now()-this.time0
            })
    }

    stickTo() {
        document.getElementById("container").appendChild(this.chnl)
    }

}

const sadasd= new Channel()
sadasd.stickTo()
const boomSound = document.querySelector('#boom')
const clapSound = document.querySelector('#clap')
const kickSound = document.querySelector('#kick')
let chanel1 = []
let time_0 = 0
document.body.addEventListener('keypress', playAudio)
document.getElementById('record').addEventListener('click', function(){time_0 = Date.now()
                                                                        chanel1 = [] })
document.getElementById('playAll').addEventListener('click', playAll)
document.getElementById('play').addEventListener('click', playAll)

function playAll()
{
    chanel1.forEach(element => {
        setTimeout(playS, element.time, element.code)
    });

}

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



function playAudio(e){
    playS(e.code)
    if (isRecording != null){
        switch (e.code){
            case 'KeyC':
                isRecording.soundPath.push.push({
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

