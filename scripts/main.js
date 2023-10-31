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
    this.ingredientsArea = null;
    this.ingredientsSpots = null;
    this.ingredientsList = null;
    this.selectedIngredients = null;
    this.shuffledImages = [];
    this.cookButton = null;
    this.timeleftSpan = null;
    this.pizzasCookedSpan = null;
    this.livesSpan = null;
    this.pizzaIngredients = [];
    this.lives = 3;
    this.isGameOver = false;
    this.cookedPizzas = 0;
    this.timeleft = 0;
    this.getDomElements();
  }

  getDomElements() {
    if (document.URL.includes("game.html")) {
      this.ingredientsArea = document.getElementById("ingredients-area");
      this.ingredientsSpots = this.ingredientsArea.getElementsByClassName("available-ingredients");
      this.ingredientsList = document.getElementById("ingredient-list");
      this.selectedIngredients = this.ingredientsList.getElementsByClassName("selected-ingredients");
      this.cookButton = document.getElementById("cook-button");
      this.timeleftSpan = document.getElementById("time-left");
      this.pizzasCookedSpan = document.getElementById("pizzas-cooked");
      this.livesSpan = document.getElementById("lives");

      this.pizzasCookedSpan.innerHTML = `Cooked Pizzas: ${this.cookedPizzas}`;
      this.livesSpan.innerHTML = `Lives: ${this.lives}`;
    }
  }

  placeRandomIngredients() {
    if (this.ingredientsSpots.length === 0 || this.ingredientsSpots.length > imagesArray.length) return;

    this.shuffledImages = structuredClone(this.shuffleImagesArray(imagesArray));

    for (let i = 0; i < this.ingredientsSpots.length; i++) {

     /*  let newElm = document.createElement("div");
      newElm.setAttribute("style", `background: url(${shuffledImages[i]})`); */

      let newElm = document.createElement("img");

      newElm.setAttribute("src", this.shuffledImages[i]);
      newElm.setAttribute("class", "avblImage");
      newElm.setAttribute("name", this.shuffledImages[i].slice(10, -4));

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
      [imgArray[currentIndex], imgArray[randomIndex]] = [imgArray[randomIndex], imgArray[currentIndex]];
    }
    return imgArray;
  }

  addEventListenerIngredients() {
    if (!this.isGameOver) {
      const ingredients = document.getElementsByClassName("avblImage");

      this.cookButton.addEventListener("click", () => {
        //console.log("CLICK CLICK");
        this.resetPizza();
        this.pizzasCookedSpan.innerHTML = `Cooked Pizzas: ${this.cookedPizzas}`;
      });

      for (let i = 0; i < ingredients.length; i++) {
        ingredients[i].addEventListener("click", () => {
          //lose life and check if lives <= 0

          //console.log(ingredients[i].getAttribute("src"));

          /* let newElm = document.createElement("img");
          newElm.setAttribute("src", ingredients[i].getAttribute("src"));
          newElm.setAttribute("name", ingredients[i].getAttribute("src").slice(10, -4)); */

          if (this.lives <= 1) {
            location.href = "./index.html";
          }

          if (this.isIngredientCorrect(ingredients[i])) {
            ingredients[i].setAttribute('src', this.shuffledImages[i])
            this.placeIngredients(ingredients[i]);
          } else {
            ingredients[i].setAttribute('src', '../images/wrong.png')
            this.lives--;
            this.livesSpan.innerHTML = `Lives: ${this.lives}`;
          }

          // QQ coisa tipo if pizza has 9 ing, it's done and return
        });
      }
    }
  }

  placeIngredients(ingredients) {
    const columns = document.getElementsByClassName("column");
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

  setupEverything() {
    //console.log(this.lives);

    console.log("SETUP");
    if (document.URL.includes("game.html")) {
      this.placeRandomIngredients();
      this.selectRandomIngredients();
      this.addEventListenerIngredients();
      this.hideIngredients();
    }
  }

  hideIngredients() {

    setTimeout(() => {
      for (let i = 0; i < this.ingredientsSpots.length; i++){
        this.ingredientsSpots[i].firstChild.setAttribute('src', '../images/question2.png');
      }
      }, 2000);
  }

  resetPizza() {
    //console.log(this.pizzaIngredients);
    if (this.pizzaIngredients.length === 9) {
      this.cookedPizzas++;

      this.pizzaIngredients = [];
      //console.log(this.pizzaIngredients);

      for (let i = 0; i < this.ingredientsSpots.length; i++) {
        this.ingredientsSpots[i].removeChild(this.ingredientsSpots[i].firstChild);
      }

      for (let i = 0; i < this.selectedIngredients.length; i++) {
        this.selectedIngredients[i].removeChild(this.selectedIngredients[i].firstChild);
      }

      const columns = document.getElementsByClassName("column");

      if (columns.length !== 0) {
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].firstChild !== null) columns[i].removeChild(columns[i].firstChild);
        }
      }
      //console.log("AM HERE");
      this.setupEverything();
    }
    
  }
}

const smt = new SMT();

smt.setupEverything();

