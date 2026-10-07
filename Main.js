import { startTimerAnimation , stopTimerAnimation} from "./Animation.js"

const workEnd = 10 * 1000
const shortBreakEnd = 5 * 60 * 1000
const startStopButton = document.getElementById("startStopButton")
const resetButton = document.getElementById("resetButton")

let pauseState = true
let startTime = null
let endTime = null
let timer = null
let timeLeftPause = null

//consider making a timer formatter function

function startTimer(timeLength) {
    if (timeLength <= 0) {
        console.log("Invalid time length, cannot start timer")
        return
    }
    console.log("Timer started")
    clearTimeout(timer)
    startTime = Date.now()
    endTime = startTime + timeLength
    pauseState = false
    timeLeftPause = null
    timer = setTimeout(() => resetTimer(), timeLength)
    startTimerAnimation(endTime)
    logTimerState()
}

//hardcoded to rest to workEnd
function resetTimer() {
    console.log("Resetting timer")
    clearTimeout(timer)
    stopTimerAnimation()
    document.getElementById("timerDisplay").textContent = Math.floor(workEnd / 60000) + ":" + String(Math.floor((workEnd % 60000) / 1000)).padStart(2, '0')
    pauseState = true
    startTime = null
    endTime = null
    timer = null
    timeLeftPause = null
    logTimerState()
}

function pauseTimer() {
    timeLeftPause = endTime - Date.now()
    if (timeLeftPause <= 0) {
        console.log("Timer has already ended, cannot pause")
        return
    }
    console.log("Timer paused")
    clearTimeout(timer)
    pauseState = true
    timer = null
    stopTimerAnimation()
    logTimerState()
}

function resumeTimer(){
    if (timeLeftPause <= 0) {
        console.log("Timer has already ended, cannot resume")
        return
    }
    console.log("Timer resumed")
    endTime = Date.now() + timeLeftPause
    timer = setTimeout(() => resetTimer(), timeLeftPause)
    pauseState = false
    timeLeftPause = null
    startTimerAnimation(endTime)
    logTimerState()
}

//need to make start/stop button change display
function startStopButtonHandler() {
    console.log("Start/Stop button clicked")
    if (startTime === null) {
        console.log("Starting timer")
        startTimer(workEnd)
    }
    else if (pauseState){
        console.log("Resuming timer")
        resumeTimer()
    } 
    else{
        console.log("Pausing timer")
        pauseTimer()
    }
}

function logTimerState(){
    console.log("Timer State:")
    console.log("Pause State: " + pauseState)
    console.log("Start Time: " + startTime)
    console.log("End Time: " + endTime)
    console.log("Time Left on Pause: " + timeLeftPause)
    console.log("Timer: " + timer)
}

startStopButton.addEventListener("click", startStopButtonHandler)
resetButton.addEventListener("click", resetTimer)
document.getElementById("timerDisplay").textContent = Math.floor(workEnd / 60000) + ":" + String(Math.floor((workEnd % 60000) / 1000)).padStart(2, '0')

console.log("Pomodromo Timer initialized")
logTimerState()
