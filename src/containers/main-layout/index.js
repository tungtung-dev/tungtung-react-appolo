import React, {Component} from 'react';
import {Container} from 'reactstrap';

export default class MainLayout extends Component {
    render() {
        return <Container>
            {this.props.children}
        </Container>
    }
}
