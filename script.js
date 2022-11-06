let currentPokemon;
let pokemons = 25;
let aboutPokemon = true;
const stats = ['hp', 'attack', 'defense', 'specAttack', 'specDefense', 'speed'];

/**
 * lädt alle notwendigen informationen aus der API
 */
async function loadPokemon() {
  let url = `https://pokeapi.co/api/v2/pokemon/34`;
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
  renderIdWithleadingZero();
  pokemonTypeColor();
  renderPokeBody();
  calculateStats();
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
}

/**
 * holt den typ aus der api und vergleicht in mit der colorCoding liste für Typen Farbcode
 * TODO - Aktuell keine abbruch bedinung bzw. false bedinung programmiert
 */
function pokemonTypeColor() {
  let type1 = currentPokemon["types"]["0"]["type"]["name"];
  //let type2 = currentPokemon["types"]["1"]["type"]["name"];
  for (let i = 0; i < colorCode.length; i++) {
    let type = colorCode[i];
    
    searchTypeColor(type, type1);
  }
  renderPokeType(type1);
}

/**
 * 
 * @param {string} type is from colorCode.js the type of Pokemon (grass, poisen, steel...)
 * @param {string} type1 is from API first type of pokemon
 * @param {string} type2 is from API second type of pokemon if possible
 */
function searchTypeColor(type, type1) {
  if (type1 == type['type']) {
    document.getElementById(
      "pokeType1"
    ).style = `background-color: #${type["color-dark"]};`;
    document.getElementById(
      "pokeCard"
    ).style = `background-color: #${type["color-light"]};`;
    pokeFrameColor(type);
  }
}

function renderPokeType(type1, type2) {
  document.getElementById('pokeType1').innerHTML = type1;
  //document.getElementById('pokeType2').innerHTML = type2;
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

function renderIdWithleadingZero() {
  if (currentPokemon['id'] < 10) {
    document.getElementById("pokeId").innerHTML = "#00" + currentPokemon["id"];
  } else if (currentPokemon['id'] < 100 && currentPokemon['id'] >= 10) {
    document.getElementById("pokeId").innerHTML = "#0" + currentPokemon["id"];
  } else {
    document.getElementById("pokeId").innerHTML = "#" + currentPokemon["id"];
  } 
}

function togglePokeTabs(index) {
  if (index == 1) {
    document.getElementById('pokeTabStat').style = 'background-color: transparent';
    document.getElementById('pokeTabBase').style = 'background-color: white';
    document.getElementById('pokeBase').classList.add('d-none');
    document.getElementById('pokeStats').classList.remove('d-none');
  } else {
    document.getElementById('pokeTabStat').style = 'background-color: white';
    document.getElementById('pokeTabBase').style = 'background-color: transparent';
    document.getElementById('pokeBase').classList.remove('d-none');
    document.getElementById('pokeStats').classList.add('d-none');
  }
}

function calculateStats() {
  for (let i = 0; i < currentPokemon['stats'].length; i++) {
    let test = currentPokemon['stats'][i]['base_stat'];
    let percent = (test/160) * 100;
    renderCircleBar(percent, i);
  }
}

 function renderCircleBar(percent, index) {
    let output = document.getElementById(`${stats[index]}`);
    let output2 = document.getElementById(`${stats[index]}-text`);
    output.style = `background-image: conic-gradient(#f01214 ${percent.toFixed(0)}%, #fff5ef 0)`;
    output2.innerHTML = currentPokemon['stats'][index]['base_stat'];
    return;
}