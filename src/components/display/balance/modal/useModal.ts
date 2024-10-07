import { balanceService } from '@/app/api/services/balance.service'
import { FormEvent, useState } from 'react'

export const useModal = (onClose: () => void) => {
	const [amount, setAmount] = useState<string>('')

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!Number(amount)) return

		try {
			const { created } = await balanceService.create({ amount: +amount })
			if (created) {
				onClose()
				window.location.reload()
			}
		} catch (error) {
			throw error
		}
	}
	return { setAmount, onSubmit, amount }
}
