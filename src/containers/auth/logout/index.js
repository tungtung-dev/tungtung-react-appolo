import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {setAuthUser} from 'redux/actions/authAction';
import {resetAuthToken} from 'utils/auth';

@connect(() => ({}), dispatch => bindActionCreators({setAuthUser, push}, dispatch))
export default class Logout extends Component {
    componentDidMount(){
        this.props.setAuthUser({token: '', user: {}});
        resetAuthToken();
        this.props.push('/');
    }
    render() {
        return <div>

        </div>
    }
}

