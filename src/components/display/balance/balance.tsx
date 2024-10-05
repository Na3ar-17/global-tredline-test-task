'use client'
import { NextPage } from 'next'
import { Item } from './item/item'
import { useBalance } from './useBalance'

export const Balance: NextPage = () => {
	const { data, isLoading } = useBalance()
	return (
		<div className='container d-flex justify-content-center align-items-center '>
			<ul className='list-group w-100' style={{ marginTop: '50px' }}>
				{isLoading ? (
					<div>Loading...</div>
				) : data && data.length > 0 ? (
					data?.map((el, i) => <Item data={el} key={i} />)
				) : (
					<div>No elements</div>
				)}
			</ul>
		</div>
	)
}
