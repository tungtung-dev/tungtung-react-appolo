import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Flex from '../flex';

export default class Header extends Component {
    static propTypes = {
        isAuthentication: PropTypes.bool,
        auth: PropTypes.shape({
            _id: PropTypes.string,
            username: PropTypes.string
        })
    }

    render() {
        const {isAuthentication, auth} = this.props;
        return <div className="header" style={{marginTop: 10, marginBottom: 10}}>
            {!isAuthentication && <Flex justifyContent="flex-end">
                <Link to="/auth/login">Login</Link>
                &nbsp;
                <Link to="/auth/register">Register</Link>
            </Flex>}
            {isAuthentication && <Flex justifyContent="space-between">
                <Link to="/">Posts</Link>
                <Flex justifyContent="flex-end">
                    <p>Hello, {auth.username}</p>
                    &nbsp;
                    <Link to="/posts/create">Create post</Link>
                    &nbsp;
                    <Link to="/auth/logout">Logout</Link>
                </Flex>
            </Flex>}
        </div>
    }
}

