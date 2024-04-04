import styles from './Forecast.module.scss';
import classNames from 'classnames';

import { useState } from 'react';

import ForecastDay from '../ForecastDay/ForecastDay';

import { useCityStore } from '../../data/city/store';

export default function Forecast() {
	const { cityForecast } = useCityStore();

	const [activeDayIndex, setActiveDayIndex] = useState(0);

	const temp = cityForecast?.list?.[activeDayIndex]?.main?.temp?.toFixed(0);

	const tempFelt =
		cityForecast?.list?.[activeDayIndex]?.main?.feels_like?.toFixed(0);

	let rain;
	if (typeof cityForecast?.list[activeDayIndex]?.rain !== 'undefined')
		rain = cityForecast?.list[activeDayIndex].rain['3h'].toFixed(1);

	let snow;
	if (typeof cityForecast?.list[activeDayIndex]?.snow !== 'undefined')
		snow = cityForecast?.list[activeDayIndex].snow['3h'].toFixed(1);

	const wind = cityForecast?.list[activeDayIndex].wind.speed.toFixed(1);
	const pressure = cityForecast?.list[activeDayIndex].main.pressure;
	const humidity = cityForecast?.list[activeDayIndex].main.humidity;
	const cloudiness = cityForecast?.list[activeDayIndex].clouds.all;

	return (
		<div className={styles.forecast}>
			<div className={styles.days}>
				{cityForecast?.list?.map((day: any, index: number) => {
					return (
						<ForecastDay
							key={index}
							day={day}
							currentDayIndex={index}
							activeDayIndex={activeDayIndex}
							setActiveDayIndex={setActiveDayIndex}
						/>
					);
				})}
			</div>
			{activeDayIndex != null && (
				<ul className={styles.infos}>
					<li className={styles.info}>
						<p className={styles.infoLabel}>Temperature</p>
						<p className={styles.infoValue}>{temp}°C</p>
					</li>
					<li className={styles.info}>
						<p className={styles.infoLabel}>Temperature felt</p>
						<p className={styles.infoValue}>{tempFelt}°C</p>
					</li>
					<li className={styles.info}>
						<p className={styles.infoLabel}>Rain</p>
						<p className={styles.infoValue}>{rain ? rain : '0.0'} mm</p>
					</li>
					<li className={styles.info}>
						<p className={styles.infoLabel}>Snow</p>
						<p className={styles.infoValue}>{snow ? snow : '0.0'} mm</p>
					</li>
					<li className={styles.info}>
						<p className={styles.infoLabel}>Wind</p>
						<p className={styles.infoValue}>{wind} m/s</p>
					</li>
					<li className={styles.info}>
						<p className={styles.infoLabel}>Pressure</p>
						<p className={styles.infoValue}>{pressure} hPa</p>
					</li>
					<li className={styles.info}>
						<p className={styles.infoLabel}>Humidity</p>
						<p className={styles.infoValue}>{humidity}%</p>
					</li>
					<li className={styles.info}>
						<p className={styles.infoLabel}>Cloudiness</p>
						<p className={styles.infoValue}>{cloudiness}%</p>
					</li>
				</ul>
			)}
		</div>
	);
}
