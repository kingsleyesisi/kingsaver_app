/**
 * Input Component
 * Dark styled text input with gold accent on focus
 */

import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Animated,
    ViewStyle,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize } from '../theme';

interface InputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    showPasteButton?: boolean;
    showClearButton?: boolean;
    multiline?: boolean;
    numberOfLines?: number;
    style?: ViewStyle;
    autoFocus?: boolean;
}

export const Input: React.FC<InputProps> = ({
    value,
    onChangeText,
    placeholder = 'Enter URL here...',
    showPasteButton = true,
    showClearButton = true,
    multiline = false,
    numberOfLines = 1,
    style,
    autoFocus = false,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const borderColor = useState(new Animated.Value(0))[0];

    const handleFocus = () => {
        setIsFocused(true);
        Animated.timing(borderColor, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handleBlur = () => {
        setIsFocused(false);
        Animated.timing(borderColor, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handlePaste = async () => {
        try {
            const text = await Clipboard.getStringAsync();
            if (text) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onChangeText(text);
            }
        } catch (error) {
            console.error('Failed to paste:', error);
        }
    };

    const handleClear = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onChangeText('');
    };

    const animatedBorderColor = borderColor.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.border.default, colors.primary.gold],
    });

    return (
        <Animated.View
            style={[
                styles.container,
                { borderColor: animatedBorderColor },
                isFocused && styles.focused,
                style,
            ]}
        >
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.text.muted}
                style={[
                    styles.input,
                    multiline && { height: numberOfLines * 24, textAlignVertical: 'top' },
                ]}
                onFocus={handleFocus}
                onBlur={handleBlur}
                multiline={multiline}
                numberOfLines={numberOfLines}
                autoFocus={autoFocus}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"
            />

            <View style={styles.actions}>
                {value.length > 0 && showClearButton && (
                    <TouchableOpacity onPress={handleClear} style={styles.actionButton}>
                        <Ionicons name="close-circle" size={20} color={colors.text.muted} />
                    </TouchableOpacity>
                )}
                {showPasteButton && (
                    <TouchableOpacity onPress={handlePaste} style={styles.actionButton}>
                        <Ionicons name="clipboard-outline" size={20} color={colors.primary.gold} />
                    </TouchableOpacity>
                )}
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background.dark,
        borderWidth: 1,
        borderRadius: borderRadius.lg,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    focused: {
        shadowColor: colors.primary.gold,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    input: {
        flex: 1,
        color: colors.text.primary,
        fontSize: fontSize.md,
        paddingVertical: spacing.sm,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    actionButton: {
        padding: spacing.xs,
    },
});
