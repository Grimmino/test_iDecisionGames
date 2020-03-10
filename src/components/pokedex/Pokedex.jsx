import React, { useEffect, useState } from 'react';
import { PokemonsList } from './PokemonsList.jsx';

const MAIN_URL = 'https://pokeapi.co/api/v2/';

export const Pokedex = props => {
	const [pokemonsList, setPokemonsList] = useState([]);
	const [isLoad, setIsLoad] = useState(false);

	const getPokemonList = async () => {
		console.log(props.show);

		const arrPokemons = [];

		for (let i = 0; i < props.show; i++) {
			const nextPokemon = `${MAIN_URL}pokemon/${i + 1}/`;

			const pokemonInfo = await fetch(`${nextPokemon}`)
				.then(res => res.json())
				.then(data => data)
				.catch(err => console.log(err));

			arrPokemons.push(pokemonInfo);
		}
		setPokemonsList(arrPokemons);
	};

	useEffect(() => {
		pokemonsList.length == 0 ? getPokemonList() : setIsLoad(true);
	});

	return <div className='pokemons'>{!isLoad || <PokemonsList pokemons={pokemonsList} />}</div>;
};
