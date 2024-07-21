module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:prettier/recommended',
    'plugin:@cspell/recommended',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint', '@tanstack/query', 'prettier'],
  ignorePatterns: [
    'build*',
    'src/Assets',
    'ecosystem.config.js',
    'src/Components/Spotify/utils/studyBoard.xlsx',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  rules: {
    'no-warning-comments': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    radix: 'off',
    'react/button-has-type': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'eslint-disable-next-line': 'off',
    'import/extensions': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'no-nested-ternary': 'off',
    'no-plusplus': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        prefix: ['I'],
        format: ['UPPER_CASE', 'StrictPascalCase'],
      },
      {
        selector: 'typeAlias',
        format: ['StrictPascalCase'],
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useRecoilCallback|useRecoilTransaction_UNSTABLE)',
      },
    ],
    'react/require-default-props': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/rule-name': 'off',
    'jsx-a11y/alt-text': 'off',
    '@typescript-eslint/dot-notation': 'off',
    '@cspell/spellchecker': [
      'error',
      { checkComments: true, autoFix: true, cspell: { import: ['../cspell.json'] } },
    ],
    '@typescript-eslint/no-unused-vars': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'guard-for-in': 'off',
    'no-restricted-syntax': ['off', 'ForOfStatement'],
    'react/no-array-index-key': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'import/prefer-default-export': ['off'],
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/prop-types': 'off',
    'prettier/prettier': 'error',
    'linebreak-style': 'off',
    'no-console': 'error',
    'no-trailing-spaces': 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.tsx'],
      },
    ],
    'max-len': [
      'error',
      100,
      {
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        tabWidth: 2,
      },
    ],
  },
};
