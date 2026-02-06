# How to Run King Saver on an Android Emulator

Since the automatic launch failed, you can install the app manually. Here is how to do it step-by-step.

## Step 1: Download the APK

You successfully built the app! Download the APK file from the link provided in your terminal output:

**[Download APK (from Expo)](https://expo.dev/accounts/kingsleyesisi/projects/kings-world/builds/8eff19a0-bad8-481d-85f1-0e2288a5e1ab)**

Save this file to your computer (e.g., in your `Downloads` folder).

## Step 2: Launch your Android Emulator

You need to have an Android Emulator running.

### Option A: Open via Android Studio (Easiest)

1. Open **Android Studio**.
2. Click on the **Device Manager** icon (phone icon) in the toolbar.
3. Click the **Play** button next to one of your virtual devices to start it.

### Option B: Command Line (Fastest)

If you have the Android tools configured, you can verify your emulators:

```bash
emulator -list-avds
```

Then run one (replace `Pixel_API_30` with your emulator name):

```bash
emulator -avd Pixel_API_30
```

*If `emulator` command is not found, stick to Option A.*

## Step 3: Install the App

Once the emulator is running and you see the Android home screen:

### Method 1: Drag and Drop (Simplest)

1. Locate the downloaded `.apk` file in your file explorer.
2. **Drag the file** and **drop it** onto the emulator window.
3. The emulator will install it. You'll see a small popup "APK installed successfully".
4. Open the app drawer and look for **King Saver**.

### Method 2: Using ADB Command

If dragging doesn't work, use the command line:

1. Open your terminal.
2. Navigate to where you downloaded the file:

   ```bash
   cd ~/Downloads
   ```

3. Install it (replace `app-name.apk` with the actual filename):

   ```bash
   adb install application-08eff19a.apk
   ```

## Step 4: Troubleshooting

If you see **"App not installed"** or version conflicts:

1. Uninstall any existing version of "King Saver" or "Expo Go" versions of the app from the emulator first.
2. Then try installing the APK again.

---

## Fixing the "Command Not Found" Error

The error you saw earlier (`/usr/lib/android-sdk/emulator/emulator... ENOENT`) means your terminal doesn't know where the Android SDK is.

To fix this permanently for future `npm run android` commands:

1. Find where your Android SDK is (usually `~/Android/Sdk`).
2. Add these lines to your `~/.bashrc` or `~/.zshrc`:

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

1. Reload your shell: `source ~/.bashrc`
