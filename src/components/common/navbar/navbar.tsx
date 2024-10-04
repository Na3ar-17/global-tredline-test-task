import { NextPage } from 'next'

export const Navbar: NextPage = () => {
	return (
		<nav
			className='navbar navbar-expand-lg d-flex justify-content-between align-items-center px-5'
			style={{ backgroundColor: '#333', height: '60px' }}
		>
			<div className='container-fluid'>
				<span className='navbar-brand mb-0 h1'>Global Tredline</span>
			</div>
			<button className='btn btn-danger'>Logout</button>
		</nav>
	)
}
