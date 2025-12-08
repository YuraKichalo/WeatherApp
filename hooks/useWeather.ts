import { UserLocation } from '@/hooks/useUserLocation';
import { useEffect } from 'react';
import {
    getCurrentWeatherByCity,
    getCurrentWeatherByLocation,
    getForecastByCity,
    getForecastByLocation,
} from '@/api/weatherApi';
import { ErrorMessages } from '@/constants/strigns';
import { useWeatherStore } from '@/store/useWeatherStore';

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
    const { setError, setLoading, addWeatherItem, weatherItems } = useWeatherStore();

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

                    // setWeather(combinedData);
                    addWeatherItem(combinedData)
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

        const itemAlreadyExists = weatherItems?.some((item) => item.location.name === city);

        try {
            if (itemAlreadyExists) {
                return;
            }

            const [currentResponse, forecastResponse] = await Promise.all([
                getCurrentWeatherByCity(city),
                getForecastByCity(city),
            ]);

            const combinedData: WeatherData = {
                ...currentResponse.data,
                forecast: forecastResponse.data.forecast,
            };

            addWeatherItem(combinedData)
        } catch (e) {
            setError(ErrorMessages.failedToGetWeatherByCity);
        } finally {
            setLoading(false);
        }
    }

    return { fetchWeatherByCity };
}
