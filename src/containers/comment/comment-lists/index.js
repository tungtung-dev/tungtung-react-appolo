import React, {Component, PropTypes} from 'react';
import gpl from 'graphql-tag';
import {autobind} from 'core-decorators';
import {graphqlAutoPassProps} from 'utils/graphql';
import {graphql} from 'react-apollo';
import Equal from 'deep-equal';
import CommentForm from '../comment-form';

const commentQuery = gpl`
    query getComments($postId: String!){
        comments(postId: $postId){
            _id,
            content,
            user {
                username
            }
        }
    }
`

const commentMutation = gpl`
    mutation addComment($content: String!, $postId: String!){
        createComment(content: $content, postId: $postId){
            _id,
            content,
            user {
                username
            }
        }
    }
`

@graphqlAutoPassProps(commentQuery, {
    options: (ownProps) => ({
        variables: {
            postId: ownProps.postId
        }
    }),
    keysPassProps: ['comments']
})
@graphql(commentMutation, {name: 'createComment'})
export default class CommentLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: props.comments ? props.comments : []
        }
    }

    static propTypes = {
        postId: PropTypes.string,
        comments: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string,
            content: PropTypes.string,
            user: PropTypes.shape({
                username: PropTypes.string
            })
        }))
    }

    @autobind
    handleSubmit({content}) {
        this.props.createComment({
            variables: {
                content,
                postId: this.props.postId
            }
        }).then(commentRes => {
            this.setState({
                comments: [
                    commentRes.data.createComment,
                    ...this.state.comments
                ]
            })
        })
    }

    componentDidUpdate(prevProps) {
        if (!Equal(prevProps.comments, this.props.comments)) {
            this.setState({comments: this.props.comments});
        }
    }

    render() {
        return <div>
            <h4>Comments</h4>
            <CommentForm onSubmit={this.handleSubmit}/>
            <div style={{marginTop: 10}}>&nbsp;</div>
            {this.state.comments.length > 0 && this.state.comments.map(comment => <div key={comment._id}>
                {comment.content} by {comment.user.username}
                <hr/>
            </div>)}
        </div>
    }
}

