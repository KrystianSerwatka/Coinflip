class Draw {
  constructor() {
    this.coinOptions = ["heads", "tails"];

    const _result = this.drawResult();
    this.getDrawResult = () => _result;
  }

  drawResult() {
    const index = Math.floor(Math.random() * this.coinOptions.length);
    const coinResult = this.coinOptions[index];
    return coinResult;
  }
}

const draw = new Draw();
