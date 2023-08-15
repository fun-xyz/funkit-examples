## React Native
```bash
npx create-expo-app my-app
cd my-app
touch metro.config.js
```

```bash
yarn add @thirdweb-dev/react-native-compat node-libs-browser react-native-crypto react-native-get-random-values react-native-randombytes @fun-xyz/core @expo/browser-polyfill
```

metro.config.js

```jsx
const { getDefaultConfig } = require("expo/metro-config");
const extraNodeModules = require("node-libs-browser");
const config = getDefaultConfig(__dirname);
config.resolver.extraNodeModules = extraNodeModules;
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});
module.exports = config;
```

App.js

```jsx
import "@expo/browser-polyfill";
import "react-native-get-random-values";
// other code
```
