// Push available ingredients images into an array
const imagesArray = [];

imagesArray.push("../images/mushrooms.png");
imagesArray.push("../images/olives.png");
imagesArray.push("../images/pepper.png");
imagesArray.push("../images/pepperoni.png");
imagesArray.push("../images/shrimp.png");
imagesArray.push("../images/tomato.png");

// Get html elements to manipulate
/* const ingredientsArea = document.getElementById("ingredients-area");
const ingredientsSpots = ingredientsArea.getElementsByClassName("available-ingredients");

const ingredientsList = document.getElementById("ingredient-list");
const selectedIngredients = ingredientsList.getElementsByClassName("selected-ingredients"); */

class SMT {
  constructor() {
    //dom elements
    this.ingredientsArea = document.getElementById("ingredients-area");
    this.ingredientsSpots = this.ingredientsArea.getElementsByClassName("available-ingredients");
    this.ingredientsList = document.getElementById("ingredient-list");
    this.selectedIngredients = this.ingredientsList.getElementsByClassName("selected-ingredients");
    this.pizzaIngredients = [];
  }

  placeRandomIngredients() {
    if (this.ingredientsSpots.length === 0 || this.ingredientsSpots.length > imagesArray.length)
      return;

    const shuffledImages = this.shuffleImagesArray(imagesArray);

    for (let i = 0; i < this.ingredientsSpots.length; i++) {
      let newElm = document.createElement("img");

      newElm.setAttribute("src", shuffledImages[i]);
      newElm.setAttribute("class", "avblImage");
      newElm.setAttribute("name", shuffledImages[i].slice(10, -4));

      this.ingredientsSpots[i].appendChild(newElm);
    }
  }

  shuffleImagesArray(imgArray) {
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

  addEventListenerIngredients() {
    const ingredients = document.getElementsByClassName("avblImage");
    const columns = document.getElementsByClassName("column");

    for (let i = 0; i < ingredients.length; i++) {
      ingredients[i].addEventListener("click", () => {
        //lose life and check if lives <= 0

        //console.log(ingredients[i].getAttribute("src"));

        let newElm = document.createElement("img");
        newElm.setAttribute("src", ingredients[i].getAttribute("src"));
        newElm.setAttribute("name", ingredients[i].getAttribute("src").slice(10, -4));
        let remove = false;

        if (this.isIngredientCorrect(ingredients[i])) {
           this.placeIngredients(ingredients[i]);
        }

        // QQ coisa tipo if pizza has 9 ing, it's done and return
      });
    }
  }

  placeIngredients(ingredients) {
    const columns = document.getElementsByClassName("column");
    console.log(ingredients)
    let selected = 0;

    if (this.pizzaIngredients.indexOf(ingredients) === -1) {
      while (selected < 3) {
        let randomNumber = Math.floor(Math.random() * 9);

        if (columns[randomNumber].firstChild === null) {
          let newElm = document.createElement("img");
          newElm.setAttribute("src", ingredients.getAttribute("src"));
          newElm.setAttribute("name", ingredients.getAttribute("src").slice(10, -4));

          columns[randomNumber].appendChild(newElm);
          selected++;
          this.pizzaIngredients.push(ingredients);
        }
      }
    }
  }

  selectRandomIngredients() {
    if (this.selectedIngredients.length === 0) return;

    let selected = 0;
    let index = 0;
    let selectedNumbers = [];

    while (selected < 3) {
      let randomNumber = Math.floor(Math.random() * imagesArray.length);

      if (selectedNumbers.indexOf(randomNumber) === -1) {
        selectedNumbers.push(randomNumber);

        let newElm = document.createElement("img");

        newElm.setAttribute("src", imagesArray[randomNumber]);
        newElm.setAttribute("class", "sltdImage");
        newElm.setAttribute("name", imagesArray[randomNumber].slice(10, -4));

        this.selectedIngredients[index].appendChild(newElm);
        index++;
        selected++;
      }
    }
  }

  isIngredientCorrect(ingredient) {
    const selected = document.getElementsByClassName("sltdImage");

    if (ingredient === null) return false;

    for (let i = 0; i < selected.length; i++) {
      if (selected[i].name === ingredient.name) {
        //console.log("CORRECT");
        return true;
      }
    }
    return false;
  }
}

const smt = new SMT();

smt.placeRandomIngredients();
smt.selectRandomIngredients();
smt.addEventListenerIngredients();
