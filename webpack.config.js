const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/components/Table.js',
  output: {
    path: path.resolve('dist'),
    filename: 'Table.js',
    libraryTarget: 'commonjs2',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [/(node_modules)/, /mock/],
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'images/[name]-[hash][ext]',
      //   },
      // },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
  },
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM',
    },
  },
}
