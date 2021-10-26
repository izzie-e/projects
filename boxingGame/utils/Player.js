import Weight from "./Weight.js";
import Bed from "./Bed.js";
import Manager from "./Manager.js";
import Treadmill from "./Treadmill.js";
import Mat from "./Mat.js";
import Vending from "./Vending.js";
import Ring from "./Ring.js";
import Opponent from "./Opponent.js";

export default class Player {
  constructor(doUpdate) {
    this.playerDOM = document.getElementById("player");
    this.position = {
      x: 550,
      y: 300,
    };
    this.state = {
      isInjured: false,
      isFighting: false,
      isRecovering: false,
      isSleeping: false,
      isNearVending: false,
      cloutInAction: false,
      injuryChance: 0.5,
      meals: 0,
      energy: 100,
      cloutAmount: 0,
      cloutOpportunities: 1,
      strength: 0,
      points: 0,
      seconds: 30,
      days: 4,
      doUpdate : doUpdate
    };
    this.interactives = {
      bed: new Bed(520, 480, 50, 100),
      manager: new Manager(),
      treadmill: new Treadmill(175, 135, 25, 55),
      mat: new Mat(490, 135, 100, 100),
      lightWeight: new Weight(850, 135, 100, 45, 10, 1.2),
      heavyWeight: new Weight(850, 285, 100, 65, 30, 4.5),
      vending: new Vending(1060, 505, 40, 140),
      ring: new Ring(160, 400, 150, 150),
      opponent: new Opponent(170, 390, 40, 40)
    };
  }
  sense = () => {
    for (const key in this.interactives) {
      const { position } = this.interactives[key];
      const distX = Math.abs(position.x - this.position.x);
      const distY = Math.abs(position.y - this.position.y);
      if (distX < position.xDistance && distY < position.yDistance) {
        this.interactives[key].doAssociatedAction(this.state);
      }
    }
  };
}
