import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {graphql} from 'react-apollo';
import gpl from 'graphql-tag';
import {getAuthToken} from 'utils/auth';
import {setAuthUser} from 'redux/actions/authAction';
import MainLayout from '../main-layout';

const authMutation = gpl`
    mutation GetUser($token: String!){
        loginUserToken(token: $token){
            token,
            success,
            user{
                _id,
                username
            }
        }
    }
`

@graphql(authMutation, {name: 'loginUserToken'})
@connect(state => ({
    auth: state.auth.user
}), dispatch => bindActionCreators({setAuthUser}, dispatch))
export default class AppContainer extends Component {
    static propTypes = {
        loginUserToken: PropTypes.func
    }

    componentDidMount(){
        this.props.loginUserToken({
            variables: {
                token: getAuthToken()
            }
        }).then(userRes => {
            const {token, success, user} = userRes.data.loginUserToken;
            if(success){
                this.props.setAuthUser({token, user})
            }
        });
    }

    render() {
        return <MainLayout auth={this.props.auth}>
            {this.props.children}
        </MainLayout>
    }
}
