class Game {
  constructor() {
    this.ingredientsImages = [
      "mushrooms",
      "olives",
      "pepper",
      "chicken",
      "pepperoni",
      "shrimp",
      "tomato",
      "fish",
      "pineapple",
    ];
    this.sounds = {
      pineapple: "./sounds/pineapple.wav",
      click: "./sounds/click.wav",
      wrong: "./sounds/wrong.wav",
      cook: "./sounds/cook.wav",
      gameover: "./sounds/gameover.wav",
    };

    this.ingredientsArea = null;
    this.ingredientsSpots = null;
    this.ingredientsList = null;
    this.selectedIngredients = null;
    this.cookButton = null;
    this.levelSpan = null;
    this.scoreSpan = null;
    this.pizzasCookedSpan = null;
    this.livesSpan = null;
    this.sound = null;
    this.backgroundMusic = null;

    this.shuffledImages = [];
    this.pizzaIngredients = [];

    this.availableIngredients = 3;
    this.recipeIngredients = 1;
    this.level = 1;
    this.score = 0;
    this.highscore = 0;
    this.pointsPerPizza = 10;
    this.cookedPizzas = 0;
    this.lives = 3;
    this.timer = 3000;
    this.isTimeOver = false;
    this.isGameOver = false;
    this.audio = null;

    this.getDomElements();
  }

  getDomElements() {
    this.ingredientsArea = document.getElementById("ingredients-area");
    this.ingredientsSpots = this.ingredientsArea.getElementsByClassName("available-ingredients");
    this.ingredientsList = document.getElementById("ingredient-list");
    this.selectedIngredients = this.ingredientsList.getElementsByClassName("selected-ingredients");
    this.cookButton = document.getElementById("cook-button");
    this.levelSpan = document.getElementById("level");
    this.scoreSpan = document.getElementById("score");
    this.pizzasCookedSpan = document.getElementById("pizzas-cooked");
    this.livesSpan = document.getElementById("lives");

    this.levelSpan.innerHTML = `Level: ${this.level}`;
    this.scoreSpan.innerHTML = `Score: ${this.score}`;
    this.pizzasCookedSpan.innerHTML = `Cooked Pizzas: ${this.cookedPizzas}`;
    this.livesSpan.innerHTML = `Lives: ${this.lives}`;

    this.backgroundMusic = new Audio("./sounds/background.mp3")
    this.backgroundMusic.play();
  }

  setupGame() {
    this.createAvailableIngredientsDivs();
    this.createRecipeIngredientsDivs();
    this.placeRandomIngredients();

    this.hideAvailableIngredients();
    this.addEventListenerIngredients();
    this.selectRandomIngredients();
  }

  createAvailableIngredientsDivs() {
    for (let i = 0; i < this.availableIngredients; i++) {
      let newElm = document.createElement("div");

      newElm.setAttribute("class", "available-ingredients");

      this.ingredientsArea.appendChild(newElm);
    }
  }

  createRecipeIngredientsDivs() {
    for (let i = 0; i < this.recipeIngredients; i++) {
      let newElm = document.createElement("div");

      newElm.setAttribute("class", "selected-ingredients");

      this.ingredientsList.appendChild(newElm);
    }
  }

  placeRandomIngredients() {
    if (this.ingredientsSpots.length === 0 || this.ingredientsSpots.length > this.ingredientsImages.length) return;

    this.shuffledImages = structuredClone(this.shuffleImagesArray(this.ingredientsImages, this.availableIngredients));
    this.shuffledImages.splice(0, this.shuffledImages.length - this.availableIngredients);

    for (let i = 0; i < this.ingredientsSpots.length; i++) {
      let newElm = document.createElement("img");

      newElm.setAttribute("src", "./images/" + this.shuffledImages[i] + ".png");
      newElm.setAttribute("class", "avblImage");
      newElm.setAttribute("name", this.shuffledImages[i]);

      this.ingredientsSpots[i].appendChild(newElm);
    }
  }

