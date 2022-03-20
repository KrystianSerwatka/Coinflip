class Statistics {
  constructor() {
    this.gameResults = [
      { win: true, bid: 10 },
      { win: false, bid: 20 },
    ];
  }

  addGameToStatistics(win, bid) {
    const gameResult = {
      win,
      bid,
    };
    console.log(gameResult);
    this.gameResults.push(gameResult);
  }

  showGameStatistics() {
    const games = this.gameResults.length;
    const wins = this.gameResults.filter((result) => result.win).length;
    const losses = this.gameResults.filter((result) => !result.win).length;
    return [games, wins, losses];
  }
}

const stats = new Statistics();
