import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const isDev = process.env.NODE_ENV === 'development';

const common: Configuration = {
  mode: isDev ? 'development' : 'production',
  externals: ['fsevents'],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  output: {
    publicPath: './',
    assetModuleFilename: 'assets/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(ico|png|svg|eot|woff?2?)$/,
        type: 'asset/resource',
      },
    ],
  },
  watch: isDev,
  devtool: isDev ? 'source-map' : undefined,
};

const main: Configuration = {
  ...common,
  target: 'electron-main',
  entry: {
    main: './electron/main.ts',
  },
};

const preload: Configuration = {
  ...common,
  target: 'electron-preload',
  entry: {
    preload: './electron/preload.ts',
  },
};

const renderer: Configuration = {
  ...common,
  target: 'web',
  entry: {
    app: './src/index.tsx',
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
      filename: 'index.html'
    }),
  ],
};

export default [main, preload, renderer];
