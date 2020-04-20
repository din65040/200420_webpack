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
        test: /\.js$/,
        // ローダーの処理対象となりディレクトリ
        include: path.resolve(__dirname, 'src/js'),
        use: [
          {
            // 使用するローダー
            loader: 'babel-loader',
            // ローダーのオプション
            options: {
              presets: [
                ['@babel/preset-env', { modules: false }]
              ]
            }
          }
        ]
      }
    ]
  }
}