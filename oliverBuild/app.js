// global variables

//player variables
const player = document.getElementById('player');
let playerX = 550;
let playerY = 300;

//stats variables
let days = 4;
document.getElementById('daysNo').innerHTML = days;
let clout = 0;
let energy = 100;
let strength = 0;
let seconds = 30;
let isInjured = false;
let injuryChance = 0.5;
let meals = 0;
let points = 0;

//stats bars
let cloutBar = document.getElementById("cloutBar");
cloutBar.style.width = clout + "%";
let energyBar = document.getElementById("energyBar");
energyBar.style.width = energy + "%";
let strengthBar = document.getElementById("strengthBar");
strengthBar.style.width = strength + "%";
let timerBar = document.getElementById("timerBar");
isFighting = true;
isRecovering = false;
isSleeping = false;
isGameOver = false;

//manager variables
const manager = document.querySelector('.manager');
let managerX = 1;
let managerY = 70;
let managerTimerId;
let managerTimerDownId;
let managerTimerLeftId;
let managerTimerUpId;

//object vars
const bedX = 520;
const bedY = 480;
const ringX = 160;
const ringY = 400;
const treadX = 175;
const treadY =  135;
const matX = 490;
const matY = 135;
const weightLightX = 850;
const weightLightY = 135;
const weightHeavyX = 850;
const weightHeavyY = 285;
const vendingX = 1060;
const vendingY = 505;

//is near vars
let isNearBed = false;
let isNearRing = false;
let isNearTread = false;
let isNearMat = false;
let isNearWeightLight = false;
let isNearWeightHeavy = false;
let isNearVending = false;
let isNearManager = false;
let isNearOpponent = false;

//other vars
let message = document.getElementById('message');
message.innerHTML = "Use WASD to move around and the space bar to interract with objects (and your manager!) when you're nearby"
let timerDiv = document.getElementById("timerDiv");
timerDiv.style.display = "none";
let genericPlattitudes = ["Good Job!", "Nice Going!", "Perfect Technique", "Faultless!", "This is what peak performace looks like!", "You're on track to win!"];
let night = document.getElementById("night");
let matchTimerId;
let fightTimerId;
document.getElementById("punchesDiv").style.display = "none";
let finalMsg;

//clout variables
let cloutOpportunities = 1;
let cloutNum;
let cloutInAction = false;

class CloutChance {
    constructor (situation, energyUsed, newClout, outcome, negOutcome) {
        this.situation = situation;
        this.energyUsed = energyUsed;
        this.newClout = newClout;
        this.outcome = outcome;
        this.negOutcome = negOutcome;
    }
}
const yesOrNo = " (press Y or N)"
const cloutSocialMedia = new CloutChance("Will you go on social media to reach more fans?" + yesOrNo, -5, 10, "You hit 5000 followers in 10 minutes!", "That sponsorship seems pretty unlikely anyway");
const cloutMarathon = new CloutChance ("Will you run a marathon for charity?" + yesOrNo, -100, 40, "What a success! You won!", "Exactly! Who cares about charity");
const cloutCinema = new CloutChance("A fan wants to go on a date to the cinema with you! Will you go?" + yesOrNo, -20, -1, "The fans didn't like that...", "Probably for the best");
const cloutMagazine = new CloutChance("Will you agree to pose for the front page of a magazine?" + yesOrNo, -20, 15, "You gained some new fans", "You need to train today anyway");
const cloutInterview = new CloutChance("A local radio wants to interview you, will you go on?" +yesOrNo, -7, 10, "You inspired a lot of listeners!", "Who even listens to the radio anymore");
const cloutMerch = new CloutChance ("Do you decide to start selling hoodies with your face on them?" + yesOrNo, -5, -20, "The quality is terrible and you lose fans...", "Who would actually wear clothes with your face on?");
const cloutPuppies = new CloutChance("You see some puppies wondering around in the street behind the gym. Do you adopt them?" +yesOrNo, -20, 20, "They're not microchipped so you take them home. Your fans see and love you even more!", "They probably belong to someone anyway");
const cloutTV = new CloutChance("Do you decide to apply for a televised talent show?" + yesOrNo, -50, -20, "It turns out you really can't dance. Your fans feel embarassed...", "It's more fun to laugh at the contestants than actually compete");

