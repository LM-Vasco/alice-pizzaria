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
const ingredientsSpots = ingredientsArea.getElementsByClassName(
  "available-ingredients"
);

/* console.log(ingredientsSpots);
console.log(imagesArray) */

function placeRandomIngredients() {
  if (
    ingredientsSpots.length === 0 ||
    ingredientsSpots.length > imagesArray.length
  )
    return;
    const shuffledImages = shuffleImages(imagesArray);

  for (let i = 0; i < ingredientsSpots.length; i++) {
    let newElm = document.createElement("img");
    newElm.setAttribute("src", shuffledImages[i]);
    ingredientsSpots[i].appendChild(newElm);
  }
}

function shuffleImages(imageArray) {
  let currentIndex = imageArray.length;
  let randomIndex = 0;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [imageArray[currentIndex], imageArray[randomIndex]] = [
        imageArray[randomIndex],
        imageArray[currentIndex],
    ];
  }

  return imageArray;
}

placeRandomIngredients();
