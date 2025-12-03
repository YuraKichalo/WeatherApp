import React from 'react'
import { Text as RNText, TextProps } from 'react-native'
import { Colors } from '@/constants/colors'

type TextColor = keyof typeof Colors.text

interface Props extends TextProps {
    color?: TextColor;
}

export const Text = ({ color = 'primary', style, ...props }: Props) => {
    return (
        <RNText style={[{ color: Colors.text[color] }, style]} {...props} />
    )
}
