class Wallet {
  constructor(money) {
    let _money = money;

    this.list = [];

    this.firstColumn = document.querySelector("div.bet");
    this.secondColumn = document.querySelector("div.profit");
    this.thirdColumn = document.querySelector("div.salary");
    this.fourColumn = document.querySelector("div.choice");

    this.lastBet = document.querySelector("p.bet");
    this.lastProfit = document.querySelector("p.profit");
    this.lastSalary = document.querySelector("p.salary");

    this.getWalletValue = () => _money;

    this.checkCanPlay = (value) => {
      if (_money >= value) return true;
      return false;
    };

    this.changeWallet = (value, checkWinner) => {
      if (typeof value === "number" && !isNaN(value)) {
        if (checkWinner) {
          return (_money += value);
        }
        return (_money -= value);
      }
    };
  }

  addLastCoinflips(bid, profit, money, choice) {
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

    const addParagraphChoice = document.createElement("p");
    addParagraphChoice.className = "choice";
    addParagraphChoice.innerHTML = `${choice}`;
    this.fourColumn.prepend(addParagraphChoice);

    this.list.push(addParagraphChoice);

    this.allElementsBet = document.querySelectorAll("p.bet");
    this.allElementsProfit = document.querySelectorAll("p.profit");
    this.allElementsSalary = document.querySelectorAll("p.salary");
    this.allElementsChoice = document.querySelectorAll("p.choice");

    if (
      this.allElementsBet.length > 5 &&
      this.allElementsProfit.length > 5 &&
      this.allElementsSalary.length > 5 &&
      this.allElementsChoice.length > 5
    ) {
      document.querySelector("p.bet:last-of-type").remove();
      document.querySelector("p.profit:last-of-type").remove();
      document.querySelector("p.salary:last-of-type").remove();
      document.querySelector("p.choice:last-of-type").remove();
    }
  }
}

const wallet = new Wallet(200);
