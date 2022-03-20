class Game {
  constructor(start) {
    this.playerCoin = "";
    this.coinChoose = [...document.querySelectorAll(".choosewrapper img")];

    this.coinChoose.forEach((e) =>
      e.addEventListener("click", () => {
        this.playerCoin = e.dataset.option;
        this.coinChoose.forEach((i) => {
          i.style.boxShadow = "";
          i.style.borderRadius = "0%";
        });
        e.style.boxShadow = "gold 0px 0px 20px 3px";
        e.style.borderRadius = "50%";
      })
    );

    this.playerDeposit = "";
    this.depositeChoose = [...document.querySelectorAll(".choosemoney p")];

    this.depositeChoose.forEach((e) =>
      e.addEventListener("click", () => {
        this.playerDeposit = e.dataset.option;
        this.depositeChoose.forEach((i) => {
          i.style.boxShadow = "";
          i.style.color = "white";
          i.style.background = "transparent";
          i.style.borderRadius = "0%";
        });
        e.style.boxShadow = "gold 0px 0px 20px 3px";
        e.style.color = "black";
        e.style.background = "gold";
        e.style.borderRadius = "10%";
      })
    );

    document
      .getElementById("flip")
      .addEventListener("click", this.startGame.bind(this));

    this.inputBid = document.getElementById("bid");

    this.spanGames = document.querySelector(
      ".walletstats .games .test"
    ).innerHTML;
  }

  getCoinChoose() {
    return this.playerCoin;
  }

  getDepositChoose() {
    return this.playerDeposit;
  }

  // const getElementValue = document.querySelector(".choosemoney p").innerHTML;

  render() {
    this.draw = new Draw();
    if (Result.checkWinner(this.getCoinChoose(), this.draw.getDrawResult())) {
      console.log("Wygrałeś!");
    } else {
      console.log("Przegrałeś!");
    }
  }

  startGame() {
    if (
      Number(this.inputBid.value) === 0 ||
      this.inputBid.value === "" ||
      this.getDepositChoose === ""
    ) {
      return alert(
        "Wprowadziłeś nieprawidłową wartość lub nie wybrałeś wartości do gry"
      );
    }
    if (this.inputBid.value < wallet.getWalletValue) {
      return alert("Masz za mało środków");
    }
  }
}

const game = new Game();
