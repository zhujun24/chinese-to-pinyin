const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index'
  },
  devServer: {
    writeToDisk: true
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  }
}
