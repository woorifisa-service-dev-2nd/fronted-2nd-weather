module.exports = {
  extends: ['airbnb', 'prettier'],
  rules: {
    // "linebreak-style": 0,
    'no-console': 'off',
  },
  'import/resolver': {
    node: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  },
};
