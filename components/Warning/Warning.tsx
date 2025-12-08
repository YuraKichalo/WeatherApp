import React from 'react'
import { StyleSheet, Text, View, ViewProps } from 'react-native'
import { Button } from '@/components/Button';
import { Spacing } from '@/constants/spacing';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

interface Props extends ViewProps {
    onButtonPress?: () => void
    buttonText?: string
    textContent: string
}

export default function Warning({ onButtonPress, buttonText, textContent, ...props }: Props) {
    return (
        <View style={styles.container} {...props}>
            <Text style={styles.text}>{textContent}</Text>
            {!!buttonText && !!onButtonPress &&
              <Button title={buttonText} onPress={onButtonPress} buttonStyle={styles.button}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: Spacing.lg,
        left: Spacing.sm,
        right: Spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.primary,
        padding: Spacing.sm,
        borderRadius: Spacing.sm,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        color: Colors.text.primary,
        fontSize: Typography.sizes.md,
    },
    button: {
        backgroundColor: Colors.secondary,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
    },
})
