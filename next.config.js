module.exports = {
  webpack: (config, { dev }) => {
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
