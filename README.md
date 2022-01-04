# libbuilder
基于 webpack 的打包器

## 如何使用
1. 在项目目录下添加一个 `libbuilder.config.js`
2. 按照 [webpack-merge](https://github.com/survivejs/webpack-merge) 的规则在 `libbuilder.config.js` 中配置自定义选项
3. 拉取代码，安装依赖. 运行 `npm link`, 将命令链接到全局
4. 在项目下运行命令 `libbuilder`

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
