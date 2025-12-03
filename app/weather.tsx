import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { useUserLocation } from '@/hooks/useUserLocation';
import { Button } from '@/components/Button';
import { Spacing } from '@/constants/spacing';
import { Strings } from '@/constants/strigns';

const stringBase = Strings.weatherScreen

export default function Weather() {
    const [value, setValue] = React.useState('');
    const { location, loading: locLoading, error, isBlocked, openSettings } = useUserLocation();

    const inputColor = value.length > 0 ? Colors.text.primary : Colors.text.disabled;

    return (
        <Screen gradient style={styles.container}>
            <View style={styles.inputContainer}>
                <Ionicons name="search" size={24} color={inputColor}/>
                <TextInput
                    value={value}
                    placeholder={stringBase.inputPlaceholder}
                    placeholderTextColor={inputColor}
                    style={styles.input}
                    onChangeText={setValue}
                />
            </View>

            {isBlocked && (
                <View style={styles.disabledLocationContainer}>
                    <Text style={styles.disableLocationText}>{stringBase.disabledLocation}</Text>
                    <Button title={stringBase.settingsButton} onPress={openSettings}/>
                </View>
            )}
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
    },
    disabledLocationContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disableLocationText: {
        fontSize: Typography.sizes.xl,
        fontWeight: Typography.weights.bold,
        textAlign: 'center',
        marginBottom: Spacing.md,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        padding: 8,
        borderRadius: 8,
        shadowColor: '#000',
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
