import {graphql} from 'react-apollo';
import update from 'react/lib/update';

function isDuplicateComment(newComment, existingComments) {
    return existingComments.findIndex(comment => newComment._id === comment._id) > -1;
}

function updateCommentLists(prevResult, newComment) {
    if (isDuplicateComment(newComment, prevResult.comments)) {
        return prevResult;
    }
    return update(prevResult, {
        comments: {
            $set: [
                newComment,
                ...prevResult.comments
            ]
        }
    })
}

const subscriptionCreateComment = ({query, postId}) => ({
    document: query,
    variables: {
        postId
    },
    updateQuery: (prevResult, {subscriptionData}) => {
        const newComment = subscriptionData.data.onCreateComment;
        return updateCommentLists(prevResult, newComment);
    }
})

const mutationCreateComment = (commentMutation) => graphql(commentMutation, {
    props: ({ownProps, mutate}) => ({
        createComment: ({content, postId}) =>
            mutate({
                variables: {content, postId},
                updateQueries: {
                    Comments: (prevResult, {mutationResult}) => {
                        const newComment = mutationResult.data.createComment;
                        return updateCommentLists(prevResult, newComment);
                    }
                }
            })
    })
})

export {mutationCreateComment, subscriptionCreateComment}