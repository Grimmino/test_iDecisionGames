import { decorate, observable, computed } from 'mobx';

const MAIN_URL = 'https://pokeapi.co/api/v2/';
const POKEMONS = `pokemon?limit=${100}`;

class Store {
	pokedex = [];

	getPokemonList = async (url = `${MAIN_URL}${POKEMONS}`) => {
		const pokemonsList = await fetch(url)
			.then(res => res.json())
			.then(data => data)
			.catch(err => console.log(err));

		this.pokedex.push(...pokemonsList.results);

		if (pokemonsList.next) {
			this.getPokemonList(pokemonsList.next);
		}
	};
}

export default new Store();
