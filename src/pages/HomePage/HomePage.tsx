import styles from './HomePage.module.scss';

import { useState, useEffect } from 'react';

import { useCityForecastStore } from '../../data/cityForecast/store';

import CitySelect from '../../components/CitySelect/CitySelect';
import WelcomeInfo from './WelcomeInfo/WelcomeInfo';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

export default function HomePage() {
	const { cityForecast } = useCityForecastStore();

	const [loading, setLoading] = useState(false);
	const [cityName, setCityName] = useState('');

	return (
		<div className={styles.homePage}>
			<div className={styles.window}>
				<CitySelect setLoading={setLoading} setCityName={setCityName} />
				{loading ? (
					<div className={styles.loading}>
						<LoadingSpinner text='Loading...' />
					</div>
				) : (
					<div className={styles.content}>
						{cityForecast ? <p>{cityName}</p> : <WelcomeInfo />}
					</div>
				)}
			</div>
		</div>
	);
}
