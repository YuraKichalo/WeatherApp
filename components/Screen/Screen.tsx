import React from 'react'
import { ScrollView, StyleSheet, ViewStyle } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/colors'
import { Spacing } from '@/constants/spacing'

type GradientColors = readonly [string, string, ...string[]];

export interface ScreenProps {
    children: React.ReactNode;
    scrollable?: boolean;
    gradient?: boolean;
    gradientColors?: GradientColors;
    style?: ViewStyle;
    safeAreaStyle?: ViewStyle;
}

export const Screen = ({
    children,
    scrollable = false,
    gradient = false,
    gradientColors = Colors.gradients.purple,
    style,
    safeAreaStyle,
}: ScreenProps) => {
    const containerStyle = [styles.container, style]

    const content = scrollable ? (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            {children}
        </ScrollView>
    ) : (
        children
    );

    if (gradient) {
        return (
            <LinearGradient
                colors={[...gradientColors]}
                style={containerStyle}
            >
                <SafeAreaView style={[styles.safeArea, safeAreaStyle]}>
                    {content}
                </SafeAreaView>
            </LinearGradient>
        );
    }

    return (
        <SafeAreaView style={containerStyle}>
            {content}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: Spacing.lg,
    },
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
});
