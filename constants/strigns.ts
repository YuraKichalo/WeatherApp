export const Strings = {
    common: {
        loading: 'Loading...',
    },
    start: {
        title: 'Weather',
        subtitle: 'ForeCasts',
        button: 'Get Start',
    },
    weatherScreen: {
        inputPlaceholder: 'Search for a city',
        disabledLocation: 'Location is disabled. Enable it in Settings.',
        settingsButton: 'Open Settings',
        undoDeleteText: 'Weather card deleted',
        undo: 'Undo',
    },
    weatherCard: {
        minTemp: 'L:',
        maxTemp: 'H:',
        wind: 'Wind Speed:',
        kph: 'kph',
    },
} as const;

export const ErrorMessages = {
    locationBlocked: 'Location is blocked',
    permissionDenied: 'Permission denied',
    failedToGetLocation: 'Failed to get location',
    failedToGetWeatherByLocation: 'Failed to fetch weather by location',
    failedToGetWeatherByCity: 'Failed to fetch weather by city',
} as const;
