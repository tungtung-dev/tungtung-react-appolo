import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';
import {Link} from 'react-router';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {graphqlAutoPassProps} from 'utils/graphql';
import swal from 'sweetalert2';
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
export default class PostEdit extends Component {
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
            swal({
                title: "Update post sucess"
            });
        })
    }

    render() {
        const {post} = this.props;
        return <div>
            <h1>Edit Post</h1>
            {post && <div>
                <PostForm initialValues={post} onSubmit={this.handleSubmit}/>
                <Link to={`/posts/${post._id}`} className="btn btn-block btn-success">View post</Link>
            </div>}
        </div>
    }
}
