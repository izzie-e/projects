import CloutChance from "./CloutChance.js"

export default class Manager {
  constructor() {
    this.managerDOM = document.querySelector(".manager");
    this.position = {
      x: 1,
      y: 70,
      xDistance: 40,
      yDistance: 40,
      goingLeft: true,
      goingDown: true,
    };
    this.yesOrNo = " (press Y or N)";
    this.cloutOptions = {
      socialMedia: new CloutChance(
        "Will you go on social media to reach more fans?" + this.yesOrNo,
        -5,
        10,
        "You hit 5000 followers in 10 minutes!",
        "That sponsorship seems pretty unlikely anyway"
      ),
      marathon: new CloutChance(
        "Will you run a marathon for charity?" + this.yesOrNo,
        -100,
        40,
        "What a success! You won!",
        "Exactly! Who cares about charity"
      ),
      cinema: new CloutChance(
        "A fan wants to go on a date to the cinema with you! Will you go?" +
          this.yesOrNo,
        -20,
        -1,
        "The fans didn't like that...",
        "Probably for the best"
      ),
      magazine: new CloutChance(
        "Will you agree to pose for the front page of a magazine?" +
          this.yesOrNo,
        -20,
        15,
        "You gained some new fans",
        "You need to train today anyway"
      ),
      interview: new CloutChance(
        "A local radio wants to interview you, will you go on?" + this.yesOrNo,
        -7,
        10,
        "You inspired a lot of listeners!",
        "Who even listens to the radio anymore"
      ),
      merch: new CloutChance(
        "Do you decide to start selling hoodies with your face on them?" +
          this.yesOrNo,
        -5,
        -20,
        "The quality is terrible and you lose fans...",
        "Who would actually wear clothes with your face on?"
      ),
      puppies: new CloutChance(
        "You see some puppies wondering around in the street behind the gym. Do you adopt them?" +
          this.yesOrNo,
        -20,
        20,
        "They're not microchipped so you take them home. Your fans see and love you even more!",
        "They probably belong to someone anyway"
      ),
      tV: new CloutChance(
        "Do you decide to apply for a televised talent show?" + this.yesOrNo,
        -50,
        -20,
        "It turns out you really can't dance. Your fans feel embarassed...",
        "It's more fun to laugh at the contestants than actually compete"
      ),
    };
    this.currentOption = {
      energy: 0,
      clout: 0,
      outcome: " ",
      negOutcome: " ",
    };
    this.speed = 1;
    this.managerTimerId = setInterval(this.moveManager, 20);
  }
  moveManager = () => {
    if (this.position.x < 1000 && this.position.goingLeft) {
      this.position.goingDown = true;
      this.position.x += this.speed;
      this.managerDOM.style.left = this.position.x + "px";
    } else if (this.position.y < 550 && this.position.goingDown) {
      this.position.goingLeft = false;
      this.position.y += this.speed;
      this.managerDOM.style.top = this.position.y + "px";
    } else if (this.position.x > 50 && !this.position.goingLeft) {
      this.position.goingDown = false;
      this.position.x -= this.speed;
      this.managerDOM.style.left = this.position.x + "px";
    } else if (this.position.y > 50 && !this.position.goingDown) {
      this.position.y -= this.speed;
      this.managerDOM.style.top = this.position.y + "px";
    } else {
      this.position.goingLeft = true;
    }
  };

  doAssociatedAction = (state) => {
    if (state.cloutInAction) {
      return;
    }
    if (state.cloutOpportunities < 1) {
      message.innerHTML =
        "Come back tomorrow for another chance to gain clout!";
      return;
    }
    state.cloutInAction = true;
    state.cloutOpportunities--;
    // gets random key from object
    const keys = Object.keys(this.cloutOptions);
    const randomCloutObjectKey = keys[Math.floor(Math.random() * keys.length)];
    //object destructuring
    let { situation, energyUsed, newClout, outcome, negOutcome } =
      this.cloutOptions[randomCloutObjectKey];
    message.innerHTML = situation;
    this.currentOption.energy = energyUsed;
    this.currentOption.clout = newClout;
    this.currentOption.outcome = outcome;
    this.currentOption.negOutcome = negOutcome;
    //deletes the random key-value pair :
    delete this.cloutOptions[randomCloutObjectKey];
  };

  pickOption = (playerState, answer) => {
    if (answer == "yes") {
      playerState.energy += this.currentOption.energy;
      playerState.cloutAmount += this.currentOption.clout;
      message.innerHTML = this.currentOption.outcome;
      playerState.doUpdate();
    } else {
      message.innerHTML = this.currentOption.negOutcome;
    }
    playerState.cloutInAction = false;
  };
}
