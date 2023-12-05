module.exports = {
  extends: ['airbnb', 'prettier'],
  rules: {
    'no-console': 'off', 
    'no-undef': 'off', 
    'prefer-destructuring': 'off',
    "spaced-comment":"off",
    'no-use-before-define': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'dot-notation': 'off',
    'no-unused-vars': 'off',
    'no-else-return': 'off',
    'import/no-extraneous-dependencies': 'off',
    'one-var': 'off'
  },
};

// no-console = 콘솔 사용을 허용하지 않음

// no-undef = 선언되지 않는 변수의 사용을 허용 하지 않음
// document에 접근 할수 없어서 off 로 설정

// prefer-destructuring = 배열 파괴를 허용하지않음
// array[index] , obj[key] 로 접근하여 값읗 바로 주기위해 off 로설 정
