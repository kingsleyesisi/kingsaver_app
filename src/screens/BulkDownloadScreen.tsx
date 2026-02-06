import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    Platform as RNPlatform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
    Header,
    Button,
    VideoCard,
    LoadingSpinner,
} from '../components';
import {
    getTikTokInfo,
} from '../services';
import { downloadVideo, downloadSlideshow } from '../services';
import { addToHistory } from '../storage/asyncStorage';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../theme';
import { VideoInfo, DownloadProgress } from '../types';

export const BulkDownloadScreen: React.FC = () => {
    const [urlsText, setUrlsText] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<VideoInfo[]>([]);
    const [downloading, setDownloading] = useState(false);
    const [progressMap, setProgressMap] = useState<Record<string, number>>({});
    const [currentDownloadId, setCurrentDownloadId] = useState<string | null>(null);

    const handleProcessBatch = async () => {
        const urls = urlsText.split('\n').filter(u => u.trim());
        if (urls.length === 0) {
            Alert.alert('Error', 'Please enter at least one URL');
            return;
        }

        setLoading(true);
        setResults([]);
        const newResults: VideoInfo[] = [];

        // For now, we assume TikTok links based on the web app's bulk logic mainly focusing on it,
        // but we can try to detect platform or just try tiktok first.
        // Web app bulk logic used getTikTokData directly.
        // We will strictly use getTikTokInfo for now as requested for "bulk downloading" which usually implies the main feature.
        // Or we can use `getVideoInfo` generic if we import it.
        // Let's use getTikTokInfo for now as per web app parody.

        for (const url of urls) {
            try {
                // Determine platform or just try tiktok?
                // The web app bulk input was general but mostly for tiktok.
                // Let's assume TikTok for the "Bulk" feature primarily unless we do detection.
                const info = await getTikTokInfo(url.trim());
                newResults.push(info);
            } catch (error) {
                console.error(`Failed to fetch ${url}:`, error);
                // We could add a "failed" placeholder or just skip
            }
        }

        setResults(newResults);
        setLoading(false);

        if (newResults.length === 0) {
            Alert.alert('No Videos Found', 'Could not fetch details for the provided links.');
        }
    };

    const handleDownloadOne = async (video: VideoInfo) => {
        setCurrentDownloadId(video.id);
        setProgressMap(prev => ({ ...prev, [video.id]: 1 }));

        try {
            if (video.type === 'slideshow' && video.images) {
                await downloadSlideshow(video, (p) => {
                    setProgressMap(prev => ({ ...prev, [video.id]: p.progress }));
                });
            } else {
                await downloadVideo(video, 'hd', (p) => {
                    setProgressMap(prev => ({ ...prev, [video.id]: p.progress }));
                });
            }
            await addToHistory(video);
            setProgressMap(prev => ({ ...prev, [video.id]: 100 }));
            Alert.alert('Success', 'Saved to Gallery');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Download failed');
            setProgressMap(prev => ({ ...prev, [video.id]: 0 }));
        } finally {
            setCurrentDownloadId(null);
        }
    };

    const handleDownloadAll = async () => {
        if (results.length === 0) return;
        setDownloading(true);

        let successCount = 0;

        for (const video of results) {
            setCurrentDownloadId(video.id);
            try {
                if (video.type === 'slideshow' && video.images) {
                    await downloadSlideshow(video, (p) => {
                        setProgressMap(prev => ({ ...prev, [video.id]: p.progress }));
                    });
                } else {
                    await downloadVideo(video, 'hd', (p) => {
                        setProgressMap(prev => ({ ...prev, [video.id]: p.progress }));
                    });
                }
                await addToHistory(video);
                setProgressMap(prev => ({ ...prev, [video.id]: 100 }));
                successCount++;
            } catch (error) {
                console.error(`Failed to download ${video.id}`, error);
                setProgressMap(prev => ({ ...prev, [video.id]: 0 }));
            }
        }

        setDownloading(false);
        setCurrentDownloadId(null);
        Alert.alert('Batch Complete', `Downloaded ${successCount} of ${results.length} items.`);
    };

    const handleClear = () => {
        setUrlsText('');
        setResults([]);
        setProgressMap({});
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Bulk Downloader" showBack />

            <KeyboardAvoidingView
                behavior={RNPlatform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.introSection}>
                        <Text style={styles.title}>
                            Batch Download{'\n'}
                            <Text style={styles.highlight}>Multiple Videos</Text>
                        </Text>
                        <Text style={styles.subtitle}>
                            Paste multiple links (one per line) to download them all at once.
                        </Text>
                    </View>

                    <View style={styles.inputSection}>
                        <View style={styles.textAreaContainer}>
                            <TextInput
                                style={styles.textArea}
                                multiline
                                numberOfLines={6}
                                placeholder="Paste links here..."
                                placeholderTextColor={colors.text.muted}
                                value={urlsText}
                                onChangeText={setUrlsText}
                                textAlignVertical="top"
                            />
                        </View>

                        <View style={styles.buttonRow}>
                            <Button
                                title="Process Batch"
                                onPress={handleProcessBatch}
                                loading={loading}
                                disabled={!urlsText.trim() || loading}
                                icon={<Ionicons name="layers" size={20} color={colors.text.dark} />}
                                fullWidth
                            />
                        </View>

                        {results.length > 0 && (
                            <Button
                                title="Clear All"
                                onPress={handleClear}
                                variant="outline"
                                size="small"
                                style={styles.clearButton}
                            />
                        )}
                    </View>

                    {loading && (
                        <LoadingSpinner message="Processing links..." />
                    )}

                    {!loading && results.length > 0 && (
                        <View style={styles.resultsSection}>
                            <View style={styles.resultsHeader}>
                                <Text style={styles.resultsTitle}>Found {results.length} Videos</Text>
                                <Button
                                    title={downloading ? "Downloading..." : "Download All"}
                                    onPress={handleDownloadAll}
                                    disabled={downloading}
                                    size="small"
                                />
                            </View>

                            {results.map((video, index) => (
                                <View key={video.id + index} style={styles.resultItem}>
                                    <VideoCard
                                        video={video}
                                        onDownload={() => handleDownloadOne(video)}
                                        downloading={currentDownloadId === video.id}
                                        progress={progressMap[video.id] || 0}
                                    />
                                </View>
                            ))}
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
    introSection: {
        alignItems: 'center',
        marginBottom: spacing.xl,
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
    textAreaContainer: {
        backgroundColor: colors.background.dark,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.border.default,
        padding: spacing.md,
        marginBottom: spacing.md,
    },
    textArea: {
        color: colors.text.primary,
        fontSize: fontSize.md,
        minHeight: 120,
    },
    buttonRow: {
        marginTop: spacing.sm,
    },
    clearButton: {
        marginTop: spacing.md,
        alignSelf: 'center',
    },
    resultsSection: {
        marginTop: spacing.lg,
    },
    resultsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    resultsTitle: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
    },
    resultItem: {
        marginBottom: spacing.lg,
    },
});
