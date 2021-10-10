delete process.env.TS_NODE_PROJECT;


import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import * as webpackDevServer from 'webpack-dev-server';
import * as fs from 'fs';
//const getCacheIdentifier = require('react-dev-utils/getCacheIdentifier');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);

interface Configuration extends webpack.Configuration {
  devServer?: webpackDevServer.Configuration;
}


const config: Configuration = {
  mode: 'production',
  // Set the entry to the application chunk which points to index.tsx
  entry: [
    "./index.ts"
  ],
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
    globalObject: 'this'
  }// Enable sourcemaps for debugging webpack's output.
  , devtool: "source-map"

  , resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
    // modules: ['../src', 'node_modules']
    modules: ['node_modules', resolveApp('node_modules')]
  },
  module: {
    strictExportPresence: true,
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      // embed small images and fonts as Data Urls and larger ones as files:
      { test: /\.(png|gif|jpg|cur)$/i, loader: 'url-loader', options: { limit: 8192 } },
      { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff2' } },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff' } },
      // load these fonts normally, as files:
      { test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'file-loader' }
    ],

  },
  // Configure any plugins
  plugins: [
    new HtmlWebpackPlugin({
        inject: true,
        template: './index.html',
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        }
    }),
    new CopyWebpackPlugin({
        patterns: [
            { from: 'static/', to: "static/" }
        ]
    })
  ],
  devServer: {
    compress: true,
    open: true,
    historyApiFallback: true
  }
};



let normOptions = webpack.config.getNormalizedWebpackOptions(config);
normOptions.devServer = {

}


export default config;