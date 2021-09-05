module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  plugins: ['prettier'],
  extends: [
    'airbnb-typescript',
    'react-app',
    'react-app/jest',
    'prettier',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error'],
  }
};
