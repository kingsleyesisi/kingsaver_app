/**
 * HomeScreen
 * Main screen with platform selection
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import {
    Header,
    TikTokCard,
    YouTubeCard,
    InstagramCard,
    FacebookCard,
    TwitterCard,
} from '../components';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../theme';
import { RootStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.background.darker} />

            <Header />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <Text style={styles.heroTitle}>
                        Download Videos{'\n'}
                        <Text style={styles.heroHighlight}>Without Watermark</Text>
                    </Text>
                    <Text style={styles.heroSubtitle}>
                        Fast, simple, and high quality. Save your favorite videos from social media.
                    </Text>
                </View>

                {/* Platform Grid */}
                <Text style={styles.sectionTitle}>
                    Select <Text style={styles.goldText}>Platform</Text>
                </Text>

                <View style={styles.platformGrid}>
                    <TikTokCard onPress={() => navigation.navigate('TikTok')} />
                    <YouTubeCard onPress={() => navigation.navigate('YouTube')} />
                    <InstagramCard onPress={() => navigation.navigate('Instagram')} />
                    <FacebookCard onPress={() => navigation.navigate('Facebook')} />
                    <TwitterCard onPress={() => navigation.navigate('Twitter')} />

                    {/* History Card */}
                    <View style={styles.historyCard}>
                        <View style={styles.historyCardInner}>
                            <View style={styles.historyIconContainer}>
                                <Ionicons name="time" size={28} color={colors.primary.gold} />
                            </View>
                            <Text style={styles.historyCardText}>History</Text>
                            <View style={styles.arrowContainer}>
                                <Ionicons name="chevron-forward" size={16} color={colors.text.muted} />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Features Section */}
                <View style={styles.featuresSection}>
                    <Text style={styles.sectionTitle}>
                        Why <Text style={styles.goldText}>King Saver</Text>?
                    </Text>

                    <View style={styles.featuresList}>
                        <FeatureItem
                            icon="flash"
                            title="Lightning Fast"
                            description="Download videos in seconds"
                        />
                        <FeatureItem
                            icon="shield-checkmark"
                            title="No Watermark"
                            description="Clean videos without branding"
                        />
                        <FeatureItem
                            icon="sparkles"
                            title="HD Quality"
                            description="Get the best resolution available"
                        />
                        <FeatureItem
                            icon="cloud-download"
                            title="Save to Gallery"
                            description="Automatically saved to your device"
                        />
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Designed & Made by The King 👑</Text>
                    <Text style={styles.copyright}>Kings World © 2025</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// Feature Item Component
const FeatureItem: React.FC<{
    icon: string;
    title: string;
    description: string;
}> = ({ icon, title, description }) => (
    <View style={styles.featureItem}>
        <View style={styles.featureIcon}>
            <Ionicons name={icon as any} size={20} color={colors.primary.gold} />
        </View>
        <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>{title}</Text>
            <Text style={styles.featureDescription}>{description}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.darker,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: spacing.lg,
        paddingBottom: spacing.xxl,
    },
    heroSection: {
        marginBottom: spacing.xl,
        alignItems: 'center',
    },
    heroTitle: {
        fontSize: fontSize.xxxl,
        fontWeight: fontWeight.extrabold,
        color: colors.text.primary,
        textAlign: 'center',
        marginBottom: spacing.md,
    },
    heroHighlight: {
        color: colors.primary.gold,
    },
    heroSubtitle: {
        fontSize: fontSize.md,
        color: colors.text.secondary,
        textAlign: 'center',
        paddingHorizontal: spacing.lg,
    },
    sectionTitle: {
        fontSize: fontSize.xl,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
        marginBottom: spacing.lg,
    },
    goldText: {
        color: colors.primary.gold,
    },
    platformGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
        marginBottom: spacing.xl,
    },
    historyCard: {
        flex: 1,
        minWidth: '45%',
    },
    historyCardInner: {
        backgroundColor: colors.background.glass,
        borderRadius: borderRadius.xl,
        borderWidth: 1,
        borderColor: colors.border.gold,
        padding: spacing.lg,
        alignItems: 'center',
        gap: spacing.md,
    },
    historyIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    historyCardText: {
        color: colors.text.primary,
        fontSize: fontSize.md,
        fontWeight: fontWeight.semibold,
    },
    arrowContainer: {
        position: 'absolute',
        top: spacing.md,
        right: spacing.md,
    },
    featuresSection: {
        marginBottom: spacing.xl,
    },
    featuresList: {
        gap: spacing.md,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background.glass,
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.border.default,
        gap: spacing.md,
    },
    featureIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    featureContent: {
        flex: 1,
    },
    featureTitle: {
        fontSize: fontSize.md,
        fontWeight: fontWeight.semibold,
        color: colors.text.primary,
        marginBottom: 2,
    },
    featureDescription: {
        fontSize: fontSize.sm,
        color: colors.text.muted,
    },
    footer: {
        alignItems: 'center',
        paddingTop: spacing.xl,
        borderTopWidth: 1,
        borderTopColor: colors.border.default,
    },
    footerText: {
        color: colors.text.secondary,
        fontSize: fontSize.sm,
        marginBottom: spacing.xs,
    },
    copyright: {
        color: colors.text.muted,
        fontSize: fontSize.xs,
    },
});
