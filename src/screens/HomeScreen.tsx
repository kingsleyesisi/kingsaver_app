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
    StatusBar,
    TouchableOpacity,
    useWindowDimensions,
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
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

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

                <View style={styles.bulkSection}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('BulkDownload')}
                    >
                        <LinearGradient
                            colors={[colors.primary.goldDark, colors.primary.gold]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.bulkBanner}
                        >
                            <View style={styles.bulkContentLeft}>
                                <View style={styles.bulkIconCircle}>
                                    <Ionicons name="layers" size={24} color={colors.text.dark} />
                                </View>
                                <View>
                                    <Text style={styles.bulkBannerTitle}>Bulk Downloader</Text>
                                    <Text style={styles.bulkBannerSubtitle}>Save multiple videos properly</Text>
                                </View>
                            </View>
                            <View style={styles.bulkArrow}>
                                <Ionicons name="arrow-forward" size={24} color={colors.text.dark} />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={styles.platformGrid}>
                    <TikTokCard onPress={() => navigation.navigate('TikTok')} />
                    <YouTubeCard onPress={() => navigation.navigate('YouTube')} />
                    <InstagramCard onPress={() => navigation.navigate('Instagram')} />
                    <FacebookCard onPress={() => navigation.navigate('Facebook')} />
                    <TwitterCard onPress={() => navigation.navigate('Twitter')} />

                    {/* History Card - NOW CLICKABLE */}
                    <TouchableOpacity
                        style={styles.historyCard}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('History')}
                    >
                        <View style={styles.historyCardInner}>
                            <View style={styles.historyIconContainer}>
                                <Ionicons name="time" size={32} color={colors.primary.gold} />
                            </View>
                            <Text style={styles.historyCardText}>History</Text>
                            <View style={styles.arrowContainer}>
                                <Ionicons name="chevron-forward" size={16} color={colors.text.muted} />
                            </View>
                        </View>
                    </TouchableOpacity>
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
        </View>
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
    bulkSection: {
        marginBottom: spacing.xl,
    },
    bulkBanner: {
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: colors.primary.gold,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    bulkContentLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    bulkIconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.text.dark,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bulkBannerTitle: {
        color: colors.text.dark,
        fontSize: fontSize.lg,
        fontWeight: '800',
    },
    bulkBannerSubtitle: {
        color: 'rgba(0,0,0,0.7)',
        fontSize: fontSize.sm,
        fontWeight: fontWeight.medium,
    },
    bulkArrow: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
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
