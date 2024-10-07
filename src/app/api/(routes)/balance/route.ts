import { Database } from '@/models/database'
import { IBalance, ICreateTopUpRequest } from '@/types/balance.types'
import { NextRequest, NextResponse } from 'next/server'
import { getUserIdByAccessToken } from '../../actions'

export async function GET(req: NextRequest) {
	try {
		const { userId } = getUserIdByAccessToken(req)
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
				id: topUpRequest.id,
			} as IBalance
		})

		return NextResponse.json(data)
	} catch (error) {
		console.log(error)
		return NextResponse.json({ message: 'Error' }, { status: 500 })
	}
}
export async function DELETE(req: NextRequest) {
	try {
		const data: { id: number } = await req.json()
		const deleted: boolean = await Database.topUpRequests.remove(data.id)

		return NextResponse.json({ deleted }, { status: deleted ? 200 : 404 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ message: 'Error' }, { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	try {
		const { userId } = getUserIdByAccessToken(req)
		const data: ICreateTopUpRequest = await req.json()
		const accounts = await Database.accounts.getAll()
		const userAccount = accounts.find(el => el.userId == userId)

		const newTopUpRequest = await Database.topUpRequests.add({
			accountId: userAccount?.id || 0,
			amount: data.amount,
			userId,
		})

		return NextResponse.json({ created: newTopUpRequest })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ message: 'Error' }, { status: 500 })
	}
}