const cloutDays = [cloutSocialMedia, cloutMarathon, cloutCinema, cloutMagazine, cloutInterview, cloutMerch, cloutPuppies, cloutTV];

//opponent vars
let opponent;
let opponentX = 170;
let opponentY = 390;
let opponentTimerId;
let opponentXArray = Array(3).fill(170);
let opponentYArray = Array(3).fill(390);

//controlling movement of player
document.addEventListener('keydown', (e) => {
   switch (e.keyCode) {
       case 65:
           if(playerX > 5) {
            playerX -=15;
            player.style.left = playerX +'px';
           }
           break;
        case 68:
            if(playerX < 1065) {
            playerX +=15;
            player.style.left = playerX +'px';
            }
            break;
        case 87:
            if(playerY > 0) {
            playerY -= 15;
            player.style.top = playerY +'px';
            }
            break;
        case 83:
            if(playerY < 570) {
            playerY += 15;
            player.style.top = playerY +'px';
            }
            break;
   }
})
// space bar to interract with object when near 
 document.addEventListener("keydown", (e) => {
     if (!isGameOver) {
        if (e.keyCode == 32) {
            senseDistance();
            if (isNearBed) {
              useBed();
            } else if (isNearOpponent) {
               useOpponent();
            } else if (isNearRing) {
              useRing();
            } else if (isNearTread) {
               useTreadmill()
            } else if (isNearMat) {
              useMat();
            } else if (isNearWeightLight) {
              useLightWeigth();
            } else if (isNearWeightHeavy) {
              useHeavyWeight();
            } else if (isNearVending) {
               useVending();
            } else if (isNearManager) {
               useManager();
            } else {
                message.innerHTML = "You're not near anything!";
            }
          }
     }
   
 });

//functions for sensing how near player is
function senseDistance() {
    senseBed();
    senseRing();
    senseTreadmill();
    senseMat();
    senseWeightLight();
    senseWeightHeavy();
    senseVending();
    senseManager();
  if (isFighting) {
    senseOpponent();
  }
}

//function to see if player gets near bed
function senseBed() {
    distX = Math.abs(bedX - playerX);
    distY = Math.abs(bedY - playerY);
    if (distX < 50 && distY < 100) {
        isNearBed = true;
    } else {
        isNearBed = false;
    }
}
//ring sensing
function senseRing() {
    distX = Math.abs(ringX - playerX);
    distY = Math.abs(ringY - playerY);
    if (distX < 150 && distY < 150) {
        isNearRing = true;
    } else {
        isNearRing = false;
    } 
}
//tread sensing
function senseTreadmill() {
    distX = Math.abs(treadX - playerX);
    distY = Math.abs(treadY - playerY);
    if (distX < 25 && distY < 55) {
        isNearTread = true;
    } else {
        isNearTread = false;
    } 
}
//sense mat
function senseMat() {
    distX = Math.abs(matX - playerX);
    distY = Math.abs(matY - playerY);
    if (distX < 100 && distY < 100) {
        isNearMat = true;
    } else {
        isNearMat = false;
    } 
}
//sense light weight
function senseWeightLight() {
    distX = Math.abs(weightLightX - playerX);
    distY = Math.abs(weightLightY - playerY);
    if (distX < 100 && distY < 45) {
        isNearWeightLight = true;
    } else {
        isNearWeightLight = false;
    } 
}
//sense Heavy weight
function senseWeightHeavy() {
    distX = Math.abs(weightHeavyX - playerX);
    distY = Math.abs(weightHeavyY - playerY);
    if (distX < 100 && distY < 65) {
        isNearWeightHeavy = true;
    } else {
        isNearWeightHeavy = false;
    } 
}
// sense vending
function senseVending() {
    distX = Math.abs(vendingX - playerX);
    distY = Math.abs(vendingY - playerY);
    if (distX < 40 && distY < 140) {
        isNearVending = true;
    } else {
        isNearVending = false;
    } 
}
//sense manager
function senseManager() {
    distX = Math.abs(managerX - playerX);
    distY = Math.abs(managerY - playerY);
    if (distX < 100 && distY < 100) {
        isNearManager = true;
    } else {
        isNearManager = false;
    } 
}
//sense opponent
function senseOpponent() {
    distX = Math.abs(opponentX - playerX);
    distY = Math.abs(opponentY - playerY);
    if (distX < 100 && distY < 100) {
        isNearOpponent = true;
    } else {
        isNearOpponent = false;
    } 
}

