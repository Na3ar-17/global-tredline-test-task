'use client'
import { NextPage } from 'next'
import { useLogin } from './useLogin'

export const Login: NextPage = () => {
	const {
		handleEmailChange,
		handlePasswordChange,
		isLoading,
		onSubmit,
		isValid,
		errors,
		isSubmitted,
		values,
	} = useLogin()

	return (
		<form
			onSubmit={onSubmit}
			className='d-flex flex-column p-3 rounded'
			style={{ minWidth: '320px', background: '#33333380' }}
		>
			<div className='mb-3'>
				<label htmlFor='email' className='form-label'>
					Email address
				</label>
				<input
					type='email'
					className='form-control bg-transparent'
					aria-describedby='emailHelp'
					id='email'
					onChange={handleEmailChange}
					value={values.email}
				/>
				{errors.email && errors.email !== 'empty' && (
					<p className='text-danger mb-0'>{errors.email}</p>
				)}
			</div>
			<div className='mb-3'>
				<label htmlFor='password' className='form-label'>
					Password
				</label>
				<input
					type='password'
					className='form-control bg-transparent'
					onChange={handlePasswordChange}
					value={values.password}
				/>
				{errors.password && errors.password !== 'empty' && (
					<p className='text-danger mb-0'>{errors.password}</p>
				)}
			</div>
			<button
				disabled={isLoading || !isValid || isSubmitted}
				type='submit'
				className='btn btn-primary'
			>
				Submit
			</button>
		</form>
	)
}
