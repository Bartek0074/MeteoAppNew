import styles from './ForecastDay.module.scss';
import classNames from 'classnames';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

interface Props {
	currentDayIndex: number;
	activeDayIndex: number;
	setActiveDayIndex: (index: number) => void;
	day: any;
}

export default function ForecastDay({
	day,
	currentDayIndex,
	activeDayIndex,
	setActiveDayIndex,
}: Props) {
	const date = day?.dt_txt?.split(' ')[0];
	const hour = day?.dt_txt?.split(' ')[1].slice(0, 5);
	const icon = day?.weather[0].icon;
	const temp = Math.round(day?.main?.temp);

	const forecastDayClasses = classNames(styles.forecastDay, {
		[styles.forecastDayActive]: currentDayIndex === activeDayIndex,
	});

	return (
		<li
			onClick={() => setActiveDayIndex(currentDayIndex)}
			className={forecastDayClasses}
		>
			<p className={styles.forecastDayDate}>{date}</p>
			<p className={styles.forecastDayHour}>{hour}</p>
			<img
				className={styles.forecastDayIcon}
				src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
				alt='Forecast weather icon'
			></img>
			<p className={styles.forecastDayTemp}>{temp}°</p>
			{activeDayIndex === currentDayIndex ? (
				<IoIosArrowUp className={styles.icon} />
			) : (
				<IoIosArrowDown className={styles.icon} />
			)}
		</li>
	);
}