//controlling movement of manager
function moveManager () {
    managerX += 1;
    manager.style.left = managerX + 'px';
    if (managerX == 1000) {
        clearInterval(managerTimerId);
        managerTimerDownId = setInterval(moveManagerDown, 20);
    }
}
function moveManagerDown () {
    managerY += 1;
    manager.style.top = managerY + 'px';
    if (managerY == 560) {
        clearInterval(managerTimerDownId);
        managerTimerRightId = setInterval(moveManagerLeft, 20);
    }
}
function moveManagerLeft() {
    managerX -=1;
    manager.style.left = managerX + 'px';
    if (managerX === 1) {
        clearInterval(managerTimerRightId);
        managerTimerUpId = setInterval(moveManagerUp, 20);
    }
}
function moveManagerUp() {
    managerY -=1;
    manager.style.top = managerY + 'px';
    if (managerY == 70) {
        clearInterval(managerTimerUpId);
        managerTimerId = setInterval(moveManager, 20);
    }
}
managerTimerId = setInterval(moveManager, 20);


//use bed func
function useBed () {
    if (!isSleeping) {
        if (days == 0) {
            message.innerHTML = "You can't go to sleep! Go to the ring to face your opponent";
        }
        else if (days == 1) {
            days --;
            doSleep();
            message.innerHTML = "The match is today! Head over to the ring";
        }
        else if (!isInjured) {
            days --;
            doSleep();
            message.innerHTML = `Days Left: ${days}`;
        } else if (isInjured && days != 2) {
            days -=2;
            doSleep();
            message.innerHTML = `You had to miss a day of training because of your injury. There are ${days} days left`;
        } else if (days != 0) {
            days --;
            doSleep();
            message.innerHTML = `There are now ${days} days left`;
        }
    } 
};
function doSleep () {
    document.getElementById('daysNo').innerHTML = days;
    energy = 100;
    cloutOpportunities = 2;
    injuryChance = 0.5;
    meals = 0;
    energyBar.style.width = energy + "%";
    cloutOpportunities = 1;
    isSleeping = true;
    setTimeout(() => {
        isSleeping = false;
    },2500)
    makeDark();
    if (days == 0) {
        document.getElementById("daysDiv").style.display = "none";
        timerDiv.style.display = "inline-block";
        timerBar.style.width = (seconds * 3.33) + "%";
        opponent = document.createElement("div");
        document.querySelector('.gameContainer').appendChild(opponent);
        opponent.classList.add("opponent");
    }
}

