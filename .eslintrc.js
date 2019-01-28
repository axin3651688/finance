/**
 * 配置参考官网：
 * 配置参考官网：http://eslint.cn/docs/rules/
 * 博客：https://blog.csdn.net/hsl0530hsl/article/details/78594973
 * webStorm-eslint的配置和使用（2018版）：https://blog.csdn.net/qq_29329037/article/details/80100450
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
    'semi': ['error', 'always'], // 语句强制分号结尾
    'quotes': ['error', 'single'], //引号类型 `` "" ''
    'object-curly-spacing': ['error', 'never'], //大括号内是否允许不必要的空格
    'no-multi-spaces': ['error', {ignoreEOLComments: true}], //不能用多余的空格, 'ignoreEOLComments' 或略注释前的空格
    'spaced-comment': ['error', 'always'],//注释风格要不要有空格什么的
    'eol-last': ["error", "always"] // 要求或禁止文件末尾存在空行 'always':必须有空行；"never" 强制文件末尾不要有换行符
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
