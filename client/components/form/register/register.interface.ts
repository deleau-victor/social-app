export interface IRegister {
	email: string
	password: string
	confirmPassword: string
	firstName: string
	lastName: string
}

export interface IRegisterResponse {
	createUser: {
		user: {
			id: string
			createdAt: string
			email: string
			firstName: string
			lastName: string
		}
		accessToken: string
	}
}
