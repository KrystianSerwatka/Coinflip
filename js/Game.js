class Game {
  constructor(start) {
    this.playerCoin = "";
    this.coinChoose = [...document.querySelectorAll(".choosewrapper img")];

    this.coinChoose.forEach((e) =>
      e.addEventListener("click", () => {
        this.playerCoin = e.dataset.option;
        this.coinChoose.forEach((i) => {
          i.style.boxShadow = "";
          i.style.borderRadius = "";
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
          i.style.color = "";
          i.style.background = "";
          i.style.borderRadius = "";
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

    this.inputValueInDollar = document.querySelector(".input-group-text");
    this.inputValueInDollar.innerHTML = `${0}$`;

    document.body.addEventListener("input", () => {
      this.inputValueInDollar.innerHTML = `${Math.floor(
        Number(this.inputBid.value)
      )}$`;
    });
  }

  getCoinChoose() {
    return this.playerCoin;
  }

  getDepositChoose() {
    return this.playerDeposit;
  }

  // Value of choose deposit
  // const getElementValue = document.querySelector(".choosemoney p").innerHTML;

  render() {
    this.draw = new Draw();
    if (Result.checkWinner(this.getCoinChoose(), this.draw.getDrawResult())) {
      console.log("Wygrałeś!");
    } else {
      console.log("Przegrałeś!");
    }
  }

  endGame() {
    const playerChooseUncheck = document.querySelector(
      `[data-option="${this.playerCoin}"]`
    );
    if (playerChooseUncheck) {
      playerChooseUncheck.style.boxShadow = "";
      playerChooseUncheck.style.borderRadius = "";
      this.playerCoin = "";
    }

    const playerDepositUncheck = document.querySelector(
      `[data-option="${this.playerDeposit}"]`
    );

    if (playerDepositUncheck) {
      playerDepositUncheck.style.boxShadow = "";
      playerDepositUncheck.style.color = "";
      playerDepositUncheck.style.background = "";
      playerDepositUncheck.style.borderRadius = "";
      this.playerDeposit = "";
    }

    this.inputBid.value = "";
    this.inputValueInDollar.innerHTML = `${0}$`;
  }

  startGame() {
    if (
      (!(Number(this.inputBid.value) === 0) &&
        !(this.inputBid.value === "") &&
        !(this.playerCoin === "")) ||
      (!(this.playerDeposit === "") && !(this.playerCoin === ""))
    ) {
      if (
        !(this.playerCoin === "") &&
        !(this.playerDeposit === "") &&
        !(Number(this.inputBid.value) === 0)
      ) {
        this.endGame();
        return alert(
          "Nie możesz jednocześnie zaznaczyć depozytu oraz wpisać własnej wartości!"
        );
      }
      this.wallet = new Wallet();
      this.wallet.addLastCoinflips(10, 20, 30);
      this.endGame();
    } else {
      this.endGame();
      return alert(
        "Proszę wybrać rodzaj coina, zaznaczyć kwotę lub wpisać ręcznie!"
      );
    }
  }
}

const game = new Game();
