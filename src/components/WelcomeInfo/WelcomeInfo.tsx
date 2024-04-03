import styles from './WelcomeInfo.module.scss';
import {
	SiReact,
	SiTypescript,
	SiSass,
	SiReactrouter,
	SiRedux,
	SiGooglemaps,
	SiIcloud,
} from 'react-icons/si';

const technologies = [
	{ name: 'React', icon: <SiReact className={styles.icon} /> },
	{ name: 'TypeScript', icon: <SiTypescript className={styles.icon} /> },
	{ name: 'SCSS', icon: <SiSass className={styles.icon} /> },
	{ name: 'React Router', icon: <SiReactrouter className={styles.icon} /> },
	{ name: 'Zustand', icon: <SiRedux className={styles.icon} /> },
];

const apis = [
	{ name: 'Google Places API', icon: <SiGooglemaps className={styles.icon} /> },
	{ name: 'OpenWeatherMap API', icon: <SiIcloud className={styles.icon} /> },
];

export default function WelcomeInfo() {
	return (
		<div className={styles.welcomeInfo}>
			<p className={styles.welcomeTitle}>
				Welcome to my <strong>Meteo App</strong>!
			</p>
			<p className={styles.welcomeText}>
				To get started, search for a location in the search bar above.
			</p>
			<div className={styles.technologyList}>
				<p>Packages used in this app:</p>
				<ul>
					{technologies.map((technology) => (
						<li key={technology.name}>
							{technology.icon}-<span>{technology.name}</span>
						</li>
					))}
				</ul>
			</div>
			<div className={styles.apiList}>
				<p>APIs used in this app:</p>
				<ul>
					{apis.map((api) => (
						<li key={api.name}>
							{api.icon}-<span>{api.name}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
