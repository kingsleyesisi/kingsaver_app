/**
 * Button Component
 * Premium gradient button with press animations
 */

import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    loading?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    style?: ViewStyle;
    textStyle?: TextStyle;
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    loading = false,
    disabled = false,
    icon,
    style,
    textStyle,
    fullWidth = false,
}) => {
    const handlePress = () => {
        if (!disabled && !loading) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            onPress();
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case 'small':
                return { paddingVertical: spacing.sm, paddingHorizontal: spacing.md };
            case 'large':
                return { paddingVertical: spacing.lg, paddingHorizontal: spacing.xl };
            default:
                return { paddingVertical: spacing.md, paddingHorizontal: spacing.lg };
        }
    };

    const getTextSize = () => {
        switch (size) {
            case 'small':
                return fontSize.sm;
            case 'large':
                return fontSize.lg;
            default:
                return fontSize.md;
        }
    };

    if (variant === 'primary') {
        return (
            <TouchableOpacity
                onPress={handlePress}
                disabled={disabled || loading}
                activeOpacity={0.8}
                style={[fullWidth && styles.fullWidth, style]}
            >
                <LinearGradient
                    colors={disabled ? ['#4B5563', '#374151'] : [colors.primary.gold, colors.primary.goldDark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                        styles.button,
                        getSizeStyles(),
                        disabled && styles.disabled,
                    ]}
                >
                    {loading ? (
                        <ActivityIndicator color={colors.text.dark} size="small" />
                    ) : (
                        <>
                            {icon}
                            <Text style={[styles.primaryText, { fontSize: getTextSize() }, textStyle]}>
                                {title}
                            </Text>
                        </>
                    )}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    if (variant === 'outline') {
        return (
            <TouchableOpacity
                onPress={handlePress}
                disabled={disabled || loading}
                activeOpacity={0.7}
                style={[
                    styles.button,
                    styles.outlineButton,
                    getSizeStyles(),
                    fullWidth && styles.fullWidth,
                    disabled && styles.disabled,
                    style,
                ]}
            >
                {loading ? (
                    <ActivityIndicator color={colors.primary.gold} size="small" />
                ) : (
                    <>
                        {icon}
                        <Text style={[styles.outlineText, { fontSize: getTextSize() }, textStyle]}>
                            {title}
                        </Text>
                    </>
                )}
            </TouchableOpacity>
        );
    }

    // Secondary variant
    return (
        <TouchableOpacity
            onPress={handlePress}
            disabled={disabled || loading}
            activeOpacity={0.7}
            style={[
                styles.button,
                styles.secondaryButton,
                getSizeStyles(),
                fullWidth && styles.fullWidth,
                disabled && styles.disabled,
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={colors.text.primary} size="small" />
            ) : (
                <>
                    {icon}
                    <Text style={[styles.secondaryText, { fontSize: getTextSize() }, textStyle]}>
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius.lg,
        gap: spacing.sm,
    },
    fullWidth: {
        width: '100%',
    },
    disabled: {
        opacity: 0.5,
    },
    primaryText: {
        color: colors.text.dark,
        fontWeight: fontWeight.bold,
    },
    secondaryButton: {
        backgroundColor: colors.background.glass,
        borderWidth: 1,
        borderColor: colors.border.default,
    },
    secondaryText: {
        color: colors.text.primary,
        fontWeight: fontWeight.semibold,
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: colors.primary.gold,
    },
    outlineText: {
        color: colors.primary.gold,
        fontWeight: fontWeight.bold,
    },
});
