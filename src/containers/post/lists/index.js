import React, {Component, PropTypes} from 'react';
import gpl from 'graphql-tag';
import {Link} from 'react-router';
import {Col} from 'reactstrap';
import {graphql} from 'react-apollo';

const postQuery = gpl`
    query postQuery{
        posts {
            _id,
            title,
            description
        }
    }
`

@graphql(postQuery)
export default class PostLists extends Component {
    render() {
        const {data: {loading, posts}} = this.props;
        return <Col md={{size: 8, offset: 2}}>
            {!loading && posts && posts.map(post => <div key={post._id} className="post">
                <h4><Link to={`/posts/${post._id}`}>{post.title}</Link></h4>
                <p>{post.description}</p>
                <hr/>
            </div>)}
        </Col>
    }
}
PostLists.propTypes = {}

