let currentPokemon;
let pokemons = 25;

/**
 * lädt alle notwendigen informationen aus der API
 */
async function loadPokemon() {
  let url = `https://pokeapi.co/api/v2/pokemon/bulbasaur`;
  let response = await fetch(url);
  currentPokemon = await response.json();

  console.log(currentPokemon);
  renderPokeInfo();
}

/**
 * stellt alle infos die wir aus der API beziehen dar
 */
function renderPokeInfo() {
  renderPokeCardHead();
  pokemonTypeColor();
  renderPokeBody();
}

/**
 * Renders only the Header and Image of Detailed Card
 */
function renderPokeCardHead() {
  let name =
    currentPokemon["name"].charAt(0).toUpperCase() +
    currentPokemon["name"].slice(1); // first character of string to upper Case.
  let img =
    currentPokemon["sprites"]["other"]["official-artwork"]["front_default"];

  document.getElementById("pokeName").innerHTML = name; // Output the name
  document.getElementById("pokeImg").src = img;
  document.getElementById("pokeId").innerHTML = "#" + currentPokemon["id"];
}

/**
 * holt den typ aus der api und vergleicht in mit der colorCoding liste für Typen Farbcode
 * TODO - Aktuell keine abbruch bedinung bzw. false bedinung programmiert
 */
function pokemonTypeColor() {
  let type1 = currentPokemon["types"]["0"]["type"]["name"];
  let type2 = currentPokemon["types"]["1"]["type"]["name"];
  for (let i = 0; i < colorCode.length; i++) {
    let type = colorCode[i];
    
    searchTypeColor(type, type1, type2);
  }
  renderPokeType(type1, type2);
}

/**
 * 
 * @param {string} type is from colorCode.js the type of Pokemon (grass, poisen, steel...)
 * @param {string} type1 is from API first type of pokemon
 * @param {string} type2 is from API second type of pokemon if possible
 */
function searchTypeColor(type, type1, type2) {
  if (type1 == type['type']) {
    document.getElementById(
      "pokeType1"
    ).style = `background-color: #${type["color-dark"]};`;
    pokeFrameColor(type);
  }
  if (type2 == type['type']) {
    document.getElementById(
      "pokeType2"
    ).style = `background-color: #${type["color-dark"]};`;
  }
}

function renderPokeType(type1, type2) {
  document.getElementById('pokeType1').innerHTML = type1;
  document.getElementById('pokeType2').innerHTML = type2;
}

function pokeFrameColor(type) {
  document.getElementById('pokeFrame').style = `border-color: #${type['color-light']} !important`;
}

function renderPokeBody() {
  let weightKg = (currentPokemon['weight'] * 0.45);
  document.getElementById('pokeWeight').innerHTML = `${weightKg.toFixed(1)} kg`;

  let heightM = (currentPokemon['height'] / 10);
  document.getElementById('pokeHeight').innerHTML = `${heightM.toFixed(1)} m`;

  document.getElementById('pokeSpecies').innerHTML = `${currentPokemon['abilities']['0']['ability']['name']}`;
} 