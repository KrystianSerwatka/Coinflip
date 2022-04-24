class Statistics {
  constructor() {
    this.gameResults = [];
  }

  addGameToStatistics(result) {
    const gameResult = { result };
    this.gameResults.push(gameResult);
  }

  showGameStatistics() {
    const games = this.gameResults.length;
    // const wins = this.gameResults.filter((result) => result.win).length;
    // const losses = this.gameResults.filter((result) => !result.win).length;
    return [games];
  }
}

const stats = new Statistics();
