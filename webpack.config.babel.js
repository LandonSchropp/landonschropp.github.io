import path from 'path';

export default {
  devtool: 'source-map',
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, 'source/javascript'),
  entry: './index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build/javascript')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
