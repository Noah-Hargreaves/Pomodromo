let animationFrameId = null

export function startTimerAnimation(endTime) {
    let timeLeft = endTime - Date.now()
    document.getElementById("timerDisplay").textContent = Math.floor(timeLeft / 60000) + ":" + String(Math.floor((timeLeft % 60000) / 1000)).padStart(2, '0')
    animationFrameId = requestAnimationFrame(() => startTimerAnimation(endTime))
}

export function stopTimerAnimation() {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
}
