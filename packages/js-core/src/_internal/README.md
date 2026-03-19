# Helpers

- Only for internal usage, not exported to **Public API**

## Message format pattern

`<param> must be <constraint>, got: <value>`

```ts
throw new Error(
  `${name} must be in range ${min}..${max}, got: ${value}`,
);
```

### Example

- `must be a positive finite number`
- `must be a non-empty string`
- `must be an integer`

## Future implementation

- assertArrayNotEmpty
- assertObject
- assertBoolean
