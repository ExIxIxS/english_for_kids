const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: { index: './src/index.js' },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'develop'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Development Output',
      template: 'src/index.html',
    }),
    new ESLintPlugin({ fix: true }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets/img/', to: './assets/img/' },
        { from: 'src/assets/icons/', to: './assets/icons/' },
        { from: 'src/assets/audio/', to: './assets/audio/' },
      ],
      options: {
        concurrency: 100,
      },
    }),

    // more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: 'asset',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // more about loaders from https://webpack.js.org/loaders/
    ],
  },
};
