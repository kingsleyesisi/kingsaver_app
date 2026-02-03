/**
 * API Service
 * Central API client for video information fetching
 * Uses TikWM API for TikTok and backend server for other platforms
 */

import axios from 'axios';
import { VideoInfo, Platform, ApiResponse } from '../types';

// TikWM API for TikTok (direct)
const TIKTOK_API = 'https://www.tikwm.com/api/';

// Backend API base URL (King Saver backend)
// Change this to your deployed backend URL
const BACKEND_API = 'https://kingsaver.vercel.app'; // or your deployed server URL

/**
 * Fetch TikTok video information (uses TikWM API directly)
 */
export async function getTikTokInfo(url: string): Promise<VideoInfo> {
    try {
        const response = await axios.post(TIKTOK_API, {
            url: url,
            hd: 1,
        });

        if (response.data.code !== 0) {
            throw new Error(response.data.msg || 'Failed to fetch video information');
        }

        const data = response.data.data;

        return {
            id: data.id,
            title: data.title || 'TikTok Video',
            author: data.author?.unique_id || data.author?.nickname || 'Unknown',
            authorAvatar: data.author?.avatar,
            thumbnail: data.cover || data.origin_cover,
            duration: data.duration || 0,
            type: (data.images && data.images.length > 0) || data.duration === 0 ? 'slideshow' : 'video',
            platform: 'tiktok',
            hdDownloadUrl: data.hdplay,
            sdDownloadUrl: data.play,
            downloadUrl: data.hdplay || data.play,
            images: data.images,
            music: data.music ? {
                title: data.music.title,
                author: data.music.author,
                url: data.music.play,
            } : undefined,
            stats: {
                plays: data.play_count,
                likes: data.digg_count,
                comments: data.comment_count,
                shares: data.share_count,
            },
        };
    } catch (error: any) {
        console.error('TikTok API Error:', error.message);
        throw new Error(error.response?.data?.msg || error.message || 'Failed to fetch TikTok video');
    }
}

/**
 * Fetch YouTube video information via backend
 */
export async function getYouTubeInfo(url: string): Promise<VideoInfo> {
    try {
        const response = await axios.post(`${BACKEND_API}/api/info`, { url });
        const data = response.data;

        // Map to our VideoInfo structure
        return {
            id: data.id || extractVideoId(url, 'youtube'),
            title: data.title || 'YouTube Video',
            author: data.author?.name || data.uploader || 'YouTube Creator',
            authorAvatar: data.author?.avatar,
            thumbnail: data.thumbnail,
            duration: parseInt(data.duration) || 0,
            type: 'video',
            platform: 'youtube',
            downloadUrl: data.play || data.url,
            hdDownloadUrl: getFormatUrl(data.formats, 'hd'),
            sdDownloadUrl: getFormatUrl(data.formats, 'sd'),
            formats: data.formats,
        };
    } catch (error: any) {
        console.error('YouTube API Error:', error.message);
        throw new Error(error.response?.data?.error || 'Failed to fetch YouTube video');
    }
}

/**
 * Fetch Instagram video information via backend
 */
export async function getInstagramInfo(url: string): Promise<VideoInfo> {
    try {
        const response = await axios.post(`${BACKEND_API}/api/instagram/info`, { url });
        const data = response.data;

        return {
            id: data.id || Date.now().toString(),
            title: data.title || data.description?.substring(0, 50) || 'Instagram Post',
            author: data.uploader || data.uploader_id || 'Instagram User',
            authorAvatar: undefined,
            thumbnail: data.thumbnail,
            duration: parseInt(data.duration) || 0,
            type: data.type === 'slideshow' || data.images ? 'slideshow' : 'video',
            platform: 'instagram',
            downloadUrl: data.play || data.url,
            hdDownloadUrl: data.play || data.url,
            sdDownloadUrl: data.play || data.url,
            images: data.images,
        };
    } catch (error: any) {
        console.error('Instagram API Error:', error.message);
        throw new Error(error.response?.data?.error || 'Failed to fetch Instagram content');
    }
}

