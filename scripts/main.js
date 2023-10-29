// Push available ingredients images into an array
const imagesArray = [];

imagesArray.push("../images/mushrooms.png");
imagesArray.push("../images/olives.png");
imagesArray.push("../images/pepper.png");
imagesArray.push("../images/pepperoni.png");
imagesArray.push("../images/shrimp.png");
imagesArray.push("../images/tomato.png");

// Get html elements to manipulate
const ingredientsArea = document.getElementById("ingredients-area");
const ingredientsSpots = ingredientsArea.getElementsByClassName("available-ingredients");

const ingredientsList = document.getElementById("ingredient-list");
const selectedIngredients = ingredientsList.getElementsByClassName("selected-ingredients");

function placeRandomIngredients() {
  if (ingredientsSpots.length === 0 || ingredientsSpots.length > imagesArray.length) return;
  const shuffledImages = shuffleImagesArray(imagesArray);

  for (let i = 0; i < ingredientsSpots.length; i++) {
    let newElm = document.createElement("img");

    newElm.setAttribute("src", shuffledImages[i]);
    newElm.setAttribute("name", shuffledImages[i].slice(10));

    ingredientsSpots[i].appendChild(newElm);
  }
}

function selectRandomIngredients() {
  if (selectedIngredients.length === 0) return;

  let selected = 0;
  let index = 0;
  let selectedNumbers = [];

  while (selected < 3) {
    let randomNumber = Math.floor(Math.random() * imagesArray.length);

    if (selectedNumbers.indexOf(randomNumber) === -1) {
      selectedNumbers.push(randomNumber);

      let newElm = document.createElement("img");

      newElm.setAttribute("src", imagesArray[randomNumber]);
      newElm.setAttribute("name", imagesArray[randomNumber].slice(10));

      selectedIngredients[index].appendChild(newElm);
      index++;
      selected++;
    }
  }

  for (let i = 0; i < selectedIngredients.length; i++) {}
}

function shuffleImagesArray(imgArray) {
  let currentIndex = imgArray.length;
  let randomIndex = 0;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [imgArray[currentIndex], imgArray[randomIndex]] = [
      imgArray[randomIndex],
      imgArray[currentIndex],
    ];
  }
  return imgArray;
}

placeRandomIngredients();

selectRandomIngredients();
