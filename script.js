let currentPokemon;
let pokemons = 25;

async function loadPokemon() {
  let url = `https://pokeapi.co/api/v2/pokemon/bulbasaur`;
  let response = await fetch(url);
  currentPokemon = await response.json();

  console.log(currentPokemon);
  renderPokeInfo();
}

function renderPokeInfo() {
  let name =
    currentPokemon["name"].charAt(0).toUpperCase() +
    currentPokemon["name"].slice(1); // first character of string to upper Case.
  let img =
    currentPokemon["sprites"]["other"]["official-artwork"]["front_default"];
    

  document.getElementById("pokeName").innerHTML = name; // Output the name
  document.getElementById("pokeImg").src = img;
  document.getElementById("pokeId").innerHTML = "#" + currentPokemon["id"];
  
  pokemonType();
}

function pokemonType() {
    let type1 = currentPokemon['types']['0']['type']['name'];
    document.getElementById("pokeType1").innerHTML = type1;

    for (let i = 0; i < colorCode.length; i++) {
        let type = colorCode[i]['type'];

        //TODO - keine abbruch bedingung programmiert
        if (type1 == type) {
            document.getElementById('pokeType1').style = `background-color: #${colorCode[i]['color-dark']};`;
        } 
    }
}