# Type Alias: AsyncPredicate()\<T\>

> **AsyncPredicate**\<`T`\> = (`value`) => `Promise`\<`boolean`\>

Represents an asynchronous predicate function.

Similar to [Predicate](Predicate.md), but returns a Promise<boolean>.

Useful for validations that require asynchronous checks,
such as API calls or database lookups.

## Type Parameters

### T

`T`

## Parameters

### value

`T`

## Returns

`Promise`\<`boolean`\>

## Example

```ts
const isUserAllowed: AsyncPredicate<User> = async (user) => {
  return await api.hasAccess(user.id);
};
```
