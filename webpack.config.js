const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const baseConfig = {
  target: "node", // 运行环境为 node,

  mode: "none",
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },

  module: {
    rules: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      { test: /\.tsx?$/, loader: "ts-loader" },
    ],
  },
};

const server = {
  ...baseConfig,
  name: "server",
  entry: "./src/test/server.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "script/server"),
  },
  plugins: [new CleanWebpackPlugin()],
};

const client = {
  ...baseConfig,
  name: "client",
  entry: "./src/test/client.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "script/client"),
  },
  plugins: [new CleanWebpackPlugin()],
};

module.exports = [server, client];
