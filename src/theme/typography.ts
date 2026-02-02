/**
 * Typography System
 * Font families, sizes, and weights
 */

import { Platform } from 'react-native';

export const fontFamily = {
    regular: Platform.select({
        ios: 'System',
        android: 'Roboto',
    }) || 'System',
    medium: Platform.select({
        ios: 'System',
        android: 'Roboto',
    }) || 'System',
    bold: Platform.select({
        ios: 'System',
        android: 'Roboto',
    }) || 'System',
};

export const fontSize = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 40,
};

export const fontWeight = {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
};

export const lineHeight = {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
};

export type FontSize = typeof fontSize;
export type FontWeight = typeof fontWeight;
