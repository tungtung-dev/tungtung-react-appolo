import React, {Component, PropTypes} from 'react';
import gpl from 'graphql-tag';
import {Link} from 'react-router';
import {Col} from 'reactstrap';
import {graphqlAutoPassProps} from 'utils/graphql';
import Comment from '../../comment';

const postQuery = gpl`
    query postQuery($id: String!){
        post(_id: $id) {
            _id,
            title,
            description,
            content,
            user {
                username
            }
        }
        comments(postId: $id) {
            _id,
            content,
            user{
                username
            }
        }
    }
`

@graphqlAutoPassProps(postQuery, {
    options: (ownProps) => ({
        variables: {
            id: ownProps.params.postId
        }
    }),
    keysPassProps: ['post', 'comments']
})
export default class PostView extends Component {
    static propTypes = {
        post: PropTypes.shape({
            _id: PropTypes.string,
            title: PropTypes.string,
            description: PropTypes.string,
            content: PropTypes.string
        }),
        comments: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string,
            content: PropTypes.string
        }))
    }

    renderComments() {
        const {comments} = this.props;
        return <div>
            <h4>Comments</h4>
            {comments && comments.map(comment => <div key={comment._id}>
                {comment.content} by {comment.user.username}
                <hr/>
            </div>)}
        </div>
    }

    renderPostPreview() {
        const {post} = this.props;
        return <div>
            {post && <div className="post">
                <h4><Link to={`/posts/${post._id}`}>{post.title}</Link></h4>
                <p>{post.description}</p>
                <div>{post.content}</div>
                <hr/>
                <div>
                    <label htmlFor="auhtor">Author: </label>
                    {post.user.username}
                </div>
            </div>}
        </div>
    }

    render() {
        const {loading} = this.props;
        return <Col md={{size: 8, offset: 2}}>
            {loading && <p>Loading ...</p>}
            {this.renderPostPreview()}
            <hr/>
            <Comment.Lists postId={this.props.params.postId}/>
        </Col>
    }
}
PostView.propTypes = {}

