import {graphql} from 'react-apollo';
import update from 'react/lib/update';
import {getDeepObject} from './index';

/**
 * Custom props dispatch loadMorePosts
 * @param graphqlQuery
 * @param itemPerPage - Int
 * @param page - Int
 * @param keyQuery - String - Key top query from graphlql tag
 * @returns {*}
 */
export function graphqlWithPagination(graphqlQuery, {itemPerPage, page = 1, keyQuery = 'posts'}) {
    return graphql(graphqlQuery, {
        options: (ownProps) => ({
            variables: {
                itemPerPage,
                page
            }
        }),
        props: ({data: {loading, posts, fetchMore}, data}) => ({
            loading,
            [keyQuery]: data[keyQuery] ? data[keyQuery] : {data: [], pagination: {}},
            loadMorePosts(){
                return fetchMore({
                    variables: {
                        page: getDeepObject(data[keyQuery], 1, 'pagination', 'page') + 1
                    },
                    updateQuery: (prevData, {fetchMoreResult: {data}}) => {
                        return update(prevData, {
                            [keyQuery]: {
                                data: {
                                    $push: data[keyQuery].data
                                },
                                pagination: {
                                    $set: data[keyQuery].pagination
                                }
                            }
                        });
                    }
                })
            }
        })
    })
}

export function graphqlAutoPassProps(graphqlQuery, {options, otherCustom = {}, keysPassProps = []}) {
    return graphql(graphqlQuery, {
        options,
        props: ({data}) => {
            let passProps = {};
            keysPassProps.map((keyPassProps) => {
                passProps[keyPassProps] = data[keyPassProps]
            })
            return {
                loading: data.loading,
                ...passProps
            }
        },
        ...otherCustom
    })
}

export default {
    graphqlWithPagination,
    graphqlAutoPassProps
}