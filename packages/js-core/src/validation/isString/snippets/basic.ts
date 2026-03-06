import { isString } from "@petr-ptacek/js-core";

// basic type checking examples
const testValues = [
  "hello world",
  "",
  "123",
  123,
  true,
  null,
  undefined,
  [],
  {}
];

testValues.forEach(value => {
  console.log(`${JSON.stringify(value)} is string:`, isString(value));
});

// Output:
// "hello world" is string: true
// "" is string: true
// "123" is string: true
// 123 is string: false
// true is string: false
// null is string: false
// undefined is string: false
// [] is string: false
// {} is string: false
