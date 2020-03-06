import React, { useEffect, useState } from 'react';
import { Pokedex } from './pokedex/Pokedex.jsx';

const MAIN_URL = 'https://pokeapi.co/api/v2/';

export const App = props => {
	const clearSessionStorage = () => {
		sessionStorage.removeItem('pokemons');
	};

	return (
		<div className='page'>
			<header className='header'>
				<button className='btn' onClick={clearSessionStorage}>
					Очистить sessionStorage
				</button>

				<div className='viewer'>
					<input type='text' placeholder='введите кол-во страниц' />
					<button className='btn viewer__btn'>применить</button>
				</div>
			</header>

			<Pokedex />
		</div>
	);
};
