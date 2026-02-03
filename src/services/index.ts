/**
 * Services Barrel Export
 */

// API Services
export {
    getTikTokInfo,
    getYouTubeInfo,
    getInstagramInfo,
    getFacebookInfo,
    getTwitterInfo,
    getVideoInfo,
    detectPlatform,
} from './api';

// Download Services
export {
    downloadVideo,
    downloadImage,
    downloadSlideshow,
    requestPermissions,
} from './download';

// Storage
export {
    getDownloadHistory,
    addToHistory,
    removeFromHistory,
    clearHistory,
    getSettings,
    updateSettings,
} from '../storage/asyncStorage';
