'use client'
import { balanceService } from '@/app/api/services/balance.service'
import { IBalance } from '@/types/balance.types'
import { NextPage } from 'next'

interface IProps {
	data: IBalance
}

export const Item: NextPage<IProps> = ({ data }) => {
	const { amount, createDate, email, tfAccountId, id } = data
	const handleDelete = async (id: number) => {
		try {
			const { deleted } = await balanceService.delete(id)
			if (deleted) window.location.reload()
		} catch (error) {
			throw error
		}
	}
	return (
		<li className='list-group-item bg-dark text-white'>
			<div className='d-flex justify-content-between align-items-center'>
				<div className='d-flex gap-4 justify-content-between w-80'>
					<p className='mb-1'>
						Date:
						<span className='text-muted'>
							{new Date(createDate).toLocaleDateString()}
						</span>
					</p>
					<p className='mb-1'>
						User: <span className='text-muted'>{email}</span>
					</p>
					<p className='mb-1'>
						Account ID: <span className='text-muted'>{tfAccountId}</span>
					</p>
					<p className='mb-1'>
						Amount: <span className='text-muted'>${amount}</span>
					</p>
				</div>
				<button
					onClick={() => handleDelete(id)}
					className='btn btn-danger btn-sm'
				>
					Delete
				</button>
			</div>
		</li>
	)
}
