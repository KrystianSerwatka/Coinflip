class Game {
  constructor(start) {
    this.wallet = new Wallet(start);
    this.stats = new Statistics();

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

    this.fiveValueDeposite = Number(document.getElementById("5").textContent);
    this.tenValueDeposite = Number(document.getElementById("10").textContent);
    this.twentyValueDeposite = Number(
      document.getElementById("20").textContent
    );
    this.fiftyValueDeposite = Number(document.getElementById("50").textContent);
    this.hundredValueDeposite = Number(
      document.getElementById("100").textContent
    );

    this.playerDeposit = "";
    this.playerDepositValue = "";
    this.depositeChoose = [...document.querySelectorAll(".choosemoney p")];

    this.depositeChoose.forEach((e) =>
      e.addEventListener("click", () => {
        this.playerDeposit = e.dataset.option;
        this.playerDepositValue = e.dataset.option;
        if (this.playerDepositValue === "five") {
          this.playerDepositValue = this.fiveValueDeposite;
        } else if (this.playerDepositValue === "ten") {
          this.playerDepositValue = this.tenValueDeposite;
        } else if (this.playerDepositValue === "twenty") {
          this.playerDepositValue = this.twentyValueDeposite;
        } else if (this.playerDepositValue === "fifty") {
          this.playerDepositValue = this.fiftyValueDeposite;
        } else if (this.playerDepositValue === "hundred") {
          this.playerDepositValue = this.hundredValueDeposite;
        }
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

    this.inputValueInDollar = document.querySelector(".input-group-text");
    this.inputValueInDollar.innerHTML = `${0}$`;

    document.body.addEventListener("input", () => {
      this.inputValueInDollar.innerHTML = `${Math.floor(
        Number(this.inputBid.value)
      )}$`;
    });

    this.spanWalletMoney = document.querySelector("p.money span");
    this.spanWalletGames = document.querySelector("p.games span");

    this.resultStatus = document.getElementById("result");

    this.render();
  }

  getCoinChoose() {
    return this.playerCoin;
  }

  getDepositChoose() {
    return this.playerDeposit;
  }

  render(
    bid = 0,
    profit = 0,
    choice = "",
    salary = this.wallet.getWalletValue(),
    money = this.wallet.getWalletValue(),
    stats = 0
  ) {
    this.spanWalletMoney.textContent = money;
    this.spanWalletGames.textContent = stats;
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

    console.log(playerDepositUncheck);

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

      const bid = Math.floor(Number(this.inputBid.value));

      if (
        !this.wallet.checkCanPlay(bid) ||
        !this.wallet.checkCanPlay(this.playerDepositValue)
      ) {
        this.endGame();
        return alert("Masz za mało środków do gry!");
      }

      this.draw = new Draw();
      this.wallet.addLastCoinflips(
        this.playerDepositValue,
        Result.moneyWin(
          Result.checkWinner(this.getCoinChoose(), this.draw.getDrawResult()),
          this.playerDepositValue
        ),
        this.wallet.changeWallet(
          Result.moneyWin(
            Result.checkWinner(this.getCoinChoose(), this.draw.getDrawResult()),
            this.playerDepositValue
          ),
          Result.checkWinner(this.getCoinChoose(), this.draw.getDrawResult())
        ),
        this.playerCoin
      );

      if (Result.checkWinner(this.getCoinChoose(), this.draw.getDrawResult())) {
        this.resultStatus.textContent = "Wygrałeś";
        document.querySelector("p.bet").style.color = "green";
        this.profitPlus = document.querySelector("p.profit");
        const addPlusProfit = document.createElement("span");
        addPlusProfit.textContent = "+";
        this.profitPlus.prepend(addPlusProfit);
        document.querySelector("p.profit").style.color = "green";
        document.querySelector("p.salary").style.color = "green";
        document.querySelector("p.choice").style.color = "green";
      } else {
        this.resultStatus.textContent = "Przegrałeś";
        document.querySelector("p.bet").style.color = "red";
        this.profitMinus = document.querySelector("p.profit");
        const addMinusProfit = document.createElement("span");
        addMinusProfit.textContent = "-";
        this.profitMinus.prepend(addMinusProfit);
        document.querySelector("p.profit").style.color = "red";
        document.querySelector("p.salary").style.color = "red";
        document.querySelector("p.choice").style.color = "red";
      }

      this.salary = document.querySelector("p.salary");

      this.stats.addGameToStatistics(
        Result.checkWinner(this.getCoinChoose(), this.draw.getDrawResult())
      );

      this.render(
        this.playerDepositValue,
        Result.moneyWin(
          Result.checkWinner(this.getCoinChoose(), this.draw.getDrawResult()),
          this.playerDepositValue
        ),
        this.playerCoin,
        this.salary,
        this.wallet.getWalletValue(),
        this.stats.showGameStatistics()
      );
      this.endGame();
    } else {
      this.endGame();
      return alert(
        "Proszę wybrać rodzaj coina, zaznaczyć kwotę lub wpisać ręcznie!"
      );
    }
  }
}

const game = new Game(200);
