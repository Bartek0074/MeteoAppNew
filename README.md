# MeteoAppNew

This is a fantastic React Weather App designed to provide you with current weather updates and forecasts for any location. Built with React.js and powered by the reliable data from the [OpenWeather API](https://openweathermap.org/api), you can easily check the weather for your location or any other city. Plus, explore an interactive map of Poland to visualize current weather conditions across the country. With the integration of the [Google Places API](https://developers.google.com/maps/documentation/places/web-service?hl=en) for seamless location search, planning your day has never been easier.

This version of the app introduces a range of upgrades, such as integration with Zustand and TypeScript, [link](https://github.com/Bartek0074/MeteoApp/) to old version.

## Demo

Live Demo [here](https://bartek0074-meteoappnew.netlify.app/).

![MeteoAppNew](https://github.com/Bartek0074/MeteoApp/assets/88652468/48113b1b-d974-4035-a599-bdedfa4a1ac3)
![MeteoAppNew](https://github.com/Bartek0074/MeteoApp/assets/88652468/3500f143-ab3a-421a-9597-bf3b0458a724)


## Instructions

First clone this repository.

```bash
$ git clone https://github.com/Bartek0074/MeteoAppNew.git
```

Get a free API key from OpenWeather. Get it [here](https://openweathermap.org/api).
Get a free API key from Google. Get it [here](https://developers.google.com/maps/documentation/places/web-service?hl=en).

Create a .env file in the root of your project folder and add the following.

```
REACT_APP_OPEN_WEATHER_API_KEY=[YOUR_API_KEY_FROM_OPEN_WEATHER]
REACT_APP_GOOGLE_API_KEY=[YOUR_API_KEY_FROM_OGOOGLE]
```

Install dependencies. Make sure you already have [`nodejs`](https://nodejs.org/en/) & [`npm`](https://www.npmjs.com/) installed in your system.

```bash
$ npm install # or yarn
```

Run it

```bash
$ npm start # or yarn start
```

## Technologies

- React,
- TypeScript,
- Zustand,
- SCSS,
- React Router.

## APIs

- [OpenWeather API](https://openweathermap.org/api),
- [Google Places API](https://openweathermap.org/api).
 
## Other packages

- classnames,
- react-icons,
- chart.js,
- react-chartjs-2,
- react-google-places-autocomplete.
