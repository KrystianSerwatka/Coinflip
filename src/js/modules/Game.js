/* global Result */
/* global Wallet */
/* global Statistics */
/* global  Draw */
/* eslint no-param-reassign: "error" */
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

    this.coinChoose.forEach((e) =>
      e.addEventListener("dblclick", () => {
        this.playerCoin = "";
        e.style.boxShadow = "";
        e.style.borderRadius = "";
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

    this.depositeChoose.forEach((e) =>
      e.addEventListener("dblclick", () => {
        this.playerDeposit = "";
        this.playerDepositValue = "";
        e.style.boxShadow = "";
        e.style.color = "";
        e.style.background = "";
        e.style.borderRadius = "";
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

  startGame() {
    const fourthParaghraphOfRules = document.querySelector(
      ".howtoplaydesc p:nth-child(4)"
    );
    const thirdParaghraphOfRules = document.querySelector(
      ".howtoplaydesc p:nth-child(3)"
    );
    const secondParaghraphOfRules = document.querySelector(
      ".howtoplaydesc p:nth-child(2)"
    );
    const fiveParaghraphOfRules = document.querySelector(
      ".howtoplaydesc p:nth-child(5)"
    );

    fourthParaghraphOfRules.classList.remove("pulseAndShakeText");
    thirdParaghraphOfRules.classList.remove("pulseAndShakeText");
    secondParaghraphOfRules.classList.remove("pulseAndShakeText");
    fiveParaghraphOfRules.classList.remove("pulseAndShakeText");

    if (
      (!(this.inputBid.value === "") && !(this.playerCoin === "")) ||
      (!(this.playerDeposit === "") && !(this.playerCoin === ""))
    ) {
      if (
        !(this.playerCoin === "") &&
        !(this.playerDeposit === "") &&
        !(this.inputBid.value === "")
      ) {
        this.endGame();
        return fourthParaghraphOfRules.classList.add("pulseAndShakeText");
      }

      if (
        !(this.inputBid.value === "") &&
        Number(this.inputBid.value) <= 0 &&
        !(this.playerCoin === "")
      ) {
        this.endGame();
        return fiveParaghraphOfRules.classList.add("pulseAndShakeText");
      }

      const bid = Math.floor(Number(this.inputBid.value));

      if (
        !this.wallet.checkCanPlay(bid) ||
        !this.wallet.checkCanPlay(this.playerDepositValue)
      ) {
        this.endGame();
        return thirdParaghraphOfRules.classList.add("pulseAndShakeText");
      }

      this.draw = new Draw();
      this.salary = document.querySelector("p.salary");

      this.stats.addGameToStatistics(
        Result.checkWinner(this.getCoinChoose(), this.draw.getDrawResult())
      );

      if (this.playerDeposit !== "") {
        this.wallet.addLastCoinflips(
          this.playerDepositValue,
          Result.moneyWin(
            Result.checkWinner(this.getCoinChoose(), this.draw.getDrawResult()),
            this.playerDepositValue
          ),
          this.wallet.changeWallet(
            Result.moneyWin(
              Result.checkWinner(
                this.getCoinChoose(),
                this.draw.getDrawResult()
              ),
              this.playerDepositValue
            ),
            Result.checkWinner(this.getCoinChoose(), this.draw.getDrawResult())
          ),
          this.playerCoin
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
      } else if (Number(this.inputBid.value > 0)) {
        this.wallet.addLastCoinflips(
          Number(this.inputBid.value),
          Result.moneyWin(
            Result.checkWinner(this.getCoinChoose(), this.draw.getDrawResult()),
            Number(this.inputBid.value)
          ),
          this.wallet.changeWallet(
            Result.moneyWin(
              Result.checkWinner(
                this.getCoinChoose(),
                this.draw.getDrawResult()
              ),
              Number(this.inputBid.value)
            ),
            Result.checkWinner(this.getCoinChoose(), this.draw.getDrawResult())
          ),
          this.playerCoin
        );

        this.render(
          Number(this.inputBid.value),
          Result.moneyWin(
            Result.checkWinner(this.getCoinChoose(), this.draw.getDrawResult()),
            Number(this.inputBid.value)
          ),
          this.playerCoin,
          this.salary,
          this.wallet.getWalletValue(),
          this.stats.showGameStatistics()
        );
      }

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

      this.endGame();
    } else {
      this.endGame();
      return secondParaghraphOfRules.classList.add("pulseAndShakeText");
    }
  }
}

const game = new Game(200);
