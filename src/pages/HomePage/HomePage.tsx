import styles from './HomePage.module.scss';

import { useCityForecastStore } from '../../data/cityForecast/store';

import CitySelect from '../../components/CitySelect/CitySelect';
import WelcomeInfo from './WelcomeInfo/WelcomeInfo';

export default function HomePage() {
	const { cityForecast } = useCityForecastStore();
	return (
		<div className={styles.homePage}>
			<div className={styles.window}>
				<CitySelect />
				<div className={styles.content}>
					{!cityForecast ? <WelcomeInfo /> : null}
				</div>
			</div>
		</div>
	);
}
