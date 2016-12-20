import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {Col} from 'reactstrap';
import {reduxForm, Field} from 'redux-form';
import {graphql} from 'react-apollo';
import swal from 'sweetalert2';
import gpl from 'graphql-tag';
import authAction from 'redux/actions/authAction';

@reduxForm({
    form: 'loginForm'
})
class LoginForm extends Component {
    render() {
        const {handleSubmit} = this.props;
        return <form onSubmit={handleSubmit} style={{marginTop: 20}}>
            <Field name="username" className="form-control" component="input" type="text"/>
            <Field name="password" className="form-control" component="input" type="password"/>
            <button className="btn btn-primary btn-block">Login</button>
        </form>
    }
}

const mutationLogin = gpl`
    mutation Login($username: String!, $password: String){
        loginUser(username: $username, password: $password){
            token,
            success,
            user{
                _id,
                username
            }
        }
    }
`
@graphql(mutationLogin, {name: 'loginUser'})
@connect(() => ({}), dispatch => bindActionCreators({...authAction, push}, dispatch))
export default class Login extends Component {
    static propTypes = {
        loginUser: PropTypes.func
    }

    @autobind
    handleSubmit(values) {
        const {username, password} = values;
        this.props.loginUser({
            variables: {
                username,
                password
            }
        }).then(userRes => {
            const {loginUser: {success, token, user}} = userRes.data;
            if(success){
                this.props.setAuthUser({token, user});
                swal({
                    title: 'Login Success'
                }).then(() => {
                    this.props.push('/');
                })
            }
        })
    }

    render() {
        return <Col md={{size: 6, offset: 3}}>
            <h1>Login</h1>
            <LoginForm onSubmit={this.handleSubmit}/>
        </Col>
    }
}
Login.propTypes = {}

