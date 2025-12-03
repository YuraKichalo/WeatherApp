export const Strings = {
    common: {
        helloWorld: 'Hello World!',
        loading: 'Loading...',
        error: 'Something went wrong',
        retry: 'Try Again',
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
    },

    weather: {
        temperature: 'Temperature',
        humidity: 'Humidity',
        windSpeed: 'Wind Speed',
    },
} as const;

export const ErrorMessages = {
    locationBlocked: 'Location is blocked',
    permissionDenied: 'Permission denied',
    failedToGetLocation: 'Failed to get location',
} as const;
