const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: resolve("es"),
    filename: "index.js",
    libraryTarget: "module",
    chunkFormat: "module",
  },
  experiments: {
    outputModule: true,
  },
  externals: {
    vue: "vue",
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "@": resolve("src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
