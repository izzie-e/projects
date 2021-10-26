import Interactive from "./Interactive.js";

export default class Bed extends Interactive {
  constructor(X, Y, xDist, yDist) {
    super(X, Y, xDist, yDist);
  }
  doAssociatedAction = (state) => {
    if (state.isSleeping) {
      return;
    }
    if (state.days == 0) {
      message.innerHTML =
        "You can't go to sleep! Go to the ring to face your opponent";
      return;
    } else if (state.days == 1) {
      message.innerHTML = "The match is today! Head over to the ring";
    } else if (!state.isInjured || days == 2) {
      message.innerHTML = `Days Left: ${state.days - 1}`;
    } else if (isInjured && days != 2) {
      message.innerHTML = `You had to miss a day of training because of your injury. There are ${
        state.days - 1
      } days left`;
    } else if (state.days != 0) {
      message.innerHTML = `There are now ${state.days - 1} days left`;
    }
    this.doSleep(state);
  };
  doSleep = (state) => {
    state.days--;
    state.energy = 100;
    state.injuryChance = 0.5;
    state.meals = 0;
    state.cloutOpportunities = 1;
    state.doUpdate();
    state.isSleeping = true;
    setTimeout(() => {
      state.isSleeping = false;
    }, 4000);
    this.makeDark();
    if (state.days == 0) {
      this.prepareMatch(state);
    }
  };

  makeDark = () => {
    let opacity = 0;
    let darkInterval = setInterval(() => {
      opacity += 0.01;
      document.getElementById("night").style.opacity = opacity;
      if (opacity >= 1) {
        clearInterval(darkInterval);
        let lightInterval = setInterval(() => {
          opacity -= 0.01;
          document.getElementById("night").style.opacity = opacity;
          if (opacity <= 0) {
            clearInterval(lightInterval);
          }
        }, 10);
      }
    }, 10);
  };

  prepareMatch = (state) => {
    document.getElementById("daysDiv").style.display = "none";
    timerDiv.style.display = "inline-block";
    timerBar.style.width = state.seconds * 3.33 + "%";
    //removes manager from game
    document
      .querySelector(".gameContainer")
      .removeChild(document.querySelector(".manager"));
  };
}