import React from 'react';
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo';
import {Router, Route, browserHistory} from 'react-router';
import configureStore from 'redux/store/configureStore';

import Pokemons from 'components/Pokemons';
import PokemonPage from 'components/PokemonPage';

const client = new ApolloClient({
    networkInterface: createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/ciwvhy70a0yz30129gjbam43s'}),
})

const store = configureStore({}, client, browserHistory);

export default () => {
    return <ApolloProvider store={store} client={client}>
        <Router history={browserHistory}>
            <Route path='/' component={Pokemons} />
            <Route path="/pokemon/:pokemonId" component={PokemonPage}/>
        </Router>
    </ApolloProvider>
}