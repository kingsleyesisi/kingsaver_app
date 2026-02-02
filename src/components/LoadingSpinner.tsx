/**
 * LoadingSpinner Component
 * Animated loading indicator
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { colors, spacing, fontSize } from '../theme';

interface LoadingSpinnerProps {
    message?: string;
    size?: 'small' | 'large';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    message = 'Fetching video magic...',
    size = 'large',
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.spinnerContainer}>
                <View style={styles.outerRing} />
                <ActivityIndicator
                    size={size}
                    color={colors.primary.gold}
                    style={styles.spinner}
                />
            </View>
            {message && (
                <Text style={styles.message}>{message}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.xxl,
    },
    spinnerContainer: {
        position: 'relative',
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    outerRing: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: colors.background.dark,
    },
    spinner: {
        transform: [{ scale: 1.5 }],
    },
    message: {
        marginTop: spacing.lg,
        color: colors.text.secondary,
        fontSize: fontSize.md,
    },
});
