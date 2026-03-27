import { entries } from "@petr-ptacek/js-core";

const data = {
  id: 1,
  name: "Product",
  price: 99.99,
  internal: true,
};

// Filter out internal properties
const publicData = Object.fromEntries(entries(data).filter(([key]) => key !== "internal"));

console.log(publicData);
// Output: { id: 1, name: "Product", price: 99.99 }
