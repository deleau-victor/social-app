import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoginSchema from './schema'
import { toastError } from '../../ui/toast'
import ILogin from './login.interface'

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILogin>({
		resolver: yupResolver(LoginSchema),
	})
	const onSubmit = (data: ILogin) => console.table(data)

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<>
					<input {...register('email')} />
					{errors.email ? toastError(errors.email.message, 'email') : ''}
				</>
				<>
					<input {...register('password')} type='number' />
					{errors.password
						? toastError(errors.password.message, 'password')
						: ''}
				</>

				<input type='submit' />
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
		</>
	)
}

export default LoginForm
