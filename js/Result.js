class Result {
  static moneyWin(result, bid) {
    if (result) return 2 * bid;
    return 0;
  }

  static checkWinner(playerCoinChoose, drawResult) {
    if (playerCoinChoose === drawResult) {
      return true;
    }
    return false;
  }
}

const result = new Result();
