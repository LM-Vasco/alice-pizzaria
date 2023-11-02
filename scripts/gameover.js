
let highscoreSpan = document.getElementById("highscore");

highscoreSpan.innerHTML = `Highscore: ${localStorage.getItem('highscore')}`

let gameover = new Audio('./sounds/gameover.wav');
gameover.play();