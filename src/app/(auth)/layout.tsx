export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main className='d-flex justify-content-center align-items-center vh-100'>
			{children}
		</main>
	)
}
