/**
 * TypeScript Type Definitions
 */

// Video Info types
export interface VideoInfo {
    id: string;
    title: string;
    author: string;
    authorAvatar?: string;
    thumbnail?: string;
    duration: number;
    type: 'video' | 'slideshow';
    platform: Platform;
    downloadUrl?: string;
    hdDownloadUrl?: string;
    sdDownloadUrl?: string;
    images?: string[];
    music?: {
        title: string;
        author: string;
        url: string;
    };
    stats?: {
        plays?: number;
        likes?: number;
        comments?: number;
        shares?: number;
    };
    formats?: VideoFormat[];
}

export interface VideoFormat {
    itag?: string | number;
    qualityLabel?: string;
    container?: string;
    hasVideo?: boolean;
    hasAudio?: boolean;
    url?: string;
    height?: number;
    width?: number;
}

export type Platform = 'tiktok' | 'youtube' | 'instagram' | 'facebook' | 'twitter';

// Download History Item
export interface DownloadHistoryItem {
    id: string;
    videoInfo: VideoInfo;
    downloadedAt: string;
    filePath?: string;
}

// API Response types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

// Navigation types
export type RootStackParamList = {
    Home: undefined;
    TikTok: undefined;
    YouTube: undefined;
    Instagram: undefined;
    Facebook: undefined;
    Twitter: undefined;
    History: undefined;
    Settings: undefined;
};

// Platform Card info
export interface PlatformInfo {
    id: Platform;
    name: string;
    icon: string;
    color: string;
    gradient?: string[];
    route: keyof RootStackParamList;
}

// Download Progress
export interface DownloadProgress {
    videoId: string;
    progress: number;
    status: 'pending' | 'downloading' | 'completed' | 'failed';
    error?: string;
}
