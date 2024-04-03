import styles from './Map.module.scss';
import classNames from 'classnames';

import { useEffect, useState } from 'react';

import { CityWeather } from '../../../data/cities/types';
import { useCitiesStore } from '../../../data/cities/store';
import { useCityForecastStore } from '../../../data/cityForecast/store';

import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';

type Props = { setFetching?: (fetching: boolean) => void };

export default function Map({ setFetching }: Props) {
	const { cities, fetchCities } = useCitiesStore();
	const { fetchCityForecast, setCityName } = useCityForecastStore();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchCities().then(() => {
			setTimeout(() => {
				setLoading(false);
			}, 250);
		});
	}, []);

	const onCityClick = async (city: CityWeather) => {
		const forecastEl = document.getElementById('forecast');
		if (forecastEl) {
			forecastEl.scrollIntoView({ behavior: 'smooth' });
		}

		setFetching && setFetching(true);
		setCityName(city.namePl);
		try {
			fetchCityForecast({ lat: city.lat, lng: city.lng });
		} catch (error) {
			console.log(error);
		} finally {
			setTimeout(() => {
				setFetching && setFetching(false);
			}, 350);
		}
	};

	return (
		<div
			className={styles.map}
			style={{
				backgroundImage: 'url(./images/pl_map.svg)',
			}}
		>
			{loading ? (
				<div className={styles.loading}>
					<LoadingSpinner text='Loading...' />
				</div>
			) : (
				<>
					{cities.map((city, index) => {
						const cityClassNames = classNames(styles.city, styles[city.name]);
						return (
							<div key={index} className={cityClassNames}>
								<img
									src={`https://openweathermap.org/img/wn/${city.weather.weather[0].icon}@2x.png`}
									alt='Weather icon'
								/>
								<p className={styles.temp}>
									{Math.round(city.weather?.main?.temp)}
								</p>
								<p
									className={styles.cityName}
									onClick={() => onCityClick(city)}
								>
									{city.namePl}
								</p>
							</div>
						);
					})}
				</>
			)}
		</div>
	);
}
