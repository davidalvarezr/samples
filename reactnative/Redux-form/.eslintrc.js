module.exports = {
  extends: "airbnb",
  parser: 'babel-eslint',
  globals: {
    "alert": "readable",
    "fetch": "readable",
  },

  rules: {
      "react/prefer-stateless-function": 0,
      "react/jsx-filename-extension": 0,
      "max-len": ["error", { "code": 120 }],
      "no-underscore-dangle": 0,
      "react/prop-types": [1, {
          ignore: ['navigation'],
          customValidators: []
      }],
      "no-unused-expressions": ["error", { "allowShortCircuit": true }],
      "no-use-before-define": 0,
      "react/jsx-one-expression-per-line" : 0,
      "import/no-mutable-exports": 0,
      "react/prop-types": 0,
      // "comma-dangle": ["error", {"functions": "never"}]
  }
};