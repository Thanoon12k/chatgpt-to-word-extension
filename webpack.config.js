const path = require("path");

module.exports = {
  entry: {
    background: "./src/background.js",
    popup: "./src/popup.js",
    docBuilder: "./src/docBuilder.js",
    content: "./src/content.js"  // ✅ Add content script
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env"] }
        }
      }
    ]
  }
};
