/**
 * GenericPlatformScreen
 * Reusable screen component for platforms awaiting backend
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../theme';
import { Platform } from '../types';

interface GenericPlatformScreenProps {
    platform: Platform;
    platformName: string;
    platformIcon: string;
    platformColor: string;
}

export const GenericPlatformScreen: React.FC<GenericPlatformScreenProps> = ({
    platform,
    platformName,
    platformIcon,
    platformColor,
}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header title={platformName} showBack showLogo={false} />

            <View style={styles.content}>
                <View style={[styles.iconContainer, { backgroundColor: platformColor }]}>
                    <Ionicons name={platformIcon as any} size={48} color="#FFF" />
                </View>

                <Text style={styles.title}>{platformName} Downloader</Text>

                <View style={styles.comingSoonBadge}>
                    <Ionicons name="construct" size={16} color={colors.primary.gold} />
                    <Text style={styles.comingSoonText}>Coming Soon</Text>
                </View>

                <Text style={styles.description}>
                    {platformName} video downloading requires a backend server to process requests.
                    This feature will be available in a future update.
                </Text>

                <View style={styles.infoBox}>
                    <Ionicons name="information-circle" size={24} color={colors.semantic.info} />
                    <Text style={styles.infoText}>
                        TikTok downloads are fully functional! Try downloading a TikTok video now.
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

// Pre-configured screens for each platform
export const YouTubeScreen: React.FC = () => (
    <GenericPlatformScreen
        platform="youtube"
        platformName="YouTube"
        platformIcon="logo-youtube"
        platformColor={colors.platforms.youtube}
    />
);

export const InstagramScreen: React.FC = () => (
    <GenericPlatformScreen
        platform="instagram"
        platformName="Instagram"
        platformIcon="logo-instagram"
        platformColor={colors.platforms.instagram}
    />
);

export const FacebookScreen: React.FC = () => (
    <GenericPlatformScreen
        platform="facebook"
        platformName="Facebook"
        platformIcon="logo-facebook"
        platformColor={colors.platforms.facebook}
    />
);

export const TwitterScreen: React.FC = () => (
    <GenericPlatformScreen
        platform="twitter"
        platformName="Twitter / X"
        platformIcon="logo-twitter"
        platformColor={colors.platforms.twitter}
    />
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.darker,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.xl,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.lg,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    title: {
        fontSize: fontSize.xxl,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
        marginBottom: spacing.md,
    },
    comingSoonBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.full,
        borderWidth: 1,
        borderColor: colors.border.gold,
        marginBottom: spacing.lg,
    },
    comingSoonText: {
        color: colors.primary.gold,
        fontSize: fontSize.sm,
        fontWeight: fontWeight.semibold,
    },
    description: {
        fontSize: fontSize.md,
        color: colors.text.secondary,
        textAlign: 'center',
        marginBottom: spacing.xl,
        lineHeight: 24,
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: spacing.md,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: 'rgba(59, 130, 246, 0.3)',
    },
    infoText: {
        flex: 1,
        color: colors.semantic.info,
        fontSize: fontSize.sm,
        lineHeight: 20,
    },
});
