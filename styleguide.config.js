module.exports = {
  components: "components/*.js",
  exampleMode: "hide",
  styleguideDir: "documentation",
  title: "VAC Component Documentation",
  usageMode: "expand",
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }
      ]
    }
  }
};
