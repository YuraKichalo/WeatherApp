import axios from 'axios';

const API_KEY = '01689b47aa73489f997155613250712';
const BASE_URL = 'https://api.weatherapi.com/v1';

export const weatherApi = axios.create({
    baseURL: BASE_URL,
    params: {
        key: API_KEY,
    },
});

export const getCurrentWeatherByCity = (city: string) => {
    return weatherApi.get('/current.json', {
        params: { q: city },
    });
};

export const getCurrentWeatherByLocation = (lat: number, lon: number) => {
    return weatherApi.get('/current.json', {
        params: { q: `${lat},${lon}` },
    });
};

export const getForecastByCity = (city: string, days: number = 3) => {
    return weatherApi.get('/forecast.json', {
        params: { q: city, days },
    });
};

export const getForecastByLocation = (
    lat: number,
    lon: number,
    days: number = 3,
) => {
    return weatherApi.get('/forecast.json', {
        params: { q: `${lat},${lon}`, days },
    });
};
