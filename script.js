let startTime = 0;
let elapsedTime = 0;
let timer = null;
let running = false;
let lapCount = 0;
let lastLapTime = 0;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const lapList = document.getElementById("lapList");

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return String(hours).padStart(2, "0") + ":" +
           String(minutes).padStart(2, "0") + ":" +
           String(seconds).padStart(2, "0") + "." +
           String(milliseconds).padStart(2, "0");
}

function updateDisplay() {
    if (running) {
        elapsedTime = Date.now() - startTime;
    }

    display.textContent = formatTime(elapsedTime);
}

startBtn.addEventListener("click", function () {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        running = true;

        timer = setInterval(updateDisplay, 10);
    }
});

pauseBtn.addEventListener("click", function () {
    if (running) {
        elapsedTime = Date.now() - startTime;
        running = false;

        clearInterval(timer);
        timer = null;
        updateDisplay();
    }
});

lapBtn.addEventListener("click", function () {
    if (!running) {
        return;
    }

    const currentTime = elapsedTime;
    const lapTime = currentTime - lastLapTime;

    lapCount++;

    const li = document.createElement("li");
    li.textContent = "Lap " + lapCount +
        " - " + formatTime(lapTime) +
        " | Total: " + formatTime(currentTime);

    lapList.prepend(li);

    lastLapTime = currentTime;
});

resetBtn.addEventListener("click", function () {
    clearInterval(timer);

    startTime = 0;
    elapsedTime = 0;
    timer = null;
    running = false;
    lapCount = 0;
    lastLapTime = 0;

    display.textContent = "00:00:00.00";
    lapList.innerHTML = "";
});
