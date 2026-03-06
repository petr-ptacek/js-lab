import { parseJSONSafe } from "@petr-ptacek/js-core";

// parsing different data types
const numberJson = "42";
const number = parseJSONSafe<number>(numberJson);
console.log("Number:", number); // 42

const booleanJson = "true";
const boolean = parseJSONSafe<boolean>(booleanJson);
console.log("Boolean:", boolean); // true

const arrayJson = '["apple", "banana", "orange"]';
const fruits = parseJSONSafe<string[]>(arrayJson, []);
console.log("Fruits:", fruits); // ["apple", "banana", "orange"]

// complex nested object
const userJson = `{
  "id": 123,
  "profile": {
    "name": "Alice",
    "preferences": {
      "theme": "dark",
      "notifications": true
    }
  },
  "roles": ["user", "editor"]
}`;

interface User {
  id: number;
  profile: {
    name: string;
    preferences: {
      theme: string;
      notifications: boolean;
    };
  };
  roles: string[];
}

const user = parseJSONSafe<User>(userJson);

if (user) {
  console.log("User ID:", user.id);
  console.log("Name:", user.profile.name);
  console.log("Theme:", user.profile.preferences.theme);
  console.log("Roles:", user.roles.join(", "));
}
