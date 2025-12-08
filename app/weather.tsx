import React, { useEffect } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, TextInput, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useWeather } from '@/hooks/useWeather';
import { Button } from '@/components/Button';
import { Spacing } from '@/constants/spacing';
import { Strings } from '@/constants/strigns';
import WeatherCard from '@/components/WeatherCard/WeatherCard';
import { useWeatherStore } from '@/store/useWeatherStore';
import Warning from '@/components/Warning/Warning';

const stringBase = Strings.weatherScreen

export default function Weather() {
    const [value, setValue] = React.useState('');
    const { location, loading: locLoading, isBlocked, openSettings } = useUserLocation();
    const { fetchWeatherByCity } = useWeather(location)
    const {
        weatherItems,
        loading: weatherLoading,
        deleteWeatherItem,
        undoDelete,
        clearLastDeleted,
        lastDeleted,
        error: weatherError,
    } = useWeatherStore();

    const inputTextColor = value.length > 0 ? Colors.text.primary : Colors.text.disabled;

    useEffect(() => {
        if (lastDeleted) {
            const timer = setTimeout(() => {
                clearLastDeleted();
            }, 5000);

            return () => {
                if (timer) {
                    clearTimeout(timer);
                }
            };
        }
    }, [lastDeleted, clearLastDeleted]);

    const onSearch = () => {
        fetchWeatherByCity(value)
    }

    if (locLoading || weatherLoading) {
        return (
            <Screen gradient style={styles.container}>
                <View style={styles.centeredContainer}>
                    <ActivityIndicator size="large" color={Colors.secondary}/>
                </View>
            </Screen>
        )
    }

    return (
        <Screen gradient style={styles.container}>
            <View style={styles.row}>
                <View style={styles.inputContainer}>
                    <Ionicons name="search" size={24} color={inputTextColor}/>
                    <TextInput
                        value={value}
                        placeholder={stringBase.inputPlaceholder}
                        placeholderTextColor={inputTextColor}
                        style={styles.input}
                        onChangeText={setValue}
                        onSubmitEditing={onSearch}
                    />
                </View>
                <Button disabled={value.length === 0} title="search" buttonStyle={styles.searchButton}
                        titleStyle={styles.searchButtonText}
                        onPress={onSearch}/>
            </View>


            <FlatList
                showsVerticalScrollIndicator={false}
                data={weatherItems ?? []}
                keyExtractor={(item) => item.location.name}
                renderItem={({ item, index }) => (
                    <WeatherCard weather={item} onDelete={() => deleteWeatherItem(index)}/>
                )}
                ItemSeparatorComponent={() => <View style={{ height: Spacing.md }}/>}
            />

            {isBlocked && (
                <View style={styles.centeredContainer}>
                    <Text style={styles.disableLocationText}>{stringBase.disabledLocation}</Text>
                    <Button title={stringBase.settingsButton} onPress={openSettings}/>
                </View>
            )}

            {lastDeleted && (
                <Warning textContent={stringBase.undoDeleteText} buttonText={stringBase.undo}
                         onButtonPress={undoDelete}/>
            )}

            {!!weatherError && (
                <Warning textContent={weatherError}/>
            )}
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Spacing.xxl,
    },
    row: {
        flexDirection: 'row',
        paddingBottom: Spacing.lg,
    },
    centeredContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchButtonText: {
        fontSize: Typography.sizes.sm,
    },
    searchButton: {
        borderRadius: Spacing.sm,
    },
    disableLocationText: {
        fontSize: Typography.sizes.xl,
        fontWeight: Typography.weights.bold,
        textAlign: 'center',
        marginBottom: Spacing.md,
    },
    inputContainer: {
        marginEnd: Spacing.sm,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        padding: Spacing.sm,
        borderRadius: Spacing.sm,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        marginLeft: 8,
        flex: 1,
        fontSize: Typography.sizes.lg,
        color: Colors.text.primary,
    },
})
