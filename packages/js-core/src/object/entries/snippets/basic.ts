import { entries } from "@petr-ptacek/js-core";

const user = {
  id: 1,
  name: "John",
  isActive: true,
};

for (const [key, value] of entries(user)) {
  // key: "id" | "name" | "isActive"
  // value: number | string | boolean
  console.log(`${key}: ${value}`);
}
