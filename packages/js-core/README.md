# JS Core

A modern TypeScript utility library with full type safety and tree-shaking support. Contains a collection of commonly
used functions for working with arrays, objects, math, type guards, DOM manipulation, and more.

## ✨ Key Features

- 🎯 **Full Type Safety** - All functions are fully typed with TypeScript
- 🌳 **Tree-shaking Friendly** - Import only what you actually need
- 📦 **ESM Only** - Modern ES modules
- 🧪 **Fully Tested** - High test coverage
- 📚 **Documentation** - TSDoc comments for every function
- ⚡ **Zero Dependencies** - No external dependencies

## 📦 Installation

```shell
npm install @petr-ptacek/js-core
```

## 🚀 Usage

```ts
import { sum, shuffle, isArray, createUUIDV4 } from "@petr-ptacek/js-core";

console.log(sum(1, 2)); // 3
console.log(shuffle([1, 2, 3, 4])); // [3, 1, 4, 2]
console.log(isArray([1, 2, 3])); // true
console.log(createUUIDV4()); // "550e8400-e29b-41d4-a716-446655440000"
```

## 📚 Modules

### 🔢 Array

Functions for working with arrays.

- `range(start?, stop, step?)` - Creates an array of numbers (Python-like)
- `shuffle(array)` - Shuffles array elements (Fisher-Yates)
- `zip(array1, array2, mapper?)` - Zips two arrays element-wise

```ts
import { range, shuffle, zip } from "@petr-ptacek/js-core";

range(5); // [0, 1, 2, 3, 4]
range(2, 6); // [2, 3, 4, 5]
shuffle([1, 2, 3]); // [2, 1, 3]
zip([1, 2], ["a", "b"]); // [[1, "a"], [2, "b"]]
```

### 🔍 Type Guards (is-what)

Safe type guards for type checking.

- `isArray(value)` - Checks if value is an array
- `isObject(value)` - Checks if value is an object
- `isString(value)` - Checks if value is a string
- `isNumber(value)` - Checks if value is a number
- `isBoolean(value)` - Checks if value is a boolean
- `isFunction(value)` - Checks if value is a function
- `isDate(value)` - Checks if value is a Date
- `isValidDate(value)` - Checks if value is a valid Date
- `isNull(value)` - Checks if value is null
- `isUndefined(value)` - Checks if value is undefined
- `isNullable(value)` - Checks if value is null or undefined
- `isPlainObject(value)` - Checks if value is a plain object
- `isPrimitive(value)` - Checks if value is a primitive
- `isEmptyArray(value)` - Checks if array is empty
- `isEmptyObject(value)` - Checks if object is empty
- `isEmptyString(value)` - Checks if string is empty
- `isFiniteNumber(value)` - Checks if number is finite
- `isNaNValue(value)` - Checks if value is NaN
- And more...

```ts
import { isArray, isString, isValidDate } from "@petr-ptacek/js-core";

if ( isArray(value) ) {
  // TypeScript knows that value is an array
  value.map(x => x);
}

if ( isValidDate(date) ) {
  // TypeScript knows that date is a valid Date object
  date.getTime();
}
```

### ➕ Math

Mathematical functions and operations.

- `add(a, b)` - Addition
- `subtract(a, b)` - Subtraction
- `multiply(a, b)` - Multiplication
- `sum(...numbers)` - Sum of numbers
- `clamp(value, min, max)` - Clamps value within range
- `toPercentage(value, base)` - Converts value to percentage
- `getRandomNumber(min, max)` - Generates random number
- `getAspectRatio(width, height)` - Calculates aspect ratio
- `scaleByAspectRatio(width, height, targetWidth)` - Scales by aspect ratio

```ts
import { sum, clamp, toPercentage } from "@petr-ptacek/js-core";

sum(1, 2, 3, 4); // 10
clamp(15, 0, 10); // 10
toPercentage(3, 4); // 75
```

### 🎯 Object

Functions for working with objects.

- `get(object, path)` - Gets value from object using path (lodash-like)
- `entries(object)` - Type-safe Object.entries

```ts
import { get, entries } from "@petr-ptacek/js-core";

const obj = { user: { name: "John", age: 30 } };
get(obj, "user.name"); // "John"
get(obj, "user.age"); // 30

entries(obj); // [["user", { name: "John", age: 30 }]]
```

### 🛡️ Safe

Safe functions for error handling.

- `withTryCatch(fn, options?)` - Wraps function in try-catch with discriminated result
- `parseJSONSafe(json, fallback?)` - Safe JSON.parse

```ts
import { withTryCatch, parseJSONSafe } from "@petr-ptacek/js-core";

const result = await withTryCatch(() => fetchData());
if ( result.success ) {
  console.log(result.data);
} else {
  console.error(result.error);
}

const data = parseJSONSafe('{"name": "John"}', {});
const invalid = parseJSONSafe('invalid json', null); // null
```

### 🔐 Crypto

Cryptographic and security functions.

- `createUUIDV4()` - Generates UUID v4 (RFC 4122 compliant)

```ts
import { createUUIDV4 } from "@petr-ptacek/js-core";

const id = createUUIDV4(); // "550e8400-e29b-41d4-a716-446655440000"
```

### 📡 Emitter

Type-safe event emitter.

- `Emitter<Events>` - Class for working with events

```ts
import { Emitter } from "@petr-ptacek/js-core";

type Events = {
  log: (message: string) => void;
  sum: (a: number, b: number) => number;
};

const emitter = new Emitter<Events>();
emitter.on("log", (msg) => console.log(msg));
emitter.emit("log", "Hello World!");
```

### 🌐 DOM

Functions for working with DOM and images.

- `loadImage(src, options?)` - Loads image with promise API
- `isInteractiveElement(element)` - Checks if element is interactive
- `scaleImageByAspectRatio(image, targetWidth)` - Scales image by aspect ratio
- `shrinkImage(image, maxWidth, maxHeight)` - Shrinks image with constraints

```ts
import { loadImage, isInteractiveElement } from "@petr-ptacek/js-core";

const image = await loadImage("/image.png", {
  crossOrigin: "anonymous",
  decoding: "async",
});

if ( isInteractiveElement(element) ) {
  // Element is button, input, select, textarea, or link
}
```

## 📄 License

MIT


