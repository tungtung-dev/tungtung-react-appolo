import React, {Component} from 'react';
import gpl from 'graphql-tag';
import {propType} from 'graphql-anywhere';

export default class PokemonCard extends Component {
    render() {
        const {pokemon} = this.props;
        return <div>
            <p>{pokemon.name}</p>
            <img src={pokemon.url} alt="Pokemon"/>
        </div>
    }
}

PokemonCard.fragments = {
    pokemon: gpl`
        fragment PokemonCard on Pokemon{
            url,
            name
        }
    `
};

PokemonCard.propTypes = {
    pokemon: propType(PokemonCard.fragments.pokemon).isRequired
}