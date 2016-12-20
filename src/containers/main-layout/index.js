import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container} from 'reactstrap';
import {Link} from 'react-router';
import {Flex} from 'components';

@connect(state => ({
    auth: state.auth.user
}))
export default class MainLayout extends Component {
    renderNavbar() {
        const {auth: {_id, username}} = this.props;
        if (!_id) {
            return <Flex alignItems="center" justifyContent="space-between">
                <Link to="/auth/login">Login</Link>
                <Link to="/auth/register">Register</Link>
            </Flex>
        }
        else {
            return <Flex justifyContent="center">
                <h4>Hello, {username}</h4>
            </Flex>
        }
    }

    render() {
        return <Container>
            {this.renderNavbar()}
            {this.props.children}
        </Container>
    }
}
