import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'

const config = {
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'docs')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ title: 'Salesforce to Glip Router' })
  ]
}

export default config
