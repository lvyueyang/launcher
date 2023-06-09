const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const common = require('./webpack.common');
const path = require('path');
const { PUBLIC_PATH } = require('./lib/constants');

const DEPLOY_ADDRESS = process.env.DEPLOY_ADDRESS || '';

module.exports = merge(common, {
  entry: path.join(__dirname, '../src/index.ts'),
  mode: 'production',
  output: {
    filename: 'react-window-launcher.js',
    path: path.resolve(__dirname, '../lib'),
    library: {
      // name: 'reactWindowLauncher',
      type: 'umd',
    },
  },
  experiments: {
    outputModule: true,
  },
  externals: ['react', 'react-dom', 'eventemitter3', 'nanoid'],
  devtool: 'source-map',
  plugins: [
    // 打包依赖分析
    !!process.env.BUNDLE_ANALYZER && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
});
