import React, {Component, PropTypes} from 'react';
import gpl from 'graphql-tag';
import {autobind} from 'core-decorators';
import {graphqlAutoPassProps} from 'utils/graphql';
import CommentForm from '../comment-form';

import {mutationCreateComment, subscriptionCreateComment} from './utils';

const fragmentQuery = `
    fragment getComment on CommentType {
        _id,
        content,
        user {
            username
        }
    }
`

const commentQuery = gpl`
    query Comments($postId: String!){
        comments(postId: $postId){
            ...getComment
        }
    }
    ${fragmentQuery}
`

const subscribeQuery = gpl`
    subscription SubCommentAdded($postId: ID!){
        onCreateComment(postId: $postId){
           ...getComment
        }
    }
    ${fragmentQuery}
`

const commentMutation = gpl`
    mutation AddComment($content: String!, $postId: String!){
        createComment(content: $content, postId: $postId){
            ...getComment
        }
    }
    ${fragmentQuery}
`

@graphqlAutoPassProps(commentQuery, {
    options: (ownProps) => ({
        variables: {
            postId: ownProps.postId
        }
    }),
    props: ({data: {subscribeToMore}}) => ({
        subscribeToMore
    }),
    keysPassProps: ['comments']
})
@mutationCreateComment(commentMutation)
export default class CommentLists extends Component {
    static propTypes = {
        postId: PropTypes.string,
        comments: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string,
            content: PropTypes.string,
            user: PropTypes.shape({
                username: PropTypes.string
            })
        })),
        subscribeToMore: PropTypes.func
    }

    @autobind
    handleSubmit({content}) {
        this.props.createComment({
            content,
            postId: this.props.postId
        });
    }

    componentDidMount() {
        this.subscribe = this.props.subscribeToMore(subscriptionCreateComment({
            query: subscribeQuery,
            postId: this.props.postId
        }))
    }

    render() {
        return <div>
            <h4>Comments</h4>
            <CommentForm onSubmit={this.handleSubmit}/>
            <div style={{marginTop: 10}}>&nbsp;</div>
            {this.props.comments && this.props.comments.map(comment => <div key={comment._id}>
                {comment.content} by {comment.user.username}
                <hr/>
            </div>)}
        </div>
    }
}

