import React, {Component, PropTypes} from 'react';
import {Container} from 'reactstrap';
import {Col} from 'reactstrap';
import {Header} from 'components';

export default class MainLayout extends Component {
    static propTypes = {
        auth: PropTypes.shape({
            _id: PropTypes.string,
            username: PropTypes.string
        })
    }

    render() {
        const {auth} = this.props;
        return <Container>
            <Col md={{size: 8, offset: 2}}>
                <Header auth={auth} isAuthentication={auth._id ? true : false}/>
                {this.props.children}
            </Col>
        </Container>
    }
}
