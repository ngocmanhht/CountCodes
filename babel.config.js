module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        // alias: {
        //   '@components': './src/components',
        //   '@assets': './src/assets',
        //   '@screens': './src/screens',
        //   '@utils': './src/utils',
        //   '@hooks': './src/hooks',
        //   '@context': './src/context',
        // },
      },
    ],
  ],
};
