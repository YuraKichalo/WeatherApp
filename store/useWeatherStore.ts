import { create } from 'zustand'

import { WeatherData } from '@/hooks/useWeather';

type WeatherStore = {
    weatherItems: WeatherData[] | null
    loading: boolean
    error: string | null
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    lastDeleted?: { item: WeatherData; index: number }
    addWeatherItem: (weather: WeatherData) => void
    deleteWeatherItem: (index: number) => void

    undoDelete: () => void
    clearLastDeleted: () => void
}

export const useWeatherStore = create<WeatherStore>((set) => ({
    weatherItems: [],
    lastDeleted: undefined,
    loading: false,
    error: null,
    setLoading: (loading) => set(() => ({
        loading,
    })),
    setError: (error) => set(() => ({
        error,
    })),
    addWeatherItem: (weather) => set((state) => ({
        weatherItems: state.weatherItems ? [...state.weatherItems, weather] : [weather],
    })),
    deleteWeatherItem: (index) => set((state) => {
        if (!state.weatherItems) {
            return state;
        }

        const items = [...state.weatherItems];

        if (index < 0 || index >= items.length) {
            return state;
        }

        const removed = items.splice(index, 1)[0];
        return {
            weatherItems: items,
            lastDeleted: { item: removed, index },
        };
    }),
    undoDelete: () => set((state) => {
        if (!state.lastDeleted || !state.weatherItems) {
            return state;
        }

        const items = [...state.weatherItems];
        items.splice(state.lastDeleted.index, 0, state.lastDeleted.item);
        return {
            weatherItems: items,
            lastDeleted: undefined,
        };
    }),
    clearLastDeleted: () => set(() => ({
        lastDeleted: undefined,
    })),
}))
