# entries-array

Returns an array of the key-value pairs of an Object, Map, Array, or Typed Array. Useful for when you need the entries of a collection object but aren’t sure what type of collection you’ll be given.

## Installation

Requires [Node.js](https://nodejs.org/) 7.0.0 or above.

```bash
npm i entries-array
```

## API

The module exports a single function.

### Parameters

1. Bindable: `c` (Array, iterator, Object, Map, Set, string, or Typed Array)
2. Optional: Object argument:
    * `arrays` / `maps` / `sets` (arrays of classes/strings): Arrays of classes and/or string names of classes that should be treated as equivalent to `Array`/`Map`/`Set` (respectively).
    * `inObj` (boolean): Whether or not to act like the “in” operator by including inherited Object properties. Only takes effect if `c` is an Object (i.e. not another recognized type). Defaults to `false`.
    * `reflectObj` (boolean): Whether or not to include non-enumerable Object properties by using reflection. Only takes effect if `c` is an Object (i.e. not another recognized type). Defaults to `false`.
    * `reverse` (boolean): If `true`, then entries are returned in reverse order. Defaults to `false`.

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

#### Inherited Object Properties

Include Object properties from the prototype chain by setting `inObj` to `true`:

```javascript
const entries = require('entries-array')

function Cls () {}
Cls.prototype.key = 'value'

entries(new Cls(), {inObj: true}) // [['key', 'value']]
```

#### Non-Enumerable Object Properties

Include non-enumerable Object properties by setting `reflectObj` to `true`:

```javascript
const entries = require('entries-array')

const obj = {}
Object.defineProperty(obj, 'key', {value: 'value', enumerable: false})

entries(obj, {reflectObj: true}) // [['key', 'value']]
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

### Strings

`entries-array` will treat a string like a character array.

```javascript
const entries = require('entries-array')

entries('hi') // [[0, 'h'], [1, 'i']]
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
