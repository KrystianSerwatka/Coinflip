module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  plugins: ["prettier", "html"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": "warn",
    "no-use-before-define": ["error", { functions: false, classes: true }],
    "prettier/prettier": "error",
    "no-plusplus": "off",
    "no-console": "off",
    "no-underscore-dangle": "off",
    "no-return-assign": "off",
  },
};
