import React, { useRef, useState, useEffect } from 'react';
import { PokemonsList } from './pokedex/PokemonsList.jsx';

const MAIN_URL = 'https://pokeapi.co/api/v2/';

export const App = props => {
	const inputEl = useRef();

	const [pokemonsList, setPokemonsList] = useState([]);
	const [showCount, setShowCount] = useState(2);
	const [isLoad, setIsLoad] = useState(false);

	const getPokemonList = async ({ show = showCount, type = '' }) => {
		const arrPokemons = [];
		let j = 1;
		for (let i = 0; i < show; i++) {
			const nextPokemon = `${MAIN_URL}pokemon/${j}/`;
			j++;

			const pokemonInfo = await fetch(`${nextPokemon}`)
				.then(res => res.json())
				.then(data => data)
				.catch(err => console.log(err));

			if (type != '') {
				if (pokemonInfo.types.filter(item => item.type.name == type).length != 0) {
					arrPokemons.push(pokemonInfo);
				} else {
					i--;
				}
			} else {
				arrPokemons.push(pokemonInfo);
			}
		}
		setPokemonsList(arrPokemons);
	};

	useEffect(() => {
		pokemonsList.length == 0 ? getPokemonList({}) : setIsLoad(true);
	});

	const getPokemonsLength = () => {
		setShowCount(inputEl.current.value);
		inputEl.current.value != '' ? getPokemonList({ show: inputEl.current.value }) : null;
	};

	return (
		<div className='page'>
			<header className='header'>
				<div className='header__viewer viewer'>
					<input className='viewer__input' ref={inputEl} type='text' placeholder='кол-во покемонов' />
					<button onClick={() => getPokemonsLength()} className='btn viewer__btn'>
						применить
					</button>
				</div>
			</header>

			<div className='pokemons'>{!isLoad || <PokemonsList filterByMark={getPokemonList} pokemons={pokemonsList} />}</div>
		</div>
	);
};
