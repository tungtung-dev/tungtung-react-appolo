import React, {Component} from 'react';
import {Link} from 'react-router';
import {graphql} from 'react-apollo';
import ggl from 'graphql-tag';

const queryPosts = ggl `query TrainerQuery($name: String!) {
    Trainer(name: $name) {
      name,
      ownedPokemons{
        id,
        name
      }
    }
  }`;

@graphql(queryPosts, {
    options: {
        variables: {
            name: "Phan Thanh Tùng"
        }
    }
})
export default class HomePage extends Component {
    renderPokemons(){
        const {data:{Trainer: {ownedPokemons}}} = this.props;
        return <div>
            {ownedPokemons.map(pokemon => <Link to={`/pokemon/${pokemon.id}`}>
                {pokemon.name}
            </Link>)}
        </div>
    }
    render() {
        const {data} = this.props;
        return <div>
            {!data.loading && !data.error && data.Trainer && <div>
                {this.renderPokemons()}
            </div>}
        </div>
    }
}
HomePage.propTypes = {}

