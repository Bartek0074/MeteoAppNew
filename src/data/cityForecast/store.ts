import { create } from 'zustand';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { Option } from 'react-google-places-autocomplete/build/types';

interface CityForecastStoreState {
	cityForecast: object | null;
}

interface CityForecastStoreActions {
	fetchCityForecast: (cityValue: Option) => Promise<void>;
}

type CityForecastStore = CityForecastStoreState & CityForecastStoreActions;

export const useCityForecastStore = create<CityForecastStore>(
	(set, getState) => ({
		cityForecast: null,

		fetchCityForecast: async (cityValue) => {
			try {
				const results = await geocodeByAddress(cityValue.label);
				const latLng = await getLatLng(results[0]);

				const response = await fetch(
					`https://api.openweathermap.org/data/2.5/forecast?lat=${latLng.lat}&lon=${latLng.lng}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
				);
				const data = await response.json();
				set({ cityForecast: data });
			} catch (error) {
				throw error;
			}
		},
	})
);
