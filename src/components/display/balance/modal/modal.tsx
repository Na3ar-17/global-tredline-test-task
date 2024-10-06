import { balanceService } from '@/app/api/services/balance.service'
import { NextPage } from 'next'
import { ChangeEvent, FormEvent, useState } from 'react'

interface IProps {
	isModalVisible: boolean
	isModalAnimating: boolean
	handleCloseModal: () => void
}

export const Modal: NextPage<IProps> = ({
	isModalAnimating,
	isModalVisible,
	handleCloseModal,
}) => {
	const [amount, setAmount] = useState<string>('')
	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!Number(amount)) return

		balanceService.create({ amount: +amount }).then(({ created }) => {
			if (created) {
				handleCloseModal()
				window.location.reload()
			}
		})
	}

	return (
		<div>
			<div
				className={`modal fade ${isModalVisible ? 'd-block' : 'd-none'} ${
					isModalAnimating ? 'show' : ''
				}`}
				tabIndex={-1}
				role='dialog'
			>
				<div className='modal-dialog' role='document'>
					<form className='modal-content' onSubmit={onSubmit}>
						<div className='modal-header'>
							<h5 className='modal-title'>Add New Item</h5>
						</div>
						<div className='modal-body'>
							<div className='form-group'>
								<label htmlFor='amount'>Enter Amount</label>
								<input
									value={amount}
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										setAmount(e.target.value)
									}
									type='number'
									id='amount'
									className='form-control'
								/>
							</div>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-secondary'
								onClick={handleCloseModal}
							>
								Close
							</button>
							<button type='submit' className='btn btn-primary'>
								Save changes
							</button>
						</div>
					</form>
				</div>
			</div>

			<div
				className={`modal-backdrop fade ${isModalAnimating ? 'show' : ''}`}
				style={isModalVisible ? { display: 'block' } : { display: 'none' }}
			></div>
		</div>
	)
}
