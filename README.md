# libbuilder
基于 webpack 的打包器

## 如何使用
1. 在项目目录下添加一个 `libbuilder.config.js`
2. 按照 [webpack-merge](https://github.com/survivejs/webpack-merge) 的规则在 `libbuilder.config.js` 中配置自定义选项
3. 运行命令 `libbuilder`

## 配置项
- `libName`: '' // 打包之后的名称
- `mini`: false // 是否压缩
- `webpackConfig`: undefined // webpack 的配置项，根据 [webpack-merge](https://github.com/survivejs/webpack-merge) 的规则

## 注意事项
1. `webpack5` 本身可处理 [webworker](https://webpack.docschina.org/guides/web-workers/)

## 参考
- [创建 library](https://webpack.docschina.org/guides/author-libraries/)
