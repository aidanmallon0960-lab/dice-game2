let currency2;
let nume;
let priceMult = 1.08;

class DiceContainer {
  constructor(
    container,
    level = 1,
    multiplierCost = 10,
    multiplierIncrement = 1,
  ) {
    this.container = container;
    let diceCont = document.createElement("div");
    diceCont.classList.add("dice");
    this.dice = new Dice(diceCont);
    this.level = level;
    this.multiplierCost = multiplierCost;
    this.multiplierIncrement = multiplierIncrement;
    this.multiplierValue = multiplierIncrement;
    this.container.append(diceCont);
    this.addLevelAndMultLabels();
    this.addMultiplierButton();
  }

  addLevelAndMultLabels() {
    this.levelLbl = document.createElement("p");
    this.multLbl = document.createElement("p");
    this.container.append(this.levelLbl);
    this.container.append(this.multLbl);
    this.updateLabels();
  }

  updateLabels() {
    this.levelLbl.innerHTML = `Level: ${this.level}`;
    this.multLbl.innerHTML = `Mult: ${this.multiplierValue}`;
  }

  addMultiplierButton() {
    this.multBtn = document.createElement("button");
    this.multBtn.innerHTML = this.multiplierCost;
    this.multBtn.addEventListener("click", () => {
      currency2 = document.getElementById("total");
      console.log(currency2.innerHTML + " | " + this.multBtn.innerHTML);
      if (Number(currency2.innerHTML) >= Number(this.multBtn.innerHTML)) {
        currency2.innerHTML =
          Number(currency2.innerHTML) - Number(this.multBtn.innerHTML);
        nume = this.multBtn.textContent * priceMult;
        console.log(nume);
        this.multBtn.innerHTML = Math.round(nume);
        console.log(priceMult);
        this.level += 1;
        this.multiplierValue += this.multiplierIncrement;
      }
      this.updateLabels();
    });
    this.container.append(this.multBtn);
  }
  get value() {
    return this.dice.value * this.multiplierValue;
  }
}
class Dice {
  /**
   * Instantiates a dice object
   * @param {*} container a html container
   */
  constructor(container) {
    this.init(container);
    this.value = 1;
    this.locked = false;
  }

  init(container) {
    this.container = container;
    this.container.classList.add("dice");
    this.face = this.createFace();

    this.addClickHandler();
  }

  get value() {
    return this._value;
  }

  set value(val) {
    if (val < 1 || val > 6) {
      console.error("Invalid value passed in");
      return;
    }
    this._value = val;
    this.face.src = `/images/dice-${val}.svg`;
  }

  createFace() {
    let face = document.createElement("img");
    this.container.append(face);
    return face;
  }

  addClickHandler() {
    this.container.addEventListener("click", () => {
      this.container.classList.toggle("locked");
      this.locked = !this.locked;
    });
  }

  /*
  roll() {
    if(this.locked) return;
    let roller = setInterval(() => {
      this.value = Math.floor(Math.random() * 6) + 1;
    }, 50);
    setTimeout(() => {
      clearInterval(roller);
    }, 1000);
  }
    */
  roll() {
    if (this.locked) return;
    return new Promise((resolve) => {
      let roller = setInterval(() => {
        this.value = Math.floor(Math.random() * 6) + 1;
      }, 50);
      setTimeout(() => {
        clearInterval(roller);
        resolve();
      }, 1000);
    });
  }
}
