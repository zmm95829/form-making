// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/essential', 
    'standard'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    "space-before-function-paren": 0,
    'generator-star-spacing': 'off',
    'semi': ['off', 'always'],    
    'quotes': [1, 'double'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
