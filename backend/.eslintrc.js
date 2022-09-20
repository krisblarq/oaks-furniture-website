module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommend",
    "prettier/@typescript-eslint",
  ],
  parseOptions: {
    ecmaversion: 2018,
    sourceType: "module",
  },
  rule: {},
};
