const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/app.js', // Entry point for app
  output: {
    filename: 'bundle.js',   // Output bundle file
    path: path.resolve(__dirname, 'dist'), // Output directory
    clean: true, // Clean the output directory before emit
  },
  module: {
    rules: [
      {
        test: /\.css$/i,     // Handle CSS imports
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Template HTML file
    }),
  ],
  devServer: {
    static: './dist', // Serve files from the 'dist' directory
    open: true,       // Open the browser after server had been started
    hot: true,        // Enable hot module replacement
    port: 9000,       // Port number
  },
  mode: 'development', // Set the mode to development
};
