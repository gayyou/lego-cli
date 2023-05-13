const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname,'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  externals: {
    react: 'React'
  },
  mode: process.env.NODE_ENV = 'development' ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'css-loader',
        ]
      },
      {
        test: /\.png$/,
        type: 'asset/resource',
      },
      {
        test: /\.tsx?$/,
        use: [
          'ts-loader'
        ]
      }
    ]
  }
}
