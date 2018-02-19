'use strict'

const entries = require('entries-iterator')
const supportBindOperator = require('sbo')

module.exports = supportBindOperator((...args) => Array.from(entries(...args)))
