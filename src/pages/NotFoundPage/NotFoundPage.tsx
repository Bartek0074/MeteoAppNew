import styles from './NotFoundPage.module.scss';

import { useNavigate } from 'react-router-dom';

import { FaExclamationTriangle } from 'react-icons/fa';

export default function NotFoundPage() {
	const navigate = useNavigate();

	const handleHomeClick = () => {
		navigate('/');
	};
	return (
		<div className={styles.notFoundPage}>
			<FaExclamationTriangle className={styles.icon} />
			<h1>404 - Page not found</h1>
			<p>The page you are looking for does not exist.</p>
			<button onClick={handleHomeClick}>Home Page</button>
		</div>
	);
}
