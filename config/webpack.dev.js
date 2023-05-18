const { ProgressPlugin } = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const common = require('./webpack.common');
const { PUBLIC_PATH } = require('./lib/constants');
const path = require('path');

const PORT = 9000;
const publicPath = `http://localhost:${PORT}${PUBLIC_PATH}`;

module.exports = merge(common, {
  entry: path.join(__dirname, '../demo/index.tsx'),
  mode: 'development',
  output: {
    filename: '[contenthash].js',
    publicPath,
  },
  cache: {
    type: 'filesystem',
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    port: PORT,
    // https: true,
    // open: true,
    host: '0.0.0.0',
    proxy: {
      // '/api/': {
      //   target: 'https://xxx.xx.xx/',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/saturn/api/': '/api/',
      //   },
      //   secure: false,
      // },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: true,
      inject: true,
    }),
    new ReactRefreshWebpackPlugin(),
    // 进度条
    new ProgressBarPlugin({
      format: `:msg [:bar] ':percent' (:elapsed s)`,
    }),
    new ProgressPlugin((percentage) => {
      if (percentage === 1) {
        setTimeout(async () => {
          const { default: boxen } = await import('boxen');
          const text = `http://localhost:${PORT}${PUBLIC_PATH}`;
          console.log(
            boxen(text, {
              padding: 1,
              borderColor: 'blue',
              title: '启动成功',
              titleAlignment: 'center',
              borderStyle: 'classic',
            }),
          );
        }, 0);
      }
    }),
  ],
});