function makeDark () {
    night.style.opacity = 0.3;
    setTimeout(() => {
        night.style.opacity = 0.6;
    }, 600);
    setTimeout(() => {
        night.style.opacity = 0.6;
    }, 1200);
    setTimeout(() => {
        night.style.opacity = 0.2;
    }, 1800);
    setTimeout(() => {
        night.style.opacity = 0;
    }, 2400);
}
function useRing() {
    if (days > 0) {
        message.innerHTML = "You're not ready for the ring yet! Get back to training";
    } else if (days == 0) {
        message.innerHTML = "As soon as you interract with your opponent the match will start! He'll try to get away from you... don't let him"
        isFighting = true;
    }
}
function useTreadmill(){
    if (days ==0) {
        message.innerHTML = "You've trained enough! Go to the ring"
    }
    else if (!isInjured && energy >= 20) {
        energy -= 20;
        energyBar.style.width = energy + "%";
        strength += 0.5;
        strengthBar.style.width = strength + "%";
        injuryChance -= 0.3;
        message.innerHTML = "You warmed up on the treadmill! You're now less likely to get injured";
    } else if (isInjured) {
        message.innerHTML = "You're injured, you can't exercise! Go stretch";
    } else if (energy <= 20) {
        message.innerHTML="You're too tired to run! Go and eat something or sleep";
    }
}
function useMat() {
    if (days == 0) {
        message.innerHTML = "Your opponent is waiting! Go to the ring";
    }
    else if (!isInjured) {
        message.innerHTML = "You're not injured! Stretching won't do anything";
    } else if (isInjured && energy > 10) {
        energy = 0;
        energyBar.style.width = energy + "%";
        isInjured = false;
        message.innerHTML = "All better now! Warm up next time";
    } else if (isInjured && energy <= 10) {
        message.innerHTML = "You're too tired to stretch! You'll have to go to bed or eat something";
    }
}
function useLightWeigth() {
  arrayNum = Math.round(Math.random() * 5);
  if (days == 0) {
    message.innerHTML = "The match is today, get to the ring!"
  }
  else if (energy >= 10 && !isInjured) {
    if (injuryChance < 0.5) {
      lightWeightInjury = Math.random();
      if (lightWeightInjury < 0.9) {
        energy -= 10;
        energyBar.style.width = energy + "%";
        strength += 1.2;
        strengthBar.style.width = strength + "%";
        message.innerHTML = genericPlattitudes[arrayNum];
      } else if (lightWeightInjury >= 0.9) {
        isInjured = true;
        message.innerHTML = "Oh no, you injured yourself! Try stretching";
      }
    } else if (injuryChance >= 0.5) {
      lightWeightInjury = Math.random();
      if (lightWeightInjury < 0.5) {
        energy -= 10;
        energyBar.style.width = energy + "%";
        strength += 1.2;
        strengthBar.style.width = strength + "%";
        message.innerHTML = genericPlattitudes[arrayNum];
      } else if (lightWeightInjury >= 0.5) {
          isInjured = "true";
          message.innerHTML = "Did you hear something pop? Maybe try stretching"
      }
    }
  } else if (energy < 10) {
      message.innerHTML = "You're too tired to lift! Try eating or sleeping";
  } else if (isInjured) {
      message.innerHTML ="You can't lift, you're injured! Try stretching";
  }
}
function useHeavyWeight() {
  arrayNum = Math.round(Math.random() * 5);
  if (days == 0) {
    message.innerHTML = "Your opponent's waiting!"
  }
  else if (energy >= 30 && !isInjured) {
    if (injuryChance < 0.5) {
      heavyWeightInjury = Math.random();
      if (heavyWeightInjury < 0.9) {
        energy -= 30;
        energyBar.style.width = energy + "%";
        strength += 4.5;
        strengthBar.style.width = strength + "%";
        message.innerHTML = genericPlattitudes[arrayNum];
      } else if (heavyWeightInjury >= 0.9) {
        isInjured = true;
        message.innerHTML = "Oh no, you injured yourself! Try stretching";
      }
    } else if (injuryChance >= 0.5) {
      heavyWeightInjury = Math.random();
      if (heavyWeightInjury < 0.5) {
        energy -= 30;
        energyBar.style.width = energy + "%";
        strength += 4.5;
        strengthBar.style.width = strength + "%";
        message.innerHTML = genericPlattitudes[arrayNum];
      } else if (heavyWeightInjury >= 0.5) {
        isInjured = "true";
        message.innerHTML = "Did you hear something crack?";
      }
    }
  } else if (energy < 30) {
    message.innerHTML = "You're too tired to lift! Try eating or sleeping";
  } else if (isInjured) {
    message.innerHTML = "You're injured! You need to stretch";
  }
}
function useVending() {
    if (days == 0) {
        message.innerHTML = "You're too nervous to eat! Go to the ring"
    }
    else if (meals < 2) {
    message.innerHTML =
      "Press K to grab some kale or P to grab a protein shake";
  } else if (meals >= 2) {
    message.innerHTML = "You're full! If you're tired, go to bed";
  }
}
//part of vending machine
document.addEventListener("keydown", (e) => {
  // k = 75
  if (days == 0) {
  }
  else if (isNearVending && meals < 2 && e.keyCode == 75) {
    message.innerHTML = "Yum! kale...";
    meals++;
    injuryChance -= 0.1;
    if (energy <= 50) {
      energy += 50;
      energyBar.style.width = energy + "%";
    } else if (energy <= 100 && energy > 50) {
      energy = 100;
      energyBar.style.width = energy + "%";
    }
  } else if (isNearVending && meals < 2 && e.keyCode == 80) {
    message.innerHTML = "You feel stronger";
    energy = 100;
    energyBar.style.width = energy + "%";
    meals++;
  } else if (isNearVending && meals >= 2) {
    message.innerHTML = "You're too full to eat any more";
  }
});
// talk to manager function for clout
function useManager() {
  if (days == 0) {
    message.innerHTML = "Get into the ring";
  } else if (cloutOpportunities < 1) {
    message.innerHTML = "There are no more opportunities to gain clout! Come back tomorrow";
  }
  else if (cloutOpportunities == 1) {
    if (days == 4 && !cloutInAction) {
      cloutNum = Math.round(Math.random());
      doProceduralClout();
    } else if (days == 4 && cloutInAction) {
      message.innerHTML = cloutDays[cloutNum].situation;
    } else if (days == 3 && !cloutInAction) {
      cloutNum = 2 + Math.round(Math.random());
      doProceduralClout();
    } else if (days == 3 && cloutInAction) {
      message.innerHTML = cloutDays[cloutNum].situation;
    } else if (days == 2 && !cloutInAction) {
        cloutNum = 4 + Math.round(Math.random());
        doProceduralClout();
    } else if (days == 2 && cloutInAction) {
        message.innerHTML = cloutDays[cloutNum].situation;
    } else if (days == 1 && !cloutInAction) {
        cloutNum = 6 + Math.round(Math.random());
        doProceduralClout();
    } else if (days == 1 && cloutInAction) {
        message.innerHTML = cloutDays[cloutNum].situation;
    }
  }
}
function doProceduralClout() {
    message.innerHTML = cloutDays[cloutNum].situation;
    cloutInAction = true;
}

