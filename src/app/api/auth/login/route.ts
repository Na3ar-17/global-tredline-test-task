import { ILoginDto } from '@/types/login.types'

export async function POST(req: Request) {
	const { email, password }: ILoginDto = await req.json()

	return Response.json({ email, password })
}
