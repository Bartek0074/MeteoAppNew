import { create } from 'zustand';

interface CityStoreState {
	cityForecast: any | null;
	cityWeather: any | null;
	cityName: string | null;
}

interface CityStoreActions {
	fetchCity: (cityValue: { lat: number; lng: number }) => Promise<void>;
	setCityName: (cityName: string) => void;
}

type CityStore = CityStoreState & CityStoreActions;

export const useCityStore = create<CityStore>((set, getState) => ({
	cityForecast: null,
	cityWeather: null,
	cityName: null,

	fetchCity: async ({ lat, lng }) => {
		try {
			const forecastResponse = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
			);
			const forecastData = await forecastResponse.json();

			const weatherResponse = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
			);

			const weatherData = await weatherResponse.json();
			set({ cityForecast: forecastData, cityWeather: weatherData });
		} catch (error) {
			throw error;
		}
	},
	setCityName: (cityName: string) => {
		set({ cityName });
	},
}));
