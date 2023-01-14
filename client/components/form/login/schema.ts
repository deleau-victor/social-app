import * as yup from 'yup'

const LoginSchema = yup
	.object({
		email: yup.string().required('First name is required').email(),
		password: yup.string().required('Password is required'),
	})
	.required()

export default LoginSchema
