import Interactive from "./Interactive.js"


export default class Weight extends Interactive {
    constructor(X, Y, xDist, yDist, energyNeeded, strengthGained) {
      super(X, Y, xDist, yDist);
      this.energyRequired = energyNeeded; // light = 10, heavy =30
      this.strengthGained = strengthGained; // light = 1.2, heavy = 4.5
      this.genericPlattitudes = [
        "Good Job!",
        "Nice Going!",
        "Perfect Technique",
        "Faultless!",
        "This is what peak performace looks like!",
        "You're on track to win!",
      ];
    }
    doAssociatedAction = (state) => {
      let combinedInjurychance = Math.random() / 1.5 + state.injuryChance + 0.1;
      if (state.days <= 0) {
        message.innerHTML = "The match is today, get to the ring!";
      } else if (state.energy < this.energyRequired) {
        message.innerHTML = "You're too tired to lift! Try eating or sleeping";
      } else if (state.isInjured) {
        message.innerHTML = "You can't lift, you're injured! Try stretching";
      } else if (combinedInjurychance < 0.9) {
        state.strength += this.strengthGained;
        state.energy -= this.energyRequired;
        message.innerHTML =
          this.genericPlattitudes[Math.round(Math.random() * 5)];
        state.doUpdate();
      } else {
        state.isInjured = true;
        message.innerHTML = "Oh no, you injured yourself! Try stretching";
      }
    };
  }