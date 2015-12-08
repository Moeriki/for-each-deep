# For each deep

Iterate over nested array / object.

## Usage

### ES2015

```javascript
import forEachDeep from 'for-each-deep'

var obj = {
  string: 'a value',
  arr: [{
    key: 'value'
  }]
}

forEachDeep(obj, function (value, key, currentObj, currentPath) {
  console.log(currentPath + ' = ' + value);
  // string = a value
  // arr = [object Object]
  // arr[0] = [object Object]
  // arr[0].key = value
});
```

### ES5

```javascript
var forEachDeep = require('for-each-deep/es5');

forEachDeep(obj, function (value, key, obj, currentPath) {
  // ...
});
```
