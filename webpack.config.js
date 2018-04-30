const path = require("path");

module.exports = {
  entry: "./app.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js"
    },
    extensions: ["*", ".js", ".vue", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {}
          // other vue-loader options go here
        }
      }
    ]
  }
};
