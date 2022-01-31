const body = document.querySelector('body');
const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');

start.addEventListener('click', onStartClick);
stop.addEventListener('click', onStopClick);

function onStartClick(e) {
    start.disabled = true;
    timerId = setInterval(() => { body.style.backgroundColor = getRandomHexColor() }, 1000);
}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStopClick(e) {
    start.disabled = false;
    clearInterval(timerId);
}