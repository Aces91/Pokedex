let currentPokemon;
let currentColor;
let typeColor1;
let typeColor2;
let type2;
let currentList = [];
const stats = ["hp", "attack", "defense", "specAttack", "specDefense", "speed"];
let pokemonStart = 1;
let pokemonEnd = 152;
let maxPokemon = 905;

/**
 * init function calls the Pokemon overview
 */
function init() {
  document.getElementById("pokeContent").innerHTML = "";
  renderPokemonOverview();
}
/**
 *  loads info's from API
 */
async function loadPokemon(i) {
  let url = `https://pokeapi.co/api/v2/pokemon/${[i]}`;
  let response = await fetch(url);
  currentPokemon = await response.json();
  currentList.push(currentPokemon);

  pokemonTypeColor();
  showPokemon();
}

/**
 * render Overview
 */
async function renderPokemonOverview() {
  for (let i = pokemonStart; i < pokemonEnd; i++) {
    await loadPokemon(i);
  }
}

/**
 * looks like for all Pokemon that we used in the first time.
 */
function showPokemon() {
  document.getElementById("pokeContent").innerHTML += templatePokemon(
    currentPokemon,
    currentColor,
    typeColor1,
    typeColor2,
    type2
  );
}

/**
 * get the type from api compare it with colorCoding josn
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

/**
 * check if a pokemon have more than 1 type.
 */
function typo() {
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
  typo();
  if (type2 == type["type"]) {
    typeColor2 = `background-color: #${type["color-dark"]};`;
  }
}

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
 * TODO - currently not working
 */
function renderIdWithleadingZero() {
  if (currentPokemon["id"] < 10) {
    document.getElementById("pokeId").innerHTML = "#00" + currentPokemon["id"];
  } else if (currentPokemon["id"] < 100 && currentPokemon["id"] >= 10) {
    document.getElementById("pokeId").innerHTML = "#0" + currentPokemon["id"];
  } else {
    document.getElementById("pokeId").innerHTML = "#" + currentPokemon["id"];
  }
}

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

function back(i) {
  i--;
  if (i < 1) {
    remove();
  } else {
    remove();
    showDetail(i);
  }
}

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

  searching(search);
}

function searching(search) {
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

async function loadMore() {
  pokemonStart = pokemonEnd;
  if (pokemonEnd <= 905) {
    pokemonEnd = pokemonEnd +100;
  } else {
    pokemonEnd = maxPokemon;
  }
  await renderPokemonOverview();
}