import Interactive from "./Interactive.js";



export default class Ring extends Interactive {
  constructor(X, Y, xDist, yDist, interactives) {
    super(X, Y, xDist, yDist);

  }
  doAssociatedAction = (state) => {
    if (state.isFighting) {
      return;
    }
    if (state.days > 0) {
      message.innerHTML =
        "You're not ready for the ring yet! Get back to training";
    } else if (state.days == 0) {
      message.innerHTML =
        "As soon as you interract with your opponent the match will start! He'll try to get away from you... use Space to punch";
      state.isFighting = true;
      //makes opponent able to be interacted with & reveals match divs
      document.getElementById("punchesDiv").style.display = "inline";
      document.getElementById("energyDiv").style.display = "none";
      document.getElementById("opp").style.display = "inline";
      
    }
  };
}
