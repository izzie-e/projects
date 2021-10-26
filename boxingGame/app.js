import Player from "./utils/Player.js";

class App {
  constructor() {
    this.player = new Player(this.doUpdate);
    this.message = document.getElementById("message");
    this.message.innerHTML =
      "Use WASD to move around and the space bar to interract with objects (and your manager!) when you're nearby";
    this.start = this.doInitialSetUp();
  }
  doInitialSetUp = () => {
    document.getElementById("timerDiv").style.display = "none";
    document.getElementById("punchesDiv").style.display = "none";
    this.doUpdate();
  };
  doUpdate = () => {
    document.getElementById("daysNo").innerHTML = this.player.state.days;
    document.getElementById("cloutBar").style.width =
      this.player.state.cloutAmount + "%";
    document.getElementById("energyBar").style.width =
      this.player.state.energy + "%";
    document.getElementById("strengthBar").style.width =
      this.player.state.strength + "%";
  };
}


//controlling event listeners
document.addEventListener("keydown", (e) => {
    //destructuring app object
    const {player} = app;
    switch (e.keyCode) {
    case 65: //a
        player.position.x = player.position.x > 5? player.position.x - 15: player.position.x;
        break;
    case 68: //d
        player.position.x = player.position.x < 1065? player.position.x + 15: player.position.x;
        break;
    case 87:
        player.position.y = player.position.y > 0? player.position.y - 15: player.position.y;
        break;
    case 83:
        player.position.y = player.position.y < 570? player.position.y + 15: player.position.y;
        break;
    case 32:
        player.sense();
        break;
    case 75: //k for kale
        player.interactives.vending.pickFood(player.state, "kale");
        break;
    case 80: //p for protein
        player.interactives.vending.pickFood(player.state, "protein");
        break;
    case 89: //y for yes
        player.interactives.manager.pickOption(player.state, "yes"); 
        break;
    case 78: // n for no
        player.interactives.manager.pickOption(player.state, "no"); 
        break; 
  }
  player.playerDOM.style.left = player.position.x + "px";
  player.playerDOM.style.top = player.position.y + "px";
});

const app = new App();
