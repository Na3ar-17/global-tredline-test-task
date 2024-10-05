import { authService } from '@/app/api/services/auth.service'
import { accessTokenName } from '@/types/auth.types'
import { ILoginDto } from '@/types/login.types'
import cookie from 'js-cookie'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

export const useLogin = () => {
	const { replace } = useRouter()
	const [values, setValues] = useState<ILoginDto>({
		email: '',
		password: '',
	})
	const [errors, setErrors] = useState<ILoginDto>({
		email: 'empty',
		password: 'empty',
	})
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

	const isValid = !errors.email && !errors.password

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		validateEmail(e.target.value)
		setValues(prev => ({
			...prev,
			email: e.target.value,
		}))
	}

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		validatePassword(e.target.value)
		setValues(prev => ({
			...prev,
			password: e.target.value,
		}))
	}

	const validateEmail = (email: string) => {
		if (!email.trim().length) {
			setErrors(prev => ({
				...prev,
				email: 'This is a required field',
			}))
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
			setErrors(prev => ({
				...prev,
				email: 'Invalid email',
			}))
		} else {
			setErrors(prev => ({
				...prev,
				email: '',
			}))
		}
	}

	const validatePassword = (password: string) => {
		if (!password.trim().length) {
			setErrors(prev => ({
				...prev,
				password: 'This is a required field',
			}))
		} else if (password.trim().length < 6) {
			setErrors(prev => ({
				...prev,
				password: 'At least 6 characters',
			}))
		} else {
			setErrors(prev => ({
				...prev,
				password: '',
			}))
		}
	}

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsLoading(true)
		setIsSubmitted(false)
		try {
			if (errors.email || errors.password) return

			const { accessToken } = await authService.login(values)

			if (accessToken) {
				setIsSubmitted(true)
				replace('/balance')
				cookie.set(accessTokenName, accessToken)
			}
		} catch (error) {
			console.log(error)
		}
		setIsLoading(false)
		setValues({ email: '', password: '' })
	}

	return {
		onSubmit,
		handlePasswordChange,
		handleEmailChange,
		isLoading,
		isValid,
		errors,
		isSubmitted,
	}
}
