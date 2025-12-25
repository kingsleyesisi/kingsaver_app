# King Saver - Premium Video Downloader

The King Saver has been restructured into a high-performance, premium Flutter Android application with a dedicated Node.js backend.

## Project Structure

```text
King-Saver-app/
├── lib/               # Flutter Application Source
│   ├── main.dart      # Entry point & Theme
│   ├── screens/       # UI Screens (Home, Splash)
│   │   └── tabs/      # Feature Tabs (Single, Bulk, History)
│   ├── services/      # Business Logic & API calls
│   └── widgets/       # Reusable UI Components (Glassmorphism)
├── backend/           # Node.js Server & Scraping logic
│   ├── server.js      # Express API
│   └── *.js           # Platform-specific scrapers
├── pubspec.yaml       # Flutter Dependencies
└── README.md          # Project Documentation
```

## Features
- **Premium UI**: Dark mode with gold accents and high-end glassmorphic effects.
- **Multi-Platform Support**: High-speed downloads for TikTok, YouTube, Instagram, Facebook, and Twitter/X.
- **Bulk Processing**: Efficiently handle multiple links simultaneously.
- **Download History**: Locally persisted history of your saved content.

## Setup Instructions

### 1. Backend Setup
1. Navigate to the `backend/` directory.
2. Ensure you have Node.js installed.
3. Install dependencies: `npm install` (Note: You may need to restore `package.json`).
4. Start the server: `node server.js`

### 2. Flutter App Setup
1. Ensure you have Flutter installed ([flutter.dev](https://flutter.dev)).
2. Open `lib/services/api_service.dart` and update the `_baseUrl` to match your server's address.
3. From the project root, run:
   ```bash
   flutter pub get
   flutter run
   ```

## Development Credits
Designed & Developed with a focus on visual excellence and speed. 👑
