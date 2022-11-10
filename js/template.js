function templatePokemon(currentPokemon, color, image, name, typeColor1, typeColor2, type2) {
    return /*html*/ `<div id="pokeCard" class="card2" style="${color}" onclick=showDetail(${currentPokemon["id"]})>
      <div class="card-body">
        <h5 id="pokeName" class="pokeName">${name}</h5>
        <h5 id="pokeId" class="pokeId">#${currentPokemon["id"]}</h5>
      </div>
      <div class="overviewType">
        <p id="pokeType1" style="${typeColor1}">${currentPokemon["types"]["0"]["type"]["name"]}</p>
        <p id="pokeType2" style="${typeColor2}">${type2}</p>
      </div>
      <div>
        <img id="pokeImg" class="pokeImg2" src=${image} />
        <img class="pokeBg2" src="./img/pokemon-bg.png "/>
      </div>
    </div>`;
}

function templateDetailedCard() {
  return /*html*/ `<div id="pokeCard" class="card" style="width: 27rem; background-color: #91d08b">
  <div class="pokeCardHead">
    <h3 id="pokeName" class="namePokemon">name</h3>
    <h3 id="pokeId" class="idPoke">#</h3>
  </div>
  <button class="carousel-dark carousel-control-prev button-upgrade" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-dark carousel-control-next button-upgrade" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  <img id="pokeImg" class="pokeImg" src="./img/pokemon-fav.png">
  <img class="pokeBg" src="./img/pokemon-bg.png ">
  <!-- About Card Detailes -->
  <div id="pokeBase" class="pokeBase" style="border-color: #3a7036">
    <div class="pokeType">
      <p id="pokeType1" style="background-color: #77cc55"></p>
      <!-- <p id="pokeType2" style="background-color: transparent"></p> -->
    </div>
    <div class="pokeBody">
      <div class="text-secondary">
        <h3 id="pokeSpecies">all</h3>
        <p>Species</p>
      </div>
      <div id="pokeFrame" class="border-end border-start border-3 text-secondary" style="border-color: #000000 !important">
        <h3 id="pokeHeight">all</h3>
        <p>Height</p>
      </div>
      <div class="text-secondary">
        <h3 id="pokeWeight">all lbs</h3>
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
</div>`;
}