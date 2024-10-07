import { accessTokenName } from '@/types/auth.types'
import { decode, JwtPayload } from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export const getUserIdByAccessToken = async (req: NextRequest) => {
	'use server'
	const accessToken = await req.cookies.get(accessTokenName)?.value
	if (!accessToken) throw new Error('Unauthorized')

	const decoded = decode(accessToken) as JwtPayload | null
	if (!decoded || typeof decoded === 'string' || !decoded.id) {
		throw new Error('Invalid token')
	}

	return { userId: decoded.id }
}
