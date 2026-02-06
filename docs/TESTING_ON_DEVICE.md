# How to Easily Test on Your Phone 📱

There are easier ways to test than building a standalone APK every time.

## Method 1: Expo Go (Easiest & Fastest)

This is the standard way to develop. You can test your code wirelessly without building an APK.

1. **Install App**: Download **Expo Go** from the Google Play Store on your phone.
2. **Start Server**: Run this command in your terminal:

    ```bash
    npx expo start
    ```

3. **Scan & Run**:
    * A QR code will appear in the terminal.
    * Open Expo Go on your phone.
    * Scan the QR code.
    * The app loads instantly!

> **Note**: Custom app icons and splash screens won't show up in Expo Go (you'll see the Expo logo), but all your app features (screens, downloads, logic) will work perfectly.

---

## Method 2: Development Build (Best for Features)

If you want to test the **actual native app** (with your custom icon, splash screen, and full native capabilities) but still have "Instant Reload":

1. **Build a Dev Client (One time only)**:

    ```bash
    eas build --profile development --platform android
    ```

2. **Install It**: Download and install this APK on your phone once.
3. **Run Server**:

    ```bash
    npx expo start --dev-client
    ```

4. **Connect**: Scan the QR code. Now you are running YOUR app, but streaming updates from your computer!

---

## Method 3: Wired USB (Fastest Performance)

If you have a USB cable:

1. Enable **Developer Options** & **USB Debugging** on your phone.
2. Connect phone to computer.
3. Run:

    ```bash
    npx expo run:android --device
    ```

4. It will install and launch automatically.

---

## Recommendation 💡

Start with **Method 1 (Expo Go)**. It's zero setup.
Use **Method 2** only when you need to test native things like the App Icon or if you add specific native libraries.
