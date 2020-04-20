const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  // エントリーポイントの設定
  entry: './src/js/app.js',
  output: {
    // 出力するファイル名
    filename: 'bundle.js',
    // 出力先のパス（絶対パスを指定しないとエラーが出るので注意）
    path: path.resolve(__dirname, 'public/js')
  },
  // プラグインの設定
  plugins: [
    // ProvidePlugin を利用する
    new webpack.ProvidePlugin({
      // 外部モジュールである jquery を、全てのファイル上で変数 $ として利用できるようにする
      $: 'jquery'
    })
  ]
}