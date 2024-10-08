import { JWT_SECRET } from '@/constants'
import { Database } from '@/models/database'
import { ILoginDto } from '@/types/login.types'
import { sign } from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const { email, password }: ILoginDto = await req.json()

		if (!email.length || !password.length)
			return NextResponse.json({ message: 'Dto is empty' }, { status: 400 })

		const user = await Database.users.getByEmail(email)

		if (!user) {
			return NextResponse.json(
				{ error: 'User not found' },
				{
					status: 404,
				}
			)
		}

		if (password !== user.password) {
			return NextResponse.json(
				{ error: 'Invalid email or password' },
				{
					status: 404,
				}
			)
		}

		const accessToken = sign({ id: user.id }, JWT_SECRET, {
			expiresIn: '1h',
		})

		return NextResponse.json({ email: user.email, accessToken })
	} catch (error) {
		console.log(error)
	}
}
