function Player() {
  this.totalScore = 0;
  this.currentScore = 0;

  this.addToTotalScore = (num) => {
    this.totalScore += num;
  };
  this.addToCurrentScore = (num) => {
    this.currentScore += num;
  };
  this.getTotalScore = () => {
    return this.totalScore;
  };
  this.getCurrentScore = () => {
    return this.currentScore;
  };
  this.setTotalScore = (num) => {
    this.totalScore = num;
  };
  this.setCurrentScore = (num) => {
    this.currentScore = num;
  };
}
const player1 = new Player();
const player2 = new Player();

const player1TotalScore = document.querySelector(".player-1-total-score");
const player2TotalScore = document.querySelector(".player-2-total-score");
const player1CurrentScore = document.querySelector(".player-1-current-score");
const player2CurrentScore = document.querySelector(".player-2-current-score");
const player1Side = document.querySelector(".main-left");
const player2Side = document.querySelector(".main-right");

const newGameBtn = document.querySelector(".new-game-btn");
const rollDiceBtn = document.querySelector(".roll-dice-btn");
const holdBtn = document.querySelector(".hold-btn");
const dice = document.querySelector(".dice-png");

function showDice() {
  dice.classList.remove("hidden");
}
function hideDice() {
  dice.classList.add("hidden");
}
function setActivePlayer(player) {
  if (player === "player1") {
    player2Side.classList.remove("player--active");
    player1Side.classList.add("player--active");
  } else if (player === "player2") {
    player1Side.classList.remove("player--active");
    player2Side.classList.add("player--active");
  }
}
function getActivePlayer() {
  return player1Side.classList.contains("player--active")
    ? "player1"
    : "player2";
}
function getRandomNumber() {
  return Math.floor(Math.random() * 6) + 1;
}
function getDice() {
  showDice();
  let randomNumber = getRandomNumber();
  switch (randomNumber) {
    case 1:
      dice.src = `images/dice-${1}.png`;
      return 1;
      break;
    case 2:
      dice.src = `images/dice-${2}.png`;
      return 2;
      break;
    case 3:
      dice.src = `images/dice-${3}.png`;
      return 3;
      break;
    case 4:
      dice.src = `images/dice-${4}.png`;
      return 4;
      break;
    case 5:
      dice.src = `images/dice-${5}.png`;
      return 5;
      break;
    case 6:
      dice.src = `images/dice-${6}.png`;
      return 6;
      break;
    default:
      break;
  }
}
function rollDice() {
  let toAdd = getDice();
  let currentPlayer = getActivePlayer();
  if (currentPlayer === "player1") {
    player1.addToCurrentScore(toAdd);
    if (toAdd === 1) {
      player1.setCurrentScore(0);
      setActivePlayer("player2");
    }
    setScoreElements(currentPlayer, "current");
  } else if (currentPlayer === "player2") {
    player2.addToCurrentScore(toAdd);
    if (toAdd === 1) {
      player2.setCurrentScore(0);
      setActivePlayer("player1");
    }
    setScoreElements(currentPlayer, "current");
  }
}
function hasWon(player) {
  if (player === "player1") {
    return player1.getTotalScore() >= 100 ? true : false;
  } else if (player === "player2") {
    return player2.getTotalScore() >= 100 ? true : false;
  }
}
function holdDice() {
  let currentPlayer = getActivePlayer();
  if (currentPlayer === "player1") {
    player1.addToTotalScore(player1.getCurrentScore());
    setScoreElements(currentPlayer, "total");
    if (hasWon(currentPlayer)) {
      player1Side.classList.add("won");
      rollDiceBtn.removeEventListener("click", rollDice);
      holdBtn.removeEventListener("click", holdDice);
      return;
    }
    player1.currentScore = 0;
    setScoreElements(currentPlayer, "current");
    setActivePlayer("player2");
  } else if (currentPlayer === "player2") {
    player2.addToTotalScore(player2.getCurrentScore());
    setScoreElements(currentPlayer, "total");
    if (hasWon(currentPlayer)) {
      player2Side.classList.add("won");
      rollDiceBtn.removeEventListener("click", rollDice);
      holdBtn.removeEventListener("click", holdDice);
      return;
    }
    player2.currentScore = 0;
    setScoreElements(currentPlayer, "current");
    setActivePlayer("player1");
  }
}

rollDiceBtn.addEventListener("click", rollDice);
holdBtn.addEventListener("click", holdDice);

function setScoreElements(player, scoreType) {
  if (player === "player1") {
    if (scoreType === "current") {
      player1CurrentScore.textContent = player1.getCurrentScore();
    } else if (scoreType === "total") {
      player1TotalScore.textContent = player1.getTotalScore();
    }
  } else if (player === "player2") {
    if (scoreType === "current") {
      player2CurrentScore.textContent = player2.getCurrentScore();
    } else if (scoreType === "total") {
      player2TotalScore.textContent = player2.getTotalScore();
    }
  }
}
newGameBtn.addEventListener("click", () => {
  player1.setCurrentScore(0);
  player1.setTotalScore(0);
  player2.setCurrentScore(0);
  player2.setTotalScore(0);

  setScoreElements("player1", "current");
  setScoreElements("player1", "total");
  setScoreElements("player2", "current");
  setScoreElements("player2", "total");

  player1Side.classList.remove("won");
  player2Side.classList.remove("won");

  rollDiceBtn.addEventListener("click", rollDice);
  holdBtn.addEventListener("click", holdDice);

  hideDice();
});
setActivePlayer("player1");
