import { parseJSONSafe } from "@petr-ptacek/js-core";

// configuration loading with fallback
const configJson = localStorage.getItem("userConfig");

const config = parseJSONSafe(configJson || "", {
  theme: "light",
  language: "en",
  notifications: true,
});

// config is always defined due to fallback
console.log("Theme:", config.theme);
console.log("Language:", config.language);
console.log("Notifications:", config.notifications);

// API response parsing with fallback
type User = {
  id: number;
  name: string;
};

const apiResponse = '{"users": [{"id": 1, "name": "Alice"}]}';

const data = parseJSONSafe(apiResponse, { users: [] as User[] });

// data.users is always an array, even if parsing fails
data.users.forEach((user) => {
  console.log(`User: ${user.name} (ID: ${user.id})`);
});
