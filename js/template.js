function templatePokemon(currentPokemon, color, typeColor1, typeColor2, type2) {
  return /*html*/ `<div id="pokeCard" class="card2" style="${color}" onclick=showDetail(${
    currentPokemon["id"]})>
      <div class="card-body">
        <h5 id="pokeName" class="pokeName">${
          currentPokemon["name"].charAt(0).toUpperCase() +
          currentPokemon["name"].slice(1)
        }</h5>
        <h5 id="pokeId" class="pokeId">#${currentPokemon["id"]}</h5>
      </div>
      <div class="overviewType">
        <p id="pokeType1" style="${typeColor1}">${
    currentPokemon["types"]["0"]["type"]["name"]
  }</p>
        <p id="pokeType2" style="${typeColor2}">${type2}</p>
      </div>
      <div>
        <img id="pokeImg" class="pokeImg2" src=${
          currentPokemon["sprites"]["other"]["official-artwork"][
            "front_default"
          ]
        } />
        <img class="pokeBg2" src="./img/pokemon-bg.png "/>
      </div>
    </div>`;
}

function templateDetailedCard(currentPokemon, currentColor) {
  return /*html*/ `<div id="detailedCard" class="bg-dark bg-opacity-25 inactive">
    <div class="bg-dark bg-opacity-25 inactive" onclick=remove()></div>
    <div id="pokeCard" class="card" style="width: 27rem; ${currentColor}">
  <div class="pokeCardHead">
    <h3 id="pokeName" class="namePokemon">${
      currentPokemon["name"].charAt(0).toUpperCase() +
      currentPokemon["name"].slice(1)
    }</h3>
    <h3 id="pokeId" class="idPoke">#${currentPokemon["id"]}</h3>
  </div>
  <button class="carousel-dark carousel-control-prev button-upgrade" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev" onclick=back(${currentPokemon['id']})>
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-dark carousel-control-next button-upgrade" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next" onclick=next(${currentPokemon['id']})>
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  <img id="pokeImg" class="pokeImg" src=${
    currentPokemon["sprites"]["other"]["official-artwork"]["front_default"]
  } />
  <img class="pokeBg" src="./img/pokemon-bg.png ">
  <!-- About Card Detailes -->
  <div id="pokeBase" class="pokeBase" style="border-color: #3a7036">
    <div class="pokeType">
      <p id="pokeType1" style="${typeColor1}">${
    currentPokemon["types"]["0"]["type"]["name"]
  }</p>
      <p id="pokeType2" style="${typeColor2}">${type2}</p>
    </div>
    <div class="pokeBody">
      <div class="text-secondary">
        <h3 id="pokeSpecies">${
          currentPokemon["abilities"]["0"]["ability"]["name"]
        }</h3>
        <p>Species</p>
      </div>
      <div id="pokeFrame" class="border-end border-start border-3 text-secondary" style="border-color: #000000 !important">
        <h3 id="pokeHeight">${(currentPokemon["height"] / 10).toFixed(1)} m</h3>
        <p>Height</p>
      </div>
      <div class="text-secondary">
        <h3 id="pokeWeight">${(currentPokemon["weight"] * 0.45).toFixed(
          1
        )} kg</h3>
        <p>Weight</p>
      </div>
    </div>
  </div>

  <!-- Base Stats card Detailes -->
  <div id="pokeStats" class="pokeBase d-none" style="border-color: #3a7036">
    <div class="container">
      <div class="circle-name">
        <div id="hp" class="circle" style="
            background-image: conic-gradient(#f01c14 100%, #fff5ef 0);
          ">
          <div class="inner-circle">
            <span id="hp-text">100%</span>
          </div>
        </div>
        <p>HP</p>
      </div>
      <div class="circle-name">
        <div id="attack" class="circle" style="
            background-image: conic-gradient(#f01c14 100%, #fff5ef 0);
          ">
          <div class="inner-circle">
            <span id="attack-text">100%</span>
          </div>
        </div>
        <p>Attack</p>
      </div>
      <div class="circle-name">
        <div id="defense" class="circle" style="
            background-image: conic-gradient(#f01c14 100%, #fff5ef 0);
          ">
          <div class="inner-circle">
            <span id="defense-text">100%</span>
          </div>
        </div>
        <p>Defense</p>
      </div>
      <div class="circle-name">
        <div id="specAttack" class="circle" style="
            background-image: conic-gradient(#f01c14 100%, #fff5ef 0);
          ">
          <div class="inner-circle">
            <span id="specAttack-text">100%</span>
          </div>
        </div>
        <p>Spec. Attack</p>
      </div>
      <div class="circle-name">
        <div id="specDefense" class="circle" style="
            background-image: conic-gradient(#f01c14 100%, #fff5ef 0);
          ">
          <div class="inner-circle">
            <span id="specDefense-text">100%</span>
          </div>
        </div>
        <p>Spec. Defense</p>
      </div>
      <div class="circle-name">
        <div id="speed" class="circle" style="
            background-image: conic-gradient(#f01c14 100%, #fff5ef 0);
          ">
          <div class="inner-circle">
            <span id="speed-text">100%</span>
          </div>
        </div>
        <p>Speed</p>
      </div>
    </div>
  </div>
  <div class="pokeTabs">
    <div id="pokeTabBase" style="border-color: #3a7036; background-color: transparent" onclick="togglePokeTabs(0)">
      <h3>About</h3>
    </div>
    <div id="pokeTabStat" style="border-color: #3a7036; background-color: white" onclick="togglePokeTabs(1)">
      <h3>Base Stats</h3>
    </div>
  </div>
</div>
</div>`;
}
