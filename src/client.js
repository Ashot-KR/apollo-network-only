import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

const cache = new InMemoryCache()

const URL = 'https://swapi.apis.guru/'

const httpLink = createHttpLink({
	uri: URL
})

const client = new ApolloClient({
	link: ApolloLink.from([
		onError(({graphQLErrors, networkError}) => {
			if (graphQLErrors)
				graphQLErrors.map(({message, locations, path}) => {
					return console.log(
						`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
					)
				});
			if (networkError) console.trace(`[Network error]: ${networkError}`)
		}),
		httpLink
	]),
	cache
})

export default client
