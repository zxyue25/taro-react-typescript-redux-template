process.env.APP_ENV = process.env.APP_ENV || 'dev'

require('dotenv-flow').config({
  node_env: process.env.APP_ENV
})

module.exports = {
  env: {
    APP_VERSION: process.env.npm_package_version,
    APP_ENV: process.env.APP_ENV,
    APP_API: process.env.APP_API
  },
  defineConstants: {},
  mini: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  },
};
