import React from 'react'
import { Pressable, PressableProps, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native'
import { Colors } from '@/constants/colors'
import { Typography } from '@/constants/typography'
import { Spacing } from '@/constants/spacing'

export interface ButtonProps extends Omit<PressableProps, 'style' | 'children'> {
    title: string;
    titleStyle?: TextStyle;
    buttonStyle?: ViewStyle;
}

export const Button = ({
    title,
    titleStyle,
    buttonStyle,
    disabled = false,
    ...pressableProps
}: ButtonProps) => {
    return (
        <Pressable
            disabled={disabled}
            style={({ pressed }) => [
                styles.button,
                buttonStyle,
                pressed && styles.pressed,
                disabled && styles.disabled,
            ]}
            {...pressableProps}
        >
            <Text style={[styles.title, titleStyle]}>
                {title}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        borderRadius: 30,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pressed: {
        opacity: 0.7,
    },
    disabled: {
        backgroundColor: Colors.text.disabled,
        opacity: 0.5,
    },
    title: {
        color: Colors.text.secondary,
        fontSize: Typography.sizes.xl,
        fontWeight: Typography.weights.bold,
    },
});
