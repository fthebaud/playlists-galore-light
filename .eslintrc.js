module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    serviceworker: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.json', '.ts', '.tsx'],
      },
      node: {
        extensions: ['.js', '.json', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['sw.js'],
      rules: {
        'no-restricted-globals': 'off',
        'no-console': 'off',
      },
    },
  ],
  plugins: ['@typescript-eslint', 'import', 'react', 'react-hooks', 'jsx-a11y'],
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  rules: {
    'no-use-before-define': 'off',
    radix: 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    quotes: ['error', 'single', 'avoid-escape'], // prevent the use of backtick when it's not necessary
    'no-console': ['off', { allow: ['warn', 'off'] }],

    /* **************
     * PLUGIN RULES
     *************** */

    // typescript
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',

    // import
    'import/extensions': ['error', 'never'],
    'import/no-duplicates': 'error',
    'import/prefer-default-export': 'off',

    // react
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],

    // a11y
    'jsx-a11y/no-onchange': 'off',
  },
};
