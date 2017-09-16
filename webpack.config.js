const webpack = require('webpack');

let externals = getExternals();

module.exports = {
  entry: {
    app: './server.js',
  },
  target: 'node',
  output: {
    path: './build',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js','.json']
  },
  externals: externals,
  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: true,
    __dirname: true,
    setImmediate: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015','stage-0']
        },
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};

function getExternals() {
  let manifest = require('./package.json');
  let dependencies = manifest.dependencies;
  let externals = {};
  for (let p in dependencies) {
    externals[p] = 'commonjs ' + p;
  }
  return externals;
}