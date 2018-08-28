module.exports = {
  webpack: (config, { dev }) => {
    if (process.env.BUNDLE_CHECK) {
      const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
        .BundleAnalyzerPlugin;
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static"
        })
      );
    }
    const originalEntry = config.entry;

    config.entry = async () => {
      const entries = await originalEntry();

      if (entries["main.js"]) {
        entries["main.js"].unshift("./utils/polyfills.js");
      }

      return entries;
    };

    if (dev) {
      config.module.rules.push({
        test: /\.js$/,
        exclude: [/node_modules/, /lib/],
        loader: "eslint-loader",
        options: {
          // Emit errors as warnings for dev to not break webpack build.
          // Eslint errors are shown in console for dev, yay :-)
          emitWarning: dev
        }
      });
    }
    config.node = {
      // Fixes npm packages that depend on `fs` module
      fs: "empty"
    };
    return config;
  }
};
