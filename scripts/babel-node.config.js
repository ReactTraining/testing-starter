module.exports = {
  presets: ["@babel/preset-typescript", "@babel/preset-env"],
  plugins: [
    "@babel/plugin-transform-react-jsx",
    [
      require("babel-plugin-transform-remove-imports"),
      { test: /\.(less|css|sass|scss)$/ },
    ],
  ],
};
