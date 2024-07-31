const element = document.getElementById('title');
var time = 120;

setInterval(() => {
    element.innerText = `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`;
    time -= 1;
}, 1000);