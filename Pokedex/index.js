const pokedex = document.getElementById('pokedex');
console.log(pokedex);

let allPokemon = [];

function buscarPokemon(i) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const pokemon = {
                nombre: data.name,
                id: data.id,
                altura: data.height,
                peso: data.weight,
                imagen: data.sprites.front_default,
                tipo: data.types.map((tipo) => tipo.type.name).join(', '),
                experiencia: data.base_experience,
                habilidades: data.abilities.map((habilidad) => habilidad.ability.name).join(', ')
            }
            allPokemon.push(pokemon);
            if (allPokemon.length === 160) {
                mostrarPokemon(allPokemon);
            }
        });
}

function mostrarPokemon(pokemonArray) {
    const pokemonHTML = pokemonArray.map(pokemon => `
        <li class="card">
            <img class="card-image" src="${pokemon.imagen}" alt="${pokemon.nombre}">
            <h2 class = "card-title">${pokemon.nombre}</h2>
            <p class = "card-subtitle">ID: ${pokemon.id}</p>
            <p class = "card-datos" >
                Altura: ${pokemon.altura} m<br>
                Peso: ${pokemon.peso} gramos<br>
                Habilidades: ${pokemon.habilidades}<br>
                Tipo: ${pokemon.tipo}
            </p>
            <p class = "experiencia">
                ${pokemon.experiencia} Exp.
            </p>
            
        </li>
    `).join('');
    pokedex.innerHTML = pokemonHTML;
}

for(let i = 1; i <= 160; i++) {
    buscarPokemon(i);
}
