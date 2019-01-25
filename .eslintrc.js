/**
 * 配置参考官网：
 * 配置参考官网：http://eslint.cn/docs/rules/
 * 博客：https://blog.csdn.net/hsl0530hsl/article/details/78594973
 */

module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': [0, 'always'], //函数定义时括号前面要不要有空格
    'semi': [2, 'always'], // 语句强制分号结尾
    'quotes': [2, 'single'], //引号类型 `` "" ''
    'object-curly-spacing': [2, 'never'], //大括号内是否允许不必要的空格
    'no-multi-spaces': [0, {'ignoreEOLComments': true}], //不能用多余的空格, 'ignoreEOLComments' 或略注释前的空格
    "spaced-comment": [2, 'never'],//注释风格要不要有空格什么的
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
