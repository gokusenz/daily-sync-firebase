require('babel-register')
const hook = require('css-modules-require-hook')
require('dotenv').config()

hook({ extensions: '.scss' })
global.__CLIENT__ = false

module.exports = require('./server')
