# array

Utility functions for working with arrays.

All functions in this module are:

- immutable (input arrays are never mutated)
- tree-shakeable
- fully typed with TypeScript

---

## Installation

```ts
import { range, shuffle, zip, /* and others */ } from "@petr-ptacek/js-core";
```

## Functions

### `range`

Creates an array of numbers following the same semantics as Python’s range.

- supports positive and negative steps
- supports single-argument and multi-argument usage

[➡️ Read more →](/api-generated/functions/range)

### `shuffle`

Returns a new array with elements shuffled in random order.

- uses the Fisher–Yates algorithm
- does not mutate the input array

[➡️ Read more →](../api-generated/functions/shuffle)

### `zip`

Combines two arrays element-wise.

- result length is based on the shorter array
- supports optional mapping of pairs

[➡️ Read more →](/api-generated/functions/zip)
