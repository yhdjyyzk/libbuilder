# libbuilder
基于 webpack 的打包器

## 如何使用
1. 安装
 ``` bash
 npm install yhdjyyzk-libbuilder --dev
 ```
 ``` bash
 yarn add yhdjyyzk-libbuilder --dev
 ```
2. 在项目目录下添加一个 `libbuilder.config.js`
3. 按照 [webpack-merge](https://github.com/survivejs/webpack-merge) 的规则在 `libbuilder.config.js` 中配置自定义选项
4. 添加 `babel.config.js`
```js
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": false,
        "helpers": true,
        "regenerator": true
      }
    ],
    ["@babel/plugin-syntax-import-meta"]
  ]
}
```
5. 在项目下运行命令 `yhdjyyzk-libbuilder`

## 配置项
- `libName`: '' // 打包之后的名称
- `mini`: false // 是否压缩
- `author`: 'libbuilder' // 作者名称
- `banner`: 'build by libbuilder' //
- `webpackConfig`: {} // webpack 的配置项，根据 [webpack-merge](https://github.com/survivejs/webpack-merge) 的规则

## 注意事项
1. `webpack5` 本身可处理 [webworker](https://webpack.docschina.org/guides/web-workers/)

## 参考
- [创建 library](https://webpack.docschina.org/guides/author-libraries/)
