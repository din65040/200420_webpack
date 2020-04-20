const path = require('path');

module.exports = {
  mode: 'development',
  // エントリーポイントの設定
  entry: {
    app: './src/js/app.js',
    search: './src/js/search.js'
  },
  output: {
    // 出力するファイル名
    filename: '[name].bundle.js',
    // 出力先のパス（絶対パスを指定しないとエラーが出るので注意）
    path: path.resolve(__dirname, 'public/js')
  }
}