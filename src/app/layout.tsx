import Image from 'next/image';
import Link from 'next/link';

import '../styles/globals.css'
import Topper from '../components/Topper';
import SectionHeader from '../components/SectionHeader';

import { Metadata } from 'next'
 
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

const links: any  = {
	'/': 'Home',
	'/news': 'News',
	'/albums': 'Albums',
	'/singles': 'Singles',
	'/demos': 'Demos',
	'/bands': 'Bands',
	'/musicians': 'Musicians',
	'/extras': 'Extras!',
	'/equipment': 'Equipment',
	'/photos': 'Photos',
	'/listen': 'Listen!',
	'/mo': 'Mo Whittemore',
	'/tributes': 'Tributes',
	'/memoriam': 'In Memoriam',
	'/feedback': 'Comments',
	'/contact': 'Contact Us',
}

export const setTitle = (title: string): Metadata => ({
		viewport: {
			initialScale: 1.0,
			width: 'device-width',
		},
		description: "Curated archive of Mo WHittemore's 700 West Recording studio",
		keywords: [
			"700 West", "Mo Whittemore", "Moe Whittemore", "Zerfas", "Primevil", "Indiana music", "70's & 80's"
		],
		title
})

export const setTitleFromURL = (url: string): Metadata => setTitle(links[url] || 'Welcome');

const Navigation = ({ link = '' }) => (
	<div className="nav">
		<div style={{ textAlign: 'center' }}>
			<Link href="/"><Image width="168" height="90" src={`/images/logoModern.gif`} alt="logo" /></Link>
		</div>
		<SectionHeader text="Choose" />
		<ul>
			{Object.keys(links).map((k, i) => {
				const cls = (k === `/${link}`) ? 'navActive' : 'navInactive';
				return (
					<li key={i}>
						<span className={cls}></span><Link href={k}>{links[k]}</Link>
					</li>
				)
			})}
		</ul>
	</div>
)

export const Page = ({
	title,
	link,
  children,
	description
}: {
	title?: any
	link?: string
	description?: string
  children?: React.ReactNode
}) => {
	const getNavFromLink = (link?: string) => links[link || '/'];

	return (
		<div className='container'>
			<div>
				<Topper className="navTopper" text={title || getNavFromLink(link)}/>
				<Navigation link={link} />
			</div>
			<div>
				<Topper className="mainTopper" text={description}/>
				<div className='main'>
					{children}
				</div>
			</div>
		</div>
	)
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
