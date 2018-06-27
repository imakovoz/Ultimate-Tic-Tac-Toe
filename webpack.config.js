module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  devServer: {
    inline: true,
    port: 3000,
  },
};
