class Channel
{
    static isRecording = null
    static numberOfChannels = 0
    static channels = new Map()


    static playAll()
    {
        if(Channel.isRecording==null)
        {
            Channel.channels.forEach(element => {
                element.stopPlaying()
                element.play()
            });
        }

    }

    static addNewChannel()
    {
        Channel.channels.set(Channel.numberOfChannels, new Channel())
        Channel.viewAllChannals()
    }
    
    static viewAllChannals()
    {
        document.getElementById("channels").innerHTML=""
        Channel.channels.forEach(element => {
            element.stickTo()
        });
    }


    constructor(){
        this.name = Channel.numberOfChannels
        Channel.numberOfChannels += 1
        this.soundPath = []
        this.currentlyPlaying = []
        this.isPlaying = false
        this.isRepeating = false

        this.recordBtn = document.createElement("BUTTON")
        this.recordBtn.prot = this
        this.recordBtn.innerHTML="record"
        this.record_OffIcon = new Image(60, 60)
        this.record_OffIcon.src = "icons/record_OFF.png"
        this.record_ONIcon = new Image(60, 60)
        this.record_ONIcon.src = "icons/record_ON.png"
        this.recordBtn.appendChild(this.record_OffIcon)
        this.recordBtn.onclick = function(){this.prot.record()}

        this.playBtn = document.createElement("BUTTON")
        this.playBtn.prot = this
        this.playBtn.innerHTML="play"
        this.playIcon = new Image(60, 60)
        this.playIcon.src = "icons/play.png"
        this.returnIcon = new Image(60, 60)
        this.returnIcon.src = "icons/return.png"
        this.playBtn.appendChild(this.playIcon)
        this.playBtn.onclick = function(){this.prot.play()}

        this.repeatBtn = document.createElement("BUTTON")
        this.repeatBtn.prot = this
        this.repeatBtn.innerHTML="repeat"
        this.repeat_OffIcon = new Image(60, 60)
        this.repeat_OffIcon.src = "icons/repeat_OFF.png"
        this.repeat_ONIcon = new Image(60, 60)
        this.repeat_ONIcon.src = "icons/repeat_ON.png"
        this.repeatBtn.appendChild(this.repeat_OffIcon)
        this.repeatBtn.onclick = function(){this.prot.repeat()}

        this.deleteBtn = document.createElement("BUTTON")
        this.deleteBtn.prot = this
        this.deleteBtn.innerHTML = "delete"
        this.deleteIcon = new Image(60, 60)
        this.deleteIcon.src = "icons/delete.png"
        this.deleteBtn.appendChild(this.deleteIcon)
        this.deleteBtn.onclick = function(){this.prot.delete()}

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
        if(!this.isPlaying)
        {
            this.recordBtn.innerHTML="record"
            if(Channel.isRecording == null)
            {
                Channel.isRecording = this
                this.recordBtn.appendChild(this.record_ONIcon)
                Channel.isRecording.time0 = Date.now()
                Channel.isRecording.soundPath = []
            }
            else if(this == Channel.isRecording) {
                Channel.isRecording.soundPath.push({
                    code: '',
                    time: Date.now()-Channel.isRecording.time0
                })
                this.recordBtn.appendChild(this.record_OffIcon)
                Channel.isRecording = null
            }
        }

    }

    play(){
        if(this.soundPath.length != 0 && Channel.isRecording!=this)
        {
            if(this.isPlaying)
            {
                this.stopPlaying()
            }
            else{
                this.startPlaying()
            }            
        }
    }

    startPlaying()
    {
        this.playBtn.innerHTML="return"
        this.soundPath.forEach(element => {
            this.currentlyPlaying.push(setTimeout(playS, element.time, element.code))
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
        this.playBtn.appendChild(this.returnIcon)

        this.endOfPlaying = setTimeout(function(a){
            a.stopPlaying()
            if(a.isRepeating)
            {
                a.startPlaying()
            }
            else{
                a.isPlaying = false
            }

        }, t, this)

        this.isPlaying = true
    }

    stopPlaying(){
        this.playBtn.innerHTML="play"
        this.currentlyPlaying.forEach(element => {
            clearTimeout(element)
        });
        clearTimeout(this.endOfPlaying)
        this.currentlyPlaying = []
        clearInterval(this.sliderInterval)
        this.slider.value = 0
        this.playBtn.appendChild(this.playIcon)
        
        this.isPlaying = false
    }

    repeat()
    {
        this.repeatBtn.innerHTML="repeat"
        if(this.isRepeating)
        {
            this.isRepeating = false
            this.repeatBtn.appendChild(this.repeat_OffIcon)
        }
        else{
            this.isRepeating = true
            this.repeatBtn.appendChild(this.repeat_ONIcon)
        }
    }

    stickTo(){
        document.getElementById("channels").appendChild(this.chnl)
    }

    delete(){
        if(Channel.isRecording == this)
        {
            Channel.isRecording = null
        }
        this.stopPlaying()
        Channel.channels.delete(this.name)
        Channel.viewAllChannals()
    }

}

Channel.addNewChannel()

const boomSound = document.querySelector('#boom')
const clapSound = document.querySelector('#clap')
const kickSound = document.querySelector('#kick')
document.getElementById("newChannelBtn").addEventListener('click', Channel.addNewChannel)
document.body.addEventListener('keypress', playRecord)
document.getElementById('playAll').addEventListener('click', Channel.playAll)

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
    if (Channel.isRecording != null){
        switch (e.code){
            case 'KeyC':
                Channel.isRecording.soundPath.push({
                    code: e.code,
                    time: Date.now()-Channel.isRecording.time0
                })
                break
            case 'KeyK':
                Channel.isRecording.soundPath.push({
                    code: e.code,
                    time: Date.now()-Channel.isRecording.time0
                })
                break
            case 'KeyB':
                Channel.isRecording.soundPath.push({
                    code: e.code,
                    time: Date.now()-Channel.isRecording.time0
                })
                break
        }            
    }
}

