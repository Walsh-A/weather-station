import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { HtmlRspackPlugin } from '@rspack/core';
import type { Configuration } from '@rspack/core';

const projectDirectory = path.dirname(fileURLToPath(import.meta.url));

const config: Configuration = {
  entry: path.resolve(projectDirectory, 'client/index.tsx'),
  output: {
    path: path.resolve(projectDirectory, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
              target: 'es2022',
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlRspackPlugin({
      template: path.resolve(projectDirectory, 'public/index.html'),
    }),
  ],
  devServer: {
    port: 8080,
    hot: true,
    historyApiFallback: true,
  },
};

export default config;