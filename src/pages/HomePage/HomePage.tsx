import styles from './HomePage.module.scss';

import CitySelect from '../../components/CitySelect/CitySelect';

export default function HomePage() {
	return (
		<div className={styles.homePage}>
			<div className={styles.window}>
				<CitySelect />
			</div>
		</div>
	);
}
