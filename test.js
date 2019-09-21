'use strict'

const assert = require('assert')
const entries = require('.')

describe('entriesArray()', function () {
  it('should return Array entries', function () {
    assert.deepStrictEqual(entries(['a', 'b']), [[0, 'a'], [1, 'b']])
  })

  it('should return iterator entries', function () {
    function * gen () {
      yield 'a'
      yield 'b'
    }

    assert.deepStrictEqual(entries(gen()), [[0, 'a'], [1, 'b']])
  })

  it('should return Map entries', function () {
    assert.deepStrictEqual(entries(new Map([['key', 'value']])), [['key', 'value']])
  })

  it('should return entries of a custom Map class', function () {
    class MyMap {
      entries () { return [['key', 'value']] }
    }
    assert.deepStrictEqual(entries(new MyMap()), [])
    assert.deepStrictEqual(entries(new MyMap(), {maps: MyMap}), [['key', 'value']])
  })

  it('should return entries of a custom Map class referenced by name string', function () {
    class MyMap {
      entries () { return [['key', 'value']] }
    }
    assert.deepStrictEqual(entries(new MyMap()), [])
    assert.deepStrictEqual(entries(new MyMap(), {maps: 'MyMap'}), [['key', 'value']])
  })

  it('should return Object entries', function () {
    assert.deepStrictEqual(entries({key: 'value'}), [['key', 'value']])
  })

  it('should return inherited Object properties if `inObj` is true', function () {
    function A () {}
    A.prototype.key = 'value'
    assert.deepStrictEqual(entries(new A(), {inObj: true}), [['key', 'value']])
  })

  it('should return non-enumerable Object properties if `reflectObj` is true', function () {
    const obj = {}
    Object.defineProperty(obj, 'key', {value: 'value', enumerable: false})
    assert.strictEqual(entries(obj).length, 0)
    assert.deepStrictEqual(entries(obj, {reflectObj: true}), [['key', 'value']])
  })

  it('should return Set entries', function () {
    assert.deepStrictEqual(entries(new Set(['value'])), [[0, 'value']])
  })

  it('should return String characters', function () {
    assert.deepStrictEqual(entries('hi'), [[0, 'h'], [1, 'i']])
  })

  it('should return Typed Array entries', function () {
    assert.deepStrictEqual(entries(new Int32Array(new ArrayBuffer(4))), [[0, 0]])
  })

  it('should return an empty array for undefined', function () {
    assert.strictEqual(entries().length, 0)
  })

  it('should return an empty array for null', function () {
    assert.strictEqual(entries(null).length, 0)
  })

  it('should return an empty array for a number', function () {
    assert.strictEqual(entries(123).length, 0)
  })

  it('should return an empty array for a symbol', function () {
    assert.strictEqual(entries(Symbol.iterator).length, 0)
  })

  it('should return entries in reverse order if `reverse` is true', function () {
    assert.notDeepStrictEqual(entries(['a', 'b'], {reverse: false}), [[1, 'b'], [0, 'a']])
    assert.deepStrictEqual(entries(['a', 'b'], {reverse: true}), [[1, 'b'], [0, 'a']])
  })

  it('should return copy of array of two-item arrays if `detectPairs` is true', function () {
    const e = [[1, 2], [3, 4]]
    assert.deepStrictEqual(entries(e, {detectPairs: true}), [[1, 2], [3, 4]])
    assert.notStrictEqual(entries(e, {detectPairs: true}), e)
    assert.deepStrictEqual(entries([[1, 2], [3, 4]]), [[0, [1, 2]], [1, [3, 4]]])
  })

  it('should support the bind operator', function () {
    assert.deepStrictEqual(entries.call(['test']), [[0, 'test']])
  })
})
