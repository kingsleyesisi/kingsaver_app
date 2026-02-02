/**
 * Async Storage Utilities
 * Persist download history and settings
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { DownloadHistoryItem, VideoInfo } from '../types';

const HISTORY_KEY = '@king_saver_history';
const SETTINGS_KEY = '@king_saver_settings';

/**
 * Get download history
 */
export async function getDownloadHistory(): Promise<DownloadHistoryItem[]> {
    try {
        const data = await AsyncStorage.getItem(HISTORY_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Failed to get download history:', error);
        return [];
    }
}

/**
 * Add item to download history
 */
export async function addToHistory(
    videoInfo: VideoInfo,
    filePath?: string
): Promise<void> {
    try {
        const history = await getDownloadHistory();

        const newItem: DownloadHistoryItem = {
            id: `${videoInfo.id}_${Date.now()}`,
            videoInfo,
            downloadedAt: new Date().toISOString(),
            filePath,
        };

        // Add to beginning of array (newest first)
        const updatedHistory = [newItem, ...history].slice(0, 100); // Keep last 100 items

        await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
        console.error('Failed to add to history:', error);
    }
}

/**
 * Remove item from history
 */
export async function removeFromHistory(id: string): Promise<void> {
    try {
        const history = await getDownloadHistory();
        const updatedHistory = history.filter(item => item.id !== id);
        await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
        console.error('Failed to remove from history:', error);
    }
}

/**
 * Clear all history
 */
export async function clearHistory(): Promise<void> {
    try {
        await AsyncStorage.removeItem(HISTORY_KEY);
    } catch (error) {
        console.error('Failed to clear history:', error);
    }
}

/**
 * Settings interface
 */
interface Settings {
    defaultQuality: 'hd' | 'sd';
    saveToGallery: boolean;
    showNotifications: boolean;
}

const DEFAULT_SETTINGS: Settings = {
    defaultQuality: 'hd',
    saveToGallery: true,
    showNotifications: true,
};

/**
 * Get settings
 */
export async function getSettings(): Promise<Settings> {
    try {
        const data = await AsyncStorage.getItem(SETTINGS_KEY);
        return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch (error) {
        console.error('Failed to get settings:', error);
        return DEFAULT_SETTINGS;
    }
}

/**
 * Update settings
 */
export async function updateSettings(settings: Partial<Settings>): Promise<void> {
    try {
        const currentSettings = await getSettings();
        const updatedSettings = { ...currentSettings, ...settings };
        await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updatedSettings));
    } catch (error) {
        console.error('Failed to update settings:', error);
    }
}
