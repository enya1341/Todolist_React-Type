module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "standard-with-typescript", "prettier"],
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [],
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {},
};