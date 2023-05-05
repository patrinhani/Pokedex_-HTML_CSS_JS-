var pokemonName = document.querySelector(".pokemon_name");
var pokemonNumber = document.querySelector(".pokemon_number");
var pokemonImage = document.querySelector(".pokemon_img");

const form = document.querySelector(".form");
const input = document.querySelector(".input_search");


const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
    input.value = "";
});

const alter_pokemon = (change) => {
    new_pokemon = eval(`${pokemonNumber.innerHTML}${change}1`)
    if (Number(new_pokemon) <= 0){
        return alert("Não existe pokemon anterior")
    }
  renderPokemon(new_pokemon)
}



window.onload = renderPokemon('1')

 