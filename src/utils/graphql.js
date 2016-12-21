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
            loadMore(){
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

export function getPassProps(keysPassProps = [], data = {}){
    let passProps = {};
    keysPassProps.map((keyPassProps) => {
        passProps[keyPassProps] = data[keyPassProps]
    })
    return {
        loading: data.loading,
        ...passProps
    }
}

export function graphqlAutoPassProps(graphqlQuery, {options, props, otherCustom = {}, keysPassProps = []}) {
    return graphql(graphqlQuery, {
        options,
        props: (...args) => {
            if(props){
                return {
                    ...props(...args),
                    ...getPassProps(keysPassProps, args[0].data)
                }
            }
            return getPassProps(keysPassProps, args[0].data);
        },
        ...otherCustom
    })
}

export default {
    graphqlWithPagination,
    graphqlAutoPassProps
}