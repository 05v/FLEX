const startButton = document.getElementById("js--start");
const stopButton = document.getElementById("js--stop");
const resetButton = document.getElementById("js--reset");

let seconds = 0;
let minutes = 0;
let running = false; /* Start = False */


const secondsTimer = document.getElementById("js--secondsTimer");
const minutesTimer = document.getElementById("js--minutesTimer");


let timer;

startButton.onclick = function() {

    if (running === true) { /* Als de code al runt kan je hem niet nog een keer runnen. */
        return;
    }

    running = true;

    timer = setInterval(function() {
        seconds = seconds + 1;

        if (seconds === 60) {
            seconds = 0;
            minutes = minutes + 1;
            minutesTimer.innerText = minutes;
            return;
        }

        secondsTimer.innerText = seconds;
    }, 1000); /* Dit is miliseconden */

}

stopButton.onclick = function() {

    clearInterval(timer);
    running = false;

}

resetButton.onclick = function() {
    secondsTimer.innerText = 0
    minutesTimer.innerText = 0
    seconds = 0
    minutes = 0
    clearInterval(timer);
    running = false
}

/* Hier begint de slider */
const rangeValue = document.getElementById("js--rangeValue");
const slider = document.getElementById("js--slider");
const body = document.getElementById("js--body");

slider.value = 2;

slider.oninput = function() {
    rangeValue.innerText = slider.value + "x";
    body.style.fontSize = slider.value + "rem";
}
const text = document.getElementById("js--text")
const image = document.getElementById("js--image")
const paragraph = document.getElementById("js--text")
    // data ophalen :D

let data = fetch("../data.json").then(
    function(receivedData) {
        return receivedData.json()
    }
).then(
    function(echteData) {
        paragraph.innerHTML = echteData.text;
        paragraph.innerHTML = echteData.text;

        image.src = echteData.img;
    }
);