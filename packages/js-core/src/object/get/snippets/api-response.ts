import { get } from "@petr-ptacek/js-core";

const apiResponse = {
  data: {
    users: [
      {
        id: 1,
        profile: {
          email: "alice@example.com",
          preferences: { theme: "dark" },
        },
      },
    ],
  },
};

// Safely access nested API data
const userEmail = get(apiResponse, "data.users.0.profile.email");
console.log(userEmail); // "alice@example.com"

const userTheme = get(
  apiResponse,
  "data.users.0.profile.preferences.theme",
  "light",
);
console.log(userTheme); // "dark"

// Handle missing data gracefully
const missingUser = get(apiResponse, "data.users.1.profile.email", "No email");
console.log(missingUser); // "No email"
