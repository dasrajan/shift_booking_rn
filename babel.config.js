module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'react-native-reanimated/plugin',
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          "@Components/*": ["components/*"],
          "@Components": ["components"],
          "@Hooks": ["hooks"],
          "@Screens": ["screens"],
          "@Screens/*": ["screens/*"]
        },
      },
    ],
  ],
};
