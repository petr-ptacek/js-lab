# JS Core

A TypeScript utility library with full type safety and tree-shaking support. Contains a collection of commonly
used functions for working with arrays, objects, math, type guards, DOM manipulation, and more.

## ✨ Key Features

- 🎯 **Full Type Safety** - All functions are fully typed with TypeScript
- 🌳 **Tree-shaking Friendly** - Import only what you actually need
- 📦 **ESM Only** - Modern ES modules
- 🧪 **Fully Tested** - High test coverage
- 📚 **Documentation** - TSDoc comments for every function

## 📦 Installation

::: code-group

```shell [npm]
npm install @petr-ptacek/js-core
```

```shell [yarn]
yarn add @petr-ptacek/js-core
```

```shell [pnpm]
pnpm add @petr-ptacek/js-core
```

```shell [bun]
bun add @petr-ptacek/js-core
```

:::

## 🚀 Usage

```ts
import { sum, shuffle, isArray, createUUIDV4 } from "@petr-ptacek/js-core";

console.log(sum(1, 2)); // 3
console.log(shuffle([1, 2, 3, 4])); // [3, 1, 4, 2]
console.log(isArray([1, 2, 3])); // true
console.log(createUUIDV4()); // "550e8400-e29b-41d4-a716-446655440000"
```

## 📖 API Reference
For a complete list of available functions and their documentation, please refer to the API Reference ([docs](./docs/api/) | [web](/api/)).

## 📄 License

[MIT License](https://github.com/petr-ptacek/js-lab/blob/main/LICENSE) © 2026-PRESENT [Petr Ptáček](https://github.com/petr-ptacek)

