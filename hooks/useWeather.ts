import { UserLocation } from '@/hooks/useUserLocation';
import { useEffect, useState } from 'react';
import {
    getCurrentWeatherByCity,
    getCurrentWeatherByLocation,
    getForecastByCity,
    getForecastByLocation,
} from '@/api/weatherApi';
import { ErrorMessages } from '@/constants/strigns';

interface WeatherLocation {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
}

interface Condition {
    text: string;
    icon: string;
    code: number;
}

interface CurrentWeather {
    temp_c: number;
    temp_f: number;
    condition: Condition;
    wind_kph: number;
    feelslike_c: number;
}

interface ForecastDay {
    date: string;
    day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: Condition;
    };
}

interface Forecast {
    forecastday: ForecastDay[];
}

export interface WeatherData {
    location: WeatherLocation;
    current: CurrentWeather;
    forecast: Forecast
}

export function useWeather(location: UserLocation | null) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (location) {
            const fetchWeatherByLocation = async () => {
                setLoading(true);
                setError(null);

                try {
                    const [currentResponse, forecastResponse] = await Promise.all([
                        getCurrentWeatherByLocation(location.lat, location.lon),
                        getForecastByLocation(location.lat, location.lon),
                    ]);

                    const combinedData: WeatherData = {
                        ...currentResponse.data,
                        forecast: forecastResponse.data.forecast,
                    };

                    setWeather(combinedData);
                } catch (e) {
                    setError(ErrorMessages.failedToGetWeatherByLocation);
                } finally {
                    setLoading(false);
                }
            }

            fetchWeatherByLocation()
        }
    }, [location])

    const fetchWeatherByCity = async (city: string) => {
        setLoading(true);
        setError(null);

        try {
            const [currentResponse, forecastResponse] = await Promise.all([
                getCurrentWeatherByCity(city),
                getForecastByCity(city),
            ]);

            const combinedData: WeatherData = {
                ...currentResponse.data,
                forecast: forecastResponse.data.forecast,
            };

            setWeather(combinedData);
        } catch (e) {
            setError(ErrorMessages.failedToGetWeatherByCity);
        } finally {
            setLoading(false);
        }
    }

    return { weather, loading, error, fetchWeatherByCity };
}
