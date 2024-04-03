import { create } from 'zustand';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { Option } from 'react-google-places-autocomplete/build/types';

interface CityForecastStoreState {
	cityForecast: object | null;
	cityName: string | null;
}

interface CityForecastStoreActions {
	fetchCityForecast: (cityValue: { lat: number; lng: number }) => Promise<void>;
	setCityName: (cityName: string) => void;
}

type CityForecastStore = CityForecastStoreState & CityForecastStoreActions;

export const useCityForecastStore = create<CityForecastStore>(
	(set, getState) => ({
		cityForecast: null,
		cityName: null,

		fetchCityForecast: async ({ lat, lng }) => {
			try {
				const response = await fetch(
					`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
				);
				const data = await response.json();
				set({ cityForecast: data });
			} catch (error) {
				throw error;
			}
		},
		setCityName: (cityName: string) => {
			set({ cityName });
		},
	})
);
