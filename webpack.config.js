module.exports = {
  entry: './src/quill-image-splitter.js',
  output: {
    filename: 'quill-image-splitter.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  },
  externals: {
    "quill": "Quill"
  }
};
