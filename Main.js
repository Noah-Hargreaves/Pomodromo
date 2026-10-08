const workDuration = 10 * 1000
const startStopButton = document.getElementById("startStopButton")
const resetButton = document.getElementById("resetButton")
const timerDisplay = document.getElementById("timerDisplay")

let animationFrameId = null
let startTime = null
let timer = null
let timePaused = null
let timePausedElapsed = 0

function startTimer(){
    console.log("start timer")
    startTime = Date.now()
    TimerAnimation()
    timer = setTimeout(timeCheck, 100)
}

function pauseTimer(){
    console.log("pause Timer")
    clearTimeout(timer)
    timePaused = Date.now()
    stopTimerAnimation()
    timer = null

}

function resumeTimer(){
    console.log("resume Timer")
    timePausedElapsed += Date.now() - timePaused
    timePaused = null
    timer = setTimeout(timeCheck, 100)
    TimerAnimation()
}

function resetTimer(){
    console.log("reset Timer")
    stopTimerAnimation()
    clearTimeout(timer)
    timer = null
    startTime = null
    timePaused = null
    timePausedElapsed = 0
    timerDisplay.textContent = formatTime(workDuration)
    startStopButton.textContent = "Start"

}

function timeCheck(){
    const timeElapsed = Date.now() - startTime - timePausedElapsed
    if (timeElapsed >= workDuration){
        resetTimer()
        return
    }
    console.log("time elapsed: " + timeElapsed.toString())
    timer = setTimeout(timeCheck, 100)
}

function startStopButtonHandler(){
    if (startTime == null){
        startTimer()
        startStopButton.textContent = "Pause"
    }
    else if (timePaused == null){
        pauseTimer()
        startStopButton.textContent = "Resume"
    }
    else if(timer == null){
        resumeTimer()
        startStopButton.textContent = "Pause"
    }
}

function TimerAnimation() {
    const timeLeft = workDuration - (Date.now() - startTime - timePausedElapsed)
    if (timeLeft <= 0){
        stopTimerAnimation()
        return
    }
    timerDisplay.textContent = formatTime(timeLeft)
    animationFrameId = requestAnimationFrame(TimerAnimation)
}

function stopTimerAnimation() {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
}

function formatTime(time){
    return Math.floor(time / 60000) + ":" + String(Math.floor((time % 60000) / 1000)).padStart(2, '0')
}

startStopButton.addEventListener("click", startStopButtonHandler)
resetButton.addEventListener("click", resetTimer)

timerDisplay.textContent = formatTime(workDuration)
