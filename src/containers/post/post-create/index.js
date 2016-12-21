import React, {Component} from 'react';
import {autobind} from 'core-decorators';
import {withRouter} from 'react-router';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import swal from 'sweetalert2';
import PostForm from '../post-form';

const mutationQuery = gql`
    mutation CreatePost($title: String!, $description: String!, $content: String!){
        createPost(title: $title, description: $description, content: $content){
            _id
        }
    }
`

@graphql(mutationQuery,{
    name: 'createPost'
})
@withRouter
export default class PostCreate extends Component {
    @autobind
    handleSubmit({title, description, content}){
        this.props.createPost({
            variables: {
                title,
                description,
                content
            }
        }).then(postRes => {
            const {_id} = postRes.data.createPost;
            this.props.router.push(`/posts/edit/${_id}`);
            swal({
                title: "Create post sucess"
            });
        })
    }

    render() {
        return <div>
            <h1>Create Post</h1>
            <PostForm onSubmit={this.handleSubmit}/>
        </div>
    }
}
