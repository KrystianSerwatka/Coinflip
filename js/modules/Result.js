class Result {
  static moneyWin(result, bid) {
    if (result) {
      return 2 * bid;
    }
    return bid;
  }

  static checkWinner(playerCoinChoose, drawResult) {
    if (playerCoinChoose === drawResult) {
      return true;
    }
    return false;
  }
}

const result = new Result();
