'use client'
import { accessTokenName } from '@/types/auth.types'
import cookie from 'js-cookie'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
export const Navbar: NextPage = () => {
	const { replace } = useRouter()
	const logout = () => {
		cookie.remove(accessTokenName)
		replace('/login')
	}

	return (
		<nav
			className='navbar navbar-expand-lg d-flex justify-content-between align-items-center px-5'
			style={{ backgroundColor: '#333', height: '60px' }}
		>
			<div>
				<span className='navbar-brand mb-0 h1'>Global Tredline</span>
			</div>
			<button onClick={logout} className='btn btn-danger'>
				Logout
			</button>
		</nav>
	)
}
