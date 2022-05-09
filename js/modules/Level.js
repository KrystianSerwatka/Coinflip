class Level {
  constructor() {
    this.moneyLevel = (moneyStatus) => {
      const imageQuestionMarks = [
        ...document.querySelectorAll(".wrapperbox .box.image"),
      ];
      if (moneyStatus >= 600) {
        const firstReward = imageQuestionMarks[0];
        firstReward.style.boxShadow = "gold 0px 0px 20px 3px";
      }
    };
  }
}

const level = new Level();