/**
 * Fetch Facebook video information via backend
 */
export async function getFacebookInfo(url: string): Promise<VideoInfo> {
    try {
        const response = await axios.post(`${BACKEND_API}/api/facebook/info`, { url });
        const data = response.data;

        return {
            id: data.id || Date.now().toString(),
            title: data.title || 'Facebook Video',
            author: data.uploader || 'Facebook User',
            authorAvatar: undefined,
            thumbnail: data.thumbnail,
            duration: parseInt(data.duration) || 0,
            type: 'video',
            platform: 'facebook',
            downloadUrl: data.play || data.url,
            hdDownloadUrl: data.play || data.url,
            sdDownloadUrl: data.play || data.url,
        };
    } catch (error: any) {
        console.error('Facebook API Error:', error.message);
        throw new Error(error.response?.data?.error || 'Failed to fetch Facebook video');
    }
}

/**
 * Fetch Twitter video information via backend
 */
export async function getTwitterInfo(url: string): Promise<VideoInfo> {
    try {
        const response = await axios.post(`${BACKEND_API}/api/twitter/info`, { url });
        const data = response.data;

        // Get best quality format
        const formats = data.formats || [];
        const bestFormat = formats.find((f: any) => f.height >= 720) || formats[0];

        return {
            id: data.id || Date.now().toString(),
            title: data.title || data.description?.substring(0, 50) || 'Twitter Video',
            author: data.uploader || data.uploader_id || 'Twitter User',
            authorAvatar: undefined,
            thumbnail: data.thumbnail,
            duration: parseInt(data.duration) || 0,
            type: 'video',
            platform: 'twitter',
            downloadUrl: bestFormat?.url || data.play || data.url,
            hdDownloadUrl: formats.find((f: any) => f.height >= 720)?.url || data.play,
            sdDownloadUrl: formats.find((f: any) => f.height < 720)?.url || data.play,
            formats: formats,
        };
    } catch (error: any) {
        console.error('Twitter API Error:', error.message);
        throw new Error(error.response?.data?.error || 'Failed to fetch Twitter video');
    }
}

/**
 * Universal video info fetcher
 */
export async function getVideoInfo(url: string, platform: Platform): Promise<VideoInfo> {
    switch (platform) {
        case 'tiktok':
            return getTikTokInfo(url);
        case 'youtube':
            return getYouTubeInfo(url);
        case 'instagram':
            return getInstagramInfo(url);
        case 'facebook':
            return getFacebookInfo(url);
        case 'twitter':
            return getTwitterInfo(url);
        default:
            throw new Error('Unsupported platform');
    }
}

/**
 * Detect platform from URL
 */
export function detectPlatform(url: string): Platform | null {
    const lowerUrl = url.toLowerCase();

    if (lowerUrl.includes('tiktok.com') || lowerUrl.includes('vt.tiktok')) {
        return 'tiktok';
    }
    if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) {
        return 'youtube';
    }
    if (lowerUrl.includes('instagram.com') || lowerUrl.includes('instagr.am')) {
        return 'instagram';
    }
    if (lowerUrl.includes('facebook.com') || lowerUrl.includes('fb.watch')) {
        return 'facebook';
    }
    if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) {
        return 'twitter';
    }

    return null;
}

// Helper functions
function extractVideoId(url: string, platform: string): string {
    if (platform === 'youtube') {
        const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : Date.now().toString();
    }
    return Date.now().toString();
}

function getFormatUrl(formats: any[], quality: 'hd' | 'sd'): string | undefined {
    if (!formats || formats.length === 0) return undefined;

    if (quality === 'hd') {
        // Find highest resolution
        const hdFormat = formats.find((f: any) =>
            f.qualityLabel?.includes('1080') || f.qualityLabel?.includes('720')
        );
        return hdFormat?.url;
    } else {
        // Find lower resolution
        const sdFormat = formats.find((f: any) =>
            f.qualityLabel?.includes('480') || f.qualityLabel?.includes('360')
        );
        return sdFormat?.url || formats[formats.length - 1]?.url;
    }
}
