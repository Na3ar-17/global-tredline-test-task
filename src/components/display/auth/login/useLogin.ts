import { authService } from '@/app/api/services/auth.service'
import { accessTokenName } from '@/types/auth.types'
import { ILoginDto } from '@/types/login.types'
import cookie from 'js-cookie'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

export const useLogin = () => {
	const { replace } = useRouter()
	const [values, setValues] = useState<ILoginDto>({ email: '', password: '' })
	const [errors, setErrors] = useState<ILoginDto>({
		email: 'empty',
		password: 'empty',
	})
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
	const isValid = !errors.email && !errors.password

	const handleChange = (
		field: keyof ILoginDto,
		value: string,
		validator: (value: string) => string
	) => {
		setValues(prev => ({ ...prev, [field]: value }))
		setErrors(prev => ({ ...prev, [field]: validator(value) }))
	}

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		handleChange('email', e.target.value, validateEmail)
	}

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		handleChange('password', e.target.value, validatePassword)
	}

	const validateEmail = (email: string): string => {
		if (!email.trim()) return 'This is a required field'
		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
			return 'Invalid email'
		if (email.length > 30) return 'Too long'
		return ''
	}

	const validatePassword = (password: string): string => {
		if (!password.trim()) return 'This is a required field'
		if (password.length < 6) return 'At least 6 characters'
		if (password.length > 20) return 'Too long'
		return ''
	}

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!isValid) return
		setIsLoading(true)
		setIsSubmitted(false)
		try {
			const { accessToken } = await authService.login(values)
			if (accessToken) {
				cookie.set(accessTokenName, accessToken, { sameSite: 'lax' })
				setIsSubmitted(true)
				replace('/balance')
			}
		} catch (error) {
			throw error
		} finally {
			setIsLoading(false)
			setValues({ email: '', password: '' })
		}
	}

	return {
		onSubmit,
		handlePasswordChange,
		handleEmailChange,
		isLoading,
		isValid,
		errors,
		isSubmitted,
		values,
	}
}
