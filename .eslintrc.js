module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: ["airbnb-base", "plugin:node/recommended", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest"
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"]
      }
    }
  },
  rules: {
    "class-methods-use-this": [
      "error",
      {
        exceptMethods: ["defaultOptions", "otherCommandConfigs", "requiresGit"]
      }
    ],
    "consistent-return": "off",
    curly: ["error", "all"],
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: ["err", "obj", "pkg"]
      }
    ],
    "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
    "no-underscore-dangle": [
      "error",
      {
        allowAfterThis: true
      }
    ],
    "no-use-before-define": [
      "error",
      {
        functions: false,
        classes: false
      }
    ],
    "node/no-unsupported-features/es-syntax": "off",
    "prefer-destructuring": "off",
    "prefer-object-spread": "off",
    strict: "off",
    "default-param-last": "warn",
    "max-len": "off",
    "arrow-body-style": "off",
    "import/no-extraneous-dependencies": "off",
    "global-require": "off",
    "node/no-extraneous-require": "off"
  }
}
