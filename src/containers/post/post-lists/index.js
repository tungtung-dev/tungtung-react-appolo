import React, {Component, PropTypes} from 'react';
import gpl from 'graphql-tag';
import {Link} from 'react-router';
import {graphqlWithPagination} from 'utils/graphql';
import {checkLoadMore} from 'utils';

const postQuery = gpl`
    query postQuery($itemPerPage: Int!, $page: Int!){
        posts(itemPerPage: $itemPerPage, page: $page) {
            data {
                _id,
                title,
                description,
                user{
                    username
                }
            }
            pagination {
                itemPerPage,
                page,
                totalItem
            }
        }
    }
`

@graphqlWithPagination(postQuery, {
    itemPerPage: 10,
    keyQuery: 'posts'
})
export default class PostLists extends Component {
    static propTypes = {
        posts: PropTypes.shape({
            data: PropTypes.array,
            pagination: PropTypes.object
        }),
        loadMore: PropTypes.func
    }

    render() {
        const {loading, posts} = this.props;
        return <div>
            {posts.data.map(post => <div key={post._id} className="post">
                <h4><Link to={`/posts/${post._id}`}>{post.title}</Link></h4>
                <p>{post.description}</p>
                <p>{post.user.username}</p>
                <hr/>
            </div>)}
            {loading && <div className="loading">Loading ...</div>}
            {checkLoadMore(posts.pagination) && <button className="btn btn-primary" onClick={this.props.loadMore}>
                Load more
            </button>}
        </div>
    }
}

