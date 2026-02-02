/**
 * PlatformCard Component
 * Selectable platform card with icon and label
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../theme';
import { Platform } from '../types';

interface PlatformCardProps {
    platform: Platform;
    name: string;
    icon: React.ReactNode;
    color: string;
    gradient?: string[];
    onPress: () => void;
}

export const PlatformCard: React.FC<PlatformCardProps> = ({
    platform,
    name,
    icon,
    color,
    gradient,
    onPress,
}) => {
    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            style={styles.container}
        >
            <View style={styles.card}>
                {/* Icon Container */}
                {gradient ? (
                    <LinearGradient
                        colors={gradient as [string, string, ...string[]]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.iconContainer}
                    >
                        {icon}
                    </LinearGradient>
                ) : (
                    <View style={[styles.iconContainer, { backgroundColor: color }]}>
                        {icon}
                    </View>
                )}

                {/* Platform Name */}
                <Text style={styles.name}>{name}</Text>

                {/* Arrow Indicator */}
                <View style={styles.arrowContainer}>
                    <Ionicons name="chevron-forward" size={16} color={colors.text.muted} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

// Pre-configured platform cards
export const TikTokCard: React.FC<{ onPress: () => void }> = ({ onPress }) => (
    <PlatformCard
        platform="tiktok"
        name="TikTok"
        icon={<TikTokIcon />}
        color={colors.platforms.tiktok}
        onPress={onPress}
    />
);

export const YouTubeCard: React.FC<{ onPress: () => void }> = ({ onPress }) => (
    <PlatformCard
        platform="youtube"
        name="YouTube"
        icon={<Ionicons name="logo-youtube" size={28} color="#FFF" />}
        color={colors.platforms.youtube}
        onPress={onPress}
    />
);

export const InstagramCard: React.FC<{ onPress: () => void }> = ({ onPress }) => (
    <PlatformCard
        platform="instagram"
        name="Instagram"
        icon={<Ionicons name="logo-instagram" size={28} color="#FFF" />}
        color={colors.platforms.instagram}
        gradient={['#833AB4', '#FD1D1D', '#F77737']}
        onPress={onPress}
    />
);

export const FacebookCard: React.FC<{ onPress: () => void }> = ({ onPress }) => (
    <PlatformCard
        platform="facebook"
        name="Facebook"
        icon={<Ionicons name="logo-facebook" size={28} color="#FFF" />}
        color={colors.platforms.facebook}
        onPress={onPress}
    />
);

export const TwitterCard: React.FC<{ onPress: () => void }> = ({ onPress }) => (
    <PlatformCard
        platform="twitter"
        name="Twitter / X"
        icon={<Ionicons name="logo-twitter" size={28} color="#FFF" />}
        color={colors.platforms.twitter}
        onPress={onPress}
    />
);

// Custom TikTok Icon (since Ionicons doesn't have it)
const TikTokIcon = () => (
    <View style={{ width: 28, height: 28, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, color: '#FFF', fontWeight: '700' }}>♪</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minWidth: '45%',
    },
    card: {
        backgroundColor: colors.background.glass,
        borderRadius: borderRadius.xl,
        borderWidth: 1,
        borderColor: colors.border.default,
        padding: spacing.lg,
        alignItems: 'center',
        gap: spacing.md,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: borderRadius.full,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    name: {
        color: colors.text.primary,
        fontSize: fontSize.md,
        fontWeight: fontWeight.semibold,
    },
    arrowContainer: {
        position: 'absolute',
        top: spacing.md,
        right: spacing.md,
    },
});
