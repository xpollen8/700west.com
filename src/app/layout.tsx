import { Metadata } from 'next'
import '../styles/globals.css'
 
export const metadata: Metadata = {
	viewport: {
		initialScale: 1.0,
		width: 'device-width',
	},
	description: "Curated archive of Mo WHittemore's 700 West Recording studio",
	keywords: [
		"700 West", "Mo Whittemore", "Moe Whittemore", "Zerfas", "Primevil", "Indiana music", "70's & 80's"
	],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
		<html>
			<body>
				{children}
			</body>
    </html>
  )
}
