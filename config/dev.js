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
  h5: {},
};
