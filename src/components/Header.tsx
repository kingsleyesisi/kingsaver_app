/**
 * Header Component
 * App header with logo and title
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, fontSize, fontWeight } from '../theme';

interface HeaderProps {
    title?: string;
    showBack?: boolean;
    showLogo?: boolean;
    rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
    title,
    showBack = false,
    showLogo = true,
    rightAction,
}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Left Section */}
            <View style={styles.leftSection}>
                {showBack ? (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
                    </TouchableOpacity>
                ) : showLogo ? (
                    <View style={styles.logoContainer}>
                        <View style={styles.logoCircle}>
                            <Text style={styles.logoText}>👑</Text>
                        </View>
                    </View>
                ) : null}
            </View>

            {/* Center Section */}
            <View style={styles.centerSection}>
                {title ? (
                    <Text style={styles.title}>{title}</Text>
                ) : (
                    <View style={styles.brandContainer}>
                        <Text style={styles.brandText}>
                            <Text style={styles.brandGold}>The </Text>
                            King
                            <Text style={styles.brandGold}> Saver</Text>
                        </Text>
                    </View>
                )}
            </View>

            {/* Right Section */}
            <View style={styles.rightSection}>
                {rightAction}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        backgroundColor: colors.background.glass,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.default,
    },
    leftSection: {
        width: 48,
        alignItems: 'flex-start',
    },
    centerSection: {
        flex: 1,
        alignItems: 'center',
    },
    rightSection: {
        width: 48,
        alignItems: 'flex-end',
    },
    backButton: {
        padding: spacing.xs,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.primary.gold,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primary.gold,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 4,
    },
    logoText: {
        fontSize: 18,
    },
    brandContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    brandText: {
        fontSize: fontSize.xl,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
    },
    brandGold: {
        color: colors.primary.gold,
    },
    title: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
    },
});