  shuffleImagesArray(imagesArray) {
    let currentIndex = imagesArray.length;
    let randomIndex = 0;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [imagesArray[currentIndex], imagesArray[randomIndex]] = [imagesArray[randomIndex], imagesArray[currentIndex]];
    }
    return imagesArray;
  }

  levelUp() {
    switch (this.cookedPizzas) {
      case 2:
        this.level = 2;
        this.availableIngredients = 4;
        this.recipeIngredients = 1;
        this.pointsPerPizza = 15;
        break;
      case 4:
        this.level = 3;
        this.availableIngredients = 4;
        this.recipeIngredients = 2;
        this.pointsPerPizza = 20;
        break;
      case 6:
        this.level = 4;
        this.availableIngredients = 5;
        this.recipeIngredients = 2;
        this.pointsPerPizza = 25;
        break;
      case 8:
        this.level = 5;
        this.availableIngredients = 5;
        this.recipeIngredients = 3;
        this.pointsPerPizza = 30;
        break;
      case 10:
        this.level = 6;
        this.availableIngredients = 6;
        this.recipeIngredients = 3;
        this.pointsPerPizza = 35;
        break;
    }
    this.levelSpan.innerHTML = `Level: ${this.level}`;
  }

  addEventListenerIngredients() {
    if (!this.isGameOver) {
      const ingredients = document.getElementsByClassName("avblImage");
      this.sound = null;

      this.cookButton.addEventListener("click", () => {
        this.resetPizza();
        this.pizzasCookedSpan.innerHTML = `Cooked Pizzas: ${this.cookedPizzas}`;
        this.scoreSpan.innerHTML = `Score: ${this.score}`;
      });

      for (let i = 0; i < ingredients.length; i++) {
        ingredients[i].addEventListener("click", () => {
          if (this.isIngredientCorrect(ingredients[i])) {
            ingredients[i].setAttribute("src", "./images/" + this.shuffledImages[i] + ".png");
            ingredients[i].setAttribute("name", this.shuffledImages[i]);
            this.placeIngredients(ingredients[i]);
            if (ingredients[i].name === "pineapple") {
              this.sound = new Audio(this.sounds.pineapple);
              this.sound.play();
            } else {
              this.sound = new Audio(this.sounds.click);
              this.sound.play();
            }
          } else {
            ingredients[i].setAttribute("src", "./images/wrong.png");
            this.lives--;
            this.livesSpan.innerHTML = `Lives: ${this.lives}`;
            this.sound = new Audio(this.sounds.wrong);
            this.sound.play();
          }

          if (this.lives <= 0) {
            location.href = "./gameover.html";
          }
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
          newElm.setAttribute("name", ingredients.getAttribute("name"));

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

    for (let i = 0; i < this.selectedIngredients.length; i++) {
      if (this.selectedIngredients[i].firstChild !== null)
        this.selectedIngredients[i].removeChild(this.selectedIngredients[i].firstChild);
    }

    while (selected < this.recipeIngredients) {
      let randomNumber = Math.floor(Math.random() * this.shuffledImages.length);

      if (selectedNumbers.indexOf(randomNumber) === -1) {
        selectedNumbers.push(randomNumber);

        let newElm = document.createElement("img");

        if (!this.isTimeOver) {
          newElm.setAttribute("src", "./images/question2.png");
          newElm.setAttribute("class", "selectedImage");

          this.selectedIngredients[index].appendChild(newElm);
        } else {
          newElm.setAttribute("src", "./images/" + this.shuffledImages[randomNumber] + ".png");
          newElm.setAttribute("class", "selectedImage");
          newElm.setAttribute("name", this.shuffledImages[randomNumber]);

          this.selectedIngredients[index].appendChild(newElm);
        }
        index++;
        selected++;
      }
    }
  }

  isIngredientCorrect(ingredient) {
    const selected = document.getElementsByClassName("selectedImage");

    if (ingredient === null) return false;

    for (let i = 0; i < selected.length; i++) {
      if (selected[i].name === ingredient.name) {
        return true;
      }
    }
    return false;
  }

  hideAvailableIngredients() {
    setTimeout(() => {
      for (let i = 0; i < this.ingredientsSpots.length; i++) {
        this.ingredientsSpots[i].firstChild.setAttribute("src", "./images/question2.png");
      }
      this.timer = 3000;
      this.isTimeOver = true;
      this.selectRandomIngredients();
    }, this.timer);
  }

  removeChildDivs() {
    while (this.ingredientsArea.firstChild) {
      this.ingredientsArea.removeChild(this.ingredientsArea.lastChild);
    }

    while (this.ingredientsList.firstChild) {
      this.ingredientsList.removeChild(this.ingredientsList.lastChild);
    }

    const columns = document.getElementsByClassName("column");

    if (columns.length !== 0) {
      for (let i = 0; i < columns.length; i++) {
        if (columns[i].firstChild !== null) columns[i].removeChild(columns[i].firstChild);
      }
    }
  }

  resetPizza() {
    if (this.pizzaIngredients.length === this.recipeIngredients * 3) {
      this.score += this.pointsPerPizza;
      if (this.score > localStorage.getItem("highscore")) {
        this.highscore = this.score;
        localStorage.setItem("highscore", this.highscore);
      }
      this.sound = new Audio(this.sounds.cook);
      this.sound.play();
      this.cookedPizzas++;
      this.pizzaIngredients = [];
      this.isTimeOver = false;

      this.removeChildDivs();
      this.levelUp();
      this.setupGame();
    }
  }
}

const game = new Game();

game.setupGame();
