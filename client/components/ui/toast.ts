import { toast } from 'react-toastify'

export const toastError = (message: string | undefined, id: string) => {
	toast.error(message, {
		position: 'bottom-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'colored',
		toastId: id,
	})
}

export const toastInfo = (message: string | undefined, id: string) => {
	toast.info(message, {
		position: 'bottom-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'colored',
		toastId: id,
	})
}
