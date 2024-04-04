import styles from './TempChart.module.scss';

import { useState, useEffect } from 'react';

import { useCityStore } from '../../data/city/store';

import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Tooltip,
} from 'chart.js';

import getWindowDimensions from '../../utils/getWindowDimensions';
import { colors } from '../../utils/colors';

ChartJS.register(
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Tooltip
);

export default function TempChart() {
	const { cityForecast } = useCityStore();

	const tempArr: number[] = cityForecast?.list?.map((data: any) =>
		Number(data.main.temp.toFixed(1))
	);
	const dates: number[] = cityForecast?.list?.map((data: any) =>
		data.dt_txt.slice(0, 16)
	);

	const [windowDimensions, setWindowDimensions] = useState<{
		width: number;
		height: number;
	}>(getWindowDimensions());

	const [tempData, setTempData] = useState<any>({
		labels: dates,
		datasets: [
			{
				data: tempArr,
			},
		],
	});

	const [fontSize, setFontSize] = useState<number>(12);

	const [options, setOptions] = useState<any>(null);

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());

			if (windowDimensions.width < 576) setFontSize(9);
			else setFontSize(12);
		}

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, [windowDimensions]);

	useEffect(() => {
		setTempData({
			labels: dates,
			datasets: [
				{
					label: 'Temperature',
					data: tempArr,
					fill: false,
					borderWidth: 3,
					lineTension: 0.4,
					borderColor: colors.primary,
					backgroundColor: colors.primary,
					pointBorderColor: colors.primaryAlpha,
					pointHoverRadius: 5,
					pointHoverBorderWidth: 0,
					pointRadius: 0,
					pointHitRadius: 10,
				},
			],
		});

		setOptions({
			maintainAspectRatio: false,
			plugins: {
				tooltip: {
					displayColors: false,
					backgroundColor: colors.primaryAlhpaSecond,
					titleFont: { weight: 'normal' },
					titleAlign: 'center',
					bodyAign: 'center',
					callbacks: {
						label: function (context: any) {
							let label = context.dataset.label || '';

							if (label) {
								label += ': ';
							}
							if (context.parsed.y !== null) {
								label += context.parsed.y + '°C';
							}
							return label;
						},
					},
				},
			},
			scales: {
				y: {
					min: Number(Math.min(...tempArr).toFixed(0)) - 5,
					max: Number(Math.max(...tempArr).toFixed(0)) + 5,

					ticks: {
						font: {
							size: fontSize,
						},
						callback: function (value: any, index: number, ticks: any) {
							return value + '°C';
						},
					},
				},
				x: {
					ticks: {
						font: {
							size: fontSize,
						},
						autoSkipPadding: 20,
						maxRotation: 80,
						minRotation: 70,
					},
				},
			},
		});
	}, [cityForecast, fontSize]);

	return (
		<div className={styles.tempChart}>
			<Line className={styles.line} data={tempData} options={options} />
		</div>
	);
}
