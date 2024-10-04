'use client'
import { ILoginDto } from '@/types/login.types'
import { NextPage } from 'next'
import { ChangeEvent, FormEvent, useState } from 'react'

export const Login: NextPage = () => {
	const [data, setData] = useState<ILoginDto>({
		email: '',
		password: '',
	})

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (data.email.length && data.password.length) {
			fetch('api/auth/login', {
				method: 'POST',
				body: JSON.stringify(data),
			})
				.then(res => res.json())
				.then(data => console.log(data))
				.catch(err => console.log(err))
		}
	}

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
					id='email'
					aria-describedby='emailHelp'
					value={data.email}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setData(prev => {
							return {
								...prev,
								email: e.target.value,
							}
						})
					}
				/>
			</div>
			<div className='mb-3'>
				<label htmlFor='password' className='form-label'>
					Password
				</label>
				<input
					type='password'
					className='form-control bg-transparent'
					id='password'
					value={data.password}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setData(prev => {
							return {
								...prev,
								password: e.target.value,
							}
						})
					}
				/>
			</div>
			<button type='submit' className='btn btn-primary'>
				Submit
			</button>
		</form>
	)
}
