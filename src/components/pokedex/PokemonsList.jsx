import React, { useEffect, useState } from 'react';
import { Modal } from './Details.jsx';

const POKEMONS_SPRITES__BACK = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back';
const POKEMONS_SPRITES__FRONT = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

export const PokemonsList = props => {
	const [pokemonsList, setPokemonsList] = useState(JSON.parse(sessionStorage.getItem('pokemons')));

	const nextPokemonsList = async () => {
		const store = JSON.parse(sessionStorage.getItem('pokemons'));

		const next = await fetch(store.next)
			.then(res => res.json())
			.then(data => data)
			.catch(err => console.log(err));

		setPokemonsList(next);

		sessionStorage.setItem('pokemons', JSON.stringify(next));
	};

	const prevPokemonsList = async () => {
		const store = JSON.parse(sessionStorage.getItem('pokemons'));

		const previous = await fetch(store.previous)
			.then(res => res.json())
			.then(data => data)
			.catch(err => console.log(err));

		setPokemonsList(previous);

		sessionStorage.setItem('pokemons', JSON.stringify(previous));
	};

	return (
		<React.Fragment>
			<div className='pokemons__list grid'>
				{pokemonsList.results.map((item, index) => (
					<PokemonInfo key={index} item={item} />
				))}
			</div>

			<button className='btn' onClick={pokemonsList.previous !== null ? prevPokemonsList : null}>
				prev
			</button>
			<button className='btn' onClick={pokemonsList.next !== null ? nextPokemonsList : null}>
				next
			</button>
		</React.Fragment>
	);
};

const PokemonInfo = props => {
	const [isShowDetails, setIsShowDetails] = useState(false);

	const getImg = url => {
		const reg = url.match(/\/\d+/i);
		return (
			<React.Fragment>
				<div className='card__img-item front'>
					<img src={`${POKEMONS_SPRITES__FRONT}${reg[0]}.png`} alt='' />
				</div>

				<div className='card__img-item back'>
					<img src={`${POKEMONS_SPRITES__BACK}${reg[0]}.png`} alt='' />
				</div>
			</React.Fragment>
		);
	};

	const toggleInfo = () => {
		setIsShowDetails(!isShowDetails);
	};

	return (
		<div className='card'>
			<div onClick={toggleInfo} className='card__inner pokemons__item'>
				<div className='card__img'>{getImg(props.item.url)}</div>
				<div className='card__title'>{props.item.name}</div>
			</div>

			{!isShowDetails || <Modal item={props.item} toggleInfo={toggleInfo} />}
		</div>
	);
};
