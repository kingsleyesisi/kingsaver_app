/**
 * HistoryScreen
 * Display download history
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    Alert,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header, Button } from '../components';
import { getDownloadHistory, clearHistory, removeFromHistory } from '../storage/asyncStorage';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../theme';
import { DownloadHistoryItem } from '../types';

export const HistoryScreen: React.FC = () => {
    const [history, setHistory] = useState<DownloadHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    const loadHistory = useCallback(async () => {
        setLoading(true);
        const data = await getDownloadHistory();
        setHistory(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        loadHistory();
    }, [loadHistory]);

    const handleClearAll = () => {
        Alert.alert(
            'Clear History',
            'Are you sure you want to clear all download history?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Clear All',
                    style: 'destructive',
                    onPress: async () => {
                        await clearHistory();
                        setHistory([]);
                    },
                },
            ]
        );
    };

    const handleRemoveItem = async (id: string) => {
        await removeFromHistory(id);
        setHistory(prev => prev.filter(item => item.id !== id));
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getPlatformIcon = (platform: string) => {
        switch (platform) {
            case 'tiktok': return '♪';
            case 'youtube': return 'logo-youtube';
            case 'instagram': return 'logo-instagram';
            case 'facebook': return 'logo-facebook';
            case 'twitter': return 'logo-twitter';
            default: return 'videocam';
        }
    };

    const renderItem = ({ item }: { item: DownloadHistoryItem }) => (
        <View style={styles.historyItem}>
            {/* Thumbnail */}
            <View style={styles.thumbnailContainer}>
                {item.videoInfo.thumbnail ? (
                    <Image
                        source={{ uri: item.videoInfo.thumbnail }}
                        style={styles.thumbnail}
                    />
                ) : (
                    <View style={styles.thumbnailPlaceholder}>
                        <Ionicons name="videocam" size={24} color={colors.text.muted} />
                    </View>
                )}

                {/* Platform Badge */}
                <View style={styles.platformBadge}>
                    {item.videoInfo.platform === 'tiktok' ? (
                        <Text style={styles.tiktokIcon}>♪</Text>
                    ) : (
                        <Ionicons
                            name={getPlatformIcon(item.videoInfo.platform) as any}
                            size={12}
                            color="#FFF"
                        />
                    )}
                </View>
            </View>

            {/* Info */}
            <View style={styles.itemInfo}>
                <Text style={styles.itemTitle} numberOfLines={2}>
                    {item.videoInfo.title || 'Untitled Video'}
                </Text>
                <Text style={styles.itemAuthor}>@{item.videoInfo.author}</Text>
                <Text style={styles.itemDate}>{formatDate(item.downloadedAt)}</Text>
            </View>

            {/* Delete Button */}
            <TouchableOpacity
                onPress={() => handleRemoveItem(item.id)}
                style={styles.deleteButton}
            >
                <Ionicons name="trash-outline" size={18} color={colors.semantic.error} />
            </TouchableOpacity>
        </View>
    );

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <Ionicons name="time-outline" size={64} color={colors.text.muted} />
            <Text style={styles.emptyTitle}>No Download History</Text>
            <Text style={styles.emptySubtitle}>
                Videos you download will appear here
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title="History"
                showBack
                showLogo={false}
                rightAction={
                    history.length > 0 ? (
                        <TouchableOpacity onPress={handleClearAll}>
                            <Ionicons name="trash" size={22} color={colors.semantic.error} />
                        </TouchableOpacity>
                    ) : undefined
                }
            />

            <FlatList
                data={history}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={[
                    styles.listContent,
                    history.length === 0 && styles.emptyContent,
                ]}
                ListEmptyComponent={renderEmptyState}
                showsVerticalScrollIndicator={false}
                onRefresh={loadHistory}
                refreshing={loading}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.darker,
    },
    listContent: {
        padding: spacing.md,
    },
    emptyContent: {
        flex: 1,
        justifyContent: 'center',
    },
    emptyState: {
        alignItems: 'center',
        padding: spacing.xl,
    },
    emptyTitle: {
        fontSize: fontSize.xl,
        fontWeight: fontWeight.bold,
        color: colors.text.primary,
        marginTop: spacing.lg,
        marginBottom: spacing.sm,
    },
    emptySubtitle: {
        fontSize: fontSize.md,
        color: colors.text.muted,
        textAlign: 'center',
    },
    historyItem: {
        flexDirection: 'row',
        backgroundColor: colors.background.glass,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.border.default,
        padding: spacing.md,
        marginBottom: spacing.sm,
        gap: spacing.md,
    },
    thumbnailContainer: {
        position: 'relative',
        width: 80,
        height: 80,
        borderRadius: borderRadius.md,
        overflow: 'hidden',
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    thumbnailPlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.background.dark,
        alignItems: 'center',
        justifyContent: 'center',
    },
    platformBadge: {
        position: 'absolute',
        bottom: 4,
        right: 4,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tiktokIcon: {
        fontSize: 10,
        color: '#FFF',
    },
    itemInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    itemTitle: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.semibold,
        color: colors.text.primary,
        marginBottom: 4,
    },
    itemAuthor: {
        fontSize: fontSize.xs,
        color: colors.text.secondary,
        marginBottom: 4,
    },
    itemDate: {
        fontSize: fontSize.xs,
        color: colors.text.muted,
    },
    deleteButton: {
        padding: spacing.sm,
        alignSelf: 'center',
    },
});
