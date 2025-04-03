# Edenova, a Christian Dating App (Abandoned)
This repository contains an unfinished but functional dating app prototype, built using React Native Expo and Appwrite. Designed with a Hinge-style UI, the app was an experiment in mobile authentication, user verification, and real-time interactions.

- React Native Expo: Cross-platform development with a smooth and modern UI.
- Appwrite: Backend-as-a-service for authentication, database, and real-time messaging.
- SMS Authentication & Verification: Leveraging Appwrite’s then-new SMS auth system for secure onboarding.

While the team and the app itself never reached launch, this project was an invaluable experience in exploring Appwrite’s capabilities, rapid authentication flows, and modern mobile development patterns. It remains a useful reference for anyone looking to integrate authentication, messaging, and profile-based interactions into a mobile app.

# Development Instructions

You will need to have Node, npm installed on your machine, and the Expo Go App installed on your phone.

1. run `npm i` in the top level
2. run `npm run dev` if you developing on IPhone.
3. Scan the produced QR code with your camera. 
4. You can now work on the app with hot-reloading.

## Dependencies

Initiated with the `react-native-reusables` template. see [this link](https://rnr-docs.vercel.app/getting-started/introduction/) for documentation. 

Comes prebuilt with NativeWind and darkmode capacilities. If your NativeWind is not being rendered, be sure to add your files to `content` in `tailwind.config.js`.

SVGs are rendered using `react-native-svg-transformer`, which also requires changes in the metro config.

If you have troubles with compilation, try `npx react-native start --reset-cache` to reset to clear the Metro Bundler cache. 
