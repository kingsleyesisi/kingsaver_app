/**
 * King Saver Color Palette
 * Premium dark theme with gold accents
 */

export const colors = {
    // Primary brand colors
    primary: {
        gold: '#FFD700',
        goldLight: '#FACC15',
        goldDark: '#EAB308',
    },

    // Background colors
    background: {
        dark: '#1a1a1a',
        darker: '#0f0f0f',
        card: 'rgba(255, 255, 255, 0.05)',
        glass: 'rgba(255, 255, 255, 0.08)',
    },

    // Text colors
    text: {
        primary: '#FFFFFF',
        secondary: '#9CA3AF',
        muted: '#6B7280',
        dark: '#111827',
    },

    // Platform brand colors
    platforms: {
        tiktok: '#000000',
        youtube: '#FF0000',
        instagram: '#E1306C',
        instagramGradient: ['#833AB4', '#FD1D1D', '#F77737'],
        facebook: '#1877F2',
        twitter: '#000000',
    },

    // Semantic colors
    semantic: {
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
    },

    // Border colors
    border: {
        default: 'rgba(255, 255, 255, 0.1)',
        light: 'rgba(255, 255, 255, 0.2)',
        gold: 'rgba(255, 215, 0, 0.3)',
    },

    // Shadow colors
    shadow: {
        gold: 'rgba(255, 215, 0, 0.3)',
        dark: 'rgba(0, 0, 0, 0.5)',
    },
};

export type Colors = typeof colors;
