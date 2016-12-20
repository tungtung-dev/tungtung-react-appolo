import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import ggl from 'graphql-tag';

const queryPosts = ggl `query TrainerQuery {
    Trainer(name: "Phan Thanh Tùng") {
      name
    }
  }`;

@graphql(queryPosts)
export default class HomePage extends Component {
    render() {
        const {data} = this.props;
        return <div>
            {!data.loading && data.Trainer && <span>{data.Trainer.name}</span>}
            Helo man
        </div>
    }
}
HomePage.propTypes = {}

