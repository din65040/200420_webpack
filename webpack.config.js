const path = require('path');

module.exports = {
  watch: true,
  mode: 'development',
  // エントリーポイントの設定
  entry: {
    app: './src/js/app.js',
    app2: './src/js/app2.js',
    app3: './src/js/app3.js'
  },
  output: {
    // 出力するファイル名
    filename: '[name].bundle.js',
    // 出力先のパス（絶対パスを指定しないとエラーが出るので注意）
    path: path.resolve(__dirname, 'public/js'),
    // ブラウザから出力したファイルにアクセスする際のパス
    publicPath: '/js/'
  },
  // webpack-dev-server の設定
  devServer: {
    open: true,
    port: 9000,
    // コンテンツのルートディレクトリ
    contentBase: './public'
  },
  // ソースマップの設定
  devtool: 'cheap-module-eval-sourve-map',
  // optimization の設定
  optimization: {
    splitChunks: {
      cacheGroups: {
        // プロパティ名はなんでも良い 今回は vendor としている
        vendor: {
          // node_modules 配下のモジュールをバンドル対象とする
          test: /node_modules/,
          // 出力するファイル名
          name: 'vendor',
          // 今日つモジュールとしてバンドルする対象の設定
          chunks: 'initial',
          // これをtrueにすることで、デフォルト splitChunks の設定の splitChunk.miniSize, splitChunks.minChunks, splitChunks.maxAsyncRequest, splitChunks.maxInitialRequest を無効にできる
          enforce: true
        }
      }
    }
  }
}