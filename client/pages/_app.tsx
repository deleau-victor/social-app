import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
	uri: 'http://localhost:4200/graphql',
	cache: new InMemoryCache(),
	defaultOptions: {
		query: {
			errorPolicy: 'all',
		},
		mutate: {
			errorPolicy: 'all',
		},
	},
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	)
}
