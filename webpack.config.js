const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@api": path.resolve(__dirname, "src/api/"),
      "@store": path.resolve(__dirname, "src/store/"),
    },
    extensions: [".ts", ".tsx", ".js"],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    proxy: [
      {
        context: ["/notes"],
        target: "http://localhost:3001",
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
