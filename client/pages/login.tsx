import { useForm, SubmitHandler } from 'react-hook-form'
import LoginForm from '../components/form/login/loginForm'

type Inputs = {
	example: string
	exampleRequired: string
}

const Login = () => {
	return (
		<main className='login'>
			<LoginForm />
		</main>
	)
}

export default Login
