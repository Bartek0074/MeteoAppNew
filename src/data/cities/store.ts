import { create } from 'zustand';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

import { CityCoordinate, CityWeather } from './types';

const citiesCoordinates: CityCoordinate[] = [
	{ name: 'Lublin', namePl: 'Lublin', lat: 51.2465, lng: 22.5684 },
	{ name: 'Rzeszow', namePl: 'Rzeszów', lat: 50.0413, lng: 21.9991 },
	{ name: 'Krakow', namePl: 'Kraków', lat: 50.0647, lng: 19.945 },
	{ name: 'Warsaw', namePl: 'Warszawa', lat: 52.2297, lng: 21.0122 },
	{ name: 'Gdansk', namePl: 'Gdańsk', lat: 54.352, lng: 18.6466 },
	{ name: 'Wroclaw', namePl: 'Wrocław', lat: 51.1079, lng: 17.0385 },
	{ name: 'Poznan', namePl: 'Poznań', lat: 52.4064, lng: 16.9252 },
	{ name: 'Szczecin', namePl: 'Szczecin', lat: 53.4285, lng: 14.5528 },
	{ name: 'Bydgoszcz', namePl: 'Bydgoszcz', lat: 53.1235, lng: 18.0076 },
	{ name: 'Lodz', namePl: 'Łódź', lat: 51.7592, lng: 19.4554 },
	{ name: 'Katowice', namePl: 'Katowice', lat: 50.2649, lng: 19.0238 },
	{ name: 'Bialystok', namePl: 'Białystok', lat: 53.1325, lng: 23.1688 },
	{ name: 'Kielce', namePl: 'Kielce', lat: 50.8661, lng: 20.6286 },
	{ name: 'Olsztyn', namePl: 'Olsztyn', lat: 53.7784, lng: 20.4801 },
	{ name: 'ZielonaGora', namePl: 'Zielona Góra', lat: 51.9356, lng: 15.5064 },
];

interface CitiesStoreState {
	cities: CityWeather[];
}

interface CitiesStoreActions {
	fetchCities: () => Promise<void>;
}

type CitiesStore = CitiesStoreState & CitiesStoreActions;

export const useCitiesStore = create<CitiesStore>((set, getState) => ({
	cities: [],

	fetchCities: () => {
		return new Promise<void>(async (resolve, reject) => {
			try {
				const fetchPromises = citiesCoordinates.map(async (city) => {
					const response = await fetch(
						`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lng}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
					);

					if (!response.ok) {
						throw new Error('Failed to fetch weather data');
					}

					const data = await response.json();
					return { ...city, weather: data };
				});

				const newCities = await Promise.all(fetchPromises);
				set({ cities: newCities });
				resolve();
			} catch (error) {
				console.error('Error fetching weather data:', error);
				reject(error);
			}
		});
	},
}));
