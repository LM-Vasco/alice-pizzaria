
let sound = new Audio('./sounds/click.wav');
let button = document.getElementById("play-button");

button.addEventListener("click", () => {
    sound.play();
    sound.addEventListener('ended', function () {
        location.href = 'game.html';
      });
})