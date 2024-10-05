import { BASE_URL } from '@/constants'
import { ILoginDto, ILoginResponse } from '@/types/login.types'
class AuthService {
	private URL = `${BASE_URL}/api/auth`

	async login(dto: ILoginDto): Promise<ILoginResponse> {
		try {
			const res = await fetch(`${this.URL}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(dto),
			})

			if (!res.ok) {
				throw new Error('Failed login')
			}

			return await res.json()
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}

export const authService = new AuthService()
