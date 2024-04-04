import styles from './CitySelect.module.scss';

import { useState, useEffect } from 'react';

import { Option } from 'react-google-places-autocomplete/build/types';
import { useCityStore } from '../../data/city/store';

import GooglePlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from 'react-google-places-autocomplete';

import { colors } from '../../utils/colors';

type Props = {
	setFetching?: (loading: boolean) => void;
	width?: number | string;
};

export default function CitySelect({ setFetching, width = 'auto' }: Props) {
	const [value, setValue] = useState<Option | null>(null);

	const { fetchCity, setCityName } = useCityStore();

	useEffect(() => {
		const fetchCityData = async () => {
			if (!value) return;

			setCityName(value.label);

			try {
				const results = await geocodeByAddress(value.label);
				const cords = await getLatLng(results[0]);
				fetchCity({ lat: cords.lat, lng: cords.lng });
			} catch (error) {
				console.log(error);
			} finally {
				setTimeout(() => {
					setFetching && setFetching(false);
				}, 350);
			}
		};

		fetchCityData();
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
						setFetching && setFetching(true);
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
