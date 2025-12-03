import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import * as Location from 'expo-location';
import * as Linking from 'expo-linking';
import { ErrorMessages } from '@/constants/strigns';

export interface UserLocation {
    lat: number;
    lon: number;
}

export function useUserLocation() {
    const [location, setLocation] = useState<UserLocation | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isBlocked, setIsBlocked] = useState(false);

    async function requestLocation() {
        setLoading(true);
        setError(null);
        setIsBlocked(false);

        try {
            // 1. Check + request permission
            const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                if (!canAskAgain) {
                    setIsBlocked(true);
                    setError(ErrorMessages.locationBlocked);
                } else {
                    setError(ErrorMessages.permissionDenied);
                }

                setLoading(false);
                return;
            }

            // 2. Get position
            const pos = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            setLocation({
                lat: pos.coords.latitude,
                lon: pos.coords.longitude,
            });
        } catch (e) {
            setError(ErrorMessages.failedToGetLocation);
        } finally {
            setLoading(false);
        }
    }

    const openSettings = () => {
        Linking.openSettings();
    }

    useFocusEffect(
        useCallback(() => {
            requestLocation();
        }, []),
    );

    return {
        location,
        loading,
        error,
        isBlocked,
        retry: requestLocation,
        openSettings,
    };
}
