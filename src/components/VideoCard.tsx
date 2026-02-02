/**
 * VideoCard Component
 * Displays video info with thumbnail and download options
 */

import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../theme';
import { VideoInfo } from '../types';

interface VideoCardProps {
    video: VideoInfo;
    onDownload: (quality: 'hd' | 'sd') => void;
    onDownloadAudio?: () => void;
    downloading?: boolean;
    progress?: number;
}

export const VideoCard: React.FC<VideoCardProps> = ({
    video,
    onDownload,
    onDownloadAudio,
    downloading = false,
    progress = 0,
}) => {
    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const formatNumber = (num?: number) => {
        if (!num) return '0';
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    const handleDownload = (quality: 'hd' | 'sd') => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onDownload(quality);
    };

    return (
        <View style={styles.container}>
            {/* Thumbnail */}
            <View style={styles.thumbnailContainer}>
                {video.thumbnail ? (
                    <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
                ) : (
                    <View style={styles.thumbnailPlaceholder}>
                        <Ionicons name="videocam" size={48} color={colors.text.muted} />
                    </View>
                )}

                {/* Duration Badge */}
                {video.duration > 0 && (
                    <View style={styles.durationBadge}>
                        <Text style={styles.durationText}>{formatDuration(video.duration)}</Text>
                    </View>
                )}

                {/* Type Badge */}
                {video.type === 'slideshow' && (
                    <View style={styles.typeBadge}>
                        <Ionicons name="images" size={12} color={colors.text.primary} />
                        <Text style={styles.typeText}>Slideshow</Text>
                    </View>
                )}
            </View>

            {/* Content */}
            <View style={styles.content}>
                {/* Author */}
                <View style={styles.authorRow}>
                    {video.authorAvatar && (
                        <Image source={{ uri: video.authorAvatar }} style={styles.avatar} />
                    )}
                    <Text style={styles.author} numberOfLines={1}>@{video.author}</Text>
                </View>

                {/* Title */}
                <Text style={styles.title} numberOfLines={2}>{video.title || 'Untitled Video'}</Text>

                {/* Stats */}
                {video.stats && (
                    <View style={styles.statsRow}>
                        {video.stats.plays !== undefined && (
                            <View style={styles.stat}>
                                <Ionicons name="play" size={12} color={colors.text.muted} />
                                <Text style={styles.statText}>{formatNumber(video.stats.plays)}</Text>
                            </View>
                        )}
                        {video.stats.likes !== undefined && (
                            <View style={styles.stat}>
                                <Ionicons name="heart" size={12} color={colors.text.muted} />
                                <Text style={styles.statText}>{formatNumber(video.stats.likes)}</Text>
                            </View>
                        )}
                    </View>
                )}

                {/* Download Progress */}
                {downloading && (
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <LinearGradient
                                colors={[colors.primary.gold, colors.primary.goldDark]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={[styles.progressFill, { width: `${progress}%` }]}
                            />
                        </View>
                        <Text style={styles.progressText}>{Math.round(progress)}%</Text>
                    </View>
                )}

                {/* Download Buttons */}
                {!downloading && (
                    <View style={styles.downloadButtons}>
                        <TouchableOpacity
                            style={styles.downloadButton}
                            onPress={() => handleDownload('hd')}
                        >
                            <LinearGradient
                                colors={[colors.primary.gold, colors.primary.goldDark]}
                                style={styles.downloadGradient}
                            >
                                <Ionicons name="download" size={16} color={colors.text.dark} />
                                <Text style={styles.downloadButtonText}>HD</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.downloadButton, styles.sdButton]}
                            onPress={() => handleDownload('sd')}
                        >
                            <Ionicons name="download-outline" size={16} color={colors.text.primary} />
                            <Text style={styles.sdButtonText}>SD</Text>
                        </TouchableOpacity>

                        {onDownloadAudio && (
                            <TouchableOpacity
                                style={[styles.downloadButton, styles.audioButton]}
                                onPress={onDownloadAudio}
                            >
                                <Ionicons name="musical-notes" size={16} color={colors.primary.gold} />
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background.glass,
        borderRadius: borderRadius.xl,
        borderWidth: 1,
        borderColor: colors.border.default,
        overflow: 'hidden',
    },
    thumbnailContainer: {
        position: 'relative',
        aspectRatio: 16 / 9,
        backgroundColor: colors.background.darker,
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    thumbnailPlaceholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    durationBadge: {
        position: 'absolute',
        bottom: spacing.sm,
        right: spacing.sm,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: borderRadius.sm,
    },
    durationText: {
        color: colors.text.primary,
        fontSize: fontSize.xs,
        fontWeight: fontWeight.medium,
    },
    typeBadge: {
        position: 'absolute',
        top: spacing.sm,
        left: spacing.sm,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: borderRadius.sm,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    typeText: {
        color: colors.text.primary,
        fontSize: fontSize.xs,
        fontWeight: fontWeight.medium,
    },
    content: {
        padding: spacing.md,
    },
    authorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.xs,
    },
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    author: {
        color: colors.text.secondary,
        fontSize: fontSize.sm,
        flex: 1,
    },
    title: {
        color: colors.text.primary,
        fontSize: fontSize.md,
        fontWeight: fontWeight.semibold,
        marginBottom: spacing.sm,
    },
    statsRow: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.md,
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statText: {
        color: colors.text.muted,
        fontSize: fontSize.xs,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    progressBar: {
        flex: 1,
        height: 4,
        backgroundColor: colors.background.darker,
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 2,
    },
    progressText: {
        color: colors.primary.gold,
        fontSize: fontSize.xs,
        fontWeight: fontWeight.bold,
        width: 40,
        textAlign: 'right',
    },
    downloadButtons: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    downloadButton: {
        flex: 1,
    },
    downloadGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.md,
    },
    downloadButtonText: {
        color: colors.text.dark,
        fontSize: fontSize.sm,
        fontWeight: fontWeight.bold,
    },
    sdButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs,
        backgroundColor: colors.background.dark,
        borderWidth: 1,
        borderColor: colors.border.default,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.md,
    },
    sdButtonText: {
        color: colors.text.primary,
        fontSize: fontSize.sm,
        fontWeight: fontWeight.semibold,
    },
    audioButton: {
        flex: 0,
        width: 44,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary.gold,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.md,
    },
});
