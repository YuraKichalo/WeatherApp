import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { WeatherData } from '@/hooks/useWeather';
import { Text } from '@/components/Text';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';
import { Strings } from '@/constants/strigns';

interface WeatherCardProps {
    weather: WeatherData
}

export default function WeatherCard({ weather }: WeatherCardProps) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.temp}>{Math.round(weather.current.temp_c)}℃</Text>
                <View style={styles.row}>
                    <Text
                        style={styles.minTemp}>{Strings.weatherCard.minTemp} {weather.forecast.forecastday[0].day.mintemp_c}℃</Text>
                    <Text
                        style={styles.maxTemp}>{Strings.weatherCard.maxTemp} {weather.forecast.forecastday[0].day.maxtemp_c}℃</Text>
                </View>
                <Text
                    style={styles.wind}>{Strings.weatherCard.wind} {Math.round(weather?.current.wind_kph)} {Strings.weatherCard.kph}</Text>
                <Text style={styles.location}>{weather.location.name}, {weather.location.country}</Text>
            </View>


            <View style={styles.iconAndTextContainer}>
                <Image
                    source={{ uri: 'https:' + weather.current.condition.icon }}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text>{weather?.current.condition.text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Spacing.lg,
        backgroundColor: Colors.primary,
        borderRadius: Spacing.lg,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    temp: {
        fontSize: Typography.sizes.xxxl,
    },
    minTemp: {
        color: Colors.text.disabled,
        marginEnd: Spacing.md,
        fontWeight: Typography.weights.medium,
    },
    maxTemp: {
        color: Colors.text.disabled,
        fontWeight: Typography.weights.medium,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.md,
    },
    wind: {
        marginBottom: Spacing.sm,
        color: Colors.text.disabled,
        fontWeight: Typography.weights.medium,
    },
    iconAndTextContainer: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    location: {
        width: 200,
        fontSize: Typography.sizes.md,
        fontWeight: Typography.weights.medium,
    },
    image: {
        width: 102,
        height: 102,
        flex: 1,
    },
})
