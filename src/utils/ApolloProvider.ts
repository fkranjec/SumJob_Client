import { split, ApolloClient, InMemoryCache, createHttpLink, ApolloLink, from, concat, getApolloContext } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { setContext } from '@apollo/client/link/context'
import { RetryLink } from '@apollo/client/link/retry';
import { createClient } from 'graphql-ws';
import { getMainDefinition, offsetLimitPagination } from '@apollo/client/utilities';

const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql'
})

const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:5000/graphql'
}));

const splitLink = new RetryLink().split(({ query }) => {
    const definition = getMainDefinition(query);
    return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
    )
}, wsLink, httpLink)

const authLink = new ApolloLink((operation: any, forward: any) => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    operation.setContext({
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'x-refresh-token': refreshToken ? refreshToken : ''
        }
    })
    return forward(operation);
})



const afterwareLink = new ApolloLink((operation: any, forward: any) => {
    return forward(operation).map(response => {
        const context = operation.getContext();
        if (context.response) {
            const { response: { headers } } = context;
            if (headers) {
                const refreshToken = headers?.get('x-refresh-token');
                const token = headers?.get('x-token');
                if (refreshToken !== null) localStorage.setItem('refreshToken', refreshToken);
                if (token !== null) localStorage.setItem('token', token);
            }
        }
        return response;
    })
})

const cache = new InMemoryCache({
    addTypename: false,
    typePolicies: {
        Query: {
            fields: {
                getJobs: offsetLimitPagination()
            }
        }
    }
})
export const client: ApolloClient<any> = new ApolloClient({
    link: from([authLink, afterwareLink, splitLink]),
    cache: cache,
})


