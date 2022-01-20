process.env.APP_ENV = process.env.APP_ENV || 'pre'

require('dotenv-flow').config({
  node_env: process.env.APP_ENV
})

console.log(process.env)

module.exports = {
  env: {
    APP_VERSION: process.env.npm_package_version,
    APP_ENV: process.env.APP_ENV,
    APP_API: process.env.APP_API
  },
  defineConstants: {},
  mini: {},
  h5: {},
};
