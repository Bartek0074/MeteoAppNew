import styles from './CitySelect.module.scss';

import { useState, useEffect } from 'react';

import { useCityForecastStore } from '../../data/cityForecast/store';

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Option } from 'react-google-places-autocomplete/build/types';

import { colors } from '../../utils/colors';

type Props = {
	setLoading?: (loading: boolean) => void;
	setCityName?: (cityName: string) => void;
	width?: number | string;
};

export default function CitySelect({
	setLoading,
	setCityName,
	width = 'auto',
}: Props) {
	const [value, setValue] = useState<Option | null>(null);

	const { fetchCityForecast } = useCityForecastStore();

	useEffect(() => {
		if (!value) return;
		setCityName && setCityName(value.label);

		try {
			fetchCityForecast(value);
		} catch (error) {
			console.log(error);
		} finally {
			setTimeout(() => {
				setLoading && setLoading(false);
			}, 350);
		}
	}, [value]);

	return (
		<div
			className={styles.googlePlacesAutocompleteWrapper}
			style={{
				width: width,
			}}
		>
			<GooglePlacesAutocomplete
				apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
				selectProps={{
					value,
					onChange: (e) => {
						setLoading && setLoading(true);
						setValue(e);
					},
					placeholder: 'Search for a location...',
					styles: {
						control: (provided) => ({
							...provided,
							backgroundColor: 'transparent',
							outline: 'none',
							border: `1px solid ${colors.dirtyWhite}`,
							boxShadow: 'none',
							':hover': {
								boxShadow: 'none',
								border: `1px solid ${colors.primary}`,
							},
							':focus': {
								border: `1px solid ${colors.primary}`,
							},
						}),
						menu: (provided) => ({
							...provided,
							backgroundColor: colors.window,
						}),
						option: (provided) => ({
							...provided,
							transition: 'background-color 0.2s',
							':hover': {
								backgroundColor: colors.primaryAlpha,
							},
						}),
						loadingIndicator: (provided) => ({
							...provided,
							color: colors.primary,
						}),
						indicatorSeparator: (provided) => ({
							...provided,
							backgroundColor: colors.dirtyWhite,
						}),
						dropdownIndicator: (provided) => ({
							...provided,
							color: colors.dirtyWhite,
							':hover': {
								color: colors.primary,
							},
						}),
					},
				}}
			/>
		</div>
	);
}
