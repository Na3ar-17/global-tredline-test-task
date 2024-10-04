import { NextRequest, NextResponse } from 'next/server'
import { accessTokenName } from './types/auth.types'

export default function middleware(request: NextRequest) {
	const { url, cookies } = request
	const accessToken = cookies.get(accessTokenName)?.value

	const isLoginPage = url.includes('/login')
	const isBalancePage = url.includes('/balance')

	if (!accessToken && !isLoginPage) {
		return NextResponse.redirect(new URL('/login', url))
	}

	if (accessToken && !isBalancePage) {
		return NextResponse.redirect(new URL('/balance', url))
	}
}
export const config = {
	matcher: ['/', '/((?!_next|_vercel|.*\\..*).*)'],
}
