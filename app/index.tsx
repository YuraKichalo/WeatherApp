import { Image, StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { Button } from '@/components/Button';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';

export default function Index() {
    return (
        <Screen safeAreaStyle={styles.container} gradient>
            <View style={styles.textContainer}>
                <Image
                    source={require('@/assets/images/startScreen.png')}
                    style={styles.image}
                />
                <Text style={styles.text}>Hello World!</Text>
                <Text style={styles.secondaryText}>Hello World!</Text>
            </View>
            <Button buttonStyle={styles.button} title="Go to Home" onPress={() => {
            }}/>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
    },
    image: {
        width: 400,
        height: 400,
    },
    textContainer: {
        alignItems: 'center',
    },
    text: {
        color: Colors.text.primary,
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
