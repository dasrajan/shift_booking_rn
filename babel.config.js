module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          "*": ["src/*"],
          "components": ["src/components/index"],
          "hooks": ["src/hooks/index"],
          "screens": ["src/screens/index"]
        },
      },
    ],
  ],
};
