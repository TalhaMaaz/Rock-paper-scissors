score = JSON.parse(localStorage.getItem("scoreboard")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

displayScore();

function playgame(playerMove) {
  reset();

  let computerMove = calculateComputerMove();

  let result = "";

  if (playerMove === computerMove) {
    result = "Tie.";
  } else if (
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissors" && computerMove === "paper")
  ) {
    result = "You win.";
  } else {
    result = "You Lose.";
  }

  if (result === "Tie.") {
    score.ties++;
    document.querySelector(`.${playerMove}`).classList.add("tie-move");
    document.querySelector(".info").innerHTML = result;
    document.querySelector('.info').classList.add('tie-info')
  } else {
    if (result === "You win.") {
      score.wins++;
      document.querySelector(".info").innerHTML = result;
      document.querySelector('.info').classList.add('win-info')
    } else {
      score.losses++;
      document.querySelector(".info").innerHTML = result;
      document.querySelector('.info').classList.add('lose-info')
    }

    document.querySelector(`.${playerMove}`).classList.add("player-move");
    document.querySelector(`.${computerMove}`).classList.add("cpu-move");
  }
  localStorage.setItem("scoreboard", JSON.stringify(score));
  displayScore();
}

function calculateComputerMove() {
  const x = Math.random();
  if (x < 1 / 3) return "rock";
  if (x < 2 / 3) return "paper";
  return "scissors";
}

function displayScore() {
  document.getElementById("wins").textContent = `Wins: ${score.wins}`;
  document.getElementById("losses").textContent = `Losses: ${score.losses}`;
  document.getElementById("ties").textContent = `Ties: ${score.ties}`;
}


function resetScore() {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
  localStorage.setItem("scoreboard", JSON.stringify(score));
  reset();
  document.querySelector(".info").innerHTML = "Hi again!";
  stopAutoPlay(id);
}




function reset() {
  const choicesBorders = document.querySelectorAll(".choices button");
  choicesBorders.forEach((button) => {
    button.classList.remove("player-move", "cpu-move", "tie-move");
  });

  const choicesInfo = document.querySelector('.info')
    choicesInfo.classList.remove("win-info", "lose-info", "tie-info");

  }


  let isAuto = false;
let id;

function autoPlayMain(){
  if (!isAuto){
  id = setInterval(autoPlay,1000)
  isAuto=true;
} else {
  stopAutoPlay(id)
}
}

function autoPlay(){
  x = calculateComputerMove();
  playgame(x);
}


function stopAutoPlay(id) {
  isAuto = false;
  clearInterval(id);
}

document.querySelector(".rock").addEventListener('click', () => playgame('rock'))
document
  .querySelector(".paper")
  .addEventListener("click", () => playgame("paper"));
  document
    .querySelector(".scissors")
    .addEventListener("click", () => playgame("scissors"));


document.body.addEventListener('keypress', (event)=> {
  if (event.key == 'r'){
    playgame('rock')
  } else if (event.key == 'p'){
    playgame('paper')
  } else if(event.key == 's' ){
    playgame('scissors')
  }
})