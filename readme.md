# entries-array

Returns an array of the key-value pairs of an Object, Map, Array, or Typed Array. Useful for when you need the entries of a collection object but aren’t sure what type of collection you’ll be given.

## Installation

Requires [Node.js](https://nodejs.org/) 6.0.0 or above.

```bash
npm i entries-array
```

## API

The module exports a single function.

### Parameter

Bindable: `c` (Array, Iterator, Object, Map, Set, or Typed Array)

### Return Value

An array of two-element key-value pair arrays.

## Examples

### Arrays

```javascript
const entries = require('entries-array')

entries(['a', 'b']) // [[0, 'a'], [1, 'b']]

// Supports the bind operator
['a', 'b']::entries() // [[0, 'a'], [1, 'b']]
```

### Objects

```javascript
const entries = require('entries-array')

entries({key: 'value'}) // [['key', 'value']]

// Supports the bind operator
const obj = {key: 'value'}
obj::entries() // [['key', 'value']]
```

### Iterators

`entries-array` will treat an iterator as if it were an array of values. Each “key” will be an incrementing integer index that starts at zero.

```javascript
const entries = require('entries-array')

function * gen () {
  yield 'a'
  yield 'b'
}

entries(gen()) // [[0, 'a'], [1, 'b']]
```

### Maps

```javascript
const entries = require('entries-array')

const map = new Map()
map.set('key', 'value')

entries(map) // [['key', 'value']]
```

### Sets

`entries-array` will treat a Set like an array, and will add integer index keys starting at zero. Note that this behavior is different from that of the built-in [`Set.prototype.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries) method.

```javascript
const entries = require('entries-array')

const set = new Set()
set.add('first')
set.add('second')

entries(set) // [[0, 'first'], [1, 'second']]
```

### Typed Arrays

```javascript
const entries = require('entries-array')

const typedArray = new Int32Array(new ArrayBuffer(4))

entries(typedArray) // [[0, 0]]
```

## Related

* [entries-iterator](https://github.com/lamansky/entries-iterator)
* [keys-iterator](https://github.com/lamansky/keys-iterator)
* [keys-array](https://github.com/lamansky/keys-array)
* [values-iterator](https://github.com/lamansky/values-iterator)
* [values-array](https://github.com/lamansky/values-array)
