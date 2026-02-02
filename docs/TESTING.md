# King Saver - Testing Documentation

## Overview
This document provides comprehensive instructions for testing the King Saver React Native Android app.

---

## Prerequisites

- **Node.js** 18+ installed
- **npm** or **yarn** package manager
- **Android Studio** with an emulator configured, OR
- **Physical Android device** with USB debugging enabled
- **Expo Go** app (optional, for quick testing)

---

## Quick Start

### 1. Install Dependencies
```bash
cd /home/king/projects/King-Saver-app
npm install
```

### 2. Start Development Server
```bash
npx expo start
```

### 3. Run on Android
- **Emulator**: Press `a` in the terminal after `expo start`
- **Physical Device**: 
  - Install **Expo Go** from Play Store
  - Scan the QR code shown in terminal

---

## Testing Methodology

### Functional Tests

| Test ID | Test Case | Steps | Expected Result |
|---------|-----------|-------|-----------------|
| TC-001 | App Launch | Start the app | Splash screen shows, then Home screen loads |
| TC-002 | Navigation | Tap each platform card | Navigates to correct platform screen |
| TC-003 | Back Navigation | Tap back arrow | Returns to previous screen |
| TC-004 | TikTok URL Paste | Paste TikTok URL | URL appears in input field |
| TC-005 | TikTok Fetch | Enter valid URL, tap "Get Video" | Video info loads with thumbnail |
| TC-006 | TikTok Download | Tap HD download button | Progress shows, video saves to gallery |
| TC-007 | History View | Navigate to History | Downloaded videos appear |
| TC-008 | History Delete | Swipe/tap delete on item | Item removed from list |
| TC-009 | Clear History | Tap clear all | All items removed |
| TC-010 | Invalid URL | Enter invalid URL | Error message shown |

### UI/UX Tests

| Test ID | Test Case | Steps | Expected Result |
|---------|-----------|-------|-----------------|
| UI-001 | Dark Theme | View all screens | Dark background, gold accents |
| UI-002 | Responsive Layout | Rotate device | UI adapts to orientation |
| UI-003 | Scroll Behavior | Scroll long content | Smooth scrolling, no lag |
| UI-004 | Button Feedback | Tap any button | Haptic feedback + visual response |
| UI-005 | Loading States | Fetch video | Loading spinner shows |

---

## Testing TikTok Download (Primary Feature)

### Valid Test URLs

Use these test URLs to verify TikTok functionality:

```
https://www.tiktok.com/@username/video/123456789
https://vt.tiktok.com/xxxxx/
```

> **Note**: Use real TikTok URLs for testing. The above are example formats.

### Test Procedure

1. Open the app
2. Tap **TikTok** platform card
3. Paste a valid TikTok URL
4. Tap **Get Video**
5. Verify video thumbnail, title, and author display
6. Tap **HD** download button
7. Grant storage permission if prompted
8. Verify progress bar updates
9. Check success alert
10. Open device gallery → **King Saver** album
11. Verify video plays correctly

---

## Building APK for Manual Testing

### Development Build (Debug)
```bash
# Using EAS Build (Recommended)
npm install -g eas-cli
eas login
eas build --platform android --profile development

# Or local build (requires Android SDK)
npx expo prebuild --platform android
cd android && ./gradlew assembleDebug
```

### Preview Build
```bash
eas build --platform android --profile preview
```

The APK will be available for download from the Expo dashboard.

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Expo Go crashes | Ensure package versions match Expo SDK |
| Network errors | Check internet connection |
| Download fails | Grant storage permissions in device settings |
| Video not in gallery | Check "King Saver" album or Downloads folder |
| TypeScript errors | Run `npx tsc --noEmit` to check |

### Debug Commands

```bash
# Check for TypeScript errors
npx tsc --noEmit

# Clear cache
npx expo start --clear

# View logs
npx expo logs
```

---

## Project Structure

```
King-Saver-app/
├── App.tsx                    # Root component
├── src/
│   ├── components/            # Reusable UI components
│   ├── screens/               # App screens
│   ├── services/              # API & download logic
│   ├── storage/               # AsyncStorage utilities
│   ├── navigation/            # React Navigation setup
│   ├── theme/                 # Colors, typography, spacing
│   └── types/                 # TypeScript definitions
└── docs/
    └── TESTING.md             # This file
```

---

## Feature Status

| Platform | Status | Notes |
|----------|--------|-------|
| TikTok | ✅ Fully Working | HD/SD download, slideshow support |
| YouTube | 🔶 Coming Soon | Requires backend proxy |
| Instagram | 🔶 Coming Soon | Requires backend proxy |
| Facebook | 🔶 Coming Soon | Requires backend proxy |
| Twitter/X | 🔶 Coming Soon | Requires backend proxy |

---

## Contact

For issues or questions, refer to the project repository or contact the developer.

**Made with 👑 by King Saver Team**
