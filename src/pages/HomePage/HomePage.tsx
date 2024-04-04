import styles from './HomePage.module.scss';

import { useState } from 'react';

import { useCityStore } from '../../data/city/store';

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Separator from '../../components/Separator/Separator';
import CitySelect from '../../components/CitySelect/CitySelect';
import Map from '../../components/Map/Map';
import Forecast from '../../components/Forecast/Forecast';
import Weather from '../../components/Weather/Weather';
import TempChart from '../../components/TempChart/TempChart';

import { BsSearch } from 'react-icons/bs';

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
				<p className={styles.subtitle}>
					Current weather in <strong>Poland</strong>:
				</p>
				<div className={styles.map}>
					<Map setFetching={setFetching} />
				</div>
				<Separator />
				<div className={styles.select}>
					<CitySelect width={'75%'} setFetching={setFetching} />
				</div>
				<div className={styles.content} id='content'>
					{fetching ? (
						<div className={styles.loading}>
							<LoadingSpinner text='Loading...' />
						</div>
					) : (
						<>
							{cityForecast ? (
								<>
									<p className={styles.cityTitle}>
										Results for: <strong>{cityName}</strong>
									</p>
									<Separator />
									<div className={styles.component}>
										<p className={styles.componentTitle}>Current weather</p>
										<Weather />
									</div>
									<Separator />
									<div className={styles.component}>
										<p className={styles.componentTitle}>Weather forecast</p>
										<Forecast />
									</div>
									<Separator />
									<div className={styles.component}>
										<p className={styles.componentTitle}>Temperature chart</p>
										<TempChart />
									</div>
								</>
							) : (
								<div className={styles.searchInfo}>
									<BsSearch className={styles.icon} />
									<p className={styles.paragraph}>
										Search for a location to display weather information.
									</p>
									<p className={styles.paragraph}>
										You can also click on the map to display weather information
										for a city from the map.
									</p>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
