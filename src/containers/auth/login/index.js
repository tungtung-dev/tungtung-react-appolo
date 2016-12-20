import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {Col} from 'reactstrap';
import {withRouter} from 'react-router';
import {reduxForm, Field} from 'redux-form';
import {graphql} from 'react-apollo';
import swal from 'sweetalert2';
import gpl from 'graphql-tag';
import {setAuthToken} from 'utils/auth';

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
@withRouter
export default class Login extends Component {
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
                setAuthToken(token);
                swal({
                    title: 'Login Success'
                }).then(() => {
                    this.props.router.push('/');
                })
            }
        })
    }

    render() {
        return <Col md={{size: 6, offset: 3}}>
            <LoginForm onSubmit={this.handleSubmit}/>
        </Col>
    }
}
Login.propTypes = {}

