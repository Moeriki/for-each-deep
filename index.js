// vendor modules

import forEach from 'for-each'
import isArray from 'is-array'
import isPlainObject from 'is-plain-object'

// exports

/**
* Iterate over an object's properties and values (including nested) and make a callback
* on each key:value pair. The callback will have three arguments: value, key, object;
* where object is the current object on which we are iterating. The return value of the inner
* function can be false when the value is an Object. Returning false will prevent the forEachDeep
* to go into this specific node tree.
 * @param {object}   object    object to deep iterate over
 * @param {Function} fn        function to call for each object/key pair, cb(value, key, obj)
 * @param {string}   [path=''] path to start at
 */
function forEachDeep(object, fn, path = '') {
  const objIsArray = isArray(object);

  forEach(object, (val, key) => {
    let currentPath = path;
    if (objIsArray) {
      currentPath += `[${key}]`;
    } else {
      if (!currentPath) {
        currentPath = key;
      } else {
        currentPath += `.${key}`
      }
    }

    const canNest = fn(val, key, object, currentPath) !== false

    if (canNest && (isArray(val) || isPlainObject(val))) {
      forEachDeep(val, fn, currentPath)
    }
  })
}

export default forEachDeep;

if (module && module.exports) {
  module.exports = forEachDeep
}