document.addEventListener("keyup", (e) => {
    if (cloutInAction == true) {
        if (days == 4 && e.keyCode == 89) {
            doMoreProceduralClout();
        } else if (days == 4 && e.keyCode == 78) {
            message.innerHTML = cloutDays[cloutNum].negOutcome;
            cloutInAction = false;
            cloutOpportunities --;
        } else if (days ==3 && e.keyCode == 89) {
            doMoreProceduralClout();
        } else if (days ==3 && e.keyCode == 78) {
            message.innerHTML = cloutDays[cloutNum].negOutcome;
            cloutInAction = false;
            cloutOpportunities --;
        } else if (days ==2 && e.keyCode == 89) {
            doMoreProceduralClout();
        } else if (days == 2 && e.keyCode == 78) {
            message.innerHTML = cloutDays[cloutNum].negOutcome;
            cloutInAction = false;
            cloutOpportunities --;
        } else if (days ==1 && e.keyCode == 89) {
            doMoreProceduralClout();
        } else if (days == 1 & e.keyCode == 78) {
            message.innerHTML = cloutDays[cloutNum].negOutcome;
            cloutInAction = false;
            cloutOpportunities --;
        }
    }
})

function doMoreProceduralClout () {
    message.innerHTML = cloutDays[cloutNum].outcome;
    energy += cloutDays[cloutNum].energyUsed;
    console.log(energy);
    clout += cloutDays[cloutNum].newClout;
    cloutBar.style.width = clout + "%";
    energyBar.style.width = energy + "%";
    cloutInAction = false;
    cloutOpportunities --;
};

