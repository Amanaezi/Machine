class Machine {
    constructor(info) {
        this.info = info;
        this.state = "stopped";
        this.time = 2000;
        this.timer = null;
        this.interval = null;
        this.isRunning = false;
    }

    run() {
        try {
            if (this.isRunning) {
                throw new Error("Машина зайнята!");
            } else {
                this.isRunning = true;
                this.state = "started";
                this.info.textContent += "Починаю роботу...";
                this.info.textContent += "Час приготування - " + this.time + " ";
                this.interval = setInterval(() => {
                    this.info.textContent += " | ";
                }, 1000);
                this.timer = setTimeout(() => {
                    this.onReady();
                    this.isRunning = false;
                }, this.time);
                this.info.textContent += this.state;
            }
        } catch (ex) {
            this.info.textContent += ex.message;
        }
    }

    onReady() {
        clearInterval(this.interval);
        clearTimeout(this.timer);
        this.info.textContent += "Готово!";
        this.state = "stopped";
        this.info.textContent += this.state;
    }

    stop() {
        if (this.isRunning) {
            clearInterval(this.interval);
            clearTimeout(this.timer);
            this.info.textContent = "Примусове вимкнення!";
            this.state = "stopped";
            this.info.textContent += this.state;
            this.isRunning = false;
        }
    }
}

class CoffeeMachine extends Machine {
    constructor(info) {
        super(info);
        this.drink = "вода";
    }

    run(drink) {
        try {
            if (this.state === "started") {
                throw new Error("Машина зайнята!");
            } else {
                switch (drink) {
                    case "latte":
                        this.drink = "латте";
                        this.time = 5000;
                        break;
                    case "espresso":
                        this.drink = "espresso";
                        this.time = 3000;
                        break;
                    case "americano":
                        this.drink = "американо";
                        this.time = 4000;
                        break;
                    default:
                        this.info.textContent = "Такого напою немає!";
                        return;
                }
                this.info.textContent = "Приготування: " + this.drink + " ";
                super.run();
            }
        } catch (ex) {
            this.info.textContent += ex.message;
        }
    }
}

class Multivariate extends Machine {
    cookSoup() {
        this.time = 6000;
        super.run();
    }

    stew() {
        this.time = 4000;
        super.run();
    }

    bake() {
        this.time = 5000;
        super.run();
    }
}

const info = document.getElementById("info");
const latte = document.getElementById("latte");
const espresso = document.getElementById("espresso");
const americano = document.getElementById("americano");
const cookSoup = document.getElementById("cookSoup");
const stew = document.getElementById("stew");
const bake = document.getElementById("bake");
const stopCofee = document.getElementById("stopCofee");
const stopMulti = document.getElementById("stopMulti");

const coffeeMachine = new CoffeeMachine(info);
const multivariate = new Multivariate(info);

latte.addEventListener("click", () => {
    coffeeMachine.run("latte");
});

espresso.addEventListener("click", () => {
    coffeeMachine.run("espresso");
});

americano.addEventListener("click", () => {
    coffeeMachine.run("americano");
});

cookSoup.addEventListener("click", () => {
    multivariate.cookSoup();
});

stew.addEventListener("click", () => {
    multivariate.stew();
});

bake.addEventListener("click", () => {
    multivariate.bake();
});

stopCofee.addEventListener("click", () => {
    coffeeMachine.stop();
});

stopMulti.addEventListener("click", () => {
    multivariate.stop();
});