import React, { useEffect, useState } from 'react';
import { Modal } from './Details.jsx';

export const PokemonsList = props => {
	const [pokemons, setPokemons] = useState([]);

	// const filterByMark = type => {
	// 	const tempArr = [];

	// 	pokemons.forEach(item => {
	// 		item.types.filter(item => item.type.name == type).length != 0 ? tempArr.push(item) : null;
	// 	});

	// 	setPokemons(tempArr);
	// };
	useEffect(() => {
		setPokemons(props.pokemons);
	}, [props.pokemons]);

	return (
		<div className='pokemons__list grid'>
			{pokemons.map((item, index) => (
				<PokemonInfo filterByMark={props.filterByMark} key={index} pokemon={item} />
			))}
		</div>
	);
};

const PokemonInfo = props => {
	const [isShowDetails, setIsShowDetails] = useState(false);

	const getImg = () => {
		return (
			<React.Fragment>
				<div className='card__img-item front'>
					<img src={`${props.pokemon.sprites.front_default}`} alt='' />
				</div>

				<div className='card__img-item back'>
					<img src={`${props.pokemon.sprites.back_default}`} alt='' />
				</div>
			</React.Fragment>
		);
	};

	const toggleInfo = () => {
		setIsShowDetails(!isShowDetails);
	};

	return (
		<div className='card'>
			<div className='card__inner pokemons__item'>
				<div className='card__marks'>
					{props.pokemon.types.map((mark, index) => (
						<div
							title={mark.type.name}
							onClick={() => props.filterByMark({ type: mark.type.name })}
							className={`card__mark card__mark-${mark.type.name}`}
							key={index}
						></div>
					))}
				</div>
				<div onClick={toggleInfo} className='card__img'>
					{getImg()}
				</div>
				<div onClick={toggleInfo} className='card__title'>
					{props.pokemon.name}
				</div>
			</div>

			{!isShowDetails || <Modal pokemon={props.pokemon} toggleInfo={toggleInfo} />}
		</div>
	);
};
