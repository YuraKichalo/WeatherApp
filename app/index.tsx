import React from 'react'
import { Image, StyleSheet, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';
import { Strings } from '@/constants/strigns';
import { useRouter } from 'expo-router';

const IMAGE_DIMENSION = 400;

export default function Index() {
    const router = useRouter();

    const navigateToWeather = () => {
        router.replace('/weather');
    }

    return (
        <Screen safeAreaStyle={styles.container} gradient>
            <View style={styles.textContainer}>
                <Image
                    source={require('@/assets/images/startScreen.png')}
                    style={styles.image}
                />
                <Text style={styles.text}>{Strings.start.title}</Text>
                <Text style={styles.secondaryText}>{Strings.start.subtitle}</Text>
            </View>
            <Button buttonStyle={styles.button} title={Strings.start.button} onPress={navigateToWeather}/>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
    },
    image: {
        width: IMAGE_DIMENSION,
        height: IMAGE_DIMENSION,
    },
    textContainer: {
        alignItems: 'center',
    },
    text: {
        fontSize: Typography.sizes.xxxl,
        fontWeight: Typography.weights.bold,
    },
    secondaryText: {
        color: Colors.secondary,
        fontSize: Typography.sizes.xxxl,
        fontWeight: Typography.weights.bold,
    },
    button: {
        marginHorizontal: Spacing.lg,
        marginBottom: Spacing.xl,
    },
})
