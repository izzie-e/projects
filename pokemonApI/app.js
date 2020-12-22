const inputBarElement = document.getElementById("inputBar");
const heightInfoElement = document.getElementById("heightInfo");
const BMIInfoElement = document.getElementById("BMIInfo");
const BMIHeadingElement = document.getElementById("BMIHeading");


// function get Data declaration
async function getPokemonData (pokemonName){
    const pokemonDataUnreadable = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonData = await pokemonDataUnreadable.json();
    return pokemonData;
}

//function HTML add
function addHTML (message) {
    heightInfoElement.innerHTML = 
    `Height: As ${message}`
}

//function use height declaration
function compareHeight (height){
    let message;
    if (height < 0.2) {
        message = "small as a mouse";
    } else if (height >= 0.2 && height < 1.5){
        message = "short as my sister";
    } else if (height >= 1.5 && height < 15) {
        message = "tall as a house";

    } else {
        message = "tall as Godzilla!";
    }
    addHTML (message);
}

//function BMI
function compareBMI (height, weight) {
    let BMI = weight / (height * height);
    return BMI;
}

//function write BMI
function writeBMI (BMI){
    BMIHeading.innerHTML = "BMI: "; 
    if(BMI < 18.4) {
    BMIInfoElement.innerHTML = BMI + ": Please eat more...";
    } else if (BMI >= 18.5 && BMI < 24.9) {
        BMIInfoElement.innerHTML = BMI + ": You're pretty healthy!";
    } else if (BMI >= 24.9 && BMI < 30 ){
        BMIInfoElement.innerHTML = BMI + ": Don't worry, it's cute!";
    } else {
        BMIInfoElement.innerHTML = BMI + ": Is this Snorlax?";
    }
}



//event listener
inputBarElement.addEventListener("keyup", () => {
  const intPokemonName = inputBarElement.value;
  let pokemonName;
  let pokemonHeight;
  let pokemonWeight;

  if (intPokemonName.length > 3) {
    pokemonName = intPokemonName.toLowerCase();

    getPokemonData(pokemonName).then((pokemonData) => {
      pokemonHeight = (pokemonData.height / 10).toFixed(1);
      pokemonWeight = (pokemonData.weight / 10).toFixed(1);

      compareHeight(pokemonHeight);
      BMI = compareBMI(pokemonHeight, pokemonWeight).toFixed(0);
      writeBMI(BMI);
    });
  } else {
    heightInfoElement.innerHTML = "";
    BMIHeading.innerHTML = "";
    BMIInfoElement.innerHTML = "";
  }
});