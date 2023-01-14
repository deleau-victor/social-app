import { gql } from '@apollo/client'

export const ADD_USER = gql`
	mutation createUser($input: createUserInput!) {
		createUser(input: $input) {
			user {
				id
				createdAt
				email
				firstName
				lastName
			}
			accessToken
		}
	}
`
