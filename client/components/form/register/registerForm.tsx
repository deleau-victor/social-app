import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RegisterSchema from './schema'
import { toastError } from '../../ui/toast'
import { IRegisterInput, IRegisterOutput } from './register.interface'
import { SingleExecutionResult, useMutation } from '@apollo/client'
import { ADD_USER } from './addUser.mutation'
import { useRouter } from 'next/router'
import { asyncLocalStorage } from '../../../utils/asyncLocalStorage'

const RegisterForm: FC = () => {
	const router = useRouter()
	const [createUser] = useMutation(ADD_USER)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegisterInput>({
		resolver: yupResolver(RegisterSchema),
	})

	const onSubmit = async (userInput: IRegisterInput) => {
		const { data, errors }: SingleExecutionResult<IRegisterOutput> =
			await createUser({
				variables: {
					input: {
						email: userInput.email,
						password: userInput.password,
						firstName: userInput.firstName,
						lastName: userInput.lastName,
					},
				},
			})
		if (data) {
			await asyncLocalStorage.setItem('token', data.createUser.accessToken)
			router.push('/')
		}
		if (errors) {
			return toastError(errors![0].message, 'error')
		}
	}

	return (
		<section className='registerForm'>
			<h1>Inscription</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<>
					<input {...register('firstName')} placeholder='Prénom' />
					{errors.firstName
						? toastError(errors.firstName.message, 'firstName')
						: ''}
				</>
				<>
					<input {...register('lastName')} placeholder='Nom' />
					{errors.lastName
						? toastError(errors.lastName.message, 'lastName')
						: ''}
				</>
				<>
					<input {...register('email')} placeholder='Email' />
					{errors.email ? toastError(errors.email.message, 'email') : ''}
				</>
				<>
					<input {...register('password')} placeholder='Mot de passe' />
					{errors.password
						? toastError(errors.password.message, 'password')
						: ''}
				</>
				<>
					<input
						{...register('confirmPassword')}
						placeholder='Confirmation du mot de passe'
					/>
					{errors.confirmPassword
						? toastError(errors.confirmPassword.message, 'confirmPassword')
						: ''}
				</>

				<button type='submit'>S'inscrire</button>
			</form>
			<ToastContainer
				position='bottom-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='colored'
			/>
		</section>
	)
}

export default RegisterForm
