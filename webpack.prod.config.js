// webpack-merge を読み込む
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

// optimization.minimizer を上書きするために必要なプラグイン
const TerserPlugin = require('terser-webpack-plugin');

// 開発用の設定と共通設定（baseConfig）をマージする
module.exports = merge(baseConfig, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          // console を削除する設定
          compress: { drop_console: true }
        }
      })
    ]
  }
})