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
  module: {
    rules: [
      {
        // ローダーの処理対象ファイル
        test: /\.scss$/,
        // ローダーの処理対象となるディレクトリ
        include: path.resolve(__dirname, 'src/scss'),
        // 利用するローダー
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        // ローダーの処理対象ファイル
        test: /\.(png|jpg|gif)$/i,
        // ローダーの処理対象となるディレクトリ
        include: path.resolve(__dirname, 'src/images'),
        // 利用するローダー
        loader: 'url-loader',
        options: {
          // 8KB以上は DataURL に変換せずに出力
          limit: 8192,
          // 出力する DataURL に変換しなかった画像の名前
          name: '[name].[ext]',
          // DataURL に変換しなかった画像の出力先
          outputPath: '../images/',
          // 出力されるファイルからの画像の読込先
          publicPath: path => './images/' + path
        }
      }
    ]
  }
}