import { Metadata, ResolvingMetadata } from 'next'
 
export function generateMetadata({ title }: { title?: string }) {
	return {
		viewport: "initial-scale=1.0, width=device-width",
		description:  "700 West Recording, Mo Whittemore, Moe Whittemore, Zerfas, Primevil, Indiana 70's 80's",
		title,
	}
}

import Image from 'next/image';
import Link from 'next/link';

import '../styles/globals.css'
import Topper from '../components/Topper';
import SectionHeader from '../components/SectionHeader';

const links = [
	{ href: '/', text: 'Home' },
	{ href: '/news', text: 'News' },
	{ href: '/albums', text: 'Albums' },
	{ href: '/singles', text: 'Singles' },
	{ href: '/demos', text: 'Demos' },
	{ href: '/bands', text: 'Bands' },
	{ href: '/musicians', text: 'Musicians' },
	{ href: '/extras', text: 'Extras!' },
	{ href: '/equipment', text: 'Equipment' },
	{ href: '/photos', text: 'Photos' },
	{ href: '/listen', text: 'Listen!' },
	{ href: '/moe', text: 'Mo Whittemore' },
	{ href: '/tributes', text: 'Reminiscences' },
	{ href: '/memoriam', text: 'In Memoriam' },
	{ href: '/feedback', text: 'Comments' },
	{ href: '/contact', text: 'Contact Us' },
];

const getNavFromLink = (link) => links.find(l => l.href === `/${link}`)?.text || '/';

const Navigation = ({ link = '' }) => {
	return (
		<div className="nav">
			<div style={{ textAlign: 'center' }}>
				<Link href="/"><Image width="168" height="90" src={`/images/logoModern.gif`} alt="logo" /></Link>
			</div>
			<SectionHeader text="Choose" />
			<ul>
				{links.map(({ href, text, style }, i) => {
					const X = (href === `/${link}`) ? 'navActive' : 'navInactive';
					return (
						<li key={i}>
							<span className={X} style={style}></span><Link href={href}>{text}</Link>
						</li>
					)
				})}
			</ul>
		</div>
	);
}

export const Page = ({
	title,
	link,
  children,
	description
}: {
	title: string
	link: string
	description: string
  children: React.ReactNode
}) => {
	generateMetadata({
		viewport: "initial-scale=1.0, width=device-width",
		description: "700 West Recording, Mo Whittemore, Moe Whittemore, Zerfas, Primevil, Indiana 70's 80's",
		title
	})
	return (<div className='container'>
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
	</div>)
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
