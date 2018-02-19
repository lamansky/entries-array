'use strict'

const assert = require('assert')
const entries = require('.')

describe('entriesArray()', function () {
  it('should return an entries array', function () {
    const arr = entries(['a', 'b'])
    assert(Array.isArray(arr))
    assert.strictEqual(arr.length, 2)
    assert.strictEqual(JSON.stringify(arr[0]), JSON.stringify([0, 'a']))
    assert.strictEqual(JSON.stringify(arr[1]), JSON.stringify([1, 'b']))
  })

  it('should support the bind operator', function () {
    const arr = entries.call(['a', 'b'])
    assert(Array.isArray(arr))
    assert.strictEqual(arr.length, 2)
    assert.strictEqual(JSON.stringify(arr[0]), JSON.stringify([0, 'a']))
    assert.strictEqual(JSON.stringify(arr[1]), JSON.stringify([1, 'b']))
  })
})
