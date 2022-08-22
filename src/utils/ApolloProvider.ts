import { split, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { setContext } from '@apollo/client/link/context'
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql'
})

const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:5000/graphql'
}));

const splitLink = split(({ query }) => {
    const definition = getMainDefinition(query);
    return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
    )
}, wsLink, httpLink)

const authLink = setContext(() => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const token = localStorage.getItem('token')

export const client: ApolloClient<any> = new ApolloClient({
    link: authLink.concat(splitLink),
    cache: new InMemoryCache()
})

