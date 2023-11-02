
let highscoreSpan = document.getElementById("highscore");

highscoreSpan.innerHTML = `Highscore: ${localStorage.getItem('highscore')}`