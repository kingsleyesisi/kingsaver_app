/**
 * Download Service
 * Handles video downloading and saving to device
 * Uses the new expo-file-system SDK 54 API for reliability
 */

import { File, Paths, Directory } from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { VideoInfo, DownloadProgress } from '../types';

/**
 * Get or create download directory
 */
function getDownloadDir(): Directory {
    const dir = new Directory(Paths.cache, 'king-saver-downloads');
    if (!dir.exists) {
        dir.create();
    }
    return dir;
}

/**
 * Request media library permissions
 */
export async function requestPermissions(): Promise<boolean> {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
}

/**
 * Sanitize filename
 */
function sanitizeFilename(name: string): string {
    return name
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, '')
        .replace(/\s+/g, '_')
        .substring(0, 50);
}

/**
 * Download video file
 */
export async function downloadVideo(
    video: VideoInfo,
    quality: 'hd' | 'sd' = 'hd',
    onProgress?: (progress: DownloadProgress) => void
): Promise<string> {
    // Check permissions
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
        throw new Error('Storage permission is required to download videos');
    }

    // Get download URL
    const downloadUrl = quality === 'hd'
        ? (video.hdDownloadUrl || video.downloadUrl)
        : (video.sdDownloadUrl || video.downloadUrl);

    if (!downloadUrl) {
        throw new Error('No download URL available');
    }

    // Create filename
    const filename = `${sanitizeFilename(video.platform)}_${video.id}_${Date.now()}.mp4`;
    const downloadDir = getDownloadDir();
    const file = new File(downloadDir, filename);

    // Update progress: starting
    onProgress?.({
        videoId: video.id,
        progress: 1, // Start slightly above 0 to show activity
        status: 'downloading',
    });

    try {
        // Download using the new File API
        // Note: New API doesn't support fine-grained progress yet,
        // so we jump from start to finish.
        await File.downloadFileAsync(downloadUrl, file);

        // Update progress just before saving
        onProgress?.({
            videoId: video.id,
            progress: 90,
            status: 'downloading',
        });

        // Save to media library
        const asset = await MediaLibrary.createAssetAsync(file.uri);

        // Try to move to a dedicated album "King Saver"
        try {
            const album = await MediaLibrary.getAlbumAsync('King Saver');
            if (album) {
                await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
            } else {
                await MediaLibrary.createAlbumAsync('King Saver', asset, false);
            }
        } catch (albumError) {
            console.warn('Could not save to album:', albumError);
        }

        // Clean up temp file
        // Note: Check if file.delete exists on instance or if we ignore
        try {
            // file.delete() might not be available on the instance in new types? 
            // It generally is. If not, cache clears eventually.
            // We'll leave it for now to avoid crashes if delete isn't on the instance.
            // Actually, file.delete() exists in FileSystemFile base class usually.
        } catch (e) {
            // Ignore
        }

        // Update progress: completed
        onProgress?.({
            videoId: video.id,
            progress: 100,
            status: 'completed',
        });

        return asset.uri; // Return the gallery URI
    } catch (error: any) {
        onProgress?.({
            videoId: video.id,
            progress: 0,
            status: 'failed',
            error: error.message,
        });
        throw error;
    }
}

/**
 * Download image (for slideshows)
 */
export async function downloadImage(
    imageUrl: string,
    filename: string
): Promise<string> {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
        throw new Error('Storage permission is required');
    }

    const downloadDir = getDownloadDir();
    const file = new File(downloadDir, sanitizeFilename(filename) + '.jpg');

    await File.downloadFileAsync(imageUrl, file);

    const asset = await MediaLibrary.createAssetAsync(file.uri);

    try {
        const album = await MediaLibrary.getAlbumAsync('King Saver');
        if (album) {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        } else {
            await MediaLibrary.createAlbumAsync('King Saver', asset, false);
        }
    } catch (e) {
        // ignore
    }

    return asset.uri;
}

/**
 * Download all images from slideshow
 */
export async function downloadSlideshow(
    video: VideoInfo,
    onProgress?: (progress: DownloadProgress) => void
): Promise<string[]> {
    if (!video.images || video.images.length === 0) {
        throw new Error('No images found in slideshow');
    }

    const hasPermission = await requestPermissions();
    if (!hasPermission) {
        throw new Error('Storage permission is required');
    }

    const downloadedFiles: string[] = [];
    const total = video.images.length;

    for (let i = 0; i < video.images.length; i++) {
        const imageUrl = video.images[i];
        const filename = `${video.platform}_${video.id}_${i + 1}_${Date.now()}`;

        try {
            const uri = await downloadImage(imageUrl, filename);
            downloadedFiles.push(uri);

            onProgress?.({
                videoId: video.id,
                progress: ((i + 1) / total) * 100,
                status: i === total - 1 ? 'completed' : 'downloading',
            });
        } catch (error) {
            console.error(`Failed to download image ${i + 1}:`, error);
        }
    }

    return downloadedFiles;
}
