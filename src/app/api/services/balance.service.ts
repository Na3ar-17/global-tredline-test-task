import { BASE_URL } from '@/constants'
import { IBalance, IDeleteBalanceResponse } from '@/types/balance.types'

class BalanceService {
	private URL = `${BASE_URL}/api/balance`

	async getAll(): Promise<IBalance[]> {
		try {
			const res = await fetch(this.URL, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			if (!res.ok) {
				throw new Error('Failed request')
			}

			return await res.json()
		} catch (error) {
			throw error
		}
	}
	async delete(id: number): Promise<IDeleteBalanceResponse> {
		try {
			const res = await fetch(this.URL, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id }),
			})

			if (!res.ok) {
				throw new Error('Failed request')
			}

			return await res.json()
		} catch (error) {
			throw error
		}
	}
}

export const balanceService = new BalanceService()
