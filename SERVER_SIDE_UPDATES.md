# Server-Side Updates (OTA) Guide

This guide explains how to implement "Over-the-Air" (OTA) updates for the **King Saver** application. This allows you to push JavaScript changes (layout, logic, design) to users without them needing to download a new APK.

## 1. Initial Setup (One-Time)

You need to install the update library and configure your project.

1. **Install the dependency:**

    ```bash
    npx expo install expo-updates
    ```

2. **Configure EAS Updates:**
    Run this command and follow the prompts. It will modify your `app.json` to include the necessary configuration.

    ```bash
    eas update:configure
    ```

## 2. Configure Native Build (`eas.json`)

To ensure your APK knows where to look for updates, you need to link your build profile to an update channel.

Open `eas.json` and verify/update your `production` build profile to include the `channel` property.

**Current `eas.json` (example modification):**

```json
{
  "build": {
    "preview": {
      "distribution": "internal",
      "channel": "preview"
    },
    "production": {
      "channel": "production",
      "autoIncrement": true
    }
  }
}
```

* **Channel**: This is the "frequency" the app listens to. An app on the `production` channel will only download updates published to `production`.

## 3. Create the "Base" APK

For updates to work, the user must have an app installed that is configured to receive them. You need to build and install a new APK **once**.

```bash
# Build for production channel (Project Link)
eas build --platform android --profile production
```

* Download and install this APK on your device.
* This APK now has a "link" to the `production` channel on the server.

## 4. How to Push Updates

Now, whenever you make changes (e.g., change color, fix text, move buttons), follow these steps to update the app on the device instantly:

1. **Make your code changes** and save files.
2. **Publish the update:**

    ```bash
    eas update --branch production --message "Changed layout colors"
    ```

### What happens next?

1. The command bundles your modified JavaScript.
2. It uploads it to the EAS servers linked to the `production` branch.
3. Because your "Base APK" is listening to the `production` channel (which is mapped to the `production` branch), it will detect this new update.
    * **Important**: If this is your first time, ensure the channel is linked to the branch:

        ```bash
        eas channel:edit production --branch production
        ```

4. **On the device**:
    * Create a "cold start" (close the app completely and reopen it).
    * The app will check for updates on launch.
    * Depending on configuration, it might download in the background and apply on *next* launch, or download and apply immediately.

## 5. Troubleshooting & Tips

* **Native Changes**: If you change **native** code (e.g., add a new permission to `app.json` like Camera, or install a library that requires "native linking"), **OTA updates will NOT work**. You MUST rebuild the APK (`eas build ...`) and reinstall it.
* **Checking for Updates**: By default, Expo apps check for updates automatically on startup.
* **Manifest Error**: If you see an error about "manifest", make sure the `slug` and `projectId` in `app.json` match what is on your EAS dashboard.

## Summary Checklist to Update

* [ ] Edit Code.

* [ ] Run `eas update --branch production --message "..."`.
* [ ] Restart App on Device twice (once to download, once to apply).
