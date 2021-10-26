import Interactive from "./Interactive.js";

export default class Opponent extends Interactive {
  constructor(X, Y, xDist, yDist) {
    super(X, Y, xDist, yDist);
    this.opponentDOM = document.createElement("div");
    this.init = this.doMatchSetUp();
    this.isMoving = false;
    this.matchTimerId;
  }
  doMatchSetUp = () => {
    document.querySelector(".gameContainer").appendChild(this.opponentDOM);
    this.opponentDOM.classList.add("opponent");
    this.opponentDOM.setAttribute('id', 'opp');
    this.opponentDOM.style.display = "none";
  };

  doAssociatedAction = (state) => {
    if (!this.isMoving) {
      this.startMovement();
      this.startTimer(state);
      this.isMoving = true;
      let fightTimerId = setTimeout(() => {
        this.gameOver(state);
      }, 30000);
    } else {
      state.points++;
      document.getElementById("pointDisplay").innerHTML = state.points;
    }
  };

  startMovement = () => {
    let goingLeft = true;
    let goingDown = true;
    let fightInterval = setInterval(() => {
      if (this.position.x >= 25 && this.position.x <= 310) {
        let multiplier = goingLeft ? 1 : -1;
        this.position.x += (2 + Math.random() * 2) * multiplier;
        this.opponentDOM.style.left = this.position.x + "px";
      } else {
        if (goingLeft) {
          goingLeft = false;
          this.position.x -= 5;
        } else {
          goingLeft = true;
          this.position.x += 5;
        }
      }
      if (this.position.y >= 270 && this.position.y <= 545) {
        let multiplier = goingDown ? 1 : -1;
        this.position.y += Math.random() * 5 * multiplier;
        this.opponentDOM.style.top = this.position.y + "px";
      } else {
        if (goingDown) {
          goingDown = false;
          this.position.y -= 5;
        } else {
          goingDown = true;
          this.position.y += 5;
        }
      }
    }, 20);
  };

  startTimer = (state) => {
    this.matchTimerId = setInterval(() => {
      state.seconds--;
      document.getElementById("timerBar").style.width =
        state.seconds * 3.33 + "%";
    }, 1000);
  };

  gameOver = (state) => {
    clearInterval(this.matchTimerId);
    while (document.querySelector(".gameContainer").firstChild) {
      document
        .querySelector(".gameContainer")
        .removeChild(document.querySelector(".gameContainer").lastChild);
    }
    let finalScore = Math.round(state.points * (state.strength / 100));
    if (state.cloutAmount >= 60 && finalScore >= 20) {
      message.innerHTML = "You won and you got a sponsorship deal! Well done";
    } else if (state.cloutAmount >= 60 && finalScore < 20) {
      message.innerHTML =
        "You didn't win but you're so popular you've been offered your own TV series!";
    } else if (state.cloutAmount < 60 && finalScore >= 20) {
      message.innerHTML =
        "You never got popular enough to become famous but you won the match and had a successful career as a coach!";
    } else {
      message.innerHTML =
        "You lost and you don't have enough popularity to reach the big leagues...";
    }
  };
}
