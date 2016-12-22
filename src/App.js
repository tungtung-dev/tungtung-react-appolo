import React from 'react';
import ApolloClient, {createNetworkInterface} from 'apollo-client'
import {ApolloProvider} from 'react-apollo';
import {Client} from 'subscriptions-transport-ws';
import {Router, Route, browserHistory} from 'react-router';
import configureStore from 'redux/store/configureStore';
import {getAuthToken} from 'utils/auth';
import {addGraphQLSubscriptions} from 'utils';

import "sweetalert2/dist/sweetalert2.min.css"

import {AppContainer, Post, Auth} from './containers'

const socketClient = new Client('ws://localhost:8081');

const networkInterface = createNetworkInterface({uri: 'http://localhost:8080/graphql'});
networkInterface.use([{
    applyMiddleware(req, next) {
        if (!req.options.headers) {
            req.options.headers = {};  // Create the header object if needed.
        }
        req.options.headers['authorization'] = getAuthToken(true);
        next();
    }
}]);

const networkInterfaceWithSubscription = addGraphQLSubscriptions(networkInterface, socketClient)

const client = new ApolloClient({networkInterface: networkInterfaceWithSubscription});

const store = configureStore({}, client, browserHistory);

export default () => {
    return <ApolloProvider store={store} client={client}>
        <Router history={browserHistory}>
            <Route component={AppContainer}>
                <Route path='/' component={Post.Lists}/>
                <Route path='/posts/create' component={Post.Create}/>
                <Route path='/posts/:postId' component={Post.View}/>
                <Route path='/posts/edit/:postId' component={Post.Edit}/>
                <Route path='/auth/login' component={Auth.Login}/>
                <Route path='/auth/register' component={Auth.Register}/>
                <Route path='/auth/logout' component={Auth.Logout}/>
            </Route>
        </Router>
    </ApolloProvider>
}