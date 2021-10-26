import Interactive from "./Interactive.js"

export default class Treadmill extends Interactive {
  constructor(X, Y, xDist, yDist) {
    super(X, Y, xDist, yDist);
  }
  doAssociatedAction = (state) => {
    if (state.days == 0) {
      message.innerHTML = "You've trained enough! Go to the ring";
    } else if (!state.isInjured && state.energy >= 20) {
      state.energy -= 20;
      state.strength += 0.5;
      state.injuryChance -= 0.3;
      state.doUpdate();
      message.innerHTML =
        "You warmed up on the treadmill! You're now less likely to get injured";
    } else if (state.isInjured) {
      message.innerHTML = "You're injured, you can't exercise! Go stretch";
    } else if (state.energy <= 20) {
      message.innerHTML =
        "You're too tired to run! Go and eat something or sleep";
    }
  };
}
