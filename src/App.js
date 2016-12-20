import React from 'react';
import ApolloClient, {createNetworkInterface} from 'apollo-client'
import {ApolloProvider} from 'react-apollo';
import {Router, Route, browserHistory} from 'react-router';
import configureStore from 'redux/store/configureStore';
import {getAuthToken} from 'utils/auth';

import "sweetalert2/dist/sweetalert2.min.css"

import {Post, MainLayout, Auth} from './containers'

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

const client = new ApolloClient({networkInterface})

const store = configureStore({}, client, browserHistory);

export default () => {
    return <ApolloProvider store={store} client={client}>
        <Router history={browserHistory}>
            <Route component={MainLayout}>
                <Route path='/' component={Post.Lists}/>
                <Route path='/posts/create' component={Post.Create}/>
                <Route path='/posts/:postId' component={Post.View}/>
                <Route path='/auth/login' component={Auth.Login}/>
                <Route path='/auth/register' component={Auth.Register}/>
            </Route>
        </Router>
    </ApolloProvider>
}