class Hamburger {
    constructor(size = false, hasCheese = true, hasSalad = false, hasPotato = false, hasSpices = false, hasMayonaise = false) {
        this.size = size;
        this.hasCheese = hasCheese;
        this.hasSalad = hasSalad;
        this.hasPotato = hasPotato;
        this.hasSpices = hasSpices;
        this.hasMayonaise = hasMayonaise;
        this.pricing = {
            cheese: 10,
            salad: 20,
            potato: 15,
            bigSize: 100,
            smallSize: 50,
            mayonaise: 20,
            spices: 15,
        }
        this.calories = {
            cheese: 20,
            salad: 5,
            potato: 10,
            bigSize: 40,
            smallSize: 20,
            mayonaise: 5,
        }
    }
    calculateCalories() {
        let calories = 0;
        if (this.size == 0)
            calories += this.calories.smallSize + this.hasCheese * this.calories.cheese + this.hasSalad * this.calories.salad + this.hasPotato * this.calories.potato + this.hasMayonaise * this.calories.mayonaise;
        else
            calories += this.calories.bigSize + this.hasCheese * this.calories.cheese + this.hasSalad * this.calories.salad + this.hasPotato * this.calories.potato + this.hasMayonaise * this.calories.mayonaise;
        return calories;

    }
    calculatePrice() {
        let price = 0;
        if (this.size == 0)
            price += this.pricing.smallSize + this.hasCheese * this.pricing.cheese + this.hasSalad * this.pricing.salad + this.hasPotato * this.pricing.potato + this.hasMayonaise * this.pricing.mayonaise + this.hasSpices * this.pricing.spices;
        else
            price += this.pricing.bigSize + this.hasCheese * this.pricing.cheese + this.hasSalad * this.pricing.salad + this.hasPotato * this.pricing.potato + this.hasMayonaise * this.pricing.mayonaise + this.hasSpices * this.pricing.spices;
        return price;
    }
}

function orderBurger() {
    let hamburger = new Hamburger(
        confirm("Do you want a big burger?"),
        confirm("Cheese?"),
        confirm("Salad?"),
        confirm("Potato?"),
        confirm("Spices?"),
        confirm("Mayonaise?"),
    );
    console.log(hamburger);

    let burgerPrice = hamburger.calculatePrice();
    let burgerCalories = hamburger.calculateCalories();

    alert(`Your burger's calories are: ${burgerCalories}`);
    alert(`Your burger's price is: ${burgerPrice}`);
}

let burgerButton = document.querySelector(".burger-button");
burgerButton.addEventListener("click", orderBurger)