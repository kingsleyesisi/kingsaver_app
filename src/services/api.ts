/**
 * API Service
 * Central API client for video information fetching
 */

import axios from 'axios';
import { VideoInfo, Platform, ApiResponse } from '../types';

// TikWM API for TikTok
const TIKTOK_API = 'https://www.tikwm.com/api/';

// For other platforms, we'll use similar free APIs
// Note: These may require a backend proxy for production use

/**
 * Fetch TikTok video information
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
 * Fetch YouTube video information
 * Note: Requires backend proxy for full functionality
 */
export async function getYouTubeInfo(url: string): Promise<VideoInfo> {
    // Extract video ID from URL
    const videoIdMatch = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (!videoId) {
        throw new Error('Invalid YouTube URL');
    }

    // For now, return basic info - full implementation requires backend
    return {
        id: videoId,
        title: 'YouTube Video',
        author: 'YouTube Creator',
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        duration: 0,
        type: 'video',
        platform: 'youtube',
        downloadUrl: undefined, // Requires backend processing
    };
}

/**
 * Fetch Instagram video information
 * Note: Requires backend proxy for full functionality
 */
export async function getInstagramInfo(url: string): Promise<VideoInfo> {
    // Instagram API requires authentication or scraping
    // For demo purposes, return placeholder
    throw new Error('Instagram download requires backend setup. Please configure the backend API.');
}

/**
 * Fetch Facebook video information
 * Note: Requires backend proxy for full functionality
 */
export async function getFacebookInfo(url: string): Promise<VideoInfo> {
    // Facebook API requires authentication
    throw new Error('Facebook download requires backend setup. Please configure the backend API.');
}

/**
 * Fetch Twitter video information
 * Note: Requires backend proxy for full functionality
 */
export async function getTwitterInfo(url: string): Promise<VideoInfo> {
    // Twitter API requires authentication
    throw new Error('Twitter download requires backend setup. Please configure the backend API.');
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
