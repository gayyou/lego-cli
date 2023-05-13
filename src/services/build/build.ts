import webpack from 'webpack';
import { existsSync } from "fs-extra";
import {resolveApp} from "../../utils";

const defaultConfig = {
  entry: resolveApp('src/index.tsx'),
  output: {
    path: resolveApp('dist'),
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

export async function build() {
  let webpackConfig;
  const configPath = resolveApp('webpack.config.js');

  if (existsSync(configPath)) {
    webpackConfig = require(configPath);
  } else {
    webpackConfig = defaultConfig;
  }
  webpack(webpackConfig, (err, result) => {
    if (err) {
      console.error(err);
    }
    console.log(result.toString());
    console.log('编译成功');
  });
}
