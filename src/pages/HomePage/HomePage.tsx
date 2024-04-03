import styles from './HomePage.module.scss';

import { useState } from 'react';

import { useCityForecastStore } from '../../data/cityForecast/store';

import Map from './Map/Map';
import CitySelect from '../../components/CitySelect/CitySelect';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Separator from './Separator/Separator';

export default function HomePage() {
	const { cityForecast, cityName } = useCityForecastStore();

	const [fetching, setFetching] = useState(false);

	console.log(cityForecast);

	return (
		<div className={styles.homePage}>
			<div className={styles.window}>
				<h1 className={styles.title}>
					Welcome to <strong>Meteo App</strong>!
				</h1>
				<Separator />
				<p className={styles.mapTitle}>
					Current weather in <strong>Poland</strong>:
				</p>
				<div className={styles.map}>
					<Map setFetching={setFetching} />
				</div>
				<Separator />
				<div className={styles.select}>
					<CitySelect width={'75%'} setFetching={setFetching} />
				</div>
				<div className={styles.forecast} id='forecast'>
					{fetching ? (
						<div className={styles.loading}>
							<LoadingSpinner text='Loading...' />
						</div>
					) : (
						<div className={styles.content}>
							<p className={styles.forecastTitle}>
								{cityForecast
									? `Forecast for ${cityName}:`
									: 'Choose a location on the bar above to see the forecast or click on a city on the map.'}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
