import { Database } from '@/models/database'
import { accessTokenName } from '@/types/auth.types'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	try {
		const accessToken = req.cookies.get(accessTokenName)?.value
		if (!accessToken) throw new Error('Unauthorized')

		const topUpRequests = Database.topUpRequests.getAll()

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
		return NextResponse.json({ message: 'An error occurred' }, { status: 500 })
	}
}
