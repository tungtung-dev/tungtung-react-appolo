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
    form: 'registerForm'
})
class RegisterForm extends Component {
    render() {
        const {handleSubmit} = this.props;
        return <form onSubmit={handleSubmit} style={{marginTop: 20}}>
            <Field name="username" className="form-control" component="input" type="text"/>
            <Field name="password" className="form-control" component="input" type="password"/>
            <button className="btn btn-primary btn-block">Register</button>
        </form>
    }
}

const mutationRegister = gpl`
    mutation Register($username: String!, $password: String){
        createUser(username: $username, password: $password){
            token,
            success,
            user{
                _id,
                username
            }
        }
    }
`
@graphql(mutationRegister, {name: 'createUser'})
@connect(() => ({}), dispatch => bindActionCreators({...authAction, push}, dispatch))
export default class Register extends Component {
    static propTypes = {
        createUser: PropTypes.func
    }

    @autobind
    handleSubmit(values) {
        const {username, password} = values;
        this.props.createUser({
            variables: {
                username,
                password
            }
        }).then(userRes => {
            const {createUser: {success, token, user}} = userRes.data;
            if(success){
                this.props.setAuthUser({token, user});
                swal({
                    title: 'Register Success'
                }).then(() => {
                    this.props.push('/');
                })
            }
        })
    }

    render() {
        return <Col md={{size: 6, offset: 3}}>
            <h1>Register</h1>
            <RegisterForm onSubmit={this.handleSubmit}/>
        </Col>
    }
}
Register.propTypes = {}

