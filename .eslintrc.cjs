/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // "single-quote": 2, // 单引号
    // semi: 0, // 去掉结尾的分号
    'no-extra-semi': 2, // 禁止不必要的分号
    'array-bracket-newline': 2, // 在数组开括号后和闭括号前强制换行
    'array-bracket-spacing': 2, // 强制数组方括号中使用一致的空格
    'new-cap': 2, // 要求构造函数首字母大写
    'object-curly-newline': 2, // 强制大括号内换行符的一致性
    // 'object-curly-spacing': 2, // 强制在大括号中使用一致的空格
    'object-property-newline': 0, // 强制将对象的属性放在不同的行上
    indent: [4]
  }
}
