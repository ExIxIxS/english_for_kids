const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const config = {
  entry: { index: './src/index.js' },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'prod'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Production Output',
      template: 'src/index.html',
    }),
    new FaviconsWebpackPlugin('./assets/icons/favicon.ico'),

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
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/img',
            },
          },
        ],
      },
      // more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

const isProduction = true;
module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
