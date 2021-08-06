import '../styles/globals.css'
import Head from 'next/head';
import Image from 'next/image';

const Topper = ({ className, text }) => <div className={className}>&lt;&lt; {text} &gt;&gt;</div>

const SectionHeader = ({ text }) => Topper({ className: "sectionHeader", text })

const links = [
	{ href: '/', text: 'Home' },
	{ href: '/news', text: 'News' },
	{ href: '/albums', text: 'Albums' },
	{ href: '/singles', text: 'Singles' },
	{ href: '/extras', text: 'Extras!' },
	{ href: '/equipment', text: 'Equipment' },
	{ href: '/photos', text: 'Photos' },
	{ href: '/listen', text: 'Listen!' },
	{ href: '/moe', text: 'Moe Whittemore' },
	{ href: '/tributes', text: 'Tributes' },
	{ href: '/memoriam', text: 'In Memoriam' },
	// NOT YET { href: '/feedback', text: 'Comments' },
	{ href: '/contact', text: 'Contact Us' },
];

const getNavFromLink = (link) => links.find(l => l.href === `/${link}`).text || '/';

const Navigation = ({ link = '' }) => {
	return (
		<div className="nav">
			<div style={{ textAlign: 'center' }}>
				<a href="/"><Image width="168" height="90" src={`/images/logoModern.gif`} alt="logo" /></a>
			</div>
			<SectionHeader text="Choose" />
			<ul>
				{links.map(({ href, text, style }, i) => {
					const X = (href === `/${link}`) ? 'navActive' : 'navInactive';
					return (
						<li key={i}>
							<span className={X} style={style}></span><a href={href}>{text}</a>
						</li>
					)
				})}
			</ul>
		</div>
	);
}

const Page = (props) => (
	<>
	<Head>
		<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		<title> {props.title} </title>
	</Head>
	<div className='container'>
		<div>
		<Topper className="navTopper" text={props.title || getNavFromLink(props.link)}/>
		<Navigation link={props.link} />
		</div>
		<div>
		<Topper className="mainTopper" text={props.description}/>
		<div className='main'>
			{props.children}
		</div>
		</div>
	</div>
	</>
);

const MyApp = ({ Component, pageProps }) => (
	<div className='centerWrapper'>
		<Component {...pageProps} />
	</div>
);

export default MyApp;
export { SectionHeader, Page };
