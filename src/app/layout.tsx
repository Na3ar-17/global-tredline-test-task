import 'bootstrap/dist/css/bootstrap.min.css'
import { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'Global Tredline',
}
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html data-bs-theme='dark' lang='en'>
			<body suppressContentEditableWarning suppressHydrationWarning>
				{children}
			</body>
		</html>
	)
}
