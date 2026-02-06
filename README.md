# King Saver 👑

A premium React Native Android app for downloading social media videos without watermarks.

![React Native](https://img.shields.io/badge/React%20Native-Expo-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Platform](https://img.shields.io/badge/Platform-Android-green)

## Features

- 🎬 **TikTok** - Download videos & slideshows without watermark (fully functional)
- 📺 **YouTube** - Coming soon
- 📸 **Instagram** - Coming soon
- 📘 **Facebook** - Coming soon
- 🐦 **Twitter/X** - Coming soon
- 📱 Premium dark UI with gold accents
- 💾 Auto-save to device gallery
- 📋 Download history

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Android Studio with emulator, OR
- Android device with Expo Go app

### Installation

```bash
# Clone the repo
cd King-Saver-app

# Install dependencies
npm install

# Start development server
npx expo start
```

### Run on Android

**Option 1: Emulator**

```bash
# Press 'a' after expo start
```

**Option 2: Physical Device**

1. Install **Expo Go** from Play Store
2. Scan QR code from terminal

## Project Structure

```
King-Saver-app/
├── App.tsx                    # Root component
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── VideoCard.tsx
│   │   ├── PlatformCard.tsx
│   │   ├── Header.tsx
│   │   └── LoadingSpinner.tsx
│   ├── screens/               # App screens
│   │   ├── HomeScreen.tsx
│   │   ├── TikTokScreen.tsx
│   │   ├── GenericPlatformScreen.tsx
│   │   └── HistoryScreen.tsx
│   ├── services/              # API & download logic
│   │   ├── api.ts
│   │   └── download.ts
│   ├── storage/               # AsyncStorage utilities
│   ├── navigation/            # React Navigation
│   ├── theme/                 # Design tokens
│   └── types/                 # TypeScript types
└── docs/
    └── TESTING.md             # Testing documentation
```

## Testing

See [docs/TESTING.md](docs/TESTING.md) for detailed testing instructions.

### Quick Test

```bash
# Check for TypeScript errors
npx tsc --noEmit

# Start dev server
npx expo start

# Build APK
### Building the APK (Android)

To verify the app on a real Android device without using Expo Go, you can build a standalone APK.

1.  **Install EAS CLI** (if not already installed):
    ```bash
    npm install -g eas-cli
    ```

2.  **Login to Expo**:
    ```bash
    eas login
    ```

3.  **Build the APK**:
    ```bash
    eas build --platform android --profile preview
    ```

4.  **Download & Install**:
    -   Once the build finishes, EAS will provide a download link.
    -   Download the `.apk` file to your Android phone.
    -   Install it (you may need to allow "Install from Unknown Sources").

## Tech Stack

- **React Native** with Expo SDK 54
- **TypeScript** for type safety
- **React Navigation** for navigation
- **Expo File System** for downloads
- **Expo Media Library** for gallery access
- **AsyncStorage** for persistence

## How TikTok Download Works

1. User pastes TikTok URL
2. App calls TikWM API to get video info
3. Video metadata displayed (thumbnail, title, stats)
4. User selects HD/SD quality
5. Video downloaded to device
6. Saved to "King Saver" album in gallery

## License

MIT

---

**Made with 👑 by King Saver Team**
