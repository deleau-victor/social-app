import React, { FC } from 'react'
import RegisterForm from '../components/form/register/registerForm'

type RegisterProps = {}

const Register: FC<RegisterProps> = ({}) => {
	return (
		<main className='register'>
			<RegisterForm />
		</main>
	)
}

export default Register
