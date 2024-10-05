import { balanceService } from '@/app/api/services/balance.service'
import { IBalance } from '@/types/balance.types'
import { useEffect, useState } from 'react'

export const useBalance = () => {
	const [data, setData] = useState<IBalance[] | undefined>(undefined)
	const [isLoading, setIsLoading] = useState(false)

	const handleGetBalance = async () => {
		setIsLoading(true)
		try {
			const data = await balanceService.getAll()

			setData(data)
		} catch (error) {
			console.log(error)
		}
		setIsLoading(false)
	}

	useEffect(() => {
		handleGetBalance()
	}, [])
	return { data, isLoading }
}
