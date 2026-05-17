import { get } from "@petr-ptacek/js-core";

const user = {
  profile: {
    name: "John",
    age: 30,
    address: {
      city: "Prague",
      zip: "110 00",
    },
  },
};

// Get nested object property
const name = get(user, "profile.name");
console.log(name); // "John"

// Get deeply nested value
const city = get(user, "profile.address.city");
console.log(city); // "Prague"

// Get with default value (existing property)
const age = get(user, "profile.age", 25);
console.log(age); // 30

// Get with default value (missing property)
const nickname = get(user, "profile.nickname" as any, "anonymous");
console.log(nickname); // "anonymous"
