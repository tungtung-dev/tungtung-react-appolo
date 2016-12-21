import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {Col} from 'reactstrap';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {graphqlAutoPassProps} from 'utils/graphql';
import PostForm from '../post-form';

const mutationQuery = gql`
    mutation UpdatePost($_id: ID!, $title: String!, $description: String!, $content: String!){
        updatePost(_id: $_id, title: $title, description: $description, content: $content){
            _id
        }
    }
`

const postQuery = gql`
    query postQuery($_id: String!){
        post(_id: $_id) {
            _id,
            title,
            description,
            content
        }
    }
`

@graphql(mutationQuery,{
    name: 'updatePost'
})
@graphqlAutoPassProps(postQuery, {
    options: (ownProps) => ({
        variables: {
            _id: ownProps.params.postId
        }
    }),
    keysPassProps: ['post']
})
export default class PostCreate extends Component {
    static propTypes = {
        updatePost: PropTypes.func,
        post: PropTypes.shape({
            _id: PropTypes.string,
            title: PropTypes.string,
            description: PropTypes.string,
            content: PropTypes.string
        })
    }

    @autobind
    handleSubmit({title, description, content}){
        this.props.updatePost({
            variables: {
                _id: this.props.post._id,
                title,
                description,
                content
            }
        }).then(postRes => {
            console.log('update success');
        })
    }

    render() {
        const {post} = this.props;
        return <Col md={{size: 6, offset: 3}}>
            <h1>Edit Post</h1>
            {post && <PostForm initialValues={post} onSubmit={this.handleSubmit}/>}
        </Col>
    }
}
