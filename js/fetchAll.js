export default function fetchAllPokemon() {
  async function getPokemonData(pokemon) {
    const pokeApi = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const result = await fetch(pokeApi);
    const data = await result.json();
    return data;
  }

  async function getPokemonTotalNumber() {
    const results = document.querySelector(".search-numbers");
    const pokeApi = `https://pokeapi.co/api/v2/pokemon/`;
    const result = await fetch(pokeApi);
    const data = await result.json();
    const pokemonNumbers = data.count;
    results.innerText = `${pokemonNumbers} Pokémon`;
  }

  function resetarDados() {
    const weak1 = document.getElementById("weak-one");
    const weak2 = document.getElementById("weak-two");
    const weak3 = document.getElementById("weak-three");
    const weak4 = document.getElementById("weak-four");
    const weak5 = document.getElementById("weak-five");
    const weak6 = document.getElementById("weak-six");
    const weaks =[weak1,weak2,weak3,weak4,weak5,weak6]
    const hpText = document.getElementById("hp-text");
    const attkText = document.getElementById("attk-text");
    const defText = document.getElementById("def-text");
    const spaText = document.getElementById("spa-text");
    const spdText = document.getElementById("spd-text");
    const speedText = document.getElementById("speed-text");
weaks.forEach((weak)=>{
  console.log(weak)
  weak.textContent="";
  weak.style.color="transparent"
  weak.style.backgroundColor="transparent"
})
    
    

    hpText.textContent = "HP";
    hpText.style.color = "rgba(122, 125, 128, 1)";
    hpText.style.fontWeight = "400";

    attkText.textContent = "Attack";
    attkText.style.color = "rgba(122, 125, 128, 1)";
    attkText.style.fontWeight = "400";

    defText.textContent = "Defense";
    defText.style.color = "rgba(122, 125, 128, 1)";
    defText.style.fontWeight = "400";

    spaText.textContent = "Sp.Attack";
    spaText.style.color = "rgba(122, 125, 128, 1)";
    spaText.style.fontWeight = "400";

    spdText.textContent = "Sp.Defense";
    spdText.style.color = "rgba(122, 125, 128, 1)";
    spdText.style.fontWeight = "400";

    speedText.textContent = "Speed";
    speedText.style.color = "rgba(122, 125, 128, 1)";
    speedText.style.fontWeight = "400";
  }

  async function showPokemonData(pokemon) {
    const pokemonButtonLoad = document.querySelector(".button-load");
    const pokemonErrorMsg = document.querySelector(".error-msg");
    pokemonErrorMsg.classList.add("hide");
    pokemonButtonLoad.style.display = "block";
    const btnAll = document.getElementById("pokemon");
    btnAll.classList.add("types-click");
    const data = await getPokemonData(pokemon);
    const pokemonNameSearched = data.name;
    const pokemonNumberSearched = data.id;
    const pokemonTypeSearched = data.types.map((type) => type.type.name);
    const pokemonImageSearched =
      data.sprites.other["official-artwork"]["front_default"];

    getPokemonTotalNumber();
    createCard();

    function createCard() {
      const pokemonContainer = document.querySelector(
        ".pokemon-container-results"
      );
      const card = document.createElement("div");
      card.classList.add("pokemon-container-result");

      async function createModalData(data) {
        card.addEventListener("click", async () => {
          const modal = document.querySelector(".modal-fade");
          modal.classList.add("active");

          const closeModalButton = document.querySelector(
            ".button-close button"
          );
          if (closeModalButton) {
            closeModalButton.addEventListener("click", () => {
              const modal = document.querySelector(".modal-fade");
              modal.classList.remove("active");
              resetarDados();
            });
          }

          const modalImg = document.querySelector(".modal-img-back img");
          const modalName = document.querySelector(".modal-name h3");
          const modalNumber = document.querySelector(".modal-name p");
          const modalTypeOne = document.getElementById("type-one");
          const modalTypeTwo = document.getElementById("type-two");
          const modalHeight = document.getElementById("height");
          const modalWeight = document.getElementById("weight");
          const modalAbilitie = document.getElementById("abilitie");
          const modalContainerImg = document.querySelector(".modal-img");

          modalImg.src = data.sprites.other["home"].front_default;

          modalName.textContent =
            data.name.charAt(0).toUpperCase() + data.name.slice(1);

          modalNumber.textContent = `#${data.id}`;

          modalTypeOne.textContent =
            data.types[0].type.name.charAt(0).toUpperCase() +
            data.types[0].type.name.slice(1);

          modalTypeOne.style.backgroundColor = `var(--type-${data.types[0].type.name})`;
          modalTypeOne.style.color = `var(--type-${data.types[0].type.name}-name)`;

          if (data.types.length > 1) {
            modalTypeTwo.textContent =
              data.types[1].type.name.charAt(0).toUpperCase() +
              data.types[1].type.name.slice(1);

            modalTypeTwo.style.backgroundColor = `var(--type-${data.types[1].type.name})`;
            modalTypeTwo.style.color = `var(--type-${data.types[1].type.name}-name)`;
          } else {
            modalTypeTwo.textContent = "";
            modalTypeTwo.style.background = "none";
          }
          modalContainerImg.style.backgroundImage = `url('./img/assets/bg-types/${data.types[0].type.name}.svg')`;

          modalHeight.textContent = `${data.height / 10} m`;
          modalWeight.textContent = `${data.weight / 10} kg`;
          modalAbilitie.textContent =
            data.abilities[0].ability.name.charAt(0).toUpperCase() +
            data.abilities[0].ability.name.slice(1);

          const pokemonTypeSearched = data.types.map((type) => type.type.name);

          const pokemonStats = {
            HP: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            spAttack: data.stats[3].base_stat,
            spDefense: data.stats[4].base_stat,
            speed: data.stats[5].base_stat,
          };

          function preencherBarras(stats) {
            const hpText = document.getElementById("hp-text");
            const attkText = document.getElementById("attk-text");
            const defText = document.getElementById("def-text");
            const spaText = document.getElementById("spa-text");
            const spdText = document.getElementById("spd-text");
            const speedText = document.getElementById("speed-text");

            hpText.addEventListener("mouseover", function () {
              hpText.textContent = `HP: ${pokemonStats.HP}`;
              hpText.style.color = "red";
              hpText.style.fontWeight = "800";
            });

            attkText.addEventListener("mouseover", function () {
              attkText.textContent = `Attack: ${pokemonStats.attack}`;
              attkText.style.color = "red";
              attkText.style.fontWeight = "800";
            });
            defText.addEventListener("mouseover", function () {
              defText.textContent = `Defense: ${pokemonStats.defense}`;
              defText.style.color = "red";
              defText.style.fontWeight = "800";
            });
            spaText.addEventListener("mouseover", function () {
              spaText.textContent = `Sp.Attack: ${pokemonStats.spAttack}`;
              spaText.style.color = "red";
              spaText.style.fontWeight = "800";
            });
            spdText.addEventListener("mouseover", function () {
              spdText.textContent = `Sp.Defense: ${pokemonStats.spDefense}`;
              spdText.style.color = "red";
              spdText.style.fontWeight = "800";
            });
            speedText.addEventListener("mouseover", function () {
              speedText.textContent = `Speed: ${pokemonStats.speed}`;
              speedText.style.color = "red";
              speedText.style.fontWeight = "800";
            });
            for (const stat in stats) {
              const ulElement = document.getElementById(stat);
              const statValue = stats[stat];
              const percentage = (statValue / 200) * 100;
              const liElements = ulElement.querySelectorAll("li");
              liElements.forEach((li, index) => {
                if (index < Math.round(percentage / 10)) {
                  li.style.backgroundColor = "red";
                } else {
                  li.style.backgroundColor = "rgba(77, 80, 83, 0.2)";
                }
              });
            }
          }

          preencherBarras(pokemonStats);

          let Allweakeness=[]
          let arrayfraquezas=[]
          let arrayresistencias=[]
          let arrayimmune=[]
          for (const type of pokemonTypeSearched) {
            const pokeApiType = `https://pokeapi.co/api/v2/type/${type}`;
            const result = await fetch(pokeApiType);
            const dataType = await result.json();
           
            const pokemonWeaknesses = dataType.damage_relations.double_damage_from;

            let weaknessnames=pokemonWeaknesses.map(pokemon => pokemon.name)

            arrayresistencias = arrayresistencias.concat(dataType.damage_relations.half_damage_from.map(pokemon=>pokemon.name))
            console.log(arrayresistencias)
            arrayimmune = arrayimmune.concat(dataType.damage_relations.no_damage_from.map(pokemon=>pokemon.name));
           
            function removeCommonElements(arr1, arr2) {

              let result =  arr1.filter(item => !arr2.includes(item));
              console.log(result)
              return result
          }
          arrayfraquezas=arrayfraquezas.concat(weaknessnames)
           Allweakeness = (removeCommonElements(arrayfraquezas,arrayresistencias))  

           Allweakeness= (removeCommonElements(Allweakeness,arrayimmune))
           Allweakeness = removeDuplicates(Allweakeness)
            function removeDuplicates(arr){
              return arr.filter((item,index)=>arr.indexOf(item)===index)
            }
            console.log(Allweakeness)
            
            const weakOne = document.getElementById("weak-one");
            const weakTwo = document.getElementById("weak-two");
            const weakThree = document.getElementById("weak-three");
            const weakFour = document.getElementById("weak-four");
            const weakFive = document.getElementById("weak-five");
            const weakSix = document.getElementById("weak-six")
            const weakSeven = document.getElementById("weak-seven")
            Allweakeness.forEach((weakness, index) => {
              let currentWeaknessElement;
              switch (index) {
                case 0:
                  currentWeaknessElement = weakOne;
                  break;
                case 1:
                  currentWeaknessElement = weakTwo;
                  break;
                case 2:
                  currentWeaknessElement = weakThree;
                  console.log(currentWeaknessElement)
                  break;
                case 3:
                  currentWeaknessElement = weakFour;
                  break;
                case 4:
                  currentWeaknessElement = weakFive
                  break;
                case 5:
                  currentWeaknessElement = weakSix
                  break;
                default:
                  currentWeaknessElement = weakSeven
                  break;
              }

              currentWeaknessElement.textContent =
                weakness.charAt(0).toUpperCase() + weakness.slice(1);
              currentWeaknessElement.style.backgroundColor = `var(--type-${weakness})`;
              currentWeaknessElement.style.color = `var(--type-${weakness}-name)`;
              console.log(weakness)
            });
          }
        });
      }
      createModalData(data);

      const name = document.createElement("p");
      name.classList.add("poke-name");
      name.innerText =
        pokemonNameSearched.charAt(0).toUpperCase() +
        pokemonNameSearched.slice(1);

      const nameType = document.createElement("div");
      nameType.classList.add("name-type");

      const number = document.createElement("p");
      number.classList.add("number");
      number.innerText = "#" + pokemonNumberSearched;

      const type = document.createElement("span");
      type.classList.add("type");
      const typeImage = document.createElement("img");

      const imageDiv = document.createElement("div");
      imageDiv.classList.add("pokemon-img");
      const image = document.createElement("img");
      image.src = pokemonImageSearched;

      pokemonContainer.appendChild(card);
      card.appendChild(imageDiv);
      imageDiv.appendChild(image);
      card.appendChild(number);
      card.appendChild(nameType);
      nameType.appendChild(name);
      nameType.appendChild(type);
      type.appendChild(typeImage);

      if (pokemonTypeSearched[1]) {
        type.classList.add("type");
        const typeImage = document.createElement("img");
        type.appendChild(typeImage);
        pokemonTypeSearched.forEach(() => {
          switch (pokemonTypeSearched[1]) {
            case "fire":
              typeImage.src = "img/assets/icon-types/fire.svg";
              break;
            case "water":
              typeImage.src = "img/assets/icon-types/water.svg";
              break;
            case "grass":
              typeImage.src = "img/assets/icon-types/grass.svg";
              break;
            case "flying":
              typeImage.src = "img/assets/icon-types/flying.svg";
              break;
            case "electric":
              typeImage.src = "img/assets/icon-types/electric.svg";
              break;
            case "normal":
              typeImage.src = "img/assets/icon-types/normal.svg";
              break;
            case "rock":
              typeImage.src = "img/assets/icon-types/rock.svg";
              break;
            case "ice":
              typeImage.src = "img/assets/icon-types/ice.svg";
              break;
            case "bug":
              typeImage.src = "img/assets/icon-types/bug.svg";
              break;
            case "poison":
              typeImage.src = "img/assets/icon-types/poison.svg";
              break;
            case "ground":
              typeImage.src = "img/assets/icon-types/ground.svg";
              break;
            case "steel":
              typeImage.src = "img/assets/icon-types/steel.svg";
              break;
            case "ghost":
              typeImage.src = "img/assets/icon-types/ghost.svg";
              break;
            case "fairy":
              typeImage.src = "img/assets/icon-types/fairy.svg";
              break;
            case "fighting":
              typeImage.src = "img/assets/icon-types/fighting.svg";
              break;
            case "psychic":
              typeImage.src = "img/assets/icon-types/psychic.svg";
              break;
            case "dragon":
              typeImage.src = "img/assets/icon-types/dragon.svg";
              break;
            case "dark":
              typeImage.src = "img/assets/icon-types/dark.svg";
              break;
          }
        });
      }

      if (pokemonTypeSearched[0]) {
        pokemonTypeSearched.forEach(() => {
          switch (pokemonTypeSearched[0]) {
            case "fire":
              typeImage.src = "img/assets/icon-types/fire.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "water":
              typeImage.src = "img/assets/icon-types/water.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "grass":
              typeImage.src = "img/assets/icon-types/grass.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "flying":
              typeImage.src = "img/assets/icon-types/flying.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "electric":
              typeImage.src = "img/assets/icon-types/electric.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "normal":
              typeImage.src = "img/assets/icon-types/normal.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "rock":
              typeImage.src = "img/assets/icon-types/rock.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "ice":
              typeImage.src = "img/assets/icon-types/ice.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "bug":
              typeImage.src = "img/assets/icon-types/bug.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "poison":
              typeImage.src = "img/assets/icon-types/poison.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "ground":
              typeImage.src = "img/assets/icon-types/ground.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "steel":
              typeImage.src = "img/assets/icon-types/steel.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "ghost":
              typeImage.src = "img/assets/icon-types/ghost.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "fairy":
              typeImage.src = "img/assets/icon-types/fairy.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "fighting":
              typeImage.src = "img/assets/icon-types/fighting.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "psychic":
              typeImage.src = "img/assets/icon-types/psychic.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "dragon":
              typeImage.src = "img/assets/icon-types/dragon.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "dark":
              typeImage.src = "img/assets/icon-types/dark.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
          }
        });
      }
    }
  }

  async function fetchAll() {
    for (let i = 1; i <= 9; i++) {
      await showPokemonData(i);
    }
  }

  fetchAll();

  const loadMore = document.querySelector(".load-pokemon");
  let number = 9;

  loadMore.addEventListener("click", loadMorePokemon);

  async function loadMorePokemon() {
    for (let i = number + 1; i <= number + 9; i++) {
      await showPokemonData(i);
    }
    number += 9;
  }

  const pokemonBtnAll = document.getElementById("pokemon");

  pokemonBtnAll.addEventListener("click", async () => {
    fetchAll();
    const loadMore = document.querySelector(".load-pokemon");
    loadMore.addEventListener("click", loadMorePokemon);
    const allCards = document.querySelectorAll(".pokemon-container-result");
    allCards.forEach((card) => {
      card.style.display = "none";
    });
  });
}