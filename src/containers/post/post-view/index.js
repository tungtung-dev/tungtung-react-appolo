import React, {Component, PropTypes} from 'react';
import gpl from 'graphql-tag';
import {Link} from 'react-router';
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
    }
`

@graphqlAutoPassProps(postQuery, {
    options: (ownProps) => ({
        variables: {
            id: ownProps.params.postId
        }
    }),
    keysPassProps: ['post']
})
export default class PostView extends Component {
    static propTypes = {
        post: PropTypes.shape({
            _id: PropTypes.string,
            title: PropTypes.string,
            description: PropTypes.string,
            content: PropTypes.string
        })
    }

    renderPostPreview() {
        const {post} = this.props;
        return <div>
            {post && <div className="post">
                <h4>
                    {post.title} - <Link to={`/posts/edit/${post._id}`}>Edit</Link>
                </h4>
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
        return <div>
            {loading && <p>Loading ...</p>}
            {this.renderPostPreview()}
            <hr/>
            <Comment.Lists postId={this.props.params.postId}/>
        </div>
    }
}
PostView.propTypes = {}

