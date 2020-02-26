import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import dotenv from 'dotenv-override-true'
import { DefinePlugin } from 'webpack'

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
    new HtmlWebpackPlugin({ title: 'Salesforce to Glip Router' }),
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed)
    })
  ]
}

export default config
