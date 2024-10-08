import { BASE_URL } from '@/constants'
import {
	IBalance,
	ICreateTopUpRequest,
	ICreateTopUpRequestResponse,
	IDeleteTopUpRequest,
} from '@/types/balance.types'
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
	async delete(id: number): Promise<IDeleteTopUpRequest> {
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

	async create(dto: ICreateTopUpRequest): Promise<ICreateTopUpRequestResponse> {
		try {
			const res = await fetch(this.URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(dto),
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
