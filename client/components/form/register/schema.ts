import * as yup from 'yup'

const RegisterSchema = yup.object().shape({
	firstName: yup
		.string()
		.min(2, 'Votre prénom doit comporter 2 caractères au minimum')
		.max(30, 'Votre prénom doit comporter 50 caractères au maximum')
		.required('Ce champ est obligatoire'),
	lastName: yup
		.string()
		.min(2, 'Votre nom doit comporter 2 caractères au minimum')
		.max(30, 'Votre nom doit comporter 50 caractères au maximum')
		.required('Ce champ est obligatoire'),
	email: yup
		.string()
		.email("L'email indiqué est invalide")
		.required("L'email est obligatoire"),
	password: yup
		.string()
		.required('Un mot de passe est obligatoire')
		.max(50, 'Votre mot de passe doit comporter 50 caractères au maximum')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#&µ£¤\\%\$\^\*\_\}\{\[\]\-\?\:\;\.\,\|\~\²\ù\/\+])(?=.{8,})/,
			'Votre mot de passe doit comporter au minimum 8 caractères, une majuscule, une minuscule, un chiffre et catactère spécial'
		),
	confirmPassword: yup
		.string()
		.required('La confirmation du mot de passe est obligatoire')
		.oneOf(
			[yup.ref('password'), null],
			'Le mot de passe de confirmation ne correspond pas'
		),
})

export default RegisterSchema
