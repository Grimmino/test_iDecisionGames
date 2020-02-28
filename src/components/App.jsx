import React, { useEffect, useState } from 'react'

const MAIN_URL = 'https://pokeapi.co/api/v2/'

const POKEMONS_SPRITES__BACK = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back'
const POKEMONS_SPRITES__FRONT = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'
const SHOW = 12
const POKEMONS = `pokemon?limit=${SHOW}`

export const App = (props) => {

    const [isLoad, setIsLoad] = useState(false)

    const getPokemonList = async () => {
        const pokemonsList = await fetch(`${MAIN_URL}${POKEMONS}`)
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.log(err))

        sessionStorage.setItem('pokemons', JSON.stringify(pokemonsList))

        setIsLoad(true)
    }

    useEffect(() => {
        if(sessionStorage.getItem('pokemons') == null) {
            console.log('get pokemons list')
            getPokemonList()
        } else {
            setIsLoad(true)
        }
    });

    const clearSessionStorage = () => {
        sessionStorage.removeItem('pokemons')
    }

    return (
        <div className="page">
            <header className="header">
                <button className="btn" onClick={clearSessionStorage}>Очистить sessionStorage</button>

                <div className="viewer">
                    <input type="text" placeholder="введите кол-во страниц"/>
                    <button className="btn viewer__btn">применить</button>
                </div>
            </header>

            <div className="pokemons">
                {isLoad ? <PokemonsList/> : null}
            </div>
        </div>
    )
}

const PokemonsList = (props) => {

    const [pokemonsList, setPokemonsList] = useState(JSON.parse(sessionStorage.getItem('pokemons')))

    //console.log(pokemonsList)
    
    const nextPokemonsList = async () => {
        const store = JSON.parse(sessionStorage.getItem('pokemons'))
        
        const next = await fetch(store.next)
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.log(err))
        
        setPokemonsList(next)

        sessionStorage.setItem('pokemons', JSON.stringify(next))
    }

    const prevPokemonsList = async () => {
        const store = JSON.parse(sessionStorage.getItem('pokemons'))

        const previous = await fetch(store.previous)
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.log(err))
        
        setPokemonsList(previous)

        sessionStorage.setItem('pokemons', JSON.stringify(previous))
    }

    const getImg = (url) => {
        const reg = url.match(/\/\d+/i)
        return (
            <React.Fragment>
                <div className="card__img-item front">
                    <img src={`${POKEMONS_SPRITES__FRONT}${reg[0]}.png`} alt=""/>
                </div>
                <div className="card__img-item back">
                    <img src={`${POKEMONS_SPRITES__BACK}${reg[0]}.png`} alt=""/>
                </div>
            </React.Fragment>
        )
    }
    
    return (
        <React.Fragment>
            <div className="pokemons__list grid">
                {pokemonsList.results.map((item, index) => (
                    <div className="card" key={index}>
                        <div className="card__inner pokemons__item">
                            <div className="card__img">
                                {getImg(item.url)}
                            </div>
                            <div className="card__title">{item.name}</div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="btn" onClick={pokemonsList.previous !== null ? prevPokemonsList : null}>prev</button>
            <button className="btn" onClick={pokemonsList.next !== null ? nextPokemonsList : null}>next</button>
        </React.Fragment>
    )
}
