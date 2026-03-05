import { get } from "@petr-ptacek/js-core";

const user = {
  profile: {
    name: "John",
    age: 30,
    contacts: {
      email: "john@example.com",
      phones: ["+1234567890", "+0987654321"]
    }
  }
};

// Get nested object property
const name = get(user, "profile.name");
console.log(name); // "John"

// Get array element
const firstPhone = get(user, "profile.contacts.phones.0");
console.log(firstPhone); // "+1234567890"

// Get with default value (existing property)
const age = get(user, "profile.age", 25);
console.log(age); // 30
