
require('dotenv-flow').config()
console.log(process.env)

module.exports = {
  env: {
    NODE_ENV: process.env.NODE_ENV,
    APP_VERSION: process.env.npm_package_version
  },
  defineConstants: {},
  mini: {},
  h5: {},
};
