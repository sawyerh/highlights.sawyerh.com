var path = require("path");
var webpack = require("webpack");

// This is pulled into Gruntfile.js however can be used on its own using just webpack:
var config = {
  entry: {
    main: './assets/js/src/main.js',
  },
  output: {
    path: './assets/js/dist',
    // Take each entry above and create a file named based on its key:
    filename: '[name].js'
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
           path.join(__dirname, "assets/js/src")]
  }
};

if(process.env.NODE_ENV === 'production'){
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }));
}

module.exports = config;