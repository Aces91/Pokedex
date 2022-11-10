let currentPokemon;
let currentColor;
let typeColor1;
let typeColor2;
let type2;
let pokemons = 25;
const stats = ["hp", "attack", "defense", "specAttack", "specDefense", "speed"];
let manyPokemon = 152;

function init() {
  renderPokemonOverview();
}
/**
 * lädt alle notwendigen informationen aus der API
 */
async function loadPokemon(i) {
  let url = `https://pokeapi.co/api/v2/pokemon/${[i]}`;
  let response = await fetch(url);
  currentPokemon = await response.json();

  //console.log(currentPokemon);
  pokemonTypeColor();
  showPokemon();
}

/**
 * render Overview
 */
async function renderPokemonOverview() {
  document.getElementById("pokeContent").innerHTML = "";
  for (let i = 1; i < manyPokemon; i++) {
    await loadPokemon(i);
  }
}

function showPokemon() {
  let name = currentPokemon["name"].charAt(0).toUpperCase() + currentPokemon["name"].slice(1);
  let image =
    currentPokemon["sprites"]["other"]["official-artwork"]["front_default"];
  document.getElementById("pokeContent").innerHTML += templatePokemon(
    currentPokemon,
    currentColor,
    image,
    name,
    typeColor1,
    typeColor2,
    type2
  );
}

/**
 * holt den typ aus der api und vergleicht in mit der colorCoding liste für Typen Farbcode
 * TODO - Aktuell keine abbruch bedinung bzw. false bedinung programmiert
 */
function pokemonTypeColor() {
  let type1 = currentPokemon["types"]["0"]["type"]["name"];
  for (let i = 0; i < colorCode.length; i++) {
    let type = colorCode[i];

    if (type1 == type["type"]) {
      currentColor = `background-color: #${type["color-light"]}`;
      typeColor1 = `background-color: #${type["color-dark"]};`;
    }
    
    searchTypeColor(type, type2);
  }
}

function typo() {
  if (currentPokemon["types"].length > 1) {
    type2 = currentPokemon["types"]["1"]["type"]["name"];
  } else {
    type2 = "";
  }
}

/**
 *
 * @param {string} type is from colorCode.js the type of Pokemon (grass, poisen, steel...)
 * @param {string} type1 is from API first type of pokemon
 * @param {string} type2 is from API second type of pokemon if possible
 */
function searchTypeColor(type, type2) {
  typo();
  if (type2 == type["type"]) {
    typeColor2 = `background-color: #${type["color-dark"]};`;
  }
}
