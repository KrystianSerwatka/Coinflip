class Wallet {
  constructor(money) {
    let _money = money;

    this.list = [];

    this.firstColumn = document.querySelector("div.bet");
    this.secondColumn = document.querySelector("div.profit");
    this.thirdColumn = document.querySelector("div.salary");

    this.lastBet = document.querySelector("p.bet");
    this.lastProfit = document.querySelector("p.profit");
    this.lastSalary = document.querySelector("p.salary");

    this.getWalletValue = () => _money;

    this.checkCanPlay = (value) => {
      if (_money > value) return true;
      return false;
    };

    this.changeWallet = (value, type = "+") => {
      if (typeof value === "number" && !isNaN(value)) {
        if (type === "+") {
          return (_money += value);
        }
        if (type === "-") {
          return (_money -= value);
        }
        throw new Error("nieprawidłowy typ działania");
      } else {
        throw new Error("nieprawidłowa liczba");
      }
    };
  }

  addLastCoinflips(bid, profit, money) {
    const addParagraphBet = document.createElement("p");
    addParagraphBet.className = "bet";
    addParagraphBet.innerHTML = `${bid}$`;
    this.firstColumn.prepend(addParagraphBet);

    this.list.push(addParagraphBet);

    const addParagraphProfit = document.createElement("p");
    addParagraphProfit.className = "profit";
    addParagraphProfit.innerHTML = `${profit}$`;
    this.secondColumn.prepend(addParagraphProfit);

    this.list.push(addParagraphProfit);

    const addParagraphSalary = document.createElement("p");
    addParagraphSalary.className = "salary";
    addParagraphSalary.innerHTML = `${money}$`;
    this.thirdColumn.prepend(addParagraphSalary);

    this.list.push(addParagraphSalary);

    console.log(this.list);

    this.allElementsBet = document.querySelectorAll("p.bet");
    this.allElementsProfit = document.querySelectorAll("p.profit");
    this.allElementsSalary = document.querySelectorAll("p.salary");

    if (
      this.allElementsBet.length > 5 &&
      this.allElementsProfit.length > 5 &&
      this.allElementsSalary.length > 5
    ) {
      document.querySelector("p.bet:last-of-type").remove();
      document.querySelector("p.profit:last-of-type").remove();
      document.querySelector("p.salary:last-of-type").remove();
    }
  }
}

const wallet = new Wallet(200);
