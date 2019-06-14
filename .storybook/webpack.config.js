const path = require('path');

const projectRoot = path.resolve(__dirname, '../');

const config = {
  cssOptions: {
    modules: {
      localIdentName: '[hash:5]-[local]',
    },
    modules: true,
    importLoaders: 1,
  },
};

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: ['node_modules', projectRoot],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'awesome-typescript-loader',
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: config.cssOptions },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
