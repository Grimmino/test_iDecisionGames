import React from 'react';

export const Modal = props => {
	return (
		<div className='card__details'>
			<div className='card__modal'>
				<div className='modal'>
					<div className='modal__header'>
						<div className='modal__title'>{props.pokemon.name}</div>
						<div onClick={props.toggleInfo} className='modal__close'></div>
					</div>

					<div className='modal__content'>
						<Details info={props.pokemon} />
					</div>
				</div>
			</div>
		</div>
	);
};

const Details = props => {
	return (
		<div className='details'>
			<div className='details__row'>
				<div className='details__img'>
					<img src={props.info.sprites.front_default} alt='' />
				</div>

				<div className='details__info'>
					<div className='details__block'>
						<h3 className='details__block-title'>abilities</h3>

						<div className='details__block-inner details__block-inner--flex'>
							{props.info.abilities.map((item, index) => (
								<div className='details__block-tag' key={index}>
									{item.ability.name}
								</div>
							))}
						</div>
					</div>

					<div className='details__block'>
						<h3 className='details__block-title'>stats</h3>

						<div className='details__block-inner'>
							{props.info.stats.map((item, index) => (
								<div className='details__block-item' key={index}>
									<div className='details__block-item-key'>{item.stat.name}:</div>
									<div className='details__block-item-value'>{item.base_stat}</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className='details__row'>
				<div className='details__block'>
					<div className='details__block-inner details__block-inner--flex'>
						{props.info.moves.map((item, index) => (
							<div className='details__block-tag' key={index}>
								{item.move.name}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
