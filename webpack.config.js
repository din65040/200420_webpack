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
        //ローダーの処理対象となるディレクトリ
        include: path.resolve(__dirname, 'src/scss'),
        // 利用するローダー
        // sass-loader css-loader style-loader の順で実行される
        use: [
          // HTML に、style-loader で変換した CSS のスタイルが記述された <style> タグを追加する
          'style-loader',
          // CSS をモジュールに変換する
          'css-loader',
          // Sassを CSS にコンパイルする
          'sass-loader'
        ]
      }
    ]
  }
}