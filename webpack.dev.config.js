// webpack-merge を読み込む
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.config.js');


// 開発用の設定と共通設定（baseConfig）をマージする
module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map'
})