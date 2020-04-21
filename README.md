# webpack 実践入門
山田 祥寛 さんの著書 「webpack 実践入門」 のサンプルコードです

## webpack の役目

- 依存関係、読み込み順のの自動解決
- Tree Shaking でデッドコードを除去
- 共通モジュールをバンドルしたファイル出力 など

## webpack の導入

### モジュールのインストール

$ npm install -D webpack webpack-cli

### npm scripts に追加

```js
"scripts": {
  "build": "webpack",
  "dev": "webpack --mode development --watch --hide-modules"
},
```

### webpack の設定ファイルを追加

webpack.config.js

```js
// output.path に指定するパスが OS によって異なる
// 防ぐために path モジュールを読み込んでおく
const path = require('path');

module.export = {
  mode: 'development',
  // エントリーポイントの設定
  entry: './src/js/app.js',
  output: {
    // 出力するファイル名
    filename: 'bundle.js',
    // 出力先のパス（絶対パスを指定しないとエラーが出るので注意）
    path: path.resolve(__dirname, 'public/js')
  }
}
```

mode
- development: エラー表示、デバッグしやすいファイルの出力、キャッシュの有効化など
- production: ファイルの圧縮、モジュールの最適化などの設定が有効になる
- none

## ローダー

JS 以外のファイルをバンドルできるように変換するプログラム
TypeScrips や Vue コンポーネントのコンパイル、画像の DataURL 化など。

### babel-loader
ES6 のトランスパイル

```console
$ npm install -D babel-loader @babel/core @babel/preset-env
```

### sass-loader
SASS のコンパイルとバンドル

```console
$ npm install -D sass-loader node-sass css-loader style-loader
```

ローダーは指定した順番の逆から実行される。

以下の指定であれば
1. sass-loader
2. css-loader
3. style-loader
の順でローダーが実行される。

```js
const path = require('path');

module.exports = {
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
```

### url-loader

画像を DataURL に変換し、読み込み数を減らすことができる。

```
$ npm install -D sass-loader node-sass css-loader style-loader
$ npm install -D url-loader
```

デメリット
- DataURL に変換することで、元の画像よりもファイルサイズが増加する場合
- バンドルした JavaScript の評価時間（解析してから実行するまでの時間）の増加

file-loader を使用し、容量によってバンドルをする、しないの判断を行うのが良い。

### file-loader の使用

```console
$ npm install file-loader
```

## プラグインを使用する
プラグインを使用することで、モジュールのバンドル時に様々な処理を追加することができる。

### ProvidePlugin

指定したモジュールを全てのファイルの変数として利用可能にするプラグイン。
ファイルごとにモジュールを import で読み込む必要がなくなる。
Provideplugin は webpack をインストールすれば使用可能

### webpack-bundl-analyzer

バンドルに含まれているモジュールや、それぞれのモジュールのファイルサイズを確認できるプラグイン

```
$ npm install webpack-bundle-analyzer
```

### clean-webpack-plugin

ビルド時に出力ディレクトリの中を削除する。

```console
$ npm install -D clean-webpack-plugin
```

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  plugins: [
    // clean-webpack-plugin の利用
    new CleanWebpackPlugin()
  ]
}
```

## webpack の様々な機能を理解して使いこなす

### 複数のエントリーポイントからバンドルを出力する

```js
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
```

### watch モードを有効にする

`watch: true` を追加するか、webpack に `--watch` オプションを付与してコマンド実行を行うことで watch モードが有効になる。

- ファイルを変更するたびに自分でビルドする手間が省ける。
- キャッシュが有効になり、ビルド時間が短くなる。

### 開発用サーバー

webpack-dev-server
LiveReload では バンドルファイルは出力されない。
ファイルを出力するためには webpack を実行する必要がある。

```console
npm install -D webpack-dev-server
```

```js
const path = require('path');

module.exports = {
  watch: true,
  // webpack-dev-server の設定
  devServer: {
    open: true,
    port: 9000,
    // コンテンツのルートディレクトリ
    contentBase: './public'
  }
}
```

### ソースマップ

```js
module.exports = {
  // ソースマップの設定
  devtool: 'cheap-module-eval-sourve-map'
}
```

### 開発用と本番用の設定を分ける

- 開発時は watch モードを有効にしたい
- 開発時は開発用サーバーを起動したい
- 開発時はソースマップを生成したい
- 開発用のバンドルには console.log を残したいが、本番用のバンドルからは console.log を取り除きたい

webpack-merge, terse-webpack-plugin を使用する。

```
npm install -D webpack-merge
npm install -D terser-webpack-plugin
```

package.json に `--config` オプションをつけることで、任意の設定ファイルをもとに webpack を実行することができる。

```js
"scripts": {
  "dev": "webpack --config webpack.dev.config.js",
  "build": "webpack --config webpack.prod.config.js"
},
```

・ webpack.base.config.js

```js
const path = require('path');

module.exports = {
  // エントリーポイントの設定
  entry: {
    app: './src/js/app.js',
    search: './src/js/search.js'
  },
  output: {
    // 出力するファイル名
    filename: '[name].bundle.js',
    // 出力先のパス（絶対パスを指定しないとエラーが出るので注意）
    path: path.resolve(__dirname, 'public/js'),
  }
}
```

・ webpack.dev.config.js

```js
// webpack-merge を読み込む
const merge = require('webpack-merge');
_
const baseConfig = require('./webpack.base.config.js');


// 開発用の設定と共通設定（baseConfig）をマージする
module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map'
})
```

・ webpack.prod.config.js

```js
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
```

### 最適化

#### Tree Shaking

デッドコードを除去する、webpack に備わっている機能
モジュールの形式が ES Modules （import/export）であれば利用可能

webpak.config に `mode: production` で Tree Shaking が有効になる

サンプルでは lodash-es のモジュールから不要なコードを除去する

#### SplitChunksPlugin

複数のエントリーポイントで利用している共通モジュールをバンドルしたファイルを出力することができる、webpack に備わっている機能
共通モジュールをファイルを分割して出力する

- 複数のエントリーポイントが一つの共通ファイルを利用するため、全体のファイルサイズが小さくなる
- 共通ファイルなのでキャッシュを活用できる

サンプルでは lodash-es, jquery でサンプルを作成している

```js
module.exports = {
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
```