function useOpponent() {
  if (points == 0) {
    points++;
    document.getElementById("energyDiv").style.display = "none";
    document.getElementById("punchesDiv").style.display = "inline-block";
    document.getElementById("pointDisplay").innerHTML = points;
    message.innerHTML = "The match has started! Don't let your opponent get away and don't go outside the ring";
    opponentTimerId = setInterval(moveOpponent, 20);
    matchTimerId = setInterval(decreaseTime, 1000);
    fightTimerId = setTimeout(() => {
      gameOver();
    }, 30000);
  } else if (points > 0 && !isRecovering) {
    points++;
    document.getElementById("pointDisplay").innerHTML = points;
    isRecovering = true;
    setTimeout(() => {
        isRecovering = false;
    }, 1000)
  }
}

function moveOpponent() {
    leaveCorner();
  if (opponentY > playerY && opponentY < 541) {
    opponentY++;
    opponent.style.top = opponentY + "px";
  } else if (opponentY < playerY && opponentY > 272) {
    opponentY--;
    opponent.style.top = opponentY + "px";
  }
  if (opponentX - playerX > 0 && opponentX < 300) {
    opponentX++;
    opponent.style.left = opponentX + "px";
  } else if (opponentX - playerX <= 0 && opponentX > 30) {
    opponentX--;
    opponent.style.left = opponentX + "px";
  }
}
function leaveCorner() {
  opponentXArray.shift();
  opponentXArray.push(opponentX);
  opponentYArray.shift();
  opponentYArray.push(opponentY);
  opponentXArray.forEach((valueX) => {
    if (
      valueX == opponentXArray[0] &&
      valueX == opponentXArray[1] &&
      valueX == opponentXArray[2]
    ) {
      opponentYArray.forEach((valueY) => {
        if (
          valueY == opponentYArray[0] &&
          valueY == opponentYArray[1] &&
          valueY == opponentYArray[2]
        ) {
          if (opponentY + 10 < 541) {
            opponentY += 10;
          } else if (opponentY - 10 > 272) {
            opponentY -= 10;
          }
        }
      });
    }
  });
}

function decreaseTime () {
    seconds--;
    timerBar.style.width = (seconds * 3.33) + "%";
}

function gameOver () {
    clearInterval(matchTimerId);
}


function gameOver() {
  clearInterval(matchTimerId);
  message.innerHTML = "You've completed the game!";
  // document.querySelector('.gameContainer').removeChild(opponent);
  while (document.querySelector(".gameContainer").firstChild) {
    document
      .querySelector(".gameContainer")
      .removeChild(document.querySelector(".gameContainer").lastChild);
  }
  isGameOver = true;
  let unroundedScore = (points * (strength / 100)) / 3;
  let finalScore = Math.round(unroundedScore);
  console.log(finalScore);

  if (clout >= 60 && finalScore >= 8) {
    message.innerHTML = "You won and you got a sponsorship deal! Well done";
  } else if (clout >= 60 && finalScore < 8) {
    message.innerHTML =
      "You didn't win but you have so much clout you've been offered your own TV series!";
  } else if (clout < 60 && finalScore >= 8) {
    message.innerHTML =
      "You lost but you don't have enough clout for people to actually care...";
  } else if (clout < 60 && finalScore < 8) {
    message.innerHTML =
      "You lost and you don't have enough clout to reach the big leagues...";
  }
}