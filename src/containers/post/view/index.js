import React, {Component, PropTypes} from 'react';
import gpl from 'graphql-tag';
import {Link} from 'react-router';
import {Col} from 'reactstrap';
import {graphql} from 'react-apollo';

const postQuery = gpl`
    query postQuery($id: String!){
        post(_id: $id) {
            _id,
            title,
            description,
            content,
            user{
                username
            }
        }
    }
`
@graphql(postQuery, {
    options: (ownProps) => ({
        variables: {
            id: ownProps.params.postId
        }
    })
})
export default class PostLists extends Component {
    render() {
        const {data: {loading, post}} = this.props;
        return <Col md={{size: 8, offset: 2}}>
            {!loading && post && <div className="post">
                <h4><Link to={`/posts/${post._id}`}>{post.title}</Link></h4>
                <p>{post.description}</p>
                <div>{post.content}</div>
                <hr/>
                <div>
                    <label htmlFor="auhtor">Author</label>
                    {post.user.username}
                </div>
            </div>}
        </Col>
    }
}
PostLists.propTypes = {}

