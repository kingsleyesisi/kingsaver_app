/**
 * TikTokScreen
 * TikTok video downloader screen
 */

import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
    Header,
    Input,
    Button,
    VideoCard,
    LoadingSpinner,
} from '../components';
import { getTikTokInfo, downloadVideo, downloadSlideshow } from '../services';
import { addToHistory } from '../storage/asyncStorage';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../theme';
import { VideoInfo, DownloadProgress } from '../types';

export const TikTokScreen: React.FC = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
    const [downloading, setDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const handleFetch = useCallback(async () => {
        if (!url.trim()) {
            Alert.alert('Error', 'Please enter a TikTok URL');
            return;
        }

        // Validate URL
        if (!url.toLowerCase().includes('tiktok.com')) {
            Alert.alert('Error', 'Please enter a valid TikTok URL');
            return;
        }

        setLoading(true);
        setError(null);
        setVideoInfo(null);

        try {
            const info = await getTikTokInfo(url);
            setVideoInfo(info);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch video information');
            Alert.alert('Error', err.message || 'Failed to fetch video information');
        } finally {
            setLoading(false);
        }
    }, [url]);

    const handleDownload = useCallback(async (quality: 'hd' | 'sd') => {
        if (!videoInfo) return;

        setDownloading(true);
        setDownloadProgress(0);

        try {
            if (videoInfo.type === 'slideshow' && videoInfo.images) {
                // Download slideshow images
                await downloadSlideshow(videoInfo, (progress: DownloadProgress) => {
                    setDownloadProgress(progress.progress);
                });
            } else {
                // Download video
                await downloadVideo(videoInfo, quality, (progress: DownloadProgress) => {
                    setDownloadProgress(progress.progress);
                });
            }

            // Add to history
            await addToHistory(videoInfo);

            Alert.alert(
                'Success! 🎉',
                'Video saved to your gallery in the "King Saver" album',
                [{ text: 'Awesome!' }]
            );
        } catch (err: any) {
            Alert.alert('Download Failed', err.message || 'Could not download video');
        } finally {
            setDownloading(false);
            setDownloadProgress(0);
        }
    }, [videoInfo]);

    const handleClear = () => {
        setUrl('');
        setVideoInfo(null);
        setError(null);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="TikTok" showBack showLogo={false} />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* TikTok Branding */}
                    <View style={styles.brandingSection}>
                        <View style={styles.tiktokIcon}>
                            <Text style={styles.tiktokIconText}>♪</Text>
                        </View>
                        <Text style={styles.title}>
                            Download TikTok Videos{'\n'}
                            <Text style={styles.highlight}>Without Watermark</Text>
                        </Text>
                        <Text style={styles.subtitle}>
                            Paste a TikTok link to download videos in HD quality
                        </Text>
                    </View>

                    {/* Input Section */}
                    <View style={styles.inputSection}>
                        <Input
                            value={url}
                            onChangeText={setUrl}
                            placeholder="Paste TikTok link here..."
                            showPasteButton
                            showClearButton
                        />

                        <View style={styles.buttonRow}>
                            <Button
                                title={loading ? 'Fetching...' : 'Get Video'}
                                onPress={handleFetch}
                                loading={loading}
                                disabled={!url.trim() || loading}
                                icon={<Ionicons name="search" size={18} color={colors.text.dark} />}
                                fullWidth
                            />
                        </View>

                        {videoInfo && (
                            <Button
                                title="Clear"
                                onPress={handleClear}
                                variant="outline"
                                size="small"
                                style={styles.clearButton}
                            />
                        )}
                    </View>

                    {/* Loading State */}
                    {loading && (
                        <LoadingSpinner message="Fetching video magic..." />
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <View style={styles.errorContainer}>
                            <Ionicons name="alert-circle" size={48} color={colors.semantic.error} />
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}

                    {/* Video Result */}
                    {videoInfo && !loading && (
                        <View style={styles.resultSection}>
                            <Text style={styles.resultTitle}>Ready to Download</Text>
                            <VideoCard
                                video={videoInfo}
                                onDownload={handleDownload}
                                downloading={downloading}
                                progress={downloadProgress}
                            />
                        </View>
                    )}

                    {/* Tips Section */}
                    {!videoInfo && !loading && (
                        <View style={styles.tipsSection}>
                            <Text style={styles.tipsTitle}>How to use:</Text>
                            <View style={styles.tipItem}>
                                <View style={styles.tipNumber}>
                                    <Text style={styles.tipNumberText}>1</Text>
                                </View>
                                <Text style={styles.tipText}>Open TikTok and find a video</Text>
                            </View>
                            <View style={styles.tipItem}>
                                <View style={styles.tipNumber}>
                                    <Text style={styles.tipNumberText}>2</Text>
                                </View>
                                <Text style={styles.tipText}>Tap "Share" then "Copy Link"</Text>
                            </View>
                            <View style={styles.tipItem}>
                                <View style={styles.tipNumber}>
                                    <Text style={styles.tipNumberText}>3</Text>
                                </View>
                                <Text style={styles.tipText}>Paste the link above and download!</Text>
                            </View>
                        </View>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.darker,
    },
    keyboardView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: spacing.lg,
        paddingBottom: spacing.xxl,
    },
    brandingSection: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    tiktokIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: colors.platforms.tiktok,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.md,
        borderWidth: 2,
        borderColor: colors.border.light,
    },
    tiktokIconText: {
        fontSize: 28,
        color: '#FFF',
    },
    title: {
        fontSize: fontSize.xxl,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    highlight: {
        color: colors.primary.gold,
    },
    subtitle: {
        fontSize: fontSize.md,
        color: colors.text.secondary,
        textAlign: 'center',
    },
    inputSection: {
        marginBottom: spacing.lg,
    },
    buttonRow: {
        marginTop: spacing.md,
    },
    clearButton: {
        marginTop: spacing.sm,
        alignSelf: 'center',
    },
    errorContainer: {
        alignItems: 'center',
        padding: spacing.xl,
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.3)',
    },
    errorText: {
        color: colors.semantic.error,
        fontSize: fontSize.md,
        textAlign: 'center',
        marginTop: spacing.md,
    },
    resultSection: {
        marginBottom: spacing.lg,
    },
    resultTitle: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.semibold,
        color: colors.text.primary,
        marginBottom: spacing.md,
    },
    tipsSection: {
        backgroundColor: colors.background.glass,
        padding: spacing.lg,
        borderRadius: borderRadius.xl,
        borderWidth: 1,
        borderColor: colors.border.default,
    },
    tipsTitle: {
        fontSize: fontSize.md,
        fontWeight: fontWeight.semibold,
        color: colors.text.primary,
        marginBottom: spacing.md,
    },
    tipItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
        gap: spacing.md,
    },
    tipNumber: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.primary.gold,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tipNumberText: {
        color: colors.text.dark,
        fontSize: fontSize.sm,
        fontWeight: fontWeight.bold,
    },
    tipText: {
        flex: 1,
        color: colors.text.secondary,
        fontSize: fontSize.sm,
    },
});
