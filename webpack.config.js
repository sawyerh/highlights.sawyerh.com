var path = require("path");
var webpack = require("webpack");

var config = {
  entry: {
    main: './assets/js/src/main.js',
  },
  output: {
    path: './assets/js/dist',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /bower_components\/flickity/,
        loader: 'script',
        exclude: /(node_modules)/
      },
      {
        // React
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    // use the main field from the bower.json file
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    )
  ],
  resolve: {
    // Search in bower_components and src/styles too:
    root: [path.join(__dirname, "bower_components"),
           path.join(__dirname, "assets/js/src")],
    alias: {
      'flickity': 'flickity/dist/flickity.pkgd.min.js',
    }
  }
};

if(process.env.NODE_ENV === 'production'){
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }));
}

module.exports = config;