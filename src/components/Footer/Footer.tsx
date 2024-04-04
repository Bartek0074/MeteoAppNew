import React from 'react';
import styles from './Footer.module.scss';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<p>&copy; {currentYear} by Bartosz Stępniak | </p>
			<div className={styles.link}>
				<a
					href='https://github.com/Bartek0074/MeteoAppNew'
					target='_blank'
					rel='noopener noreferrer'
				>
					<FaGithub className={styles.icon} />
				</a>
			</div>
		</footer>
	);
}
