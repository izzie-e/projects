let quadFactor1 = getRandomFactor();
let quadFactor2 = getRandomFactor();
let score = 0;
let scoreDisplay = document.getElementById("score");
scoreDisplay.innerHTML = score;
let input = getRandomFactor() * 10;
let inputDisplay = document.getElementById("input");
inputDisplay.innerHTML = input;

function getRandomFactor(){
    let fact = (Math.random()* 10).toFixed(0);
    if (fact < 0) {
        fact += 2;
    }
    let signFact = doPosOrNeg() * fact;
    return signFact;
}

//decide if the factor will be positive or negative
function doPosOrNeg(){
    let decider = (Math.random()* 10).toFixed(0);
    if (decider <= 5){
        sign = -1;
    } else {
        sign = 1;
    }
    return sign;
}


function doSquare (x) {
    let result = x ** 2;
    return result;
}
 

//the one that will be shown in the box
function printQuadratic (qFact1, qFact2) {
    let cNum = qFact1 * qFact2;
    let bNum = +qFact1 + +qFact2;
    let aNum = "x^2";
    let quadratic;
    if (cNum < 0 && bNum < 0) {
        quadratic = `${aNum}${bNum}x${cNum}`;
    } else if (cNum < 0 && bNum >= 0) {
        quadratic = `${aNum}+${bNum}x${cNum}`;
    } else if (cNum >= 0 && bNum < 0){
        quadratic = `${aNum}${bNum}x+${cNum}`;
    } else if (cNum >= 0 && bNum >= 0) {
        quadratic = `${aNum}+${bNum}x+${cNum}`;
    } else {
        quadratic = `${aNum}+${bNum}x+${cNum}`;
    }
    return quadratic;
}

//making the actual quadratic
function makeQuadratic (qFact1, qFact2, input) {
    let cNum = qFact1 * qFact2;
    let bNum = (qFact1 * input) + (qFact2 * input);
    let aNum = doSquare(input);
    let quadratic = aNum + bNum + cNum;
    return quadratic;
}


//writing it on
let printQuadBox = document.getElementById("printQuad");
printQuadBox.innerHTML = printQuadratic(quadFactor1, quadFactor2);

//checking answer
function checkAnswer (ans1, ans2) {
    let message;
    if (ans1 == -quadFactor1 && ans2 == -quadFactor2) {
        message = "That's correct!";
        score ++;
        scoreDisplay.innerHTML = score;
        document.getElementById("showDiv").style.display = "block";
    } else if (ans1 == -quadFactor2 && ans2 == -quadFactor1) {
        message = "That's correct!";
        score ++
        scoreDisplay.innerHTML = score;
        document.getElementById("showDiv").style.display = "block";
    } else {
        message = `The answer was x = ${quadFactor1 * -1} and x = ${quadFactor2 * -1}`;
        document.getElementById("showDiv").style.display = "block";
    }
    return message;
}


//submitting x =
document.getElementById("submitBtn").addEventListener("click", (e) => {
    document.getElementById("submitBtn").style.display="none";
    e.preventDefault();
    let answer1 = document.getElementById("ans1").value;
    let answer2 = document.getElementById("ans2").value;
    document.getElementById("ansMsg").innerHTML = checkAnswer(answer1, answer2);
    document.getElementById("submitBtnY").style.display = "inline-block";
})

//submitting y =
document.getElementById("submitBtnY").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("msgY").innerHTML = checkY();
    document.getElementById("finalYMsg").style.display = "block";
    document.getElementById("submitBtnY").style.display = "none";
})

function checkY () {
    let ansY = document.getElementById("ansY").value;
    let yValue = makeQuadratic(quadFactor1, quadFactor2, input);
    if (ansY == yValue) {
        score ++
        scoreDisplay.innerHTML = score;
        message = "Well done!";
    } else {
        message = "The answer was " + yValue;
    }
    return message;
    }

    //reset button
    document.getElementById("nextBtn").addEventListener("click", (e)=> {
        e.preventDefault();
        document.getElementById("showDiv").style.display = "none";
        document.getElementById("ans1").value = "";
        document.getElementById("ans2").value = "";
        document.getElementById("submitBtn").style.display = "inline-block";
        quadFactor1 = getRandomFactor();
        quadFactor2 = getRandomFactor();
        input = getRandomFactor() * 10;
        inputDisplay = document.getElementById("input");
        inputDisplay.innerHTML = input;
        printQuadBox = document.getElementById("printQuad");
        printQuadBox.innerHTML = printQuadratic(quadFactor1, quadFactor2);
        document.getElementById("ansY").value = "";
        document.getElementById("finalYMsg").style.display= "none";
    })



