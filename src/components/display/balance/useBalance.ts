import { balanceService } from '@/app/api/services/balance.service'
import { IBalance } from '@/types/balance.types'
import { useEffect, useState } from 'react'

export const useBalance = () => {
	const [data, setData] = useState<IBalance[] | undefined>(undefined)
	const [isLoading, setIsLoading] = useState(false)

	const handleGetTopUpRequests = async () => {
		setIsLoading(true)
		try {
			const data = await balanceService.getAll()
			if (data) setData(data)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (data) setData(data)
	}, [data])

	useEffect(() => {
		handleGetTopUpRequests()
	}, [])
	return { data, isLoading }
}
