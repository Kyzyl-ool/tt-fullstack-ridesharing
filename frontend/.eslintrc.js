module.exports =  {
    parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
    extends:  [
      "eslint:recommended",
      'plugin:react/recommended',  // Uses the recommended rules from @eslint-plugin-react
      'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from @typescript-eslint/eslint-plugin
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended'    ],
    plugins: ["react", "@typescript-eslint", "prettier"],
    parserOptions:  {
    ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
    sourceType:  'module',  // Allows for the use of imports
    ecmaFeatures:  {
      jsx:  true,  // Allows for the parsing of JSX
    },
    },
    rules: {
      "prettier/prettier": ["error", { "singleQuote": true }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/interface-name-prefix": [1, { "prefixWithI": "always", "allowUnderscorePrefix": true }]
    },
    env: {
      browser: true,
      node: true,
      jasmine: true,
      jest: true
    },
    settings:  {
      react:  {
        version:  'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
      },
    },
  };