module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: [
    // eslint默认推荐的格式化风格eslint:recommended，也可使用其他代码风格的插件
    "eslint:recommended",
    // 支持对 vue 文件进行 eslint 校验
    "plugin:vue/essential"
  ],
  parserOptions: {
    parser: "babel-eslint"
  },
 
}
