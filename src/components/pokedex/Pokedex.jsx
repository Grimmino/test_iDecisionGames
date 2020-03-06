import React, { useEffect, useState } from 'react';
import { PokemonsList } from './PokemonsList.jsx';

const MAIN_URL = 'https://pokeapi.co/api/v2/';

export const Pokedex = props => {
	const [isLoad, setIsLoad] = useState(false);

	const getPokemonList = async (show = 5) => {
		const POKEMONS = `pokemon?limit=${show}`;

		const pokemonsList = await fetch(`${MAIN_URL}${POKEMONS}`)
			.then(res => res.json())
			.then(data => data)
			.catch(err => console.log(err));

		sessionStorage.setItem('pokemons', JSON.stringify(pokemonsList));

		setIsLoad(true);
	};

	useEffect(() => {
		sessionStorage.getItem('pokemons') == null ? getPokemonList() : setIsLoad(true);
	});

	return <div className='pokemons'>{isLoad ? <PokemonsList /> : null}</div>;
};
