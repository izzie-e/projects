import Interactive from "./Interactive.js"

export default class Mat extends Interactive {
    constructor(X, Y, xDist, yDist) {
      super(X, Y, xDist, yDist);
    }
    doAssociatedAction = (state) => {
      if (state.days == 0) {
        message.innerHTML = "Your opponent is waiting! Go to the ring";
      } else if (!state.isInjured) {
        message.innerHTML = "You're not injured! Stretching won't do anything";
      } else if (state.isInjured && state.energy > 10) {
        state.energy = 0;
        state.doUpdate();
        state.isInjured = false;
        message.innerHTML =
          "All better now! Remember to warm up on the treadmill at the start of the day";
      } else if (state.isInjured && state.energy <= 10) {
        message.innerHTML =
          "You're too tired to stretch! You'll have to go to bed or eat something";
      }
    };
  }