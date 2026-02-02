/**
 * Download Service
 * Handles video downloading and saving to device
 * Uses the new expo-file-system API (SDK 54+)
 */

import { Paths, Directory, File } from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { VideoInfo, DownloadProgress } from '../types';

/**
 * Get or create download directory
 */
async function getDownloadDir(): Promise<Directory> {
    const downloadDir = new Directory(Paths.cache, 'king-saver-downloads');
    if (!downloadDir.exists) {
        await downloadDir.create();
    }
    return downloadDir;
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
        .substring(0, 100);
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

    // Create filename and file
    const filename = sanitizeFilename(video.title || video.id) + '.mp4';
    const downloadDir = await getDownloadDir();
    const file = new File(downloadDir, filename);

    // Update progress: starting
    onProgress?.({
        videoId: video.id,
        progress: 0,
        status: 'downloading',
    });

    try {
        // Download file using fetch and write
        const response = await fetch(downloadUrl);

        if (!response.ok) {
            throw new Error(`Download failed: ${response.status}`);
        }

        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();

        // Write to file
        await file.write(new Uint8Array(arrayBuffer));

        // Update progress to 50% after download
        onProgress?.({
            videoId: video.id,
            progress: 50,
            status: 'downloading',
        });

        // Save to media library
        const asset = await MediaLibrary.createAssetAsync(file.uri);

        // Try to move to a dedicated album
        try {
            const album = await MediaLibrary.getAlbumAsync('King Saver');
            if (album) {
                await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
            } else {
                await MediaLibrary.createAlbumAsync('King Saver', asset, false);
            }
        } catch (albumError) {
            // Album creation may fail on some devices, but file is still saved
            console.warn('Could not save to album:', albumError);
        }

        // Clean up temp file
        try {
            await file.delete();
        } catch (e) {
            // Ignore cleanup errors
        }

        // Update progress: completed
        onProgress?.({
            videoId: video.id,
            progress: 100,
            status: 'completed',
        });

        return file.uri;
    } catch (error: any) {
        // Update progress: failed
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

    const downloadDir = await getDownloadDir();
    const file = new File(downloadDir, sanitizeFilename(filename) + '.jpg');

    const response = await fetch(imageUrl);
    if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
    }

    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    await file.write(new Uint8Array(arrayBuffer));

    // Save to media library
    await MediaLibrary.createAssetAsync(file.uri);

    // Clean up
    try {
        await file.delete();
    } catch (e) {
        // Ignore
    }

    return file.uri;
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
        const filename = `${video.id}_${i + 1}`;

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
