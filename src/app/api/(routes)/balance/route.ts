import { Database } from '@/models/database'
import { accessTokenName } from '@/types/auth.types'
import { decode, JwtPayload } from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	try {
		const accessToken = req.cookies.get(accessTokenName)?.value
		if (!accessToken) throw new Error('Unauthorized')

		const decoded = decode(accessToken) as JwtPayload | null
		if (!decoded || typeof decoded === 'string' || !decoded.id) {
			throw new Error('Invalid token')
		}
		const userId = decoded.id
		const topUpRequests = Database.topUpRequests
			.getAll()
			.filter(el => el.userId === userId)

		const data = topUpRequests.map(topUpRequest => {
			const user = Database.users.getById(topUpRequest.userId)
			const account = Database.accounts.getById(topUpRequest.userId)

			return {
				createDate: topUpRequest.createDate,
				email: user?.email,
				tfAccountId: account?.tfAccountId,
				amount: topUpRequest.amount,
			}
		})

		return NextResponse.json(data)
	} catch (error) {
		console.log(error)
		return NextResponse.json({ message: 'Error' }, { status: 500 })
	}
}
