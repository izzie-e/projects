import Interactive from "./Interactive.js"

export default class Vending extends Interactive {
  constructor(X, Y, xDist, yDist) {
    super(X, Y, xDist, yDist);
  }
  doAssociatedAction = (state) => {
    state.isNearVending = true;
    if (state.days == 0) {
      message.innerHTML = "You're too nervous to eat! Go to the ring";
    } else if (state.meals < 2) {
      message.innerHTML =
        "Press K to grab some kale or P to grab a protein shake";
    } else if (state.meals >= 2) {
      message.innerHTML = "You're full! If you're tired, go to bed";
    }
  };

  pickFood = (playerState, food) => {
    if (playerState.meals >= 2 || playerState.energy == 100) {
      message.innerHTML =
        "You're not hungry! If you need more energy you'll have to go to bed";
    } else if (playerState.isNearVending) {
      playerState.meals++;
      switch (food) {
        case "kale":
          message.innerHTML = "Yum! kale...";
          playerState.injuryChance -= 0.1;
          playerState.energy = 90;
          break;
        case "protein":
          message.innerHTML = "You feel stronger";
          playerState.energy = 100;
          break;
      }
      playerState.isNearVending = false;
      playerState.doUpdate();
    }
  };
}
