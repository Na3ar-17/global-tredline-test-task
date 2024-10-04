import { Navbar } from '@/components/common/navbar/navbar'

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main>
			<Navbar />
			{children}
		</main>
	)
}
