import styles from './HomePage.module.scss';

import { useState } from 'react';

import { useCityStore } from '../../data/city/store';

import Map from '../../components/Map/Map';
import CitySelect from '../../components/CitySelect/CitySelect';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Separator from '../../components/Separator/Separator';
import Forecast from '../../components/Forecast/Forecast';

export default function HomePage() {
	const { cityForecast, cityName } = useCityStore();

	const [fetching, setFetching] = useState(false);

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
									: 'Search for a location or click on a city on the map to see the forecast.'}
							</p>
							{cityForecast ? <Forecast /> : null}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
