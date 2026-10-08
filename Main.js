const workDuration = 25 * 10 * 1000
const startStopButton = document.getElementById("startStopButton")
const resetButton = document.getElementById("resetButton")

let startTime = null
let timer = null
let timePaused = null
let timePausedElapsed = 0

function startTimer(){
    console.log("start timer")
    startTime = Date.now()
    timer = setTimeout(timeCheck, 100)
}

function pauseTimer(){
    console.log("pause Timer")
    clearTimeout(timer)
    timer = null
    timePaused = Date.now()
}

function resumeTimer(){
    console.log("resume Timer")
    timePausedElapsed += Date.now() - timePaused
    timePaused = null
    timer = setTimeout(timeCheck, 100)
}

function resetTimer(){
    console.log("reset Timer")
    clearTimeout(timer)
    timer = null
    startTime = null
    timePaused = null
    timePausedElapsed = 0
}

function timeCheck(){
    const timeElapsed = Date.now() - startTime - timePausedElapsed
    if (timeElapsed >= workDuration){
        clearTimeout(timer)
        resetTimer()
        return
    }
    console.log(timeElapsed.toString())
    timer = setTimeout(timeCheck, 100)
}

function startStopButtonHandler(){
    if (startTime == null){
        startTimer()
    }
    else if (timePaused == null){
        pauseTimer()
    }
    else if(timer == null){
        resumeTimer()
    }
}

startStopButton.addEventListener("click", startStopButtonHandler)
resetButton.addEventListener("click", resetTimer)


