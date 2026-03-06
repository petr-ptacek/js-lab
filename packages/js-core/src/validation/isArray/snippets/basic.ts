import { isArray } from "@petr-ptacek/js-core";

// basic type checking
const values = [
  [1, 2, 3],
  "not an array",
  { key: "value" },
  null,
  undefined,
  42
];

values.forEach(value => {
  console.log(`${JSON.stringify(value)} is array:`, isArray(value));
});

// Output:
// [1,2,3] is array: true
// "not an array" is array: false
// {"key":"value"} is array: false
// null is array: false
// undefined is array: false
// 42 is array: false
