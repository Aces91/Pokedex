let currentPokemon;
let currentColor;
let typeColor1;
let typeColor2;
let type2;
let currentList = [];
let allPokemon = [];
const stats = ["hp", "attack", "defense", "specAttack", "specDefense", "speed"];
let pokemonStart = 1;
let pokemonEnd = 50;
let maxPokemon = 905;
let loadScroll = false;

/**
 * init function calls the Pokemon overview
 */
function init() {
  document.getElementById("pokeContent").innerHTML = "";
  renderPokemonOverview();
  loadAllPokemon();
}

async function loadAllPokemon() {
  for (let i = 1; i < maxPokemon; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${[i]}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();

    currentPokemon.push(currentPokemon);
  }
}

/**
 *  loads info's from API
 */
async function loadPokemon(i) {
  let url = `https://pokeapi.co/api/v2/pokemon/${[i]}`;
  let response = await fetch(url);
  currentPokemon = await response.json();

  currentList.push(currentPokemon);
  await pokemonTypeColor();
  await showPokemon();
}

async function renderPokemonOverview() {
  for (let i = pokemonStart; i < pokemonEnd; i++) {
    await loadPokemon(i);
  }
}

/**
 * looks like for all Pokemon that we used in the first time.
 */
async function showPokemon() {
  document.getElementById("pokeContent").innerHTML += templatePokemon(
    currentPokemon,
    currentColor,
    typeColor1,
    typeColor2,
    type2
  );
}

async function pokemonTypeColor() {
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

function checkTypo() {
  if (currentPokemon["types"].length > 1) {
    type2 = currentPokemon["types"]["1"]["type"]["name"];
  } else {
    type2 = "";
    typeColor2 = "background-color: transparent;";
  }
}

/**
 * Checks the backgroundcolor of the type
 * @param {string} type is from colorCode.js the type of Pokemon (grass, poisen, steel...)
 * @param {string} type2 is from API second type of pokemon if possible
 */
function searchTypeColor(type, type2) {
  checkTypo();
  if (type2 == type["type"]) {
    typeColor2 = `background-color: #${type["color-dark"]};`;
  }
}

/**
 * shows the detail of the number of pokemon in pokedex
 * @param {number} i - id number of pokemon
 */
async function showDetail(i) {
  let url = `https://pokeapi.co/api/v2/pokemon/${[i]}`;
  let response = await fetch(url);
  currentPokemon = await response.json();

  pokemonTypeColor();
  document.getElementById("pokeContent").innerHTML += templateDetailedCard(
    currentPokemon,
    currentColor
  );
}

/**
 * change the view in the detailed carad from base to stats
 * @param {number} index -comes from the html itself only 0 and 1
 */
function togglePokeTabs(index) {
  if (index == 1) {
    document.getElementById("pokeTabStat").style =
      "background-color: transparent";
    document.getElementById("pokeTabBase").style = "background-color: white";
    document.getElementById("pokeBase").classList.add("d-none");
    document.getElementById("pokeStats").classList.remove("d-none");
    calculateStats();
  } else {
    document.getElementById("pokeTabStat").style = "background-color: white";
    document.getElementById("pokeTabBase").style =
      "background-color: transparent";
    document.getElementById("pokeBase").classList.remove("d-none");
    document.getElementById("pokeStats").classList.add("d-none");
  }
}

function calculateStats() {
  for (let i = 0; i < currentPokemon["stats"].length; i++) {
    let test = currentPokemon["stats"][i]["base_stat"];
    let percent = (test / 160) * 100;
    renderCircleBar(percent, i);
  }
}

/**
 * render the circles that we caluculate above in the code
 * @param {number} percent
 * @param {number} index
 * @returns
 */
function renderCircleBar(percent, index) {
  let output = document.getElementById(`${stats[index]}`);
  let output2 = document.getElementById(`${stats[index]}-text`);
  output.style = `background-image: conic-gradient(#f01214 ${percent.toFixed(
    0
  )}%, #fff5ef 0)`;
  output2.innerHTML = currentPokemon["stats"][index]["base_stat"];
  return;
}

function remove() {
  document.getElementById("detailedCard").remove();
}

/**
 * jump a pokemon id down
 * @param {integer} i
 */
function back(i) {
  i--;
  if (i < 1) {
    remove();
  } else {
    remove();
    showDetail(i);
  }
}

/**
 * jump a pokemon id up
 * @param {integer} i
 */
function next(i) {
  i++;
  if (i > pokemonEnd - 1) {
    remove();
  } else {
    remove();
    showDetail(i);
  }
}

async function filterNames() {
  let search = document.getElementById("search").value;
  search = search.toLowerCase();

  await searching(search);
}

/**
 * check if the value search is in the currentList with Pokemon.
 * Local Array is filled by first load
 * @param {string} search
 */
async function searching(search) {
  document.getElementById("pokeContent").innerHTML = "";
  for (let i = 0; i < currentList.length; i++) {
    currentPokemon = currentList[i];
    pokemonTypeColor();
    if (currentPokemon["name"].includes(search)) {
      document.getElementById("pokeContent").innerHTML += templatePokemon(
        currentPokemon,
        currentColor,
        typeColor1,
        typeColor2,
        type2
      );
    }
  }
}

/**
 * load more button function that we can load pokemons step by step an not all 905 pokemons at the same time
 */
async function loadMore() {
  pokemonStart = pokemonEnd;
  if (pokemonEnd <= 905) {
    pokemonEnd = pokemonEnd + 40;
  } else {
    pokemonEnd = maxPokemon;
  }
  await renderPokemonOverview();
}