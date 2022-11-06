let currentPokemon;

async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/bulbasaur`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log(currentPokemon)
    renderPokeInfo();
}

function renderPokeInfo() {
    let name = currentPokemon['name'].charAt(0).toUpperCase() + currentPokemon['name'].slice(1); // first character of string to upper Case.
    let img = currentPokemon['sprites']['other']['official-artwork']['front_default'];

    document.getElementById('pokeName').innerHTML = name; // Output the name
    document.getElementById('pokeImg').src = img
    document.getElementById('pokeId').innerHTML = "# " + currentPokemon['id'];
}