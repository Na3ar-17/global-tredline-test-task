'use client'
import { NextPage } from 'next'
import { useState } from 'react'
import { Item } from './item/item'
import { Modal } from './modal/modal'
import { useBalance } from './useBalance'

export const Balance: NextPage = () => {
	const { data, isLoading } = useBalance()
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [isModalAnimating, setIsModalAnimating] = useState(false)

	const handleOpenModal = () => {
		setIsModalVisible(true)
		setTimeout(() => {
			setIsModalAnimating(true)
		}, 100)
	}
	const handleCloseModal = () => {
		setIsModalAnimating(false)
		setTimeout(() => {
			setIsModalVisible(false)
		}, 300)
	}

	return (
		<div className='container mt-20'>
			<div className='d-flex justify-content-end px-3 mt-2'>
				<button
					type='button'
					className='btn btn-primary'
					onClick={handleOpenModal}
				>
					Add New Item
				</button>
			</div>

			<div className='container d-flex flex-column justify-content-center'>
				<ul className='list-group w-100' style={{ marginTop: '25px' }}>
					{isLoading ? (
						<div>Loading...</div>
					) : (
						data?.map((el, i) => <Item data={el} key={i} />)
					)}
					{!isLoading && data && data.length <= 0 && <div>No elements</div>}
					{!isLoading && !data && <div>Something went wrong</div>}
				</ul>
				{data && data.length > 0 && (
					<div className='mt-2'>
						Total amount: {data.reduce((acc, value) => acc + value.amount, 0)}
					</div>
				)}
			</div>
			<Modal
				handleCloseModal={handleCloseModal}
				isModalAnimating={isModalAnimating}
				isModalVisible={isModalVisible}
			/>
		</div>
	)
}
