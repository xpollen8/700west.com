import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

import Topper from './Topper';
import SectionHeader from './SectionHeader';

const links: any  = {
	'/': [ 'Home', '700 West Recording!' ],
	'/news': [ 'News', '700 West News and Updates' ],
	'/albums': [ 'Albums', 'The Albums' , 'Releases'],
	'/singles': [ 'Singles', 'The Singles', 'Releases' ],
	'/demos': [ 'Demos', 'The Demos' , 'Unreleased'],
	'/bands': [ 'Bands', 'The Bands' ],
	'/musicians': [ 'Musicians', 'The Musicians' ],
	'/extras': [ 'Extras', 'Reviews and Other Auxiliary Materials' ],
	'/equipment': [ 'Equipment', 'Equipment used at 700 West Recording' ],
	'/photos': [ 'Photos', 'Period Studio Photographs' ],
	'/listen': [ 'Listen!', 'Give a few tunes a spin' ],
	'/mo': [ 'Mo', 'The Resume of Maurice J. Whittemore, Jr., 700 West Engineer' ],
	'/tributes': [ 'Tributes', 'Recording artists share..' ],
	'/memoriam': [ 'Memoriam', 'In Memoriam' ],
	'/feedback': [ 'Comments', 'Comments left by 700west.com visitors' ],
	'/contact': [ "Contact Us", "We'd love to hear from you!" ],
}

export const setTitle = (title: string): Metadata => ({
		/*
		viewport: {
			initialScale: 1.0,
			width: 'device-width',
		},
		*/
		description: "Curated archive of Mo WHittemore's 700 West Recording studio",
		keywords: [
			"700 West", "Mo Whittemore", "Moe Whittemore", "Zerfas", "Primevil", "Indiana music", "70's & 80's"
		],
		title
})

export const setTitleFromURL = (url: string): Metadata => setTitle(links[url][0] || 'Welcome');

const Navigation = ({ link = '' }) => (
	<div className="nav">
		<div style={{ textAlign: 'center', marginTop: '6px', marginBottom: '2px' }}>
			<Link href="/"><Image width="168" height="90" src="https://700west.com/images/logoModern.gif" alt="logo" /></Link>
		</div>
		<SectionHeader text="Choose" />
		<ul>
			{Object.keys(links).map((k, i) => {
				const cls = (k === link) ? 'navActive' : 'navInactive';
				return (
					<li key={i}>
						<span className={cls}></span><Link href={k}>{links[k][0]}</Link>
					</li>
				)
			})}
		</ul>
	</div>
)

const Page = ({
	link,
	title,
	description,
  children,
}: {
	link: string
	title?: any
	description?: string
  children?: React.ReactNode
}) => {
	const [ titleFromSplit, descriptionFromSplit, sectionFromSplit ] = links[link];

	return (
		<div className='container'>
			<div>
				<Topper className="navTopper" text={sectionFromSplit || titleFromSplit}/>
				<Navigation link={link} />
			</div>
			<div>
				<Topper className="mainTopper" text={description || descriptionFromSplit}/>
				<div className='main'>
					{children}
				</div>
			</div>
		</div>
	)
}

export default Page;
