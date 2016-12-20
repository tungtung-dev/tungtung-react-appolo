import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {graphql} from 'react-apollo';
import ggl from 'graphql-tag';
import PokemonCard from './PokemonCard';

const queryPosts = ggl `
    query PokemonQuery($id: ID!) {
        Pokemon(id: $id){
            ...PokemonCard
        }
    }
    ${PokemonCard.fragments.pokemon}
`;

console.log(queryPosts);

@graphql(queryPosts, {
    options: ownProps => ({
        variables:{
            id: ownProps.params.pokemonId
        }
    })
})
@withRouter
export default class PokemonPage extends Component {
    renderPokemon(){
        const {data: {Pokemon}} = this.props;
        return <div>
            <p>{Pokemon.name}</p>
            <img src={Pokemon.url} alt="Pokemon"/>
        </div>
    }
    render() {
        const {data} = this.props;
        return <div>
            <p>Pokemon Name</p>
            {data.Pokemon && <PokemonCard pokemon={data.Pokemon}/>}

        </div>
    }
}

