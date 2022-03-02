const coinSummary = {
    money: 200,
    games: 0,
    bet: 0,
    profit: 0,
    salary: 0,
}

const game = {
    playerChoose: "",
}

const deposite = {
    playerChoose: "",
}

/* Declaration of elements */
const coin = document.querySelector('#coin');
const button = document.querySelector('#flip');
const status = document.querySelector('#status');
const heads = document.querySelector('#headsCount');
const tails = document.querySelector('#tailsCount');
/* Animation class */
const animateHead = document.querySelector('.animate-heads');
const animateTail = document.querySelector('.animate-tails');
/* Data option */
const chooses = [...document.querySelectorAll('.choosewrapper img')];
const deposits = [...document.querySelectorAll('.choosemoney p')];

let headsCount = 0;
let tailsCount = 0;

/* Choose your coin */
function coinSelection() {
    game.playerChoose = this.dataset.option
    chooses.forEach(choose => choose.style.boxShadow = '');
    chooses.forEach(choose => choose.style.borderRadius = '');
    this.style.boxShadow = 'gold 0px 0px 20px 3px';
    this.style.borderRadius = '50%';
}

/* Choose your deposit */
function moneyDeposit() {
    deposite.playerChoose = this.dataset.option
    deposits.forEach(deposit => deposit.style.boxShadow = '');
    deposits.forEach(deposit => deposit.style.color = '');
    deposits.forEach(deposit => deposit.style.background = '');
    deposits.forEach(deposit => deposit.style.borderRadius = '');
    this.style.boxShadow = 'gold 0px 0px 20px 3px';
    this.style.color = 'black';
    this.style.background = 'gold';
    this.style.borderRadius = '10%';
}

function deferFn(callback, ms) {
    setTimeout(callback, ms);
}

/* Animation of coin */
function animation(player) {
    coin.setAttribute('class', '');
    const random = Math.random();
    const result = random < 0.5 ? 'heads' : 'tails';
    deferFn(function () {
        coin.setAttribute('class', 'animate-' + result);
    }, 100);
    deferFn((null, result), 2900);

    if ((result === 'heads' && player === "head") || (result === 'tails' && player === "tail")) {
        return 'win';
    } else {
        return 'lose';
    }
}

/* If player will not choose coin */
function chooseAlert() {
    if ((!game.playerChoose) || (!deposite.playerChoose)) {
        coin.style.animationPlayState = "paused";
        return alert("Choose coin and your deposite!");
    } else(game.playerChoose)
    coin.style.animationPlayState = "running";
}


/* Publish result */
function publishResult(result) {
    const depositeNumber = document.querySelector('.choosemoney div p');
    const depositeMoney = document.querySelector('.walletstats p.money span');
    document.querySelector('p.games span').textContent = ++coinSummary.games;

    if ((result === "win") && (depositeNumber.classList.contains('five'))) {
        coinSummary.money += 5;
        depositeMoney.textContent = coinSummary.money;
    } else {
        coinSummary.money -= 5;
        depositeMoney.textContent = coinSummary.money;
    }
    // if ((result === "win") && (depositeNumber.classList.contains('ten'))) {
    //     coinSummary.money += 10;
    //     depositeMoney.textContent = coinSummary.money;
    // } else {
    //     coinSummary.money -= 10;
    //     depositeMoney.textContent = coinSummary.money;
    // }
    // if ((result === "win") && (depositeNumber.classList.contains("twenty"))) {
    //     coinSummary.money += 20;
    //     depositeMoney.textContent = coinSummary.money;
    // } else {
    //     coinSummary.money -= 20;
    //     depositeMoney.textContent = coinSummary.money;
    // }
    // if ((result === "win") && (depositeNumber.classList.contains("fifty"))) {
    //     coinSummary.money += 50;
    //     depositeMoney.textContent = coinSummary.money;
    // } else {
    //     coinSummary.money -= 50;
    //     depositeMoney.textContent = coinSummary.money;
    // }
    // if ((result === "win") && (depositeNumber.classList.contains("hundred"))) {
    //     coinSummary.money += 100;
    //     depositeMoney.textContent = coinSummary.money;
    // } else {
    //     coinSummary.money -= 100;
    //     depositeMoney.textContent = coinSummary.money;
    // }
}

function flipCoin() {
    const animationResult = animation(game.playerChoose);
    console.log(animationResult);
    chooseAlert();
    publishResult(animationResult);
}

chooses.forEach(choose => choose.addEventListener('click', coinSelection))
deposits.forEach(deposit => deposit.addEventListener('click', moneyDeposit))

button.addEventListener('click', flipCoin)