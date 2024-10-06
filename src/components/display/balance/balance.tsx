'use client'
import { NextPage } from 'next'
import { Item } from './item/item'
import { useBalance } from './useBalance'

export const Balance: NextPage = () => {
	const { data, isLoading } = useBalance()

	return (
		<div className='container d-flex flex-column justify-content-center'>
			<ul className='list-group w-100' style={{ marginTop: '50px' }}>
				{isLoading ? (
					<div>Loading...</div>
				) : (
					data?.map((el, i) => <Item data={el} key={i} />)
				)}
				{!isLoading && data && data.length <= 0 && <div>No elements</div>}
				{/* FIX */}
				{!isLoading && !data && <div>Something went wrong</div>}
			</ul>
			{data && data.length > 0 && (
				<div className='mt-2'>
					Total amount: {data.reduce((acc, value) => acc + value.amount, 0)}
				</div>
			)}
		</div>
	)
}
