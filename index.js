'use strict'

const addCounter = require('add-counter')
const is = require('is-instance-of')
const isIterator = require('is-iterator')
const isObject = require('is-object')
const props = require('prop-entries')
const sbo = require('sbo')
const typedArrays = require('typed-arrays').names()

module.exports = sbo((c, o = {}) => o.reverse ? entriesArray(c, o).reverse() : entriesArray(c, o))

function entriesArray (c, {inObj, arrays = [], maps = [], reflectObj, sets = []} = {}) {
  if (isIterator(c) || is(c, ['Set', sets])) return Array.from(addCounter(c))
  if (typeof c === 'string') return Array.from(Array.from(c).entries())
  if (is(c, ['Array', arrays, 'Map', maps, typedArrays])) return Array.from(c.entries())
  if (isObject(c)) return props(c, {enumOnly: !reflectObj, own: !inObj})
  return []
}
