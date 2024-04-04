import styles from './Weather.module.scss';
import classNames from 'classnames';

import { useState } from 'react';

import ForecastDay from '../ForecastDay/ForecastDay';

import { useCityStore } from '../../data/city/store';

export default function Weather() {
	const { cityWeather } = useCityStore();

	const temp = cityWeather.main.temp.toFixed(0);
	const feelTemp = cityWeather.main.feels_like.toFixed(0);
	const icon = cityWeather.weather[0].icon;
	const description = cityWeather.weather[0].description;
	const pressure = cityWeather.main.pressure;
	const wind = cityWeather.wind.speed.toFixed(1);
	const humidity = cityWeather.main.humidity;

	return (
		<div className={styles.weather}>
			<ul className={styles.weatherInfos}>
				<li className={styles.tempInfo}>
					<div className={styles.temp}>{temp}°</div>
					<div className={styles.feelTemp}>
						<span className={styles.feelTempLabel}>feels like:</span>
						<span className={styles.feelTempValue}>{feelTemp}°C</span>
					</div>
				</li>
				<li className={styles.imageInfo}>
					<img
						className={styles.image}
						src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
						alt='Current weather icon'
					></img>
					<p className={styles.imageDescription}>{description}</p>
				</li>
				<li className={styles.info}>
					<span className={styles.infoLabel}>Wind</span>
					<span className={styles.infoValue}>{wind} m/s</span>
				</li>
				<li className={styles.info}>
					<span className={styles.infoLabel}>Pressure</span>
					<span className={styles.infoValue}>{pressure} hPa</span>
				</li>
				<li className={styles.info}>
					<span className={styles.infoLabel}>Humidity</span>
					<span className={styles.infoValue}>{humidity}%</span>
				</li>
			</ul>
		</div>
	);
}
