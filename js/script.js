const poke_container = document.getElementById('poke-container');
const pokemon_count = 251;
const colors = {
    fire: '#FDDFDF',
    grass: '#2E8B57',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#F694C1',
    poison: '#E4C1F9',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#EDE7B1',
    fighting: '#E6E0D4',
    normal: '#F5F5F5',
    steel: '#9FA1A3',
    ice: '##9EE4D9'
}

let generations = [
    {firstIndex:1, secondInd:151},
    {firstIndex:152, secondInd:251},
    {firstIndex:252, secondInd:386},
    {firstIndex:387, secondInd:493},
    {firstIndex:494, secondInd:649},
    {firstIndex:650, secondInd:721},
    {firstIndex:722, secondInd:809},
    {firstIndex:810, secondInd:898}
]

const main_types = Object.keys(colors);

// promises are great for async tasks that may take a while in the background
const fetchPokemon = async () => {
    for(let i = 1; i <= pokemon_count; i++) {
        // returns a promise, so we need an await
        await getPokemon(i);
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url); // fetch is a promise
    const data = await res.json(); // json is a promise
    createPokemonCard(data);
}

const createPokemonCard = (pokemon) => {
    let moreThanOneType = false;

    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');

    // set first letter in name to uppercase
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');
    
    // create a map of each type(s) for each pokemon
    const poke_types = pokemon.types.map(type => type.type.name);

    // greater than -1 means the type was in there and we found it
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    let color = '';

    if (poke_types.length > 1) {
        moreThanOneType = true;
        colorOne = colors[poke_types[0]]; // create two colors to be blended into the background
        colorTwo = colors[poke_types[1]];
        pokemonElement.style.background = 'linear-gradient(to right, ' + colorOne + ", " + colorTwo + ')';
    } else {
        moreThanOneType = false;
        color = colors[type];
        pokemonElement.style.backgroundColor = color;
    }

    let pokemonInnerHTML = ``;

    // Only one type will be displayed for pokemon that only have one type
    if (!moreThanOneType) {
        pokemonInnerHTML = `
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="">
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
        `
    } else { // Both types will be displayed if pokemon have more than one type
        pokemonInnerHTML = `
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="">
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${poke_types[0]}/${poke_types[1]}</span></small>
        </div>
        `
    }

    // this actually sets our html
    pokemonElement.innerHTML = pokemonInnerHTML;
    // add the pokemon card to the pokemon container
    poke_container.appendChild(pokemonElement);
}



fetchPokemon();